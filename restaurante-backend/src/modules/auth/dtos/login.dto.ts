// src/modules/auth/dtos/login.dto.ts

export class LoginDto {
  email: string;
  clave: string;

  constructor(email: string, clave: string) {
    this.email = email;
    this.clave = clave;
  }

  static fromRequest(body: any): LoginDto {
    // ✅ Acepta 'password' del frontend y lo convierte a 'clave'
    return new LoginDto(
      body.email,
      body.password || body.clave  // ← IMPORTANTE
    );
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email || typeof this.email !== 'string') {
      errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('El email no es válido');
    }

    if (!this.clave || typeof this.clave !== 'string') {
      errors.push('La contraseña es requerida');
    } else if (this.clave.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return { valid: errors.length === 0, errors };
  }
}
