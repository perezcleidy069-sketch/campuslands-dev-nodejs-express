const { Router } = require('express');
const { validateMotorcycle } = require('../middleware/validate-motorcycle');

function createMotorcycleRouter(controller, authenticate) {
  const router = Router();
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', authenticate, validateMotorcycle, controller.create);
  return router;
}

module.exports = { createMotorcycleRouter };
