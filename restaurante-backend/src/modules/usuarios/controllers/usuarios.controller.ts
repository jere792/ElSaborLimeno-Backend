// src/modules/usuarios/controllers/usuarios.controller.ts

import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service.js';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from '../dtos/actualizar-usuario.dto.js';

export class UsuariosController {
  private usuariosService: UsuariosService;

  constructor() {
    this.usuariosService = new UsuariosService();
  }

  listar = async (req: Request, res: Response): Promise<void> => {
    try {
      const filtros = {
        pagina: parseInt(req.query.pagina as string) || 1,
        registrosPorPagina: parseInt(req.query.registrosPorPagina as string) || 10,
        busqueda: req.query.busqueda as string,
        id_rol: req.query.id_rol ? parseInt(req.query.id_rol as string) : undefined,
        estado: req.query.estado as string,
        ordenarPor: req.query.ordenarPor as string || 'Fecha_Registro',
        orden: (req.query.orden as 'ASC' | 'DESC') || 'DESC'
      };

      const result = await this.usuariosService.listarUsuarios(filtros);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  registrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id;
      
      if (!id_admin) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      const dto = CrearUsuarioDto.fromRequest(req.body);
      
      const validation = dto.validate();
      if (!validation.valid) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'Datos inválidos',
          errores: validation.errors
        });
        return;
      }

      const result = await this.usuariosService.registrarUsuario(id_admin, dto);
      res.status(201).json(result);
    } catch (error: any) {
      const statusCode = error.message.includes('administradores') ? 403 : 500;
      res.status(statusCode).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  obtener = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await this.usuariosService.obtenerUsuario(id);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id;
      const id_usuario = parseInt(req.params.id);
      
      if (!id_admin) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      const dto = ActualizarUsuarioDto.fromRequest(req.body);
      
      const validation = dto.validate();
      if (!validation.valid) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'Datos inválidos',
          errores: validation.errors
        });
        return;
      }

      const result = await this.usuariosService.actualizarUsuario(id_admin, id_usuario, dto);
      res.json(result);
    } catch (error: any) {
      const statusCode = error.message.includes('administradores') ? 403 : 500;
      res.status(statusCode).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  cambiarEstado = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id;
      const id_usuario = parseInt(req.params.id);
      const { estado } = req.body;
      
      if (!id_admin) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      const result = await this.usuariosService.cambiarEstado(id_admin, id_usuario, estado);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id;
      const id_usuario = parseInt(req.params.id);
      
      if (!id_admin) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      const result = await this.usuariosService.eliminarUsuario(id_admin, id_usuario);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  restablecerPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id;
      const id_usuario = parseInt(req.params.id);
      const { password } = req.body;
      
      if (!id_admin) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autorizado'
        });
        return;
      }

      if (!password || password.length < 6) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'La contraseña debe tener al menos 6 caracteres'
        });
        return;
      }

      const result = await this.usuariosService.restablecerPassword(id_admin, id_usuario, password);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  estadisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.usuariosService.obtenerEstadisticas();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  listarRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.usuariosService.listarRoles();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };
}
