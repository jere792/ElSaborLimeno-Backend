import express from 'express';
import cors from 'cors';

const app = express();

// Configurar CORS para permitir peticiones desde Angular
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de El Sabor Limeño funcionando correctamente' 
  });
});

// Aquí irán tus rutas
// app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/pedidos', pedidosRoutes);

export default app;
