const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

async function startTestServer(t) {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test('public inventory is searchable, paginated, and carries a request ID', async (t) => {
  const baseUrl = await startTestServer(t);
  const response = await fetch(`${baseUrl}/api/motorcycles?q=trail&page=1&limit=1`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data[0].name, 'Trail 450');
  assert.equal(body.pagination.total, 1);
  assert.ok(response.headers.get('x-request-id'));
  assert.equal(body.requestId, response.headers.get('x-request-id'));
});

test('write route requires a simulated mechanic session', async (t) => {
  const baseUrl = await startTestServer(t);
  const response = await fetch(`${baseUrl}/api/motorcycles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 401);
  assert.equal((await response.json()).ok, false);
});

test('authenticated write validates data and stores a motorcycle', async (t) => {
  const baseUrl = await startTestServer(t);
  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'mechanic@example.test',
      password: 'demo-pass',
    }),
  });
  const { token } = await loginResponse.json();
  const response = await fetch(`${baseUrl}/api/motorcycles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: 'Desert 500',
      maker: 'Northstar',
      category: 'Adventure',
      year: 2025,
      displacement: 500,
      price: 9900,
    }),
  });
  const body = await response.json();

  assert.equal(loginResponse.status, 200);
  assert.equal(response.status, 201);
  assert.equal(body.data.name, 'Desert 500');
});

test('invalid input and missing motorcycles return 400 and 404', async (t) => {
  const baseUrl = await startTestServer(t);
  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'mechanic@example.test',
      password: 'demo-pass',
    }),
  });
  const { token } = await loginResponse.json();
  const invalid = await fetch(`${baseUrl}/api/motorcycles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: '', maker: '', category: '', year: 0 }),
  });
  const missing = await fetch(`${baseUrl}/api/motorcycles/999`);

  assert.equal(invalid.status, 400);
  assert.equal(missing.status, 404);
  assert.ok((await missing.json()).requestId);
});
