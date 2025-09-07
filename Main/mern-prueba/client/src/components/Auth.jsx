import React, { useState } from 'react';
import { api } from '../api';

export default function Auth({ onAuth }){
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    const res = isLogin ? await api.login({ email: form.email, password: form.password })
                        : await api.register(form);
    if(res.error){ setError(res.error); return; }
    onAuth(res);
  };

  return (
    <div className="card">
      <h2>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
      <form onSubmit={submit}>
        {!isLogin && (
          <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        )}
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input placeholder="Contraseña" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        {error && <div className="error">{error}</div>}
        <button type="submit">{isLogin ? 'Entrar' : 'Registrarme'}</button>
      </form>
      <button className="link" onClick={()=>setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
}
