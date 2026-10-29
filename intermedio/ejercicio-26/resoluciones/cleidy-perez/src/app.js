const express = require('express');
const { createLoadoutController } = require('./controllers/loadout-controller');
const { createLoadoutRepository } = require('./repositories/loadout-repository');
const { createLoadoutRouter } = require('./routes/loadout-routes');
const { createLoadoutService } = require('./services/loadout-service');

function createApp({ repository = createLoadoutRepository() } = {}) {
  const app = express();
  const controller = createLoadoutController(createLoadoutService(repository));

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'mock de dependencias' }),
  );
  app.use('/api/loadouts', createLoadoutRouter(controller));
  app.use((req, res, next) =>
    next(Object.assign(new Error('Ruta no encontrada'), { status: 404 })),
  );
  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }
    const status = Number.isInteger(error.status) ? error.status : 500;
    res.status(status).json({
      ok: false,
      message: status === 500 ? 'Error interno del servidor' : error.message,
    });
  });

  return app;
}

module.exports = { createApp };
