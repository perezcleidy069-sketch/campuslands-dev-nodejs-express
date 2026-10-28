import express from 'express';
import characterRoutes from './routes/character.routes.js';

const app = express();

// Middlewares globales
app.use(express.json());

// Rutas
app.use('/api', characterRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Recurso no encontrado' });
});

export default app;