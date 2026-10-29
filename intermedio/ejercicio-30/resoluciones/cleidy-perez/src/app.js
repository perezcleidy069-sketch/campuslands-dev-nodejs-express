const express = require('express');
const { createAuthController } = require('./controllers/auth-controller');
const { createMotorcycleController } = require('./controllers/motorcycle-controller');
const { createAuthenticate } = require('./middleware/authenticate');
const { errorHandler } = require('./middleware/error-handler');
const { requestId } = require('./middleware/request-id');
const { createMotorcycleRepository } = require('./repositories/motorcycle-repository');
const { createAuthRouter } = require('./routes/auth-routes');
const { createMotorcycleRouter } = require('./routes/motorcycle-routes');
const { createAuthService } = require('./services/auth-service');
const { createMotorcycleService } = require('./services/motorcycle-service');

function createApp({
  repository = createMotorcycleRepository(),
  authService = createAuthService(),
} = {}) {
  const app = express();
  const motorcycleService = createMotorcycleService(repository);
  const motorcycleController = createMotorcycleController(motorcycleService);
  const authController = createAuthController(authService);
  const authenticate = createAuthenticate(authService);

  app.use(requestId);
  app.use(express.json({ limit: '100kb' }));
  app.get('/health', (req, res) =>
    res.json({
      ok: true,
      topic: 'proyecto integrador intermedio',
      requestId: req.requestId,
    }),
  );
  app.use('/api/auth', createAuthRouter(authController));
  app.use(
    '/api/motorcycles',
    createMotorcycleRouter(motorcycleController, authenticate),
  );
  app.use((req, res, next) =>
    next(Object.assign(new Error('Ruta no encontrada'), { status: 404 })),
  );
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
