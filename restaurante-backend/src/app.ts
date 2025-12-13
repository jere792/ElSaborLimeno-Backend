// src/app.ts

import express from 'express';
import { checkConnection } from './shared/config/db.config.js';
import authRoutes from './modules/auth/routes/auth.routes.js';

const app = express();

// ✅ CORS manual (más permisivo)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// ✅ Parser de JSON (CRÍTICO)
app.use(express.json());

// ✅ Log de todas las peticiones
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  console.log('📦 Body:', req.body);
  next();
});

// Health check
app.get('/health', async (req, res) => {
  const dbConnected = await checkConnection();
  res.json({
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', async (req, res) => {
  const dbConnected = await checkConnection();
  res.json({
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ✅ Rutas de autenticación
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    codigo: 0,
    mensaje: 'Ruta no encontrada'
  });
});

export default app;
