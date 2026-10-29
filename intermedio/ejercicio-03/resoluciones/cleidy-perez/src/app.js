import express from 'express';
import teamRoutes from './routes/team-routes.js';

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ ok: true, topic: 'controladores limpios' }));
app.use('/api/teams', teamRoutes);
app.use((req, res) => res.status(404).json({ ok: false, message: 'Ruta no encontrada' }));

export default app;
