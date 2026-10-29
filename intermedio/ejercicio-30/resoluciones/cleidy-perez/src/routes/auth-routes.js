const { Router } = require('express');

function createAuthRouter(controller) {
  const router = Router();
  router.post('/login', controller.login);
  return router;
}

module.exports = { createAuthRouter };
