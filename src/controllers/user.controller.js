import * as userService from '../services/user.service.js';

export const createUserHandler = async (req, res) => {
  try {
    const userId = await userService.createUser(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Otras funciones de controlador para usuarios
