const test = require('node:test');
const assert = require('node:assert/strict');
const specification = require('../src/openapi.json');

test('documents the team endpoints and their request schema', () => {
  assert.equal(specification.openapi, '3.0.3');
  assert.ok(specification.paths['/api/teams'].get);
  assert.ok(specification.paths['/api/teams'].post);
  assert.deepEqual(
    specification.components.schemas.TeamInput.required,
    ['name', 'region'],
  );
});
