import app from './app.js';
import { connectDatabase } from './shared/config/db.config.js';
import { envConfig } from './shared/config/env.config.js';

const PORT = envConfig.port;

async function startServer() {
  await connectDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
