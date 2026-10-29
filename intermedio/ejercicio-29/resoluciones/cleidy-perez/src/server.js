const { createApp } = require('./app');

const port = Number(process.env.PORT) || 3000;
createApp().listen(port, () => {
  console.log(`API de clubes disponible en http://localhost:${port}`);
});
