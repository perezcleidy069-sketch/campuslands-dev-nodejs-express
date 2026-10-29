'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { CatalogRepository } = require('../src/repositories/catalog-repository');
const { createCatalogService } = require('../src/services/catalog-service');

test('lists seeded welding inspections', () => {
  const service = createCatalogService(new CatalogRepository());
  const result = service.list();

  assert.equal(result.total, 3);
  assert.ok(result.items.some((item) => item.category === 'TIG'));
});

test('filters inspections by welding process without case sensitivity', () => {
  const service = createCatalogService(new CatalogRepository());
  const result = service.list({ category: 'mig' });

  assert.equal(result.total, 1);
  assert.equal(result.items[0].name, 'Frame Joint A');
});

test('creates an inspection and retrieves it by its generated ID', () => {
  const service = createCatalogService(new CatalogRepository());
  const created = service.create({
    name: 'Frame Joint D',
    category: 'TIG',
    rating: 96,
    year: 2025,
  });

  assert.equal(service.getById(created.id).name, 'Frame Joint D');
});
