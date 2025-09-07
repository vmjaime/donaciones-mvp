import { Router } from 'express';
import Thread from '../models/Thread.js';
import Donation from '../models/Donation.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Crear/obtener hilo entre solicitante y donador para una donación
router.post('/start', auth, async (req, res) => {
  const { donationId } = req.body;
  const donation = await Donation.findById(donationId);
  if (!donation) return res.status(404).json({ error: 'Donación no existe' });
  if (String(donation.donor) === req.user.id) return res.status(400).json({ error: 'El donador no puede solicitarse a sí mismo' });

  let thread = await Thread.findOne({ donation: donationId, requester: req.user.id, donor: donation.donor });
  if (!thread) {
    thread = await Thread.create({ donation: donationId, donor: donation.donor, requester: req.user.id, messages: [] });
  }
  res.json(thread);
});

// Enviar mensaje
router.post('/:id/message', auth, async (req, res) => {
  const { text } = req.body;
  const th = await Thread.findById(req.params.id);
  if (!th) return res.status(404).json({ error: 'Hilo no existe' });
  const isMember = [String(th.donor), String(th.requester)].includes(req.user.id);
  if (!isMember) return res.status(403).json({ error: 'No autorizado' });
  th.messages.push({ sender: req.user.id, text });
  await th.save();
  res.json(th);
});

// Mis hilos
router.get('/mine', auth, async (req, res) => {
  const me = req.user.id;
  const list = await Thread.find({ $or: [{ donor: me }, { requester: me }] })
    .populate('donation', 'title status')
    .populate('donor', 'name')
    .populate('requester', 'name')
    .sort({ updatedAt: -1 });
  res.json(list);
});

export default router;

//mensajería para contacto donaciones
