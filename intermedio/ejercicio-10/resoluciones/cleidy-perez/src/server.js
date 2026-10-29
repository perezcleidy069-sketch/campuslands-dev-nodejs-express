'use strict';
const { createApp } = require('./app');
const { port } = require('./config');
const server = createApp().listen(port, () => console.log(`Ping-pong API listening on port ${port}`));
module.exports = { server };
