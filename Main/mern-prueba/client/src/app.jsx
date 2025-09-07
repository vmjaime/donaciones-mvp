import React, { useEffect, useState } from 'react';
import { api, setToken, getToken } from './api';
import Auth from './components/Auth';
import DonationList from './components/DonationList';
import DonationForm from './components/DonationForm';
import DonationDetail from './components/DonationDetail';
import ThreadView from './components/ThreadView';

export default function App(){
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [threads, setThreads] = useState([]);

  useEffect(()=>{ load(); if(getToken()) refreshThreads(); },[]);
  async function load(){ setDonations(await api.listDonations()); }
  async function refreshThreads(){ setThreads(await api.myThreads()); }

  return (
    <div className="container">
      <h1>Donaciones de Alimentos — MVP</h1>
      {!user && <Auth onAuth={(data)=>{ setUser(data.user); setToken(data.token); refreshThreads(); }} />}
      {user && (
        <div className="grid">
          <div>
            <DonationForm onCreate={async ()=>{ await load(); }} />
            <DonationList donations={donations} onSelect={setSelected} />
          </div>
          <div>
            {selected && <DonationDetail
              donationId={selected}
              onStart={async (donationId)=>{ await api.startThread(donationId); await refreshThreads(); }}
              onStatusChange={async (id, status)=>{ await api.setDonationStatus(id, status); await load(); }}
            />}
            <ThreadView threads={threads} onSend={async (id, text)=>{ await api.sendMessage(id, text); await refreshThreads(); }} />
          </div>
        </div>
      )}
    </div>
  );
}
