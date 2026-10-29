import express from 'express';
import teamRoutes from './routes/team-routes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'API activa',
    topic: 'controladores limpios',
  });
});

app.use('/api/teams', teamRoutes);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `No existe la ruta ${req.method} ${req.originalUrl}`,
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (Number.isInteger(error.status) && error.status >= 400 && error.status < 500) {
    res.status(error.status).json({
      ok: false,
      message: error.status === 400 ? 'El cuerpo de la solicitud no es valido' : 'Solicitud no valida',
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    ok: false,
    message: 'Ocurrio un error interno en el servidor',
  });
});

export default app;
