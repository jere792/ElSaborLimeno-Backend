// src/shared/middlewares/roles.middlewares.ts

import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middlewares.js';

export const rolesMiddleware = (rolesPermitidos: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      console.log('🔐 Roles Middleware: Verificando permisos');
      console.log('👤 Usuario:', req.user);
      console.log('🎭 Roles permitidos:', rolesPermitidos);
      
      if (!req.user) {
        console.log('❌ Roles: No hay usuario en request');
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      if (!rolesPermitidos.includes(req.user.id_rol)) {
        console.log(`❌ Roles: Usuario con rol ${req.user.id_rol} no tiene permiso`);
        res.status(403).json({
          codigo: 0,
          mensaje: 'No tienes permisos para realizar esta acción'
        });
        return;
      }

      console.log('✅ Roles: Usuario autorizado');
      next();
    } catch (error: any) {
      console.error('❌ Roles middleware error:', error.message);
      res.status(500).json({
        codigo: 0,
        mensaje: 'Error en verificación de permisos'
      });
    }
  };
};
