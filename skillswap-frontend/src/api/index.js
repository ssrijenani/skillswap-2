import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

export const getUsers    = ()         => api.get('/users');
export const getUserById = (id)       => api.get(`/users/${id}`);
export const createUser  = (data)     => api.post('/users', data);
export const updateUser  = (id, data) => api.patch(`/users/${id}`, data);

export const getMatches       = (userId) => api.get(`/matches/${userId}`);
export const requestSession   = (matchId) => api.post(`/matches/${matchId}/request`);

export const getSessions      = (userId) => api.get(`/sessions/${userId}`);
export const completeSession  = (id)     => api.patch(`/sessions/${id}/complete`);
export const cancelSession    = (id)     => api.delete(`/sessions/${id}`);

export default api;