import { Router } from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

// Crear un nuevo usuario
router.post('/users', createUser);

// Obtener información de un usuario por su ID
router.get('/users/:id', getUserById);

// Actualizar un usuario por su ID
router.put('/users/:id', updateUser);

// Eliminar un usuario por su ID
router.delete('/users/:id', deleteUser);

export default router;
