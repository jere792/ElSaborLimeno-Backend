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

let pool: sql.ConnectionPool | null = null;

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
    throw new Error(`Error de conexión a BD: ${error.message}`);
  }
};

export const poolPromise = connectDB();
export const connectDatabase = connectDB;

export const getPool = (): sql.ConnectionPool => {
  if (!pool?.connected) {
    throw new Error('Base de datos no conectada');
  }
  return pool;
};

export const closeDB = async (): Promise<void> => {
  if (pool) {
    await pool.close();
    pool = null;
  }
};

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
