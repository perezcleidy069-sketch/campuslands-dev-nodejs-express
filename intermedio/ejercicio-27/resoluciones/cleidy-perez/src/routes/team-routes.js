const { Router } = require('express');

function createTeamRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  return router;
}

module.exports = { createTeamRouter };
