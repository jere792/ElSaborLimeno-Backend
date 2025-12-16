import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt.config.js';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    id_rol: number;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  
  try 
  {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
      {
      res.status(401).json({ codigo: 0, mensaje: 'No autorizado' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } 
  catch (error: any) 
  {
    res.status(401).json({ codigo: 0, mensaje: 'Token inválido o expirado' });

  }
};
