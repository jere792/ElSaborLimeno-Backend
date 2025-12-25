// src/shared/types/auth-api-contracts.ts

// ============================================
// LOGIN
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    direccion?: string;
    id_rol: number;
    fecha_registro: string;
  };
}

// ============================================
// REGISTRO CLIENTE
// ============================================

export interface RegistroClienteRequest {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface RegistroClienteResponse {
  mensaje: string;
  token: string;
  usuario: {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    id_rol: number;
  };
}

// ============================================
// VERIFICAR TOKEN
// ============================================

export interface VerificarTokenResponse {
  codigo: number;
  mensaje: string;
  data?: {
    id: number;
    email: string;
    id_rol: number;
  };
}

// ============================================
// RESPUESTAS DE ERROR
// ============================================

export interface AuthErrorResponse {
  codigo: 0;
  mensaje: string;
  errores?: string[];
}
