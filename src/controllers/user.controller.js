import { createUser, getUserById, updateUser, deleteUser } from '../models/user.model.js';
import multer from 'multer';

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

    const user = await getUserById(id);

    res.json(user);
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

// Exportar configuración de multer para ser usada en las rutas
export const uploadMiddleware = upload.single('foto');
