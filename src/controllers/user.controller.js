import { pool } from '../db.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, password, puntos, tipo } = req.body;

    // Crear el usuario en la tabla User
    const [resultUser] = await pool.query(
      'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );

    const userId = resultUser.insertId;

    // Crear el usuario en la tabla Userdata
    await pool.query(
      'INSERT INTO Userdata (user_id, puntos, tipo) VALUES (?, ?, ?)',
      [userId, puntos, tipo]
    );

    res.status(201).json({ id: userId, username, email, puntos, tipo });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtener información de un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT u.id, u.username, u.email, ud.puntos, ud.tipo FROM User u LEFT JOIN Userdata ud ON u.id = ud.user_id WHERE u.id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Actualizar un usuario por su ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, puntos, tipo } = req.body;

    await pool.query(
      'UPDATE User SET username = ?, email = ?, password = ? WHERE id = ?',
      [username, email, password, id]
    );

    await pool.query(
      'UPDATE Userdata SET puntos = ?, tipo = ? WHERE user_id = ?',
      [puntos, tipo, id]
    );

    res.json({ id, username, email, puntos, tipo });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM Userdata WHERE user_id = ?', [id]);
    await pool.query('DELETE FROM User WHERE id = ?', [id]);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
