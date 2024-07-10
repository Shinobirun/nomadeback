import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Agregar helmet para la configuración de seguridad
import { createUserTable, createPaqueteTable, createHistorialTable } from './db.js';
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
      defaultSrc: ["'self'"], // Permite recursos desde el mismo origen
      scriptSrc: ["'self'"],  // Permite scripts desde el mismo origen
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],  // Permite estilos desde el mismo origen y Google Fonts
      imgSrc: ["'self'", 'data:', 'http://localhost:4000'],  // Permite imágenes desde el mismo origen y URLs de datos
      connectSrc: ["'self'"],  // Permite conexiones desde el mismo origen
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],  // Permite fuentes desde el mismo origen y Google Fonts
      frameSrc: ["'none'"],    // Bloquea todos los iframes
      objectSrc: ["'none'"],   // Bloquea todos los objetos
      upgradeInsecureRequests: [],  // Opción para actualizar solicitudes no seguras (puedes agregar `['https:']` si lo deseas)
    },
  },
}));

// Configura las rutas
app.use(indexRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api', paqueteRoutes);
app.use('/api', historialRoutes);

// Función para inicializar la aplicación
const initializeApp = async () => {
  try {
    // Crea las tablas si no existen
    await createUserTable();
    console.log('Tabla de usuarios creada exitosamente (si no existía)');

    await createPaqueteTable();
    console.log('Tabla de paquetes creada exitosamente (si no existía)');

    await createHistorialTable();
    console.log('Tabla de historiales creada exitosamente (si no existía)');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
    process.exit(1); // Termina la aplicación si hay un error crítico
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
