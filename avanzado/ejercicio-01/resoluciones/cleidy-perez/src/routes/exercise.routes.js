const {Router}=require('express');
const {createController}=require('../controllers/exercise.controller');
function createRouter(config,service){const router=Router(),controller=createController(config,service);
 router.get('/',controller.list);
 router.post('/actions',controller.perform);
 if(config.mode==='stream') router.get('/export',(req,res)=>{res.type('text/csv').set('Content-Disposition','attachment; filename="fighters.csv"').send(service.exportCsv());});
 if(config.mode==='json-export') router.get('/export',(req,res)=>res.type('application/json').set('Content-Disposition','attachment; filename="films.json"').json({exportedAt:new Date().toISOString(),count:service.list().data.length,data:service.list().data}));
 if(config.mode==='metrics') router.get('/metrics',(req,res)=>res.json({ok:true,metrics:service.metrics()}));
 if(config.mode==='audit') router.get('/audit',(req,res)=>res.json({ok:true,data:service.audit()}));
 if(config.mode==='events') router.get('/events',(req,res)=>res.json({ok:true,data:service.events()}));
 return router;}
module.exports={createRouter};
