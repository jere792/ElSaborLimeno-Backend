export const ROLES = {
  ADMIN: 1,
  CAJERO: 2,
  CLIENTE: 5
} as const;

export const ROLES_NOMBRES = {
  1: 'Administrador',
  2: 'Cajero',
  5: 'Cliente'
} as const;


export const esAdmin = (id_rol: number): boolean => id_rol === ROLES.ADMIN;
export const esCajero = (id_rol: number): boolean => id_rol === ROLES.CAJERO;
export const esCliente = (id_rol: number): boolean => id_rol === ROLES.CLIENTE;
