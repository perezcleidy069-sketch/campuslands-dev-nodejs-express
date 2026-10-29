const express = require('express');
const { createDropController } = require('./controllers/drop-controller');
const { createDropRepository } = require('./repositories/drop-repository');
const { createDropRouter } = require('./routes/drop-routes');
const { createDropService } = require('./services/drop-service');

function createApp({ repository = createDropRepository() } = {}) {
  const app = express();
  const controller = createDropController(createDropService(repository));

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'coleccion de ejemplos HTTP' }),
  );
  app.use('/api/drops', createDropRouter(controller));
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
