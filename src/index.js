import express from 'express';
import { PORT } from './config.js';
import { createUserTable } from './db.js';
import { createPaqueteTable } from './db.js'; 
import { createHistorialTable } from './db.js'; 

import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import paqueteRoutes from './routes/paquete.routes.js';
import historialRoutes from './routes/historial.routes.js';

const app = express();
app.use(express.json()); // Middleware para manejar JSON en los cuerpos de las solicitudes

// Función para inicializar la aplicación
const initializeApp = async () => {
  try {
    // Crea la tabla de usuarios si no existe
    await createUserTable();
    console.log('Tabla de usuarios creada exitosamente (si no existía)');

    // Crea otras tablas si es necesario
    await createPaqueteTable();
    console.log('Tabla de paquetes creada exitosamente (si no existía)');

    await createHistorialTable();
    console.log('Tabla de historiales creada exitosamente (si no existía)');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
    process.exit(1); // Termina la aplicación si hay un error crítico
  }
};

// Configura las rutas
app.use(indexRoutes);
app.use('/api', taskRoutes); // Usar las rutas para tareas
app.use('/api', paqueteRoutes); // Usar las rutas para paquetes
app.use(paqueteRoutes);
app.use(historialRoutes);

// Inicializa la aplicación y luego escucha en el puerto
initializeApp().then(() => {
  app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
  });
}).catch(error => {
  console.error('Error al inicializar la aplicación:', error);
  process.exit(1);
});
