import React, { useState } from 'react';

export default function ThreadView({ threads, onSend }){
  const [textById, setTextById] = useState({});

  return (
    <div className="card">
      <h3>Mensajes</h3>
      {threads.map(t => (
        <div key={t._id} className="thread">
          <div>
            <strong>{t.donation?.title}</strong> — con {t.donor?.name} / {t.requester?.name}
          </div>
          <div className="messages">
            {t.messages.map(m => (
              <div key={m._id} className="bubble">
                <div><em>{new Date(m.createdAt).toLocaleString()}</em></div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="row">
            <input placeholder="Escribe un mensaje" value={textById[t._id] || ''} onChange={e=>setTextById({ ...textById, [t._id]: e.target.value })} />
            <button onClick={()=>{ onSend(t._id, textById[t._id] || ''); setTextById({ ...textById, [t._id]: '' }); }}>Enviar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
