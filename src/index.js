import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import { createUserTable, createUserdataTable, createPaqueteTable, createHistorialTable } from './db.js';
import router from './routes/paquete.routes.js';
import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import paqueteRoutes from './routes/paquete.routes.js';
import historialRoutes from './routes/historial.routes.js';

const app = express();
const PORT = process.env.PORT || 4010;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de CSP con helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'http://localhost:4000'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos desde la carpeta de uploads
app.use('/uploads', express.static('uploads'));

// Configura las rutas
app.use(indexRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api', paqueteRoutes);
app.use('/api', historialRoutes);

// Función para inicializar la aplicación
const initializeApp = async () => {
  try {
    await createUserTable();
    console.log('Tabla de usuarios creada exitosamente (si no existía)');
    await createUserdataTable();
    console.log('Tabla de userdata creada exitosamente (si no existía)');
    await createPaqueteTable();
    console.log('Tabla de paquetes creada exitosamente (si no existía)');
    await createHistorialTable();
    console.log('Tabla de historiales creada exitosamente (si no existía)');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
    process.exit(1);
  }
};

// Inicializa la aplicación y luego escucha en el puerto
initializeApp()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al inicializar la aplicación:', error);
    process.exit(1);
  });
