import { Router } from 'express';
import Donation from '../models/Donation.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Crear donación (donador)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, productInfo, location, expiresAt } = req.body;
    const donation = await Donation.create({
      title, description, productInfo, location, expiresAt,
      donor: req.user.id
    });
    res.json(donation);
  } catch (e) { res.status(500).json({ error: 'No se pudo crear' }); }
});

// Listar
router.get('/', async (req, res) => {
  const items = await Donation.find().sort({ createdAt: -1 }).populate('donor', 'name email');
  res.json(items);
});

// Cambiar estado: disponible/reservada/entregada
router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  if (!['disponible', 'reservada', 'entregada'].includes(status)) return res.status(400).json({ error: 'Estado inválido' });
  const d = await Donation.findById(req.params.id);
  if (!d) return res.status(404).json({ error: 'No hallado' });
  if (String(d.donor) !== req.user.id) return res.status(403).json({ error: 'Solo el donador puede cambiar estado' });
  d.status = status;
  await d.save();
  res.json(d);
});

// Obtener una donación
router.get('/:id', async (req, res) => {
  const d = await Donation.findById(req.params.id).populate('donor', 'name email');
  if (!d) return res.status(404).json({ error: 'No hallado' });
  res.json(d);
});

export default router;
