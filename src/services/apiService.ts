
import axios from 'axios';
import { Person, Admin, SearchFilters, AnalyticsData } from '@/types';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export class ApiService {
  // Person/Migrant endpoints
  static async searchPersons(filters: SearchFilters): Promise<Person[]> {
    const { data } = await api.get('/persons/search', { params: filters });
    return data.data;
  }

  static async getPersonById(id: number): Promise<Person> {
    const { data } = await api.get(`/persons/${id}`);
    return data.data;
  }

  static async getAllPersons(page = 1, limit = 20): Promise<{ data: Person[]; total: number }> {
    const { data } = await api.get('/persons', { params: { page, limit } });
    return data;
  }

  static async createPerson(person: Omit<Person, 'person_id'>): Promise<Person> {
    const { data } = await api.post('/persons', person);
    return data.data;
  }

  static async updatePerson(id: number, updates: Partial<Person>): Promise<Person> {
    const { data } = await api.put(`/persons/${id}`, updates);
    return data.data;
  }

  static async deletePerson(id: number): Promise<void> {
    await api.delete(`/persons/${id}`);
  }

  // Admin endpoints
  static async getAdmins(): Promise<Admin[]> {
    const { data } = await api.get('/admins');
    return data.data;
  }

  static async createAdmin(admin: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
    const { data } = await api.post('/admins', admin);
    return data.data;
  }

  static async updateAdmin(id: number, updates: Partial<Admin>): Promise<Admin> {
    const { data } = await api.put(`/admins/${id}`, updates);
    return data.data;
  }

  static async deleteAdmin(id: number): Promise<void> {
    await api.delete(`/admins/${id}`);
  }

  // Analytics endpoints
  static async getAnalytics(): Promise<AnalyticsData> {
    const { data } = await api.get('/analytics');
    return data.data;
  }

  // Auth endpoints
  static async login(email: string, password: string): Promise<{ token: string; admin: Admin }> {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('adminToken');
  }
}
