import { createUser, getUserById, updateUser, deleteUser } from '../models/user.model.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Crear un nuevo usuario
export const createUserHandler = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, puntos, tipo } = req.body;
    
    // Crear el usuario
    const user = await createUser({ username, email, password, first_name, last_name, puntos, tipo });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener información de un usuario por su ID
export const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await pool.query('SELECT * FROM User WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por su ID
export const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, puntos, tipo } = req.body;
    const foto_path = req.file ? req.file.path : null;

    const updatedUser = await updateUser(id, { username, email, password, puntos, tipo, foto_path });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por su ID
export const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUser(id);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Manejar el login
export const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Obtener el usuario por email
    const [user] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token y datos del usuario
    res.json({
      token,
      user: {
        id: user[0].id,
        username: user[0].username,
        first_name: user[0].first_name,
        last_name: user[0].last_name
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


// Exportar configuración de multer para ser usada en las rutas
export const uploadMiddleware = upload.single('foto');
