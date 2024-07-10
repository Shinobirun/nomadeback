import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env



const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT), // Parsea el puerto a entero
});



// Probar conexión a la base de datos
const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    await connection.release();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

testDBConnection();

export { pool };

export const createUserTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;
    const connection = await pool.getConnection();
    await connection.execute(query);
    await connection.release(); // Liberar la conexión después de usarla
    console.log('Tabla de usuarios creada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla de usuarios:', error);
    throw error; // O maneja el error según tu flujo de aplicación
  }
};

export const createPaqueteTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS paquetes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        informacion VARCHAR(500) NOT NULL,
        foto_url VARCHAR(255),
        precio DECIMAL(10, 2) NOT NULL,
        tipo VARCHAR(50)
      )
    `;
    const connection = await pool.getConnection();
    await connection.execute(query);
    await connection.release(); // Liberar la conexión después de usarla
    console.log('Tabla de paquetes creada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla de paquetes:', error);
    throw error; // O maneja el error según tu flujo de aplicación
  }
};

export const createHistorialTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS historiales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        paquete_id INT NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        fecha DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (paquete_id) REFERENCES paquetes(id)
      )
    `;
    const connection = await pool.getConnection();
    await connection.execute(query);
    await connection.release(); // Liberar la conexión después de usarla
    console.log('Tabla de historiales creada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla de historiales:', error);
    throw error; // O maneja el error según tu flujo de aplicación
  }
};
