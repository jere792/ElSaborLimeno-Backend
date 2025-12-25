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
  foto_perfil?: string;
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
  foto_perfil?: string;
}

export interface ActualizarPerfilParams {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  genero?: string;
  direccion?: string;
  foto_perfil?: string;
}

export interface CambiarPasswordParams {
  id_usuario: number;
  password_actual: string;
  password_nueva: string;
}

export class UsuariosDao {
  
  async listarUsuariosActivos(filtros: FiltrosListado = {}): Promise<UsuarioListado[]> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Pagina', sql.Int, filtros.pagina || 1)
        .input('RegistrosPorPagina', sql.Int, filtros.registrosPorPagina || 10)
        .input('Busqueda', sql.VarChar, filtros.busqueda || null)
        .input('Id_Rol', sql.Int, filtros.id_rol || null)
        .input('OrdenarPor', sql.VarChar, filtros.ordenarPor || 'Fecha_Registro')
        .input('Orden', sql.VarChar, filtros.orden || 'DESC')
        .execute('SP_Usuario_Listar_Activos');

      return result.recordset;
    } catch (error: any) {
      throw new Error(`Error al listar usuarios activos: ${error.message}`);
    }
  }

  async listarUsuariosInactivos(filtros: FiltrosListado = {}): Promise<UsuarioListado[]> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Pagina', sql.Int, filtros.pagina || 1)
        .input('RegistrosPorPagina', sql.Int, filtros.registrosPorPagina || 10)
        .input('Busqueda', sql.VarChar, filtros.busqueda || null)
        .input('Id_Rol', sql.Int, filtros.id_rol || null)
        .input('OrdenarPor', sql.VarChar, filtros.ordenarPor || 'Fecha_Registro')
        .input('Orden', sql.VarChar, filtros.orden || 'DESC')
        .execute('SP_Usuario_Listar_Inactivos');

      return result.recordset;
    } catch (error: any) {
      throw new Error(`Error al listar usuarios inactivos: ${error.message}`);
    }
  }

  async registrarUsuario(params: CrearUsuarioParams): Promise<RespuestaCrearUsuario> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, params.id_admin)
        .input('Id_Documento', sql.Int, params.id_documento)
        .input('Id_Roles', sql.Int, params.id_roles)
        .input('Nombres', sql.VarChar, params.nombres)
        .input('Apellidos', sql.VarChar, params.apellidos)
        .input('Email', sql.VarChar, params.email)
        .input('Clave', sql.VarChar, params.clave)
        .input('Telefono', sql.Char, params.telefono || null)
        .input('Fecha_Nacimiento', sql.DateTime, params.fecha_nacimiento || null)
        .input('Genero', sql.VarChar, params.genero || null)
        .input('Direccion', sql.VarChar, params.direccion || null)
        .input('Foto_Perfil', sql.VarChar, params.foto_perfil || null)
        .execute('SP_Usuario_Crear');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
  }

  // src/modules/usuarios/dao/usuarios.dao.ts

  async obtenerUsuarioPorId(id: number): Promise<RespuestaObtenerUsuario> {
    try {
      console.log('🔍 [DAO] obtenerUsuarioPorId - ID recibido:', id);
      
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Usuario', sql.Int, id)
        .execute('SP_Usuario_Obtener_Id');

      // ✅ AGREGAR ESTOS LOGS
      console.log('📦 [DAO] Recordsets completos:', result.recordsets.length);
      console.log('📦 [DAO] Primer recordset:', JSON.stringify(result.recordset, null, 2));
      console.log('🔍 [DAO] recordset[0]:', JSON.stringify(result.recordset[0], null, 2));
      
      return result.recordset[0];
    } catch (error: any) {
      console.error('❌ [DAO] Error:', error);
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }


  // ==================== ACTUALIZAR USUARIO ====================
  async actualizarUsuario(params: ActualizarUsuarioParams): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Admin', sql.Int, params.id_admin)
        .input('Id_Usuario', sql.Int, params.id_usuario)
        .input('Id_Documento', sql.Int, params.id_documento)
        .input('Id_Roles', sql.Int, params.id_roles)
        .input('Nombres', sql.VarChar, params.nombres)
        .input('Apellidos', sql.VarChar, params.apellidos)
        .input('Email', sql.VarChar, params.email)
        .input('Telefono', sql.Char, params.telefono || null)
        .input('Fecha_Nacimiento', sql.DateTime, params.fecha_nacimiento || null)
        .input('Genero', sql.VarChar, params.genero || null)
        .input('Direccion', sql.VarChar, params.direccion || null)
        .input('Foto_Perfil', sql.VarChar, params.foto_perfil || null)
        .execute('SP_Usuario_Actualizar');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  // ==================== CAMBIAR ESTADO ====================
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
        .input('Nuevo_Estado', sql.VarChar, nuevo_estado)
        .execute('SP_Usuario_Estado');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al cambiar estado: ${error.message}`);
    }
  }

  // ==================== RESTABLECER PASSWORD ====================
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
        .input('Nueva_Clave', sql.VarChar, nueva_clave)
        .execute('SP_RestablecerPassword');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al restablecer contraseña: ${error.message}`);
    }
  }

  // ==================== ESTADÍSTICAS ====================
  async obtenerEstadisticas(): Promise<EstadisticasUsuarios> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .execute('SP_Usuario_Obtener_Estadisticas');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }

  // ==================== LISTAR ROLES ====================
  async listarRoles(): Promise<Rol[]> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .execute('SP_Roles_Listar');

      return result.recordset;
    } catch (error: any) {
      throw new Error(`Error al listar roles: ${error.message}`);
    }
  }

  // ✅ ==================== ACTUALIZAR MI PERFIL ====================
  async actualizarMiPerfil(params: ActualizarPerfilParams): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Usuario', sql.Int, params.id_usuario)
        .input('Nombres', sql.VarChar(100), params.nombres)
        .input('Apellidos', sql.VarChar(100), params.apellidos)
        .input('Email', sql.VarChar(150), params.email)
        .input('Telefono', sql.VarChar(20), params.telefono || null)
        .input('Fecha_Nacimiento', sql.Date, params.fecha_nacimiento || null)
        .input('Genero', sql.VarChar(20), params.genero || null)
        .input('Direccion', sql.VarChar(255), params.direccion || null)
        .input('Foto_Perfil', sql.VarChar, params.foto_perfil || null)
        .execute('SP_Usuario_Actualizar_MiPerfil');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al actualizar perfil: ${error.message}`);
    }
  }

  // ✅ ==================== CAMBIAR MI CONTRASEÑA ====================
  async cambiarMiPassword(params: CambiarPasswordParams): Promise<RespuestaGeneral> {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Id_Usuario', sql.Int, params.id_usuario)
        .input('Password_Actual', sql.VarChar(255), params.password_actual)
        .input('Password_Nueva', sql.VarChar(255), params.password_nueva)
        .execute('SP_Usuario_Cambiar_MiPassword');

      return result.recordset[0];
    } catch (error: any) {
      throw new Error(`Error al cambiar contraseña: ${error.message}`);
    }
  }

  
}
