import sql from 'mssql';

let pool: sql.ConnectionPool | null = null;

const getDbConfig = (): sql.config => {
  return {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
      enableArithAbort: true,
      connectTimeout: 30000,
      requestTimeout: 30000
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
};

export const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    if (pool?.connected) {
      return pool;
    }

    const dbConfig = getDbConfig();
    pool = await sql.connect(dbConfig);

    pool.on('error', () => {
      pool = null;
    });

    return pool;
  } catch (error) {
    pool = null;
    throw new Error('No se pudo conectar a la base de datos');
  }
};

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
    const currentPool = pool?.connected ? pool : await connectDB();
    const result = await currentPool.request().query('SELECT 1 AS test');
    return result.recordset[0].test === 1;
  } catch (error) {
    return false;
  }
};

export { sql };
