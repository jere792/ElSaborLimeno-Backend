// src/modules/usuarios/dao/usuarios.dao.ts

import sql from 'mssql';
import { poolPromise } from '../../../shared/config/db.config.js';
import {
  Usuario,
  UsuarioListado,
  UsuarioConRol,
  Rol,
  EstadisticasUsuarios,
  RespuestaCrearUsuario,
  RespuestaObtenerUsuario,
  RespuestaGeneral
} from '../models/usuario.model.js';

export interface FiltrosListado {
  pagina?: number;
  registrosPorPagina?: number;
  busqueda?: string;
  id_rol?: number;
  estado?: string;
  ordenarPor?: string;
  orden?: 'ASC' | 'DESC';
}

export interface CrearUsuarioParams {
  id_admin: number;
  id_documento: number;
  id_roles: number;
  nombres: string;
  apellidos: string;
  email: string;
  clave: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  genero?: string;
  direccion?: string;
}

export interface ActualizarUsuarioParams {
  id_admin: number;
  id_usuario: number;
  id_documento: number;
  id_roles: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  genero?: string;
  direccion?: string;
}

export class UsuariosDao {
  /**
   * Listar usuarios con paginación y filtros
   */
  async listarUsuarios(filtros: FiltrosListado = {}): Promise<UsuarioListado[]> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Pagina', sql.Int, filtros.pagina || 1)
        .input('RegistrosPorPagina', sql.Int, filtros.registrosPorPagina || 10)
        .input('Busqueda', sql.VarChar(255), filtros.busqueda || null)
        .input('Id_Rol', sql.Int, filtros.id_rol || null)
        .input('Estado', sql.VarChar(20), filtros.estado || null)
        .input('OrdenarPor', sql.VarChar(50), filtros.ordenarPor || 'Fecha_Registro')
        .input('Orden', sql.VarChar(4), filtros.orden || 'DESC')
        .execute('SP_ListarUsuarios');

      return result.recordset;
    } catch (error: any) {
      throw new Error(`Error al listar usuarios: ${error.message}`);
    }
  }

  /**
   * Registrar un nuevo usuario (solo Admin)
   */
  async registrarUsuario(params: CrearUsuarioParams): Promise<RespuestaCrearUsuario> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, params.id_admin)
        .input('Id_Documento', sql.Int, params.id_documento)
        .input('Id_Roles', sql.Int, params.id_roles)
        .input('Nombres', sql.VarChar(90), params.nombres)
        .input('Apellidos', sql.VarChar(90), params.apellidos)
        .input('Email', sql.VarChar(255), params.email)
        .input('Clave', sql.VarChar(255), params.clave)
        .input('Telefono', sql.Char(15), params.telefono || null)
        .input('Fecha_Nacimiento', sql.DateTime, params.fecha_nacimiento || null)
        .input('Genero', sql.VarChar(20), params.genero || null)
        .input('Direccion', sql.VarChar(255), params.direccion || null)
        .execute('SP_Registro');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
  }

  /**
   * Obtener un usuario por ID
   */
  async obtenerUsuarioPorId(id: number): Promise<RespuestaObtenerUsuario> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Usuario', sql.Int, id)
        .execute('SP_ObtenerUsuarioPorId');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  /**
   * Actualizar un usuario existente
   */
  async actualizarUsuario(params: ActualizarUsuarioParams): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, params.id_admin)
        .input('Id_Usuario', sql.Int, params.id_usuario)
        .input('Id_Documento', sql.Int, params.id_documento)
        .input('Id_Roles', sql.Int, params.id_roles)
        .input('Nombres', sql.VarChar(90), params.nombres)
        .input('Apellidos', sql.VarChar(90), params.apellidos)
        .input('Email', sql.VarChar(255), params.email)
        .input('Telefono', sql.Char(15), params.telefono || null)
        .input('Fecha_Nacimiento', sql.DateTime, params.fecha_nacimiento || null)
        .input('Genero', sql.VarChar(20), params.genero || null)
        .input('Direccion', sql.VarChar(255), params.direccion || null)
        .execute('SP_ActualizarUsuario');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  /**
   * Cambiar el estado de un usuario (Activo, Inactivo, Suspendido)
   */
  async cambiarEstadoUsuario(
    id_admin: number,
    id_usuario: number,
    nuevo_estado: string
  ): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, id_admin)
        .input('Id_Usuario', sql.Int, id_usuario)
        .input('Nuevo_Estado', sql.VarChar(20), nuevo_estado)
        .execute('SP_CambiarEstadoUsuario');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al cambiar estado: ${error.message}`);
    }
  }

  /**
   * Eliminar usuario (eliminación lógica)
   */
  async eliminarUsuario(id_admin: number, id_usuario: number): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, id_admin)
        .input('Id_Usuario', sql.Int, id_usuario)
        .execute('SP_EliminarUsuario');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  /**
   * Restablecer contraseña de un usuario
   */
  async restablecerPassword(
    id_admin: number,
    id_usuario: number,
    nueva_clave: string
  ): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, id_admin)
        .input('Id_Usuario', sql.Int, id_usuario)
        .input('Nueva_Clave', sql.VarChar(255), nueva_clave)
        .execute('SP_RestablecerPassword');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al restablecer contraseña: ${error.message}`);
    }
  }

  /**
   * Obtener estadísticas de usuarios
   */
  async obtenerEstadisticas(): Promise<EstadisticasUsuarios> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .execute('SP_ObtenerEstadisticasUsuarios');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }

  /**
   * Listar todos los roles disponibles
   */
  async listarRoles(): Promise<Rol[]> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .execute('SP_ListarRoles');

      return result.recordset;
    } catch (error: any) {
      throw new Error(`Error al listar roles: ${error.message}`);
    }
  }
}
