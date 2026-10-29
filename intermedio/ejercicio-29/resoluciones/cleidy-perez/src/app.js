const express = require('express');
const { createClubController } = require('./controllers/club-controller');
const { createClubRepository } = require('./repositories/club-repository');
const { createClubRouter } = require('./routes/club-routes');
const { createClubService } = require('./services/club-service');

function createApp({ repository = createClubRepository() } = {}) {
  const app = express();
  const controller = createClubController(createClubService(repository));

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'refactor de API' }),
  );
  app.use('/api/clubs', createClubRouter(controller));
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
