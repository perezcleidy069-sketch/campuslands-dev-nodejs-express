const test = require('node:test');
const assert = require('node:assert/strict');
const { createClubRepository } = require('../src/repositories/club-repository');
const { createClubService } = require('../src/services/club-service');

test('search filters club records and returns page metadata', () => {
  const service = createClubService(createClubRepository());
  const result = service.list({ q: 'united', page: '1', limit: '1' });

  assert.equal(result.pagination.total, 2);
  assert.equal(result.pagination.pages, 2);
  assert.equal(result.data.length, 1);
  assert.equal(result.data[0].name, 'Harbor United');
});

test('normalizes and stores new club data', () => {
  const service = createClubService(createClubRepository());
  const club = service.create({
    name: '  Harbor Futsal ',
    league: ' City League ',
    city: ' Medellin ',
  });

  assert.equal(club.name, 'Harbor Futsal');
  assert.equal(service.getById(club.id).city, 'Medellin');
});

test('rejects a club without the required fields', () => {
  const service = createClubService(createClubRepository());
  assert.throws(() => service.create({ name: 'Incomplete' }), { status: 400 });
});
