const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

async function withServer(t, run) {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  return run(`http://127.0.0.1:${server.address().port}`);
}

test('GET games returns an HTTP JSON collection', async (t) => {
  await withServer(t, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/games`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.data.length, 3);
  });
});

test('POST games returns 201 and the created RPG', async (t) => {
  await withServer(t, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Rune Harbor', genre: 'Adventure RPG' }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.data.name, 'Rune Harbor');
  });
});

test('invalid input and missing resources return client errors', async (t) => {
  await withServer(t, async (baseUrl) => {
    const invalid = await fetch(`${baseUrl}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    });
    const missing = await fetch(`${baseUrl}/api/games/999`);

    assert.equal(invalid.status, 400);
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).ok, false);
  });
});
