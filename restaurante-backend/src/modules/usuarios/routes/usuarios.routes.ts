// src/modules/usuarios/routes/usuarios.routes.ts

import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller.js';
import { authMiddleware } from '../../../shared/middlewares/auth.middlewares.js';
import { rolesMiddleware } from '../../../shared/middlewares/roles.middlewares.js';
import { uploadSingle } from '../../../shared/middlewares/upload.middleware.js';

const router = Router();
const usuariosController = new UsuariosController();

// ==================== RUTAS DE PERFIL (USUARIO AUTENTICADO) ====================
router.get('/perfil', authMiddleware, usuariosController.obtenerMiPerfil);

// ✅ NUEVO: Subir/actualizar foto de perfil
router.post(
  '/perfil/foto',
  authMiddleware,
  uploadSingle, // Multer middleware
  usuariosController.actualizarFotoPerfil
);

// ✅ MODIFICADO: Actualizar perfil con opción de foto
router.put(
  '/perfil',
  authMiddleware,
  uploadSingle, // Multer middleware (opcional)
  usuariosController.actualizarMiPerfil
);

router.post('/perfil/cambiar-password', authMiddleware, usuariosController.cambiarMiPassword);

// ==================== MIDDLEWARES SOLO PARA RUTAS DE ADMIN ====================
router.use(authMiddleware);
router.use(rolesMiddleware([1])); // Solo admin

// ==================== RUTAS DE LISTADO ====================
router.get('/activos', usuariosController.listarActivos);
router.get('/inactivos', usuariosController.listarInactivos);

// ==================== RUTAS DE CONSULTA ====================
router.get('/roles', usuariosController.listarRoles);
router.get('/estadisticas', usuariosController.estadisticas);

// ==================== RUTAS CON ID ====================
router.get('/:id', usuariosController.obtener);

// ==================== RUTAS DE MODIFICACIÓN ====================
router.post('/', usuariosController.registrar);
router.put('/:id', usuariosController.actualizar);
router.patch('/:id/estado', usuariosController.cambiarEstado);
router.post('/:id/restablecer-password', usuariosController.restablecerPassword);

export default router;
