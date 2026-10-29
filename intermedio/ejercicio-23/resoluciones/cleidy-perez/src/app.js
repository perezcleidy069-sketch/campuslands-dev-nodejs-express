'use strict';
const express = require('express');
const { CatalogRepository } = require('./repositories/catalog-repository');
const { createCatalogService } = require('./services/catalog-service');
const { validateRecord } = require('./middleware/validate-record');
const { errorHandler } = require('./middleware/error-handler');

function createApp({ repository = new CatalogRepository() } = {}) {
  const app = express();
  const service = createCatalogService(repository);
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (_req, res) =>
    res.json({
      ok: true,
      topic: 'testing con node test',
      resource: 'welds',
    }),
  );

  app.get('/api/v1/welds', (req, res) => {
    res.json({ ok: true, ...service.list(req.query) });
  });
  app.get('/api/v1/welds/:id', (req, res, next) => {
    const record = service.getById(req.params.id);

    if (!record) {
      next(Object.assign(new Error('Registro no encontrado'), { status: 404 }));
      return;
    }

    res.json({ ok: true, item: record });
  });
  app.post('/api/v1/welds', validateRecord, (req, res) => {
    const input = req.validatedRecord;
    res.status(201).json({ ok: true, item: service.create(input) });
  });

  app.use((req, res, next) => {
    next(Object.assign(new Error('Ruta no encontrada'), { status: 404 }));
  });
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
