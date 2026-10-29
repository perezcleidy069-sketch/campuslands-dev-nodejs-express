const { createApp } = require('./app');
const { port } = require('./config');

createApp().listen(port, () => {
  console.log(`Inventario de motocicletas disponible en http://localhost:${port}`);
});
