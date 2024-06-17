import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/users', userController.createUserHandler);

// Otras rutas y controladores para usuarios

export default router;
