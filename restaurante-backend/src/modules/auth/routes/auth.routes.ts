// src/modules/auth/routes/auth.routes.ts

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

console.log('📋 Rutas de autenticación cargadas');

router.post('/login', (req, res, next) => {
  console.log('🔵 Ruta POST /api/auth/login interceptada');
  console.log('📦 Body:', req.body);
  authController.login(req, res).catch(next);
});

// ✅ Ambas rutas apuntan al mismo método
router.post('/registro', (req, res, next) => {
  console.log('🔵 Ruta POST /api/auth/registro interceptada');
  console.log('📦 Body:', req.body);
  authController.registroCliente(req, res).catch(next);
});

router.post('/registro-cliente', (req, res, next) => {
  console.log('🔵 Ruta POST /api/auth/registro-cliente interceptada');
  console.log('📦 Body:', req.body);
  authController.registroCliente(req, res).catch(next);
});

router.get('/verificar', (req, res, next) => {
  console.log('🔵 Ruta GET /api/auth/verificar interceptada');
  authController.verificarToken(req, res).catch(next);
});

export default router;
