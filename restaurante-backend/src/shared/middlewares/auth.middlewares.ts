import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt.config.js';

declare global {
    
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        id_rol: number;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try 
  {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) 
    {
      res.status(401).json({ mensaje: 'Token no proporcionado'});
      return;
    }

    const decoded = verifyToken(token);
    req.usuario = decoded;
    
    next();
  } 
  catch (error) 
  {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};
