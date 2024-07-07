import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/task.controllers.js';

const router = Router();

// Obtener todas las tareas
router.get('/task', getTasks);

// Crear una nueva tarea
router.post('/task', createTask);

// Actualizar una tarea por ID
router.put('/task/:id', updateTask);

// Obtener una tarea por ID
router.get('/task/:id', getTask);

// Eliminar una tarea por ID
router.delete('/task/:id', deleteTask);

export default router;