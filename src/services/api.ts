import axios from 'axios';
import type { UserProfile, DashboardStats, CallSession, CallStats } from '../types';

const BASE_URL = 'https://mock-backend-hintro.vercel.app';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getProfile = async (userId: string): Promise<UserProfile> => {
  const { data } = await api.get('/api/auth/profile', {
    headers: { 'x-user-id': userId },
  });
  return data;
};

export const getDashboard = async (userId: string): Promise<DashboardStats> => {
  const { data } = await api.get('/api/auth/dashboard', {
    headers: { 'x-user-id': userId },
  });
  return data;
};

export const getCallStats = async (userId: string): Promise<CallStats> => {
  const { data } = await api.get('/api/call-sessions/stats', {
    headers: { 'x-user-id': userId },
  });
  return data;
};

export const getCallHistory = async (userId: string, limit: number = 10): Promise<CallSession[]> => {
  const { data } = await api.get(`/api/call-sessions?limit=${limit}`, {
    headers: { 'x-user-id': userId },
  });
  return data;
};

export default api;
