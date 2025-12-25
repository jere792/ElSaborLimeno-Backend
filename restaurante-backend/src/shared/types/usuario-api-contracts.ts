// src/shared/types/usuario-api-contracts.ts

// ============================================
// USUARIO BASE
// ============================================

export interface Usuario {
  id_usuario: number;
  id_documento: number;
  id_rol: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: 'Masculino' | 'Femenino' | 'Otro';
  fecha_registro: string;
  estado: string;
  direccion?: string;
  foto_perfil?: string;
  reservas_canceladas: number;
  reservas_noshow: number;
  estado_reservas: string;
}

// ============================================
// CREAR USUARIO (ADMIN)
// ============================================

export interface CrearUsuarioRequest {
  id_documento?: number;
  id_roles: number;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: 'Masculino' | 'Femenino' | 'Otro';
  direccion?: string;
  foto_perfil?: string;
}

export interface CrearUsuarioResponse {
  codigo: number;
  mensaje: string;
  usuario?: {
    id: number;
  };
}

// ============================================
// ACTUALIZAR USUARIO (ADMIN)
// ============================================

export interface ActualizarUsuarioRequest {
  id_documento: number;
  id_roles: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  direccion?: string;
  foto_perfil?: string;
}

export interface ActualizarUsuarioResponse {
  codigo: number;
  mensaje: string;
}

// ============================================
// MI PERFIL
// ============================================

export interface ObtenerPerfilResponse {
  codigo: number;
  mensaje: string;
  usuario?: Usuario;
}

export interface ActualizarPerfilRequest {
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  direccion?: string;
  foto_perfil?: string;
}

export interface ActualizarPerfilResponse {
  codigo: number;
  mensaje: string;
}

// ============================================
// CAMBIAR CONTRASEÑA
// ============================================

export interface CambiarPasswordRequest {
  password_actual: string;
  password_nueva: string;
}

export interface CambiarPasswordResponse {
  codigo: number;
  mensaje: string;
}

// ============================================
// LISTAR USUARIOS
// ============================================

export interface FiltrosUsuarios {
  pagina?: number;
  registros_por_pagina?: number;
  busqueda?: string;
  id_rol?: number;
  ordenar_por?: string;
  orden?: 'ASC' | 'DESC';
}

export interface UsuarioListado {
  id_usuario: number;
  id_documento?: number;
  id_roles: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  direccion?: string;
  estado: string;
  fecha_registro: string;
  foto_perfil?: string;
  nombre_rol: string;
  reservas_canceladas?: number;
  reservas_noshow?: number;
  estado_reservas?: string;
  total_registros?: number;
  total_paginas?: number;
  pagina_actual?: number;
}

export interface ListarUsuariosResponse {
  codigo: number;
  mensaje: string;
  usuarios: UsuarioListado[];
  paginacion: {
    total_registros: number;
    total_paginas: number;
    pagina_actual: number;
    registros_por_pagina: number;
  };
}

// ============================================
// CAMBIAR ESTADO
// ============================================

export interface CambiarEstadoRequest {
  estado: 'Activo' | 'Inactivo' | 'Suspendido';
}

export interface CambiarEstadoResponse {
  codigo: number;
  mensaje: string;
}

// ============================================
// RESTABLECER PASSWORD (ADMIN)
// ============================================

export interface RestablecerPasswordRequest {
  password: string;
}

export interface RestablecerPasswordResponse {
  codigo: number;
  mensaje: string;
}

// ============================================
// ROLES
// ============================================

export interface Rol {
  id_roles: number;
  nombre: string;
  descripcion?: string;
}

export interface ListarRolesResponse {
  codigo: number;
  mensaje: string;
  roles: Rol[];
}

// ============================================
// ESTADÍSTICAS
// ============================================

export interface EstadisticasUsuarios {
  total_usuarios: number;
  usuarios_activos: number;
  usuarios_inactivos: number;
  usuarios_suspendidos: number;
  total_admins?: number;
  total_cajeros?: number;
  total_clientes?: number;
  nuevos_ultimos_30_dias?: number;
}

export interface EstadisticasResponse {
  codigo: number;
  mensaje: string;
  estadisticas: EstadisticasUsuarios;
}

// ============================================
// RESPUESTAS GENÉRICAS
// ============================================

export interface ApiResponse {
  codigo: number;
  mensaje: string;
}

export interface ApiErrorResponse {
  codigo: 0;
  mensaje: string;
  errores?: string[];
}
