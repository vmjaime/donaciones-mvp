const API = 'http://localhost:4000/api';

export const setToken = (t) => localStorage.setItem('token', t);
export const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { 'Authorization': 'Bearer ' + getToken() } : {})
});

export const api = {
  async register(body) {
    const r = await fetch(`${API}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    return r.json();
  },
  async login(body) {
    const r = await fetch(`${API}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    return r.json();
  },
  async listDonations() {
    const r = await fetch(`${API}/donations`);
    return r.json();
  },
  async createDonation(body) {
    const r = await fetch(`${API}/donations`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    return r.json();
  },
  async getDonation(id) {
    const r = await fetch(`${API}/donations/${id}`);
    return r.json();
  },
  async setDonationStatus(id, status) {
    const r = await fetch(`${API}/donations/${id}/status`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ status }) });
    return r.json();
  },
  async startThread(donationId) {
    const r = await fetch(`${API}/threads/start`, { method: 'POST', headers: headers(), body: JSON.stringify({ donationId }) });
    return r.json();
  },
  async myThreads() {
    const r = await fetch(`${API}/threads/mine`, { headers: headers() });
    return r.json();
  },
  async sendMessage(threadId, text) {
    const r = await fetch(`${API}/threads/${threadId}/message`, { method: 'POST', headers: headers(), body: JSON.stringify({ text }) });
    return r.json();
  }
};
