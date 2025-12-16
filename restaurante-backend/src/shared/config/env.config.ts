// src/shared/config/env.config.ts

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const envConfig = {

  nodeEnv: process.env.NODE_ENV!,
  port: parseInt(process.env.PORT!, 10),
  apiPrefix: process.env.API_PREFIX!,
  corsOrigin: process.env.CORS_ORIGIN!,

  database: {
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
      enableArithAbort: true,
      connectTimeout: 30000,
      requestTimeout: 30000
    }
  },

  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!
  }
};

export const validateEnvConfig = (): void => {
  const required = [
    { key: 'NODE_ENV', value: process.env.NODE_ENV },
    { key: 'PORT', value: process.env.PORT },
    { key: 'DB_SERVER', value: process.env.DB_SERVER },
    { key: 'DB_NAME', value: process.env.DB_NAME },
    { key: 'DB_USER', value: process.env.DB_USER },
    { key: 'DB_PASSWORD', value: process.env.DB_PASSWORD },
    { key: 'JWT_SECRET', value: process.env.JWT_SECRET },
    { key: 'JWT_EXPIRES_IN', value: process.env.JWT_EXPIRES_IN }
  ];

  const missing = required.filter(item => !item.value).map(item => item.key);

  if (missing.length > 0) 
  {
    console.error(`\n❌ Variables de entorno faltantes:`);
    missing.forEach(key => console.error(`   - ${key}`));
    console.error(`\n💡 Verifica tu archivo .env\n`);
    
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }
};
