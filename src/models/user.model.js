import { pool } from '../db.js';
import bcrypt from 'bcrypt';

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const { username, email, password, first_name, last_name, puntos, tipo } = userData;

    // Verificar si el correo electrónico ya está registrado
    const [existingUser] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      throw new Error('Email already in use');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [resultUser] = await pool.query(
      'INSERT INTO User (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, first_name, last_name]
    );

    const userId = resultUser.insertId;

    // Insertar datos en la tabla Userdata
    await pool.query(
      'INSERT INTO Userdata (user_id, puntos, tipo) VALUES (?, ?, ?)',
      [userId, puntos, tipo]
    );

    return { id: userId, username, email, first_name, last_name, puntos, tipo };
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const [rows] = await pool.query(
      'SELECT u.id, u.username, u.email, u.first_name, u.last_name, ud.puntos, ud.tipo, ud.foto_path FROM User u LEFT JOIN Userdata ud ON u.id = ud.user_id WHERE u.id = ?',
      [id]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};

// Actualizar un usuario por ID
export const updateUser = async (id, userData) => {
  try {
    const { username, email, password, puntos, tipo, foto_path } = userData;

    // Encriptar la nueva contraseña si está presente
    let query = 'UPDATE User SET username = ?, email = ?';
    const params = [username, email];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    await pool.query(query, params);

    // Actualizar datos en Userdata
    await pool.query(
      'UPDATE Userdata SET puntos = ?, tipo = ?, foto_path = ? WHERE user_id = ?',
      [puntos, tipo, foto_path, id]
    );

    return { id, username, email, puntos, tipo, foto_path };
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  try {
    await pool.query('DELETE FROM Userdata WHERE user_id = ?', [id]);
    await pool.query('DELETE FROM User WHERE id = ?', [id]);
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
};
