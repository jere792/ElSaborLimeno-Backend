// src/shared/config/db.config.ts

import sql from 'mssql';
import { envConfig } from './env.config.js';

const dbConfig: sql.config = {
  server: envConfig.database.server,
  database: envConfig.database.database,
  user: envConfig.database.user,
  password: envConfig.database.password,
  options: envConfig.database.options,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Pool singleton
let pool: sql.ConnectionPool | null = null;

// Crear conexión
export const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    if (pool?.connected) {
      return pool;
    }

    pool = await new sql.ConnectionPool(dbConfig).connect();
    
    pool.on('error', (err) => {
      console.error('💥 Error en pool de BD:', err.message);
      pool = null;
    });

    return pool;
  } catch (error: any) {
    pool = null;
    console.error('❌ Error de conexión a BD:', error.message);
    throw new Error(`No se pudo conectar a la base de datos: ${error.message}`);
  }
};

// Promise del pool
export const poolPromise = connectDB();

// Alias
export const connectDatabase = connectDB;

// Obtener pool
export const getPool = (): sql.ConnectionPool => {
  if (!pool?.connected) {
    throw new Error('Base de datos no conectada');
  }
  return pool;
};

// Cerrar conexión
export const closeDB = async (): Promise<void> => {
  if (pool) {
    await pool.close();
    pool = null;
  }
};

// Verificar conexión
export const checkConnection = async (): Promise<boolean> => {
  try {
    const currentPool = await poolPromise;
    const result = await currentPool.request().query('SELECT 1 AS test');
    return result.recordset[0].test === 1;
  } catch (error) {
    return false;
  }
};

export { sql };
