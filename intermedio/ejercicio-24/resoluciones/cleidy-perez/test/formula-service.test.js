const test = require('node:test');
const assert = require('node:assert/strict');
const { createFormulaRepository } = require('../src/repositories/formula-repository');
const { createFormulaService } = require('../src/services/formula-service');

test('lists the seeded formulas', () => {
  const service = createFormulaService(createFormulaRepository());
  assert.equal(service.list().length, 3);
  assert.equal(service.getById(1).formula, 'H2O');
});

test('creates a normalized formula', () => {
  const service = createFormulaService(createFormulaRepository());
  const created = service.create({
    name: '  Sal  ',
    formula: 'NaCl',
    use: 'Conservacion de alimentos',
  });

  assert.equal(created.name, 'Sal');
  assert.equal(created.id, 4);
  assert.equal(service.getById(created.id).formula, 'NaCl');
});

test('rejects invalid formula data in the service', () => {
  const service = createFormulaService(createFormulaRepository());
  assert.throws(() => service.create({ name: 'Sal', formula: 'nacl', use: 'Alimentos' }), {
    status: 400,
  });
});
