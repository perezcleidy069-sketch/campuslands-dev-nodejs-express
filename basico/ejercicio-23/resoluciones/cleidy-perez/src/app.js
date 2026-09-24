const http = require('node:http');
const { listJobs, addJob } = require('./services/job.service');
function sendJson(res, status, data) { const body = JSON.stringify(data); res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(body) }); res.end(body); }
function readBody(req) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', (chunk) => { raw += chunk; }); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('JSON inválido')); } }); req.on('error', reject); }); }
function createServer() { return http.createServer(async (req, res) => { const url = new URL(req.url, 'http://localhost'); if (req.method === 'GET' && url.pathname === '/api/jobs') return sendJson(res, 200, { ok: true, data: listJobs() }); if (req.method === 'POST' && url.pathname === '/api/jobs') { try { return sendJson(res, 201, { ok: true, data: addJob(await readBody(req)) }); } catch (error) { return sendJson(res, 400, { ok: false, error: error.message }); } } return sendJson(res, 404, { ok: false, error: 'Ruta no encontrada' }); }); }
function start(port = Number(process.env.PORT || 3000)) { const server = createServer(); server.listen(port, () => console.log(`API de soldadura en http://localhost:${port}`)); return server; }
if (require.main === module) start();
module.exports = { createServer, start };
