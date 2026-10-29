import express from 'express';
import matchRoutes from './routes/match-routes.js';
import playerRoutes from './routes/player-routes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'API activa',
    topic: 'routers modulares',
  });
});

app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);

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
      message:
        error.status === 400
          ? 'El cuerpo de la solicitud no es valido'
          : 'La solicitud no pudo ser procesada',
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
