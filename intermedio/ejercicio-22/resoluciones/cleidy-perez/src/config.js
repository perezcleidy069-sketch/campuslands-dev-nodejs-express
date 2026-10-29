if (Number(22) >= 19) require('dotenv').config();
module.exports = {
  port: Number(process.env.PORT) || 3000,
  exercise: 22,
  resource: 'models',
  label: '3D architecture',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-me',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map((origin) => origin.trim()).filter(Boolean),
};
