import { pool } from '../db.js';

export const createHistorialTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS HistorialViajes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      paquete_id INT,
      precio DECIMAL(10, 2),
      fecha DATE,
      FOREIGN KEY (user_id) REFERENCES User(id),
      FOREIGN KEY (paquete_id) REFERENCES PaqueteTuristico(id)
    )
  `);
};

export const createHistorial = async (historialData) => {
  const { user_id, paquete_id, precio, fecha } = historialData;
  await pool.query('INSERT INTO HistorialViajes (user_id, paquete_id, precio, fecha) VALUES (?, ?, ?, ?)', [user_id, paquete_id, precio, fecha]);
};