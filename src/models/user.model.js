import { pool } from '../db.js';

export const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Userdata (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      puntos DECIMAL(10, 0),
      tipo VARCHAR(50),
      FOREIGN KEY (user_id) REFERENCES User(id)
    )
  `);
};

export const createUser = async (userData) => {
  const { user_id, puntos, tipo } = userData;
  await pool.query('INSERT INTO Userdata (user_id, puntos, tipo) VALUES (?, ?, ?)', [user_id, puntos, tipo]);
};
