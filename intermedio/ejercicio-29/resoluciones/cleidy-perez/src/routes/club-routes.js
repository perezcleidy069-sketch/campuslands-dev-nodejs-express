const { Router } = require('express');

function createClubRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  return router;
}

module.exports = { createClubRouter };
