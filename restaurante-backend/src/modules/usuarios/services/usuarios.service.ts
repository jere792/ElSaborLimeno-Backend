// src/modules/usuarios/services/usuarios.service.ts

import { UsuariosDao, FiltrosListado } from '../dao/usuarios.dao.js';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from '../dtos/actualizar-usuario.dto.js';

export class UsuariosService {
  private usuariosDao: UsuariosDao;

  constructor() {
    this.usuariosDao = new UsuariosDao();
  }

  async listarUsuarios(filtros: FiltrosListado) {
    const resultados = await this.usuariosDao.listarUsuarios(filtros);
    
    if (resultados.length === 0) {
      return {
        codigo: 1,
        mensaje: 'No se encontraron usuarios',
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
      mensaje: 'Usuarios obtenidos exitosamente',
      usuarios: resultados,
      paginacion: {
        total_registros: primerRegistro.Total_Registros,
        total_paginas: primerRegistro.Total_Paginas,
        pagina_actual: primerRegistro.Pagina_Actual,
        registros_por_pagina: filtros.registrosPorPagina || 10
      }
    };
  }

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

  async eliminarUsuario(id_admin: number, id_usuario: number) {
    const result = await this.usuariosDao.eliminarUsuario(id_admin, id_usuario);
    
    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje
    };
  }

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

  async obtenerEstadisticas() {
    const stats = await this.usuariosDao.obtenerEstadisticas();
    
    return {
      codigo: 1,
      mensaje: 'Estadísticas obtenidas',
      estadisticas: stats
    };
  }

  async listarRoles() {
    const roles = await this.usuariosDao.listarRoles();
    
    return {
      codigo: 1,
      mensaje: 'Roles obtenidos',
      roles
    };
  }
}
