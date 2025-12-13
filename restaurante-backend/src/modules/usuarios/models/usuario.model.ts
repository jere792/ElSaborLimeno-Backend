// src/modules/usuarios/models/usuario.model.ts

export interface Usuario {
  Id_Usuario: number;
  Id_Documento: number;
  Id_Roles: number;
  Nombres: string;
  Apellidos: string;
  Email: string;
  Telefono?: string;
  Fecha_Nacimiento?: Date;
  Genero?: string;
  Direccion?: string;
  Estado: string;
  Fecha_Registro: Date;
  Reservas_Canceladas?: number;
  Reservas_NoShow?: number;
  Estado_Reservas?: string;
}

export interface UsuarioConRol extends Usuario {
  Nombre_Rol: string;
}

export interface UsuarioListado {
  Id_Usuario: number;
  Nombres: string;
  Apellidos: string;
  Email: string;
  Telefono?: string;
  Estado: string;
  Fecha_Registro: Date;
  Id_Roles: number;
  Nombre_Rol: string;
  Total_Registros?: number;
  Total_Paginas?: number;
  Pagina_Actual?: number;
}

export interface Rol {
  Id_Roles: number;
  Nombre: string;
  Descripcion: string;
}

export interface EstadisticasUsuarios {
  Total_Usuarios: number;
  Usuarios_Activos: number;
  Usuarios_Inactivos: number;
  Usuarios_Suspendidos: number;
  Total_Admins: number;
  Total_Cajeros: number;
  Total_Clientes: number;
  Nuevos_Ultimos_30_Dias: number;
}

export interface RespuestaCrearUsuario {
  Codigo: number;
  Mensaje: string;
  Id_Usuario?: number;
}

export interface RespuestaObtenerUsuario {
  Codigo: number;
  Mensaje: string;
  Id_Usuario?: number;
  Id_Documento?: number;
  Id_Roles?: number;
  Nombres?: string;
  Apellidos?: string;
  Email?: string;
  Telefono?: string;
  Fecha_Nacimiento?: Date;
  Genero?: string;
  Direccion?: string;
  Estado?: string;
  Fecha_Registro?: Date;
  Reservas_Canceladas?: number;
  Reservas_NoShow?: number;
  Estado_Reservas?: string;
}

export interface RespuestaGeneral {
  Codigo: number;
  Mensaje: string;
  Id_Usuario?: number;
  Nuevo_Estado?: string;
}
