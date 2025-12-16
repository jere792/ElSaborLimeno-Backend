import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/routes/auth.routes.js';
import usuariosRoutes from './modules/usuarios/routes/usuarios.routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use((req, res) => {
  res.status(404).json({
    codigo: 0,
    mensaje: 'Ruta no encontrada'
  });
});

export default app;
