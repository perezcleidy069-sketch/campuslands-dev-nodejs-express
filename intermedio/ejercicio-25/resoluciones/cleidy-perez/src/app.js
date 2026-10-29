const express = require('express');
const { createGameController } = require('./controllers/game-controller');
const { createGameRepository } = require('./repositories/game-repository');
const { createGameRouter } = require('./routes/game-routes');
const { createGameService } = require('./services/game-service');

function createApp({ repository = createGameRepository() } = {}) {
  const app = express();
  const controller = createGameController(createGameService(repository));

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'testing de rutas', resource: 'juegos RPG' }),
  );
  app.use('/api/games', createGameRouter(controller));
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
