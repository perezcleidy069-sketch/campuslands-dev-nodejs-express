'use strict';
const { createApp } = require('./app');
const { port } = require('./config');
const server = createApp().listen(port, () => console.log(`Digital drawing API listening on port ${port}`));
module.exports = { server };
