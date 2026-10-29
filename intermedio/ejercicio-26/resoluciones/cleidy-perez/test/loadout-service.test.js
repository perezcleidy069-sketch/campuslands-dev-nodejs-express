const test = require('node:test');
const assert = require('node:assert/strict');
const { createLoadoutService } = require('../src/services/loadout-service');

function createFakeRepository() {
  const records = [{ id: 7, name: 'Mock Loadout', weapon: 'Vandal', role: 'Entry' }];
  return {
    calls: { findAll: 0, findById: [], create: [] },
    findAll() {
      this.calls.findAll += 1;
      return records.map((record) => ({ ...record }));
    },
    findById(id) {
      this.calls.findById.push(id);
      return records.find((record) => record.id === Number(id)) ?? null;
    },
    create(input) {
      this.calls.create.push(input);
      const record = { id: 8, ...input };
      records.push(record);
      return record;
    },
  };
}

test('uses the injected repository to list and retrieve loadouts', () => {
  const repository = createFakeRepository();
  const service = createLoadoutService(repository);

  assert.equal(service.list()[0].name, 'Mock Loadout');
  assert.equal(service.getById(7).id, 7);
  assert.equal(repository.calls.findAll, 1);
  assert.deepEqual(repository.calls.findById, [7]);
});

test('validates input and delegates creation to the injected repository', () => {
  const repository = createFakeRepository();
  const service = createLoadoutService(repository);
  const created = service.create({ name: ' New ', weapon: 'Phantom', role: 'Support' });

  assert.equal(created.id, 8);
  assert.deepEqual(repository.calls.create, [
    { name: 'New', weapon: 'Phantom', role: 'Support' },
  ]);
  assert.throws(() => service.create({ name: 'Missing weapon', role: 'Support' }), {
    status: 400,
  });
  assert.equal(repository.calls.create.length, 1);
});
