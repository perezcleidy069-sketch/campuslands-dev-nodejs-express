'use strict';
const express = require('express');
const { CatalogRepository } = require('./repositories/catalog-repository');
const { createCatalogService } = require('./services/catalog-service');
const { createAuthService } = require('./services/auth-service');
const { validateRecord } = require('./middleware/validate-record');
const { errorHandler } = require('./middleware/error-handler');
const { allowedOrigins } = require('./config');


function createApp({ repository = new CatalogRepository(), authService = createAuthService() } = {}) {
  const app = express();
  const service = createCatalogService(repository);
  const auth = authService;
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (_req, res) => res.json({ ok: true, topic: 'relaciones simples', resource: 'missions' }));

  function authenticate(req, res, next) { next(); }
  function authorizeWrite(req, res, next) { next(); }

  app.get('/api/v1/missions', (req, res) => { res.json({ ok: true, ...service.list(req.query) }); });
  app.get('/api/v1/missions/:id', (req, res, next) => {
    const record = service.getById(req.params.id);
    if (!record) return next(Object.assign(new Error('Registro no encontrado'), { status: 404 }));
    res.json({ ok: true, item: record });
  });
  app.post('/api/v1/missions', validateRecord, validateRecord, (req, res) => {
    const input = req.validatedRecord || req.body;
    if (!input || typeof input.name !== 'string' || typeof input.category !== 'string') return res.status(400).json({ ok: false, error: 'name y category son obligatorios' });
    res.status(201).json({ ok: true, item: service.create(input) });
  });

  app.get('/api/v1/missions/:id/fleet', (req, res, next) => { const mission = service.getById(req.params.id); if (!mission) return next(Object.assign(new Error('Mision no encontrada'), { status: 404 })); res.json({ ok: true, missionId: mission.id, fleet: { name: mission.category } }); });

  app.use((req, res, next) => next(Object.assign(new Error('Ruta no encontrada'), { status: 404 })));
  app.use(errorHandler);
  return app;
}
module.exports = { createApp };
