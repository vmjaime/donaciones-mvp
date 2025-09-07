import React, { useState } from 'react';
import { api } from '../api';

export default function DonationForm({ onCreate }){
  const [form, setForm] = useState({ title:'', description:'', productInfo:'', location:'', expiresAt:'' });

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.createDonation({ ...form, expiresAt: form.expiresAt || undefined });
    if(!res.error){ setForm({ title:'', description:'', productInfo:'', location:'', expiresAt:'' }); onCreate && onCreate(); }
  };

  return (
    <div className="card">
      <h3>Ofrecer donación</h3>
      <form onSubmit={submit}>
        <input placeholder="Título" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <textarea placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input placeholder="Info del producto (p. ej., 2 kg arroz)" value={form.productInfo} onChange={e=>setForm({...form, productInfo:e.target.value})} />
        <input placeholder="Ubicación" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <input type="datetime-local" value={form.expiresAt} onChange={e=>setForm({...form, expiresAt:e.target.value})} />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}
