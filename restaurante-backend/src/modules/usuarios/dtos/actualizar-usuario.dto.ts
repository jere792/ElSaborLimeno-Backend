import { ROLES } from "../../../shared/constants/roles.constants.js";

export class ActualizarUsuarioDto {
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
  constructor(data: any) {
    this.id_documento = data.id_documento || 1;
    this.id_roles = data.id_roles;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.email = data.email;
    this.telefono = data.telefono;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.genero = data.genero;
    this.direccion = data.direccion;
    this.foto_perfil = data.foto_perfil;
  }

  static fromRequest(body: any): ActualizarUsuarioDto {
    return new ActualizarUsuarioDto(body);
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombres || this.nombres.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!this.apellidos || this.apellidos.trim().length < 2) {
      errors.push('El apellido debe tener al menos 2 caracteres');
    }

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('Email inválido');
    }

    const rolesValidos = Object.values(ROLES) as number[];
    if (!this.id_roles || !rolesValidos.includes(this.id_roles)) {
      errors.push('Rol inválido');
    }

    if (this.telefono && !/^\d{9,15}$/.test(this.telefono.replace(/\s/g, ''))) {
      errors.push('Teléfono inválido');
    }

    if (this.genero && !['Masculino', 'Femenino', 'Otro'].includes(this.genero)) {
      errors.push('Género inválido');
    }

    if (this.foto_perfil && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(this.foto_perfil)) {
      errors.push('URL de foto de perfil inválida');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
