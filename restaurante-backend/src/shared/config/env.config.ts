// src/shared/config/env.config.ts

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loadEnv = (): void => {
  const envPath = resolve(__dirname, '../../../.env');
  dotenv.config({ path: envPath });
};

export const getAppConfig = () => ({
  env: process.env.NODE_ENV!,
  port: parseInt(process.env.PORT!, 10),
  apiPrefix: process.env.API_PREFIX!,
  corsOrigin: process.env.CORS_ORIGIN!
});

export const appConfig = getAppConfig();

export const validateEnv = (): void => {
  const required = [
    'NODE_ENV',
    'PORT',
    'API_PREFIX',
    'CORS_ORIGIN',
    'DB_USER',
    'DB_PASSWORD',
    'DB_SERVER',
    'DB_NAME',
    'JWT_SECRET'
  ];
  const missing = required.filter(v => !process.env[v]);

  if (missing.length > 0) {
    throw new Error(`Variables requeridas faltantes: ${missing.join(', ')}`);
  }
};

export const showConfig = (): void => {
  const config = getAppConfig();
  console.log('\n📋 Configuración:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🌍 Entorno: ${config.env}`);
  console.log(`🚀 Puerto: ${config.port}`);
  console.log(`📊 DB: ${process.env.DB_NAME}`);
  console.log(`🖥️  Server: ${process.env.DB_SERVER}`);
  console.log(`🔗 CORS: ${config.corsOrigin}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};
