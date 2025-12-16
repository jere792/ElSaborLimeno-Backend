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

  // ✅ ==================== OBTENER MI PERFIL ====================
  obtenerMiPerfil = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_usuario = (req as any).user?.id;
      
      if (!id_usuario) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autenticado'
        });
        return;
      }

      const result = await this.usuariosService.obtenerMiPerfil(id_usuario);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  // ✅ ==================== ACTUALIZAR MI PERFIL ====================
  actualizarMiPerfil = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_usuario = (req as any).user?.id;
      
      if (!id_usuario) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autenticado'
        });
        return;
      }

      const { nombres, apellidos, email, telefono, fecha_nacimiento, genero, direccion } = req.body;

      // Validaciones básicas
      if (!nombres || !apellidos || !email) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'Los campos Nombres, Apellidos y Email son obligatorios'
        });
        return;
      }

      const result = await this.usuariosService.actualizarMiPerfil(id_usuario, {
        nombres,
        apellidos,
        email,
        telefono,
        fecha_nacimiento,
        genero,
        direccion
      });

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  // ✅ ==================== CAMBIAR MI CONTRASEÑA ====================
  cambiarMiPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_usuario = (req as any).user?.id;
      
      if (!id_usuario) {
        res.status(401).json({
          codigo: 0,
          mensaje: 'No autenticado'
        });
        return;
      }

      const { password_actual, password_nueva } = req.body;

      // Validaciones
      if (!password_actual || !password_nueva) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'Debe proporcionar la contraseña actual y la nueva'
        });
        return;
      }

      if (password_nueva.length < 6) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'La contraseña debe tener al menos 6 caracteres'
        });
        return;
      }

      const result = await this.usuariosService.cambiarMiPassword(id_usuario, {
        password_actual,
        password_nueva
      });

      res.json(result);
    } catch (error: any) {
      const statusCode = error.message.includes('incorrecta') ? 401 : 500;
      res.status(statusCode).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  // ==================== LISTAR USUARIOS ACTIVOS ====================
  listarActivos = async (req: Request, res: Response): Promise<void> => {
    try {
      const filtros = {
        pagina: parseInt(req.query.pagina as string) || 1,
        registrosPorPagina: parseInt(req.query.registrosPorPagina as string) || 10,
        busqueda: req.query.busqueda as string,
        id_rol: req.query.id_rol ? parseInt(req.query.id_rol as string) : undefined,
        ordenarPor: req.query.ordenarPor as string || 'Fecha_Registro',
        orden: (req.query.orden as 'ASC' | 'DESC') || 'DESC'
      };

      const result = await this.usuariosService.listarUsuariosActivos(filtros);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  // ==================== LISTAR USUARIOS INACTIVOS ====================
  listarInactivos = async (req: Request, res: Response): Promise<void> => {
    try {
      const filtros = {
        pagina: parseInt(req.query.pagina as string) || 1,
        registrosPorPagina: parseInt(req.query.registrosPorPagina as string) || 10,
        busqueda: req.query.busqueda as string,
        id_rol: req.query.id_rol ? parseInt(req.query.id_rol as string) : undefined,
        ordenarPor: req.query.ordenarPor as string || 'Fecha_Registro',
        orden: (req.query.orden as 'ASC' | 'DESC') || 'DESC'
      };

      const result = await this.usuariosService.listarUsuariosInactivos(filtros);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        codigo: 0,
        mensaje: error.message
      });
    }
  };

  // ==================== REGISTRAR USUARIO ====================
  registrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id || 1;
      
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

  // ==================== OBTENER USUARIO ====================
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

  // ==================== ACTUALIZAR USUARIO ====================
  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id || 1;
      const id_usuario = parseInt(req.params.id);
      
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

  // ==================== CAMBIAR ESTADO ====================
  cambiarEstado = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id || 1;
      const id_usuario = parseInt(req.params.id);
      const { estado } = req.body;
      
      if (!estado) {
        res.status(400).json({
          codigo: 0,
          mensaje: 'El estado es requerido'
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

  // ==================== RESTABLECER PASSWORD ====================
  restablecerPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const id_admin = (req as any).user?.id || 1;
      const id_usuario = parseInt(req.params.id);
      const { password } = req.body;
      
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

  // ==================== ESTADÍSTICAS ====================
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

  // ==================== LISTAR ROLES ====================
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
