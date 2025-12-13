// src/shared/config/jwt.config.ts

import jwt, { SignOptions } from 'jsonwebtoken';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret_key_default_cambiar_en_produccion',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  issuer: 'ElSaborLimeno',
  audience: 'ElSaborLimeno-API'
};

export const signToken = (payload: Record<string, any>): string => {
  const options: SignOptions = {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  };

  return jwt.sign(payload, jwtConfig.secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.secret, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  }) as jwt.JwtPayload & {
    id: number;
    email: string;
    id_rol: number;
  };
};

export const validateJWTConfig = (): void => {
  if (jwtConfig.secret.length < 32) {
    console.warn('⚠️  JWT Secret muy corto. Usa al menos 32 caracteres');
  }
  
  if (process.env.NODE_ENV === 'production' && 
      jwtConfig.secret.includes('default')) {
    throw new Error('❌ Debes cambiar JWT_SECRET en producción');
  }
  
  console.log('✅ Configuración JWT validada');
};
