import { pool } from "../db.js";


export const getTasks = (req, res) => {
    res.send('obteniendo tareas');
}

export const getTask = (req, res) => {
    res.send('obteniendo tarea');
}

export const createTask = (req, res) => {
    const {title, description} = req.body
    pool.query('')
    res.send('creando tarea');
}

export const updateTask = (req, res) => {
    res.send('actualizando tarea');
}

export const deleteTask = (req, res) => {
    res.send('borrando tarea');
}
