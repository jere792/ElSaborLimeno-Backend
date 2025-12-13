import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/registro', authController.registroCliente);
router.get('/verificar', authController.verificarToken);

export default router;
