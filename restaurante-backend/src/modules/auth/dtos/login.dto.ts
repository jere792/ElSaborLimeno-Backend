export class LoginDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static fromRequest(body: any): LoginDto {
    return new LoginDto(
      body.email,
      body.password
    );
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email || typeof this.email !== 'string') {
      errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('El email no es válido');
    }

    if (!this.password || typeof this.password !== 'string') {
      errors.push('La contraseña es requerida');
    } else if (this.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return { valid: errors.length === 0, errors };
  }
}
