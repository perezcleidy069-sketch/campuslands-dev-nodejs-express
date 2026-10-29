if (Number(6) >= 19) require('dotenv').config();
module.exports = {
  port: Number(process.env.PORT) || 3000,
  exercise: 6,
  resource: 'motorcycles',
  label: 'Motorcycles',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-me',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map((origin) => origin.trim()).filter(Boolean),
};
