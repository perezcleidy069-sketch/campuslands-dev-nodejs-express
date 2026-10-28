const express = require('express');
const indexRoutes = require('./routes/index.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para leer JSON en las peticiones HTTP
app.use(express.json());

// Rutas principales de la API
app.use('/', indexRoutes);

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Videojuegos RPG - Backend Profesional',
    endpoints: {
      v1_characters: '/api/v1/characters'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose correctamente en el puerto ${PORT}`);
});