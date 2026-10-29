const express = require('express');
const openapi = require('./openapi.json');
const { createTeamController } = require('./controllers/team-controller');
const { createTeamRepository } = require('./repositories/team-repository');
const { createTeamRouter } = require('./routes/team-routes');
const { createTeamService } = require('./services/team-service');

function createApp({ repository = createTeamRepository() } = {}) {
  const app = express();
  const controller = createTeamController(createTeamService(repository));

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'documentacion de endpoints' }),
  );
  app.get(['/api/docs', '/api/docs.json'], (req, res) => res.json(openapi));
  app.use('/api/teams', createTeamRouter(controller));
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
