const { Router } = require('express');

function createCharacterRoutes(config, service) {
  const router = Router();
  const { createCharacterController } = require('../../controllers/character.controller');
  const controller = createCharacterController(config, service);

  router.get('/', controller.listV1);
  router.post('/', controller.createV1);

  return router;
}

module.exports = createCharacterRoutes;