
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
  // Auth endpoints
  static async login(email: string, password: string): Promise<{ token: string; user: Admin }> {
    const { data } = await api.post('/login', { email, password });
    return data;
  }

  static async logout(): Promise<void> {
    await api.post('/logout');
    localStorage.removeItem('adminToken');
  }

  static async register(userData: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
    const { data } = await api.post('/register', userData);
    return data.data;
  }

  static async getCurrentUser(): Promise<Admin> {
    const { data } = await api.get('/user');
    return data.data;
  }

  static async updateAccount(updates: Partial<Admin>): Promise<Admin> {
    const { data } = await api.put('/user/account', updates);
    return data.data;
  }

  // Migrant endpoints (public)
  static async getMigrants(page = 1, limit = 10, filters?: any): Promise<{ data: Person[]; total: number; totalPages: number }> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const { data } = await api.get(`/migrants?${params.toString()}`);
    return data;
  }

  static async getMigrantById(id: number): Promise<Person> {
    const { data } = await api.get(`/migrants/${id}`);
    return data.data;
  }

  static async getMigrantPhotos(id: number): Promise<string[]> {
    const { data } = await api.get(`/migrants/${id}/photos`);
    return data.data;
  }

  // Admin migrant management (protected)
  static async createMigrant(migrant: Omit<Person, 'person_id'>): Promise<Person> {
    const { data } = await api.post('/migrants', migrant);
    return data.data;
  }

  static async updateMigrant(id: number, updates: Partial<Person>): Promise<Person> {
    const { data } = await api.put(`/migrants/${id}`, updates);
    return data.data;
  }

  static async deleteMigrant(id: number): Promise<void> {
    await api.delete(`/migrants/${id}`);
  }

  // Photo management (protected)
  static async uploadMigrantPhotos(id: number, photos: FileList): Promise<string[]> {
    const formData = new FormData();
    Array.from(photos).forEach((photo) => {
      formData.append('photos[]', photo);
    });

    const { data } = await api.post(`/migrants/${id}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  }

  static async setAsProfilePhoto(photoId: string): Promise<void> {
    await api.post(`/migrants/photos/${photoId}/set-as-profile`);
  }

  static async updatePhotoCaption(photoId: string, caption: string): Promise<void> {
    await api.put(`/migrants/photos/${photoId}/caption`, { caption });
  }

  static async deletePhoto(photoId: string): Promise<void> {
    await api.delete(`/migrants/photos/${photoId}`);
  }

  // User management (protected)
  static async getAllUsers(): Promise<Admin[]> {
    const { data } = await api.get('/users');
    return data.data;
  }

  // Dashboard endpoints (protected)
  static async getDashboardStats(): Promise<AnalyticsData> {
    const { data } = await api.get('/dashboard/stats');
    return data.data;
  }

  static async getActivityLogs(): Promise<any[]> {
    const { data } = await api.get('/activity-logs');
    return data.data;
  }

  // Legacy methods for backward compatibility
  static async searchPersons(filters: SearchFilters): Promise<Person[]> {
    const { data } = await this.getMigrants(1, 100, filters);
    return data;
  }

  static async getPersonById(id: number): Promise<Person> {
    return this.getMigrantById(id);
  }

  static async getAllPersons(page = 1, limit = 20): Promise<{ data: Person[]; total: number }> {
    return this.getMigrants(page, limit);
  }

  static async createPerson(person: Omit<Person, 'person_id'>): Promise<Person> {
    return this.createMigrant(person);
  }

  static async updatePerson(id: number, updates: Partial<Person>): Promise<Person> {
    return this.updateMigrant(id, updates);
  }

  static async deletePerson(id: number): Promise<void> {
    return this.deleteMigrant(id);
  }

  // Admin endpoints (protected)
  static async getAdmins(): Promise<Admin[]> {
    return this.getAllUsers();
  }

  static async createAdmin(admin: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
    return this.register(admin);
  }

  static async updateAdmin(id: number, updates: Partial<Admin>): Promise<Admin> {
    const { data } = await api.put(`/users/${id}`, updates);
    return data.data;
  }

  static async deleteAdmin(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  // Analytics endpoints
  static async getAnalytics(): Promise<AnalyticsData> {
    return this.getDashboardStats();
  }
}
