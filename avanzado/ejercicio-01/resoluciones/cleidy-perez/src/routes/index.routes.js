const { Router } = require('express');
const characterRoutesV1 = require('./v1/character.routes');

function createIndexRoutes(config, service) {
  const router = Router();
  router.use('/api/v1/characters', characterRoutesV1(config, service));

  if (config.mode === 'versioned') {
    const { createCharacterController } = require('../controllers/character.controller');
    const controller = createCharacterController(config, service);
    router.get('/api/v2/characters', controller.listV2);
  }

  return router;
}

module.exports = { createIndexRoutes };