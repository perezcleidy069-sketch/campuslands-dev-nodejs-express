const { randomUUID } = require('node:crypto');

const demoAccount = {
  id: 1,
  email: 'mechanic@example.test',
  password: 'demo-pass',
  role: 'mechanic',
};

function createAuthService() {
  const sessions = new Map();

  return {
    login(email, password) {
      if (email !== demoAccount.email || password !== demoAccount.password) {
        return null;
      }
      const token = randomUUID();
      const user = { id: demoAccount.id, email: demoAccount.email, role: demoAccount.role };
      sessions.set(token, user);
      return { token, user };
    },
    authenticate(token) {
      return sessions.get(token) ?? null;
    },
  };
}

module.exports = { createAuthService };
