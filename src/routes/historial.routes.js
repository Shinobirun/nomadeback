import { Router } from 'express';
import { createHistorial } from '../models/historial.model.js';

const router = Router();

router.post('/historial', async (req, res) => {
  try {
    await createHistorial(req.body);
    res.status(201).send('Historial creado exitosamente');
  } catch (err) {
    res.status(500).send('Error al crear el historial');
  }
});

export default router;
