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

  app.get('/health', (_req, res) => res.json({ ok: true, topic: 'roles y permisos', resource: 'trips' }));

  app.post('/api/v1/auth/login', async (req, res) => {
    const result = await auth.login(req.body?.email, req.body?.password);
    if (!result) return res.status(401).json({ ok: false, error: 'Credenciales invalidas' });
    res.json({ ok: true, ...result });
  });

  function authenticate(req, res, next) {
    const token = req.get('Authorization')?.replace(/^Bearer\s+/i, '');
    const user = auth.authenticate(token);
    if (!user) return res.status(401).json({ ok: false, error: 'Autenticacion requerida' });
    req.user = user;
    next();
  }
  function authorizeWrite(req, res, next) {
    if (!req.user) return authenticate(req, res, () => authorizeWrite(req, res, next));
    if (!req.user.permissions?.includes('catalog:write')) return res.status(403).json({ ok: false, error: 'Permiso insuficiente' });
    next();
  }

  app.get('/api/v1/trips', (req, res) => { res.json({ ok: true, ...service.list(req.query) }); });
  app.get('/api/v1/trips/:id', (req, res, next) => {
    const record = service.getById(req.params.id);
    if (!record) return next(Object.assign(new Error('Registro no encontrado'), { status: 404 }));
    res.json({ ok: true, item: record });
  });
  app.post('/api/v1/trips', authorizeWrite, validateRecord, (req, res) => {
    const input = req.validatedRecord || req.body;
    if (!input || typeof input.name !== 'string' || typeof input.category !== 'string') return res.status(400).json({ ok: false, error: 'name y category son obligatorios' });
    res.status(201).json({ ok: true, item: service.create(input) });
  });


  app.use((req, res, next) => next(Object.assign(new Error('Ruta no encontrada'), { status: 404 })));
  app.use(errorHandler);
  return app;
}
module.exports = { createApp };
