import {Router} from 'express';
import  {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/task.controllers.js'

const router = Router()

router.get('/task', getTasks)

router.post('/task', updateTask)

router.put('/task/:id', createTask)

router.get('/task/:id', getTask)

router.delete('/task/:id', deleteTask)


export default router