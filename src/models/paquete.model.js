import { pool } from '../db.js';

export const createPaqueteTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS PaqueteTuristico (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(100),
      informacion VARCHAR(500),
      foto_url VARCHAR(255),
      precio DECIMAL(10, 2),
      tipo VARCHAR(50)
    )
  `);
};

export const createPaquete = async (paqueteData) => {
  const { titulo, informacion, foto_url, precio, tipo } = paqueteData;
  await pool.query('INSERT INTO PaqueteTuristico (titulo, informacion, foto_url, precio, tipo) VALUES (?, ?, ?, ?, ?)', [titulo, informacion, foto_url, precio, tipo]);
};
