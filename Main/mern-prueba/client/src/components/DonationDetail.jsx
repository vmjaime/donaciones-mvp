import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function DonationDetail({ donationId, onStart, onStatusChange }){
  const [d, setD] = useState(null);

  useEffect(()=>{ (async()=>{ setD(await api.getDonation(donationId)); })(); },[donationId]);
  if(!d) return null;

  return (
    <div className="card">
      <h3>Detalle</h3>
      <div><strong>{d.title}</strong></div>
      <div>{d.description}</div>
      <div>Producto: {d.productInfo}</div>
      <div>Donador: {d.donor?.name}</div>
      <div>Estado: {d.status}</div>
      <div className="actions">
        <button onClick={()=>onStart(d._id)}>Contactar al donador</button>
        <select value={d.status} onChange={async (e)=>{ await onStatusChange(d._id, e.target.value); const fresh = await api.getDonation(d._id); setD(fresh); }}>
          <option value="disponible">disponible</option>
          <option value="reservada">reservada</option>
          <option value="entregada">entregada</option>
        </select>
      </div>
    </div>
  );
}
