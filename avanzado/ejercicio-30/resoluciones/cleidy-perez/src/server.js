const {createApp}=require('./app');
const config=require('../config');
const port=config.port;
const server=createApp(config).listen(port,()=>console.log('Listening on port '+port));
module.exports=server;
