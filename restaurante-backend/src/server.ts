import { loadEnv, validateEnv, showConfig, getAppConfig } from './shared/config/env.config.js';
import { validateJWTConfig } from './shared/config/jwt.config.js';
import { connectDB, checkConnection } from './shared/config/db.config.js';
import app from './app.js';


const startServer = async () => {
  try 
  {
    loadEnv();
    validateEnv();
    validateJWTConfig();
    showConfig();

    console.log('🔄 Conectando a la base de datos...');
    await connectDB();
    
    const dbOk = await checkConnection();
    if (!dbOk) 
    {
      throw new Error('La base de datos no responde');
    }
    
    console.log('✅ Base de datos conectada\n');

    const appConfig = getAppConfig();
    
    app.listen(appConfig.port, () => {
      console.log('🎉 Servidor iniciado exitosamente');
      console.log(`🚀 Escuchando en http://localhost:${appConfig.port}`);
      console.log(`📡 API disponible en http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
      console.log(`💚 Health check: http://localhost:${appConfig.port}/health\n`);
    });

  } catch (error: any) {
    console.error('❌ Error fatal al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
