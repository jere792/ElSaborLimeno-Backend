// src/shared/config/env.config.ts

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const envConfig = {
  // Entorno
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8080', 10),
  apiPrefix: process.env.API_PREFIX || '/api',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200',

  // Base de datos
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

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
};

// Validar configuración requerida
export const validateEnvConfig = (): void => {
  const required = [
    { key: 'DB_SERVER', value: process.env.DB_SERVER },
    { key: 'DB_NAME', value: process.env.DB_NAME },
    { key: 'DB_USER', value: process.env.DB_USER },
    { key: 'DB_PASSWORD', value: process.env.DB_PASSWORD },
    { key: 'JWT_SECRET', value: process.env.JWT_SECRET }
  ];

  const missing = required.filter(item => !item.value).map(item => item.key);

  if (missing.length > 0) {
    console.error(`\n❌ Variables de entorno faltantes:`);
    missing.forEach(key => console.error(`   - ${key}`));
    console.error(`\n💡 Verifica tu archivo .env\n`);
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }

  console.log('✅ Variables de entorno validadas');
};

// Función para mostrar configuración (solo en desarrollo)
export const showConfig = (): void => {
  if (envConfig.nodeEnv === 'development') {
    console.log('\n📋 Configuración:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🌍 Entorno: ${envConfig.nodeEnv}`);
    console.log(`🚀 Puerto: ${envConfig.port}`);
    console.log(`📊 DB: ${envConfig.database.database}`);
    console.log(`🖥️  Server: ${envConfig.database.server}`);
    console.log(`👤 User: ${envConfig.database.user}`);
    console.log(`🔗 CORS: ${envConfig.corsOrigin}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
};
