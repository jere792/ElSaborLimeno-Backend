// src/modules/usuarios/services/usuarios.service.ts

import { UsuariosDao, FiltrosListado } from '../dao/usuarios.dao.js';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from '../dtos/actualizar-usuario.dto.js';

export class UsuariosService {
  private usuariosDao: UsuariosDao;

  constructor() {
    this.usuariosDao = new UsuariosDao();
  }

  // ✅ ==================== OBTENER MI PERFIL ====================
  async obtenerMiPerfil(id_usuario: number) {
    const result = await this.usuariosDao.obtenerUsuarioPorId(id_usuario);
    
    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 200,
      mensaje: 'Perfil obtenido correctamente',
      usuario: result
    };
  }

  // ✅ ==================== ACTUALIZAR MI PERFIL ====================
  async actualizarMiPerfil(
    id_usuario: number,
    datos: {
      nombres: string;
      apellidos: string;
      email: string;
      telefono?: string;
      fecha_nacimiento?: Date;
      genero?: string;
      direccion?: string;
    }
  ) {
    const result = await this.usuariosDao.actualizarMiPerfil({
      id_usuario,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      email: datos.email,
      telefono: datos.telefono,
      fecha_nacimiento: datos.fecha_nacimiento,
      genero: datos.genero,
      direccion: datos.direccion
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 200,
      mensaje: result.Mensaje
    };
  }

  // ✅ ==================== CAMBIAR MI CONTRASEÑA ====================
  async cambiarMiPassword(
    id_usuario: number,
    datos: {
      password_actual: string;
      password_nueva: string;
    }
  ) {
    const result = await this.usuariosDao.cambiarMiPassword({
      id_usuario,
      password_actual: datos.password_actual,
      password_nueva: datos.password_nueva
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 200,
      mensaje: result.Mensaje
    };
  }

  // ==================== LISTAR USUARIOS ACTIVOS ====================
  async listarUsuariosActivos(filtros: FiltrosListado) {
    const resultados = await this.usuariosDao.listarUsuariosActivos(filtros);
    
    if (resultados.length === 0) {
      return {
        codigo: 1,
        mensaje: 'No se encontraron usuarios activos',
        usuarios: [],
        paginacion: {
          total_registros: 0,
          total_paginas: 0,
          pagina_actual: filtros.pagina || 1,
          registros_por_pagina: filtros.registrosPorPagina || 10
        }
      };
    }

    const primerRegistro = resultados[0];

    return {
      codigo: 1,
      mensaje: 'Usuarios activos obtenidos exitosamente',
      usuarios: resultados,
      paginacion: {
        total_registros: primerRegistro.Total_Registros || 0,
        total_paginas: primerRegistro.Total_Paginas || 0,
        pagina_actual: primerRegistro.Pagina_Actual || 1,
        registros_por_pagina: filtros.registrosPorPagina || 10
      }
    };
  }

  // ==================== LISTAR USUARIOS INACTIVOS ====================
  async listarUsuariosInactivos(filtros: FiltrosListado) {
    const resultados = await this.usuariosDao.listarUsuariosInactivos(filtros);
    
    if (resultados.length === 0) {
      return {
        codigo: 1,
        mensaje: 'No se encontraron usuarios inactivos',
        usuarios: [],
        paginacion: {
          total_registros: 0,
          total_paginas: 0,
          pagina_actual: filtros.pagina || 1,
          registros_por_pagina: filtros.registrosPorPagina || 10
        }
      };
    }

    const primerRegistro = resultados[0];

    return {
      codigo: 1,
      mensaje: 'Usuarios inactivos obtenidos exitosamente',
      usuarios: resultados,
      paginacion: {
        total_registros: primerRegistro.Total_Registros || 0,
        total_paginas: primerRegistro.Total_Paginas || 0,
        pagina_actual: primerRegistro.Pagina_Actual || 1,
        registros_por_pagina: filtros.registrosPorPagina || 10
      }
    };
  }

  // ==================== REGISTRAR USUARIO ====================
  async registrarUsuario(id_admin: number, dto: CrearUsuarioDto) {
    const result = await this.usuariosDao.registrarUsuario({
      id_admin,
      id_documento: dto.id_documento,
      id_roles: dto.id_roles,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      email: dto.email,
      clave: dto.password,
      telefono: dto.telefono,
      fecha_nacimiento: dto.fecha_nacimiento,
      genero: dto.genero,
      direccion: dto.direccion
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje,
      usuario: {
        id: result.Id_Usuario
      }
    };
  }

  // ==================== OBTENER USUARIO ====================
  async obtenerUsuario(id: number) {
    const result = await this.usuariosDao.obtenerUsuarioPorId(id);
    
    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje,
      usuario: result
    };
  }

  // ==================== ACTUALIZAR USUARIO ====================
  async actualizarUsuario(id_admin: number, id_usuario: number, dto: ActualizarUsuarioDto) {
    const result = await this.usuariosDao.actualizarUsuario({
      id_admin,
      id_usuario,
      id_documento: dto.id_documento,
      id_roles: dto.id_roles,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      email: dto.email,
      telefono: dto.telefono,
      fecha_nacimiento: dto.fecha_nacimiento,
      genero: dto.genero,
      direccion: dto.direccion
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje
    };
  }

  // ==================== CAMBIAR ESTADO ====================
  async cambiarEstado(id_admin: number, id_usuario: number, nuevo_estado: string) {
    const result = await this.usuariosDao.cambiarEstadoUsuario(id_admin, id_usuario, nuevo_estado);
    
    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje
    };
  }

  // ==================== RESTABLECER PASSWORD ====================
  async restablecerPassword(id_admin: number, id_usuario: number, nueva_password: string) {
    const result = await this.usuariosDao.restablecerPassword(id_admin, id_usuario, nueva_password);
    
    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje
    };
  }

  // ==================== ESTADÍSTICAS ====================
  async obtenerEstadisticas() {
    const stats = await this.usuariosDao.obtenerEstadisticas();
    
    return {
      codigo: 1,
      mensaje: 'Estadísticas obtenidas',
      estadisticas: stats
    };
  }

  // ==================== LISTAR ROLES ====================
  async listarRoles() {
    const roles = await this.usuariosDao.listarRoles();
    
    return {
      codigo: 1,
      mensaje: 'Roles obtenidos',
      roles
    };
  }
}
