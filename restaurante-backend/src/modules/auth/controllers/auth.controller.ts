// src/modules/auth/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { LoginDto } from '../dtos/login.dto.js';
import { RegistroClienteDto } from '../dtos/registro-cliente.dto.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🔵 Login controller ejecutado');
      console.log('📥 Body recibido:', req.body);
      console.log('📥 Keys del body:', Object.keys(req.body));
      
      const loginDto = LoginDto.fromRequest(req.body);
      console.log('✅ DTO creado:', { email: loginDto.email, clave: '***' });
      
      const validation = loginDto.validate();
      console.log('🔍 Validación:', validation);
      
      if (!validation.valid) {
        console.log('❌ Validación falló:', validation.errors);
        res.status(400).json({
          codigo: 0,
          mensaje: 'Datos inválidos',
          errores: validation.errors
        });
        return;
      }

      console.log('🔄 Llamando al servicio de login...');
      const result = await this.authService.login(loginDto);
      console.log('✅ Login exitoso');
      
      res.json(result);
    } catch (error: any) {
      console.error('❌ Error en login:', error.message);
      const statusCode = error.message.includes('Credenciales') ? 401 : 500;
      res.status(statusCode).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  registroCliente = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('🔵 Registro controller ejecutado');
      console.log('📥 Body recibido:', req.body);
      
      const registroDto = RegistroClienteDto.fromRequest(req.body);
      console.log('✅ DTO creado');
      
      const validation = registroDto.validate();
      console.log('🔍 Validación:', validation);
      
      if (!validation.valid) {
        console.log('❌ Validación falló:', validation.errors);
        res.status(400).json({
          codigo: 0,
          mensaje: 'Datos inválidos',
          errores: validation.errors
        });
        return;
      }

      console.log('🔄 Llamando al servicio de registro...');
      const result = await this.authService.registroCliente(registroDto);
      console.log('✅ Registro exitoso');
      
      res.status(201).json(result);
    } catch (error: any) {
      console.error('❌ Error en registro:', error.message);
      const statusCode = error.message.includes('ya existe') ? 409 : 500;
      res.status(statusCode).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  verificarToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'Token no proporcionado'
        });
        return;
      }

      const decoded = this.authService.verifyToken(token);
      res.json({
        codigo: 1,
        mensaje: 'Token válido',
        data: decoded
      });
    } catch (error: any) {
      res.status(401).json({
        codigo: 0,
        mensaje: 'Token inválido o expirado'
      });
    }
  };
}
