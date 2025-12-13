export class RegistroClienteDto {
  nombres: string;
  apellidos: string;
  email: string;
  clave: string;
  telefono?: string;

  constructor(
    nombres: string,
    apellidos: string,
    email: string,
    clave: string,
    telefono?: string
  ) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.clave = clave;
    this.telefono = telefono;
  }

  static fromRequest(body: any): RegistroClienteDto {
    return new RegistroClienteDto(
      body.nombres,
      body.apellidos,
      body.email,
      body.clave || body.password,
      body.telefono
    );
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

    if (!this.clave || this.clave.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
