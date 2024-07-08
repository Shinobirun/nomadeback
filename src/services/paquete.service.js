import { pool } from '../db.js';

export const createPaqueteTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS paquetes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100),
        informacion VARCHAR(500),
        foto_url VARCHAR(255),
        precio DECIMAL(10, 2),
        tipo VARCHAR(50)
      )
    `);
    console.log('Tabla de paquetes creada/verificada correctamente');
  } catch (error) {
    console.error('Error al crear la tabla de paquetes:', error);
    throw error;
  }
};

export const createPaquete = async (paqueteData) => {
  const { titulo, informacion, foto_url, precio, tipo } = paqueteData;
  try {
    await pool.query('INSERT INTO paquetes (titulo, informacion, foto_url, precio, tipo) VALUES (?, ?, ?, ?, ?)', [titulo, informacion, foto_url, precio, tipo]);
    console.log('Paquete creado exitosamente');
  } catch (error) {
    console.error('Error al crear el paquete:', error);
    throw error;
  }
};

export const getPaqueteById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM paquetes WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el paquete por ID:', error);
    throw error;
  }
};

export const getAllPaquetes = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM paquetes');
    return rows;
  } catch (error) {
    console.error('Error al obtener todos los paquetes:', error);
    throw error;
  }
};

export const getPaquetesByTipo = async (tipo) => {
  try {
    const [rows] = await pool.query('SELECT * FROM paquetes WHERE tipo = ?', [tipo]);
    return rows;
  } catch (error) {
    console.error('Error al obtener paquetes por tipo:', error);
    throw error;
  }
};

export const updatePaquete = async (id, paqueteData) => {
  const { titulo, informacion, foto_url, precio, tipo } = paqueteData;
  try {
    await pool.query('UPDATE paquetes SET titulo = ?, informacion = ?, foto_url = ?, precio = ?, tipo = ? WHERE id = ?', [titulo, informacion, foto_url, precio, tipo, id]);
    console.log('Paquete actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el paquete:', error);
    throw error;
  }
};

export const deletePaquete = async (id) => {
  try {
    await pool.query('DELETE FROM paquetes WHERE id = ?', [id]);
    console.log('Paquete eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el paquete:', error);
    throw error;
  }
};