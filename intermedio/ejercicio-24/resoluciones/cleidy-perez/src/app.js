const express = require('express');
const { createFormulaController } = require('./controllers/formula-controller');
const { createFormulaRepository } = require('./repositories/formula-repository');
const { createFormulaRouter } = require('./routes/formula-routes');
const { createFormulaService } = require('./services/formula-service');

function createApp({ repository = createFormulaRepository() } = {}) {
  const app = express();
  const service = createFormulaService(repository);

  app.use(express.json());
  app.get('/health', (req, res) =>
    res.json({ ok: true, topic: 'testing de servicios' }),
  );
  app.use(
    '/api/formulas',
    createFormulaRouter(createFormulaController(service)),
  );
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
