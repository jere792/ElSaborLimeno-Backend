// src/modules/usuarios/services/usuarios.service.ts

import { UsuariosDao, FiltrosListado } from '../dao/usuarios.dao.js';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from '../dtos/actualizar-usuario.dto.js';
import {
  ObtenerPerfilResponse,
  ActualizarPerfilResponse,
  CambiarPasswordResponse,
  ListarUsuariosResponse,
  CrearUsuarioResponse,
  ActualizarUsuarioResponse,
  CambiarEstadoResponse,
  RestablecerPasswordResponse,
  EstadisticasResponse,
  ListarRolesResponse,
  UsuarioListado
} from '../../../shared/types/usuario-api-contracts.js';

export class UsuariosService {
  private usuariosDao: UsuariosDao;

  constructor() {
    this.usuariosDao = new UsuariosDao();
  }


  private mapUsuarioListado(usuario: any): UsuarioListado {
    return {
      id_usuario: usuario.Id_Usuario,
      id_documento: usuario.Id_Documento,
      id_roles: usuario.Id_Roles,
      nombres: usuario.Nombres,
      apellidos: usuario.Apellidos,
      email: usuario.Email,
      telefono: usuario.Telefono,
      fecha_nacimiento: usuario.Fecha_Nacimiento?.toISOString().split('T')[0],
      genero: usuario.Genero,
      direccion: usuario.Direccion,
      estado: usuario.Estado,
      fecha_registro: usuario.Fecha_Registro?.toISOString(),
      foto_perfil: usuario.Foto_Perfil,
      nombre_rol: usuario.Nombre_Rol,
      reservas_canceladas: usuario.Reservas_Canceladas,
      reservas_noshow: usuario.Reservas_NoShow,
      estado_reservas: usuario.Estado_Reservas,
      total_registros: usuario.Total_Registros,
      total_paginas: usuario.Total_Paginas,
      pagina_actual: usuario.Pagina_Actual
    };
  }


  async obtenerMiPerfil(id_usuario: number): Promise<ObtenerPerfilResponse> {
    try {
      const result = await this.usuariosDao.obtenerUsuarioPorId(id_usuario);
      
      
      if (result.Codigo === 0) {
        throw new Error(result.Mensaje);
      }

      let fechaNacimiento: string | undefined = undefined;
      if ((result as any).fecha_nacimiento) {
        const fecha = new Date((result as any).fecha_nacimiento);
        if (!isNaN(fecha.getTime())) {
          fechaNacimiento = fecha.toISOString().split('T')[0];
        }
      }

      let fechaRegistro: string = new Date().toISOString();
      if ((result as any).fecha_registro) {
        const fecha = new Date((result as any).fecha_registro);
        if (!isNaN(fecha.getTime())) {
          fechaRegistro = fecha.toISOString();
        }
      }

      return {
        codigo: 1,
        mensaje: 'Perfil obtenido correctamente',
        usuario: {
          id_usuario: (result as any).id_usuario || 0,
          id_documento: (result as any).id_documento || 0,
          id_rol: (result as any).id_rol || 0,
          nombres: (result as any).nombres || '',
          apellidos: (result as any).apellidos || '',
          email: (result as any).email || '',
          telefono: (result as any).telefono,
          fecha_nacimiento: fechaNacimiento,
          genero: (result as any).genero as 'Masculino' | 'Femenino' | 'Otro' | undefined,
          fecha_registro: fechaRegistro,
          estado: (result as any).estado || 'Activo',
          direccion: (result as any).direccion,
          foto_perfil: (result as any).foto_perfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          reservas_canceladas: (result as any).reservas_canceladas || 0,
          reservas_noshow: (result as any).reservas_noshow || 0,
          estado_reservas: (result as any).estado_reservas || 'Normal'
        }
      };
    } catch (error: any) {
      console.error('💥 [SERVICE] Error:', error);
      throw error;
    }
  }



  // ==================== ACTUALIZAR MI PERFIL ====================
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
      foto_perfil?: string;
    }
  ): Promise<ActualizarPerfilResponse> {
    const result = await this.usuariosDao.actualizarMiPerfil({
      id_usuario,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      email: datos.email,
      telefono: datos.telefono,
      fecha_nacimiento: datos.fecha_nacimiento,
      genero: datos.genero,
      direccion: datos.direccion,
      foto_perfil: datos.foto_perfil
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
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
  ): Promise<CambiarPasswordResponse> {
    const result = await this.usuariosDao.cambiarMiPassword({
      id_usuario,
      password_actual: datos.password_actual,
      password_nueva: datos.password_nueva
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje
    };
  }

  // ==================== LISTAR USUARIOS ACTIVOS ====================
  async listarUsuariosActivos(filtros: FiltrosListado): Promise<ListarUsuariosResponse> {
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

    // ✅ MAPEAR cada usuario para convertir Date a string
    const usuariosMapeados = resultados.map(u => this.mapUsuarioListado(u));

    return {
      codigo: 1,
      mensaje: 'Usuarios activos obtenidos exitosamente',
      usuarios: usuariosMapeados, // ✅ Usar los mapeados
      paginacion: {
        total_registros: primerRegistro.Total_Registros || 0,
        total_paginas: primerRegistro.Total_Paginas || 0,
        pagina_actual: primerRegistro.Pagina_Actual || 1,
        registros_por_pagina: filtros.registrosPorPagina || 10
      }
    };
  }

  // ==================== LISTAR USUARIOS INACTIVOS ====================
  async listarUsuariosInactivos(filtros: FiltrosListado): Promise<ListarUsuariosResponse> {
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

    // ✅ MAPEAR cada usuario para convertir Date a string
    const usuariosMapeados = resultados.map(u => this.mapUsuarioListado(u));

    return {
      codigo: 1,
      mensaje: 'Usuarios inactivos obtenidos exitosamente',
      usuarios: usuariosMapeados, // ✅ Usar los mapeados
      paginacion: {
        total_registros: primerRegistro.Total_Registros || 0,
        total_paginas: primerRegistro.Total_Paginas || 0,
        pagina_actual: primerRegistro.Pagina_Actual || 1,
        registros_por_pagina: filtros.registrosPorPagina || 10
      }
    };
  }

  // ==================== REGISTRAR USUARIO ====================
  async registrarUsuario(id_admin: number, dto: CrearUsuarioDto): Promise<CrearUsuarioResponse> {
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
      direccion: dto.direccion,
      foto_perfil: dto.foto_perfil
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: result.Mensaje,
      usuario: {
        id: result.Id_Usuario!
      }
    };
  }

  // ==================== OBTENER USUARIO ====================
async obtenerUsuario(id: number): Promise<ObtenerPerfilResponse> {
  const result = await this.usuariosDao.obtenerUsuarioPorId(id);
  
  if (result.Codigo === 0) {
    throw new Error(result.Mensaje);
  }

  return {
    codigo: 1,
    mensaje: result.Mensaje,
    usuario: {
      id_usuario: result.Id_Usuario!,
      id_documento: result.Id_Documento!,
      id_rol: result.Id_Roles!,
      nombres: result.Nombres!,
      apellidos: result.Apellidos!,
      email: result.Email!,
      telefono: result.Telefono,
      fecha_nacimiento: result.Fecha_Nacimiento?.toISOString().split('T')[0],
      genero: result.Genero as 'Masculino' | 'Femenino' | 'Otro' | undefined,
      fecha_registro: result.Fecha_Registro!.toISOString(),
      estado: result.Estado!,
      direccion: result.Direccion,
      foto_perfil: (result as any).foto_perfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      reservas_canceladas: (result as any).reservas_canceladas || result.Reservas_Canceladas || 0,
      reservas_noshow: (result as any).reservas_noshow || result.Reservas_NoShow || 0,
      estado_reservas: (result as any).estado_reservas || result.Estado_Reservas || 'Normal'
    }
  };
}


  // ==================== ACTUALIZAR USUARIO ====================
  async actualizarUsuario(
    id_admin: number,
    id_usuario: number,
    dto: ActualizarUsuarioDto
  ): Promise<ActualizarUsuarioResponse> {
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
      direccion: dto.direccion,
      foto_perfil: dto.foto_perfil
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
  async cambiarEstado(
    id_admin: number,
    id_usuario: number,
    nuevo_estado: string
  ): Promise<CambiarEstadoResponse> {
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
  async restablecerPassword(
    id_admin: number,
    id_usuario: number,
    nueva_password: string
  ): Promise<RestablecerPasswordResponse> {
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
async obtenerEstadisticas(): Promise<EstadisticasResponse> {
  const stats = await this.usuariosDao.obtenerEstadisticas();
  
  return {
    codigo: 1,
    mensaje: 'Estadísticas obtenidas',
    estadisticas: {
      total_usuarios: stats.Total_Usuarios,
      usuarios_activos: stats.Usuarios_Activos,
      usuarios_inactivos: stats.Usuarios_Inactivos,
      usuarios_suspendidos: stats.Usuarios_Suspendidos,
      total_admins: stats.Total_Admins,
      total_cajeros: stats.Total_Cajeros,
      total_clientes: stats.Total_Clientes,
      nuevos_ultimos_30_dias: stats.Nuevos_Ultimos_30_Dias
    }
  };
}

  // ==================== LISTAR ROLES ====================
  async listarRoles(): Promise<ListarRolesResponse> {
    const roles = await this.usuariosDao.listarRoles();
    
    return {
      codigo: 1,
      mensaje: 'Roles obtenidos',
      roles: roles.map(rol => ({
        id_roles: rol.Id_Roles,
        nombre: rol.Nombre,
        descripcion: rol.Descripcion
      }))
    };
  }

    // ✅ AGREGAR ESTE MÉTODO
  async actualizarFotoPerfil(id_usuario: number, foto_url: string) {
    // Obtener datos actuales del usuario
    const usuarioActual = await this.usuariosDao.obtenerUsuarioPorId(id_usuario);
    
    if (usuarioActual.Codigo === 0) {
      throw new Error(usuarioActual.Mensaje);
    }

    // Actualizar solo la foto
    const result = await this.usuariosDao.actualizarMiPerfil({
      id_usuario,
      nombres: usuarioActual.Nombres!,
      apellidos: usuarioActual.Apellidos!,
      email: usuarioActual.Email!,
      telefono: usuarioActual.Telefono,
      fecha_nacimiento: usuarioActual.Fecha_Nacimiento,
      genero: usuarioActual.Genero,
      direccion: usuarioActual.Direccion,
      foto_perfil: foto_url
    });

    if (result.Codigo === 0) {
      throw new Error(result.Mensaje);
    }

    return {
      codigo: 1,
      mensaje: 'Foto de perfil actualizada correctamente'
    };
  }
}
