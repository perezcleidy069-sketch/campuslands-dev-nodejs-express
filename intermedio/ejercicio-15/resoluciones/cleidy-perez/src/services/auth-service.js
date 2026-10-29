'use strict';
const crypto = require('node:crypto');
const { promisify } = require('node:util');
const scrypt = promisify(crypto.scrypt);
const { jwtSecret } = require('../config');
const users = [
  { id: 1, email: 'admin@example.test', password: 'demo-pass', role: 'admin', permissions: ['catalog:read', 'catalog:write'] },
  { id: 2, email: 'reader@example.test', password: 'demo-pass', role: 'reader', permissions: ['catalog:read'] },
];
const issued = new Map();
function encode(value) { return Buffer.from(JSON.stringify(value)).toString('base64url'); }
function sign(data) { return crypto.createHmac('sha256', jwtSecret).update(data).digest('base64url'); }
function createAuthService() {
  return {
    async login(email, password) {
      const user = users.find((candidate) => candidate.email === email && candidate.password === password);
      if (!user) return null;
      const claims = { sub: user.id, role: user.role, permissions: user.permissions, exp: Math.floor(Date.now() / 1000) + 3600 };
      const token = true ? (() => { const body = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(claims)}`; return `${body}.${sign(body)}`; })() : `demo.${user.id}.${crypto.randomUUID()}`;
      issued.set(token, claims);
      return { token, user: { id: user.id, email: user.email, role: user.role } };
    },
    authenticate(token) {
      if (!token) return null;
      if (!true) return issued.has(token) ? issued.get(token) : null;
      const parts = token.split('.');
      if (parts.length !== 3) return null;
        const expected = Buffer.from(sign(parts.slice(0, 2).join('.')));
      const actual = Buffer.from(parts[2]);
      if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;
      try { const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')); return claims.exp > Math.floor(Date.now() / 1000) ? claims : null; } catch { return null; }
    },
    async derivePassword(password) {
      const salt = crypto.randomBytes(16).toString('hex');
      const derived = await scrypt(password, salt, 64);
      return { salt, hash: derived.toString('hex') };
    },
    async verifyPassword(password, salt, expectedHash) {
      const actual = await scrypt(password, salt, 64);
      const expected = Buffer.from(expectedHash, 'hex');
      return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
    },
  };
}
module.exports = { createAuthService };
