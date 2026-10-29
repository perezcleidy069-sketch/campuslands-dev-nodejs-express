const express=require('express');
const {randomUUID}=require('node:crypto');
const {createService}=require('./services/exercise.service');
const {createRouter}=require('./routes/exercise.routes');
function createApp(config) {
 const app=express(); const service=createService(config); app.disable('x-powered-by');
 app.use(express.json({limit:'1mb'}));
 if(config.mode==='security') app.use((req,res,next)=>{res.set({'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'",'Permissions-Policy':'camera=(), microphone=(), geolocation=()'});next();});
 if(config.mode==='observability') app.use((req,res,next)=>{req.requestId=req.get('x-request-id')||randomUUID();res.set('X-Request-Id',req.requestId);const started=Date.now();res.on('finish',()=>console.log(JSON.stringify({level:'info',requestId:req.requestId,method:req.method,path:req.path,status:res.statusCode,durationMs:Date.now()-started})));next();});
 if(config.mode==='sanitize') app.use((req,res,next)=>{if(req.body&&typeof req.body==='object') req.body=cleanBody(req.body);next();});
 app.get('/health',(req,res)=>res.json({ok:true,status:'healthy',topic:config.topic}));
 if(config.mode==='readiness') app.get('/ready',(req,res)=>{const result=service.perform({action:'check'}); Promise.resolve(result).then(x=>res.status(x.ready?200:503).json(x));});
 if(config.mode==='openapi') app.get('/openapi.json',async(req,res)=>res.json(await service.perform({action:'schema'})));
 app.use('/api/v1/'+config.resource,createRouter(config,service));
 if(config.mode==='versioned') app.get('/api/v2/'+config.resource,(req,res)=>{const result=service.list(req.query);res.json({ok:true,version:'v2',topic:config.topic,count:result.data.length,data:result.data.map(x=>({...x,powerScore:x.level*10}))});});
 app.use((req,res)=>res.status(404).json({ok:false,error:{code:'NOT_FOUND',message:'Route not found'}}));
 app.use((err,req,res,next)=>{if(res.headersSent)return next(err);const status=err.status||500;if(status>=500) service.metrics().failures++;res.status(status).json({ok:false,error:{code:err.code||'INTERNAL_ERROR',message:status===500?'An unexpected error occurred':err.message}});});
 return app;
}
function cleanBody(value){if(typeof value==='string')return value.replace(/<[^>]*>/g,'').replace(/[\u0000-\u001f\u007f]/g,'').trim();if(Array.isArray(value))return value.map(cleanBody);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,cleanBody(v)]));return value;}
module.exports={createApp};
