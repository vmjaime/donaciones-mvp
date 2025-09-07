import React from 'react';

export default function DonationList({ donations, onSelect }){
  return (
    <div className="card">
      <h3>Listado de donaciones</h3>
      {donations.map(d => (
        <div key={d._id} className="row" onClick={()=>onSelect(d._id)}>
          <div><strong>{d.title}</strong> — {d.productInfo}</div>
          <div>Estado: {d.status}</div>
        </div>
      ))}
    </div>
  );
}
