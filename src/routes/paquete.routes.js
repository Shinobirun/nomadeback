import { Router } from 'express';
import { createPaquete } from '../models/paquete.model.js';

const router = Router();

router.post('/paquetes', async (req, res) => {
  try {
    await createPaquete(req.body);
    res.status(201).send('Paquete creado exitosamente');
  } catch (err) {
    res.status(500).send('Error al crear el paquete');
  }
});

export default router;
