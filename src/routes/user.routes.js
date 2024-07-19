import express from 'express';
import { 
  createUserHandler, 
  getUserByIdHandler, 
  updateUserHandler, 
  deleteUserHandler, 
  uploadMiddleware 
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/users', uploadMiddleware, createUserHandler);
router.get('/users/:id', getUserByIdHandler);
router.put('/users/:id', uploadMiddleware, updateUserHandler);
router.delete('/users/:id', deleteUserHandler);

export default router;
