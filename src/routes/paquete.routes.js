import { Router } from 'express';
import {
  createPaquete,
  getPaqueteById,
  getAllPaquetes,
  getPaquetesByTipo,
  updatePaquete,
  deletePaquete
} from '../services/paquete.service.js';

const router = Router();

// Crear un nuevo paquete
router.post('/paquetes', async (req, res) => {
  try {
    await createPaquete(req.body);
    res.status(201).send('Paquete creado exitosamente');
  } catch (err) {
    console.error('Error al crear el paquete:', err);
    res.status(500).send('Error al crear el paquete');
  }
});

// Obtener todos los paquetes
router.get('/paquetes', async (req, res) => {
  try {
    const paquetes = await getAllPaquetes();
    res.json(paquetes);
  } catch (err) {
    console.error('Error al obtener los paquetes:', err);
    res.status(500).send('Error al obtener los paquetes');
  }
});

// Obtener un paquete por ID
router.get('/paquetes/:id', async (req, res) => {
  try {
    const paquete = await getPaqueteById(req.params.id);
    if (!paquete) {
      res.status(404).send('Paquete no encontrado');
    } else {
      res.json(paquete);
    }
  } catch (err) {
    console.error('Error al obtener el paquete:', err);
    res.status(500).send('Error al obtener el paquete');
  }
});

// Obtener paquetes por tipo
router.get('/paquetes/tipo/:tipo', async (req, res) => {
  try {
    const paquetes = await getPaquetesByTipo(req.params.tipo);
    res.json(paquetes);
  } catch (err) {
    console.error('Error al obtener los paquetes por tipo:', err);
    res.status(500).send('Error al obtener los paquetes por tipo');
  }
});

// Actualizar un paquete por ID
router.put('/paquetes/:id', async (req, res) => {
  try {
    await updatePaquete(req.params.id, req.body);
    res.send('Paquete actualizado exitosamente');
  } catch (err) {
    console.error('Error al actualizar el paquete:', err);
    res.status(500).send('Error al actualizar el paquete');
  }
});

// Eliminar un paquete por ID
router.delete('/paquetes/:id', async (req, res) => {
  try {
    await deletePaquete(req.params.id);
    res.send('Paquete eliminado exitosamente');
  } catch (err) {
    console.error('Error al eliminar el paquete:', err);
    res.status(500).send('Error al eliminar el paquete');
  }
});

export default router;
