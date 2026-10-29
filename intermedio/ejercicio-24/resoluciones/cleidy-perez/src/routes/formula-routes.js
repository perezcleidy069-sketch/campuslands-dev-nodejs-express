const { Router } = require('express');

function createFormulaRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  return router;
}

module.exports = { createFormulaRouter };
