const jobs = [{ id: 1, client: 'Taller Norte', material: 'acero', status: 'completado' }, { id: 2, client: 'Moto Club', material: 'aluminio', status: 'en proceso' }];
function listJobs() { return jobs.map((job) => ({ ...job })); }
function addJob(input) { if (!input?.client?.trim() || !input?.material?.trim()) throw new Error('client y material son obligatorios'); const job = { id: jobs.length + 1, client: input.client.trim(), material: input.material.trim(), status: 'pendiente' }; jobs.push(job); return job; }
module.exports = { listJobs, addJob };
