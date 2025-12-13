// src/shared/config/jwt.config.ts

import jwt from 'jsonwebtoken';
import { envConfig } from './env.config.js';

export interface JwtPayload {
  id: number;
  email: string;
  id_rol: number;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, envConfig.jwt.secret, {
    expiresIn: envConfig.jwt.expiresIn
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, envConfig.jwt.secret) as JwtPayload;
};

export const validateJWTConfig = (): void => {
  if (!envConfig.jwt.secret || envConfig.jwt.secret.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres');
  }
  console.log('✅ Configuración JWT validada');
};
