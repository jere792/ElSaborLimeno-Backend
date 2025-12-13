// src/modules/usuarios/routes/usuarios.routes.ts

import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller.js';
import { authMiddleware } from '../../../shared/middlewares/auth.middlewares.js';
import { rolesMiddleware } from '../../../shared/middlewares/roles.middlewares.js';

const router = Router();
const usuariosController = new UsuariosController();

// Todas las rutas requieren autenticación y rol admin
router.use(authMiddleware);
router.use(rolesMiddleware([1])); // Solo admin

// CRUD básico
router.get('/', usuariosController.listar);
router.post('/', usuariosController.registrar);
router.get('/roles', usuariosController.listarRoles);
router.get('/estadisticas', usuariosController.estadisticas);
router.get('/:id', usuariosController.obtener);
router.put('/:id', usuariosController.actualizar);
router.delete('/:id', usuariosController.eliminar);

// Acciones especiales
router.patch('/:id/estado', usuariosController.cambiarEstado);
router.post('/:id/restablecer-password', usuariosController.restablecerPassword);

export default router;
