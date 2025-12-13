// src/shared/middlewares/auth.middlewares.ts

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt.config.js';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    id_rol: number;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log('🔐 Middleware: Verificando autenticación');
    console.log('📋 Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ Middleware: No hay header Authorization');
      res.status(401).json({
        codigo: 0,
        mensaje: 'No autorizado - Token no proporcionado'
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('❌ Middleware: Formato de token inválido');
      res.status(401).json({
        codigo: 0,
        mensaje: 'No autorizado - Formato de token inválido'
      });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    console.log('🔑 Middleware: Token recibido:', token.substring(0, 20) + '...');

    const decoded = verifyToken(token);
    console.log('✅ Middleware: Token válido. Usuario:', decoded);
    
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('❌ Middleware error:', error.message);
    res.status(401).json({
      codigo: 0,
      mensaje: 'No autorizado - Token inválido o expirado'
    });
  }
};
