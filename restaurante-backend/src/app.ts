// src/app.ts

import express from 'express';
import { checkConnection } from './shared/config/db.config.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import usuariosRoutes from './modules/usuarios/routes/usuarios.routes.js';

const app = express();

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middlewares
app.use(express.json());

// Health check
app.get('/health', async (req, res) => {
  const dbConnected = await checkConnection();
  res.json({
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    codigo: 0,
    mensaje: `Ruta no encontrada: ${req.method} ${req.path}`
  });
});

export default app;
