const { randomUUID } = require('node:crypto');
const { EventEmitter } = require('node:events');
class HttpError extends Error { constructor(status, code, message) { super(message); this.status=status; this.code=code; } }
const clean = value => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f\u007f]/g, '').trim() : Array.isArray(value) ? value.map(clean) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k,v])=>[k,clean(v)])) : value;
function createService(config) {
  const records = structuredClone(config.records);
  const events = new EventEmitter(); const eventLog=[]; const audit=[]; const cache=new Map(); const idempotency=new Map(); const queue=[]; const jobs=[]; const webhooks=[]; const sessions=new Map(); const counters={requests:0,actions:0,failures:0}; let active=0; let nextId=records.length+1;
  events.on('domain-event', event => eventLog.push(event));
  const list = (query={}) => {
    counters.requests++;
    if(config.mode==='architecture') { const page=Math.max(1,Number(query.page)||1); const limit=Math.min(50,Math.max(1,Number(query.limit)||10)); return {data:records.slice((page-1)*limit,page*limit),pagination:{page,limit,total:records.length,pages:Math.ceil(records.length/limit)}}; }
    if(config.mode==='cache') return {data:records,cacheEntries:cache.size};
    return {data:records};
  };
  async function perform(input={}, context={}) {
    counters.actions++; const action=input.action || 'create';
    const create = (item) => { const row={id:nextId++,...item}; records.push(row); return {created:row}; };
    switch(config.mode) {
      case 'validation': {
        if(action!=='validate') return create(input);
        if(typeof input.heroId!=='string' || !/^[a-z0-9-]{2,30}$/i.test(input.heroId)) throw new HttpError(400,'INVALID_HERO_ID','heroId must be 2-30 letters, numbers or hyphens');
        if(!Array.isArray(input.abilities) || input.abilities.length<1 || input.abilities.length>4 || input.abilities.some(x=>typeof x!=='string'||x.length>40)) throw new HttpError(400,'INVALID_ABILITIES','abilities must contain 1-4 short strings');
        const row={id:nextId++,heroId:input.heroId,abilities:[...input.abilities]}; records.push(row); return {valid:true,draft:row};
      }
      case 'domain-errors': {
        const p=records.find(x=>x.id===input.playerId); if(!p) throw new HttpError(404,'PLAYER_NOT_FOUND','Player does not exist'); if(!p.alive) throw new HttpError(409,'PLAYER_ALREADY_ELIMINATED','Player is already eliminated'); p.alive=false; return {eliminated:p.id};
      }
      case 'transaction': {
        const from=records.find(x=>x.id===input.from), to=records.find(x=>x.id===input.to), amount=Number(input.amount);
        if(!from||!to) throw new HttpError(404,'CLUB_NOT_FOUND','Both clubs must exist'); if(!Number.isFinite(amount)||amount<=0) throw new HttpError(400,'INVALID_AMOUNT','amount must be positive');
        if(from.balance<amount) throw new HttpError(409,'INSUFFICIENT_FUNDS','Transfer cancelled; no balances changed');
        from.balance-=amount; to.balance+=amount; return {committed:true,transfer:{from:from.id,to:to.id,amount},balances:[{id:from.id,balance:from.balance},{id:to.id,balance:to.balance}]};
      }
      case 'queue': {
        if(action==='process') { const task=queue.shift(); return {processed:task||null,pending:queue.length}; }
        if(action!=='enqueue'||typeof input.name!=='string'||!input.name.trim()) throw new HttpError(400,'INVALID_TASK','Use action enqueue and provide a task name');
        const task={id:randomUUID(),name:input.name.trim(),status:'queued',attempts:0}; queue.push(task); return {task,pending:queue.length};
      }
      case 'cache': {
        if(action!=='lookup'||typeof input.key!=='string') throw new HttpError(400,'INVALID_LOOKUP','Use action lookup and provide key');
        const now=Date.now(), found=cache.get(input.key); if(found&&found.expiresAt>now) return {hit:true,value:found.value};
        const row=records.find(x=>x.id===input.key); const value=input.value||row||null; cache.set(input.key,{value,expiresAt:now+30000}); return {hit:false,value,ttlSeconds:30};
      }
      case 'events': {
        if(action!=='publish'||typeof input.type!=='string') throw new HttpError(400,'INVALID_EVENT','Use action publish and provide type');
        const event={id:randomUUID(),type:input.type,payload:input.payload||{},occurredAt:new Date().toISOString()}; events.emit('domain-event',event); return {published:event,eventsRecorded:eventLog.length};
      }
      case 'csv': {
        if(action!=='import'||typeof input.csv!=='string') throw new HttpError(400,'INVALID_CSV','Use action import and provide csv text');
        const rows=input.csv.trim().split(/\r?\n/); if(rows.length<2) throw new HttpError(400,'EMPTY_CSV','CSV needs a header and at least one row'); const headers=rows.shift().split(',').map(x=>x.trim());
        if(headers.some(x=>!x)||new Set(headers).size!==headers.length) throw new HttpError(400,'INVALID_CSV_HEADER','Headers must be unique and non-empty');
        const imported=rows.map((line,index)=>{const values=line.split(','); if(values.length!==headers.length) throw new HttpError(400,'INVALID_CSV_ROW','Invalid column count at row '+(index+2)); return Object.fromEntries(headers.map((h,i)=>[h,values[i].trim()]));}); records.push(...imported.map(x=>({id:nextId++,...x}))); return {imported:imported.length,records:imported};
      }
      case 'bulk': {
        if(action!=='import'||!Array.isArray(input.items)) throw new HttpError(400,'INVALID_BATCH','Use action import with an items array');
        if(input.items.length>100) throw new HttpError(413,'BATCH_TOO_LARGE','Maximum batch size is 100'); const existing=new Set(records.map(x=>String(x.title).toLowerCase())); const accepted=[],errors=[];
        for(const [i,item] of input.items.entries()) { if(!item||typeof item.title!=='string'||typeof item.artist!=='string'||!item.title.trim()||!item.artist.trim()) {errors.push({index:i,error:'title and artist are required'});continue;} if(existing.has(item.title.toLowerCase())) {errors.push({index:i,error:'duplicate title'});continue;} existing.add(item.title.toLowerCase()); const row={id:nextId++,title:item.title.trim(),artist:item.artist.trim()}; records.push(row); accepted.push(row); }
        return {imported:accepted.length,rejected:errors.length,errors,records:accepted};
      }
      case 'observability': return {logged:true,requestId:context.requestId,message:clean(input.message||'request observed'),at:new Date().toISOString()};
      case 'metrics': { if(action!=='increment'||typeof input.name!=='string'||!/^[a-z][a-z0-9_]{0,39}$/.test(input.name)) throw new HttpError(400,'INVALID_METRIC','Metric name must be snake_case'); counters[input.name]=(counters[input.name]||0)+1; return {name:input.name,value:counters[input.name]}; }
      case 'sanitize': { const safe=clean(input); return create(Object.fromEntries(Object.entries(safe).filter(([k])=>k!=='action'))); }
      case 'refresh': {
        if(action==='issue') {const token=randomUUID(); sessions.set(token,{active:true}); return {accessToken:randomUUID(),refreshToken:token,simulated:true};}
        if(action==='refresh') {const old=sessions.get(input.refreshToken); if(!old||!old.active) throw new HttpError(401,'INVALID_REFRESH_TOKEN','Refresh token is invalid or already used'); old.active=false; const token=randomUUID(); sessions.set(token,{active:true}); return {accessToken:randomUUID(),refreshToken:token,rotated:true,simulated:true};}
        throw new HttpError(400,'INVALID_ACTION','Use issue or refresh');
      }
      case 'roles': { if(!['instructor','admin'].includes(context.role)) throw new HttpError(403,'ROLE_REQUIRED','Instructor or admin role required'); return create(Object.fromEntries(Object.entries(clean(input)).filter(([k])=>!['action','role'].includes(k)))); }
      case 'audit': { if(action!=='record'||!input.actor||!input.operation) throw new HttpError(400,'INVALID_AUDIT_EVENT','actor and operation are required'); const entry={id:randomUUID(),actor:clean(input.actor),operation:clean(input.operation),target:clean(input.target||null),at:new Date().toISOString()}; audit.push(entry); return {recorded:entry}; }
      case 'idempotency': {const key=context.idempotencyKey||input.key; if(!key||String(key).length>100) throw new HttpError(400,'IDEMPOTENCY_KEY_REQUIRED','Provide Idempotency-Key header'); if(idempotency.has(key)) return {...idempotency.get(key),replayed:true}; const result=create(Object.fromEntries(Object.entries(clean(input)).filter(([k])=>!['action','key'].includes(k)))); idempotency.set(key,result); return {...result,replayed:false};}
      case 'concurrency': {if(active>=2) throw new HttpError(429,'CONCURRENCY_LIMIT','At most two renders may run concurrently'); active++; try {const ms=Math.min(2000,Math.max(0,Number(input.ms)||0)); await new Promise(resolve=>setTimeout(resolve,ms)); return {renderId:randomUUID(),status:'completed',durationMs:ms,concurrencyLimit:2};} finally {active--;}}
      case 'webhooks': {if(action==='register') {let u; try{u=new URL(input.url);}catch{throw new HttpError(400,'INVALID_WEBHOOK_URL','A URL is required');} if(u.protocol!=='https:'||u.hostname!=='example.test') throw new HttpError(400,'UNSAFE_WEBHOOK_URL','Simulation accepts only https://example.test URLs'); const hook={id:randomUUID(),url:u.href,active:true}; webhooks.push(hook); return {registered:hook};} if(action==='dispatch') {if(webhooks.length===0) webhooks.push({id:randomUUID(),url:'https://example.test/hooks/demo',active:true}); const deliveries=webhooks.filter(x=>x.active).map(h=>({webhookId:h.id,event:input.event||'event.created',status:'simulated',attempt:1})); return {deliveries,networkRequests:0};} throw new HttpError(400,'INVALID_ACTION','Use register or dispatch');}
      case 'jobs': {if(action==='schedule') {const when=Date.parse(input.runAt); if(!Number.isFinite(when)||!input.name) throw new HttpError(400,'INVALID_JOB','Provide name and valid runAt'); const job={id:randomUUID(),name:input.name,runAt:new Date(when).toISOString(),status:when<=Date.now()?'completed':'scheduled'}; jobs.push(job); return {job,executed:job.status==='completed'};} if(action==='run-due') {const due=jobs.filter(j=>j.status==='scheduled'&&Date.parse(j.runAt)<=Date.now()); due.forEach(j=>j.status='completed'); return {executed:due.length,jobs:due};} throw new HttpError(400,'INVALID_ACTION','Use schedule or run-due');}
      case 'openapi': return {openapi:'3.0.3',info:{title:config.topic,version:'1.0.0'},paths:{['/api/v1/'+config.resource]:{get:{summary:'List records'},post:{summary:'Run feature action'}}}};
      case 'factory': {if(action!=='create') return {fixture:records}; const row={id:nextId++,name:clean(input.name||'Player-'+nextId),rank:input.rank||'bronze',region:input.region||'LATAM',...clean(input)}; records.push(row); return {created:row,source:'factory',fixtureCount:records.length};}
      case 'config': {if(action!=='read') throw new HttpError(400,'INVALID_ACTION','Use read'); const portRaw=process.env.PORT||'3000'; const port=Number(portRaw); if(!Number.isInteger(port)||port<1||port>65535) throw new HttpError(500,'INVALID_CONFIG','PORT must be an integer from 1 to 65535'); return {environment:process.env.NODE_ENV||'development',port,features:{maintenance:process.env.MAINTENANCE_MODE==='true'},validated:true};}
      case 'readiness': return {ready:process.env.READY!=='false',dependencies:{memoryStore:'up'},checkedAt:new Date().toISOString()};
      case 'final': {if(action==='maintenance') {const bike=records.find(x=>x.id===input.motorcycleId); if(!bike) throw new HttpError(404,'MOTORCYCLE_NOT_FOUND','Motorcycle does not exist'); const item={id:randomUUID(),motorcycleId:bike.id,service:clean(input.service||'general'),status:'scheduled',createdAt:new Date().toISOString()}; audit.push(item); return {maintenance:item};} return create(Object.fromEntries(Object.entries(clean(input)).filter(([k])=>k!=='action')));}
      default: return create(Object.fromEntries(Object.entries(clean(input)).filter(([k])=>k!=='action')));
    }
  }
  const exportCsv=()=>{const cols=Object.keys(records[0]||{}); const quote=x=>'"'+String(x??'').replace(/"/g,'""')+'"'; return [cols.map(quote).join(','),...records.map(r=>cols.map(c=>quote(r[c])).join(','))].join('\n');};
  return {list,perform,exportCsv,events:()=>eventLog.slice(),audit:()=>audit.slice(),metrics:()=>({...counters}),HttpError};
}
module.exports={createService};
