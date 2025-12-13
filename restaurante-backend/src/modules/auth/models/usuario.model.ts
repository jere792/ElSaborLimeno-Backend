export class Usuario {
  id_usuario: number;
  id_documento: number;
  id_rol: number;
  nombres: string;
  apellidos: string;
  email: string;
  clave: string;
  telefono: string;
  fecha_nacimiento: Date;
  genero: 'Masculino' | 'Femenino' | 'Otro';
  fecha_registro: Date;
  estado: string;
  direccion: string;
  reservas_canceladas: number;
  reservas_noshow: number;
  estado_reservas: string;

  constructor(data: any) {
    this.id_usuario = data.id_usuario;
    this.id_documento = data.id_documento;
    this.id_rol = data.id_rol;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.email = data.email;
    this.clave = data.clave;
    this.telefono = data.telefono;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.genero = data.genero;
    this.fecha_registro = data.fecha_registro;
    this.estado = data.estado;
    this.direccion = data.direccion;
    this.reservas_canceladas = data.reservas_canceladas;
    this.reservas_noshow = data.reservas_noshow;
    this.estado_reservas = data.estado_reservas;
  }
}
