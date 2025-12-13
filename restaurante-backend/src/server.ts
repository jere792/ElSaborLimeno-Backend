// src/server.ts

import app from './app.js';
import { connectDatabase } from './shared/config/db.config.js';
import { validateJWTConfig } from './shared/config/jwt.config.js';
import { validateEnvConfig, showConfig, envConfig } from './shared/config/env.config.js';

const PORT = envConfig.port;

async function startServer() {
  try {
    // 1. Validar variables de entorno
    validateEnvConfig();

    // 2. Validar configuración JWT
    validateJWTConfig();

    // 3. Mostrar configuración
    showConfig();

    // 4. Conectar a la base de datos
    console.log('🔄 Conectando a la base de datos...');
    await connectDatabase();
    console.log('✅ Base de datos conectada\n');

    // 5. Iniciar servidor
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 Servidor iniciado exitosamente');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Escuchando en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
      console.log(`💚 Health check: http://localhost:${PORT}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });
  } catch (error: any) {
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ ERROR FATAL AL INICIAR');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(`📛 ${error.message}\n`);
    
    if (error.message.includes('Login failed') || error.message.includes('password')) {
      console.error('💡 Soluciones posibles:');
      console.error('   1. Verifica DB_USER y DB_PASSWORD en .env');
      console.error('   2. Verifica que SQL Server esté corriendo');
      console.error('   3. Verifica que el usuario tenga permisos\n');
    } else if (error.message.includes('server')) {
      console.error('💡 Soluciones posibles:');
      console.error('   1. Verifica DB_SERVER en .env');
      console.error('   2. Verifica que SQL Server esté accesible');
      console.error('   3. Verifica el firewall\n');
    }
    
    process.exit(1);
  }
}

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

startServer();
