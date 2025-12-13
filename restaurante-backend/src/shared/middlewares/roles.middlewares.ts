import { Request, Response, NextFunction } from 'express';
import { ROLES } from '../constants/roles.constants.js';

export const rolesMiddleware = (rolesPermitidos: number[]) => {
  
    return (req: Request, res: Response, next: NextFunction) => {

    if (!req.usuario) 
    {
        res.status(401).json({ mensaje: 'No autenticado' });
        return;
    }

    if (!rolesPermitidos.includes(req.usuario.id_rol)) 
    {
        res.status(403).json({
        mensaje: 'No tienes permisos para acceder a este recurso',
        rol_requerido: rolesPermitidos,
        tu_rol: req.usuario.id_rol});
        
        return;
    }

    next();
  };
};

export const soloAdmin = rolesMiddleware([ROLES.ADMIN]);
export const soloCajero = rolesMiddleware([ROLES.CAJERO]);
export const soloCliente = rolesMiddleware([ROLES.CLIENTE]);
export const adminYCajero = rolesMiddleware([ROLES.ADMIN, ROLES.CAJERO]);
export const todosAutenticados = rolesMiddleware([ROLES.ADMIN, ROLES.CAJERO, ROLES.CLIENTE]);
