import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middlewares.js';

export const rolesMiddleware = (rolesPermitidos: number[]) => {
  
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    
    try 
    {
      if (!req.user) 
      {
        res.status(401).json({ codigo: 0, mensaje: 'No autorizado'});
        return;
      }

      if (!rolesPermitidos.includes(req.user.id_rol)) 
      {
        res.status(403).json({ codigo: 0, mensaje: 'No tienes permisos para esta acción' });
        return;
      }

      next();
    } 
    catch (error: any) 
    {
      res.status(500).json({ codigo: 0, mensaje: 'Error en verificación de permisos' });
    }
  };
};
