
import { api } from './apiService';
import { Person } from '@/types';
import { MigrantQueryParams, ApiResponse } from '@/types/admin';

export class MigrantService {
  static async getMigrants(params: MigrantQueryParams): Promise<ApiResponse<Person[]>> {
    const queryParams = new URLSearchParams();
    
    // Add pagination
    queryParams.append('page', params.page.toString());
    queryParams.append('limit', params.limit.toString());
    
    // Add sorting
    queryParams.append('sort_field', String(params.sort.field));
    queryParams.append('sort_direction', params.sort.direction);
    
    // Add filters
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'date_range' && typeof value === 'object') {
          if (value.start) queryParams.append('date_start', value.start);
          if (value.end) queryParams.append('date_end', value.end);
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const { data } = await api.get(`/migrants?${queryParams.toString()}`);
    return data;
  }

  static async searchMigrantsAllPages(filters: any): Promise<Person[]> {
    let allResults: Person[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '10');
      
      // Add search filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      try {
        const { data } = await api.get(`/migrants?${queryParams.toString()}`);
        allResults = [...allResults, ...data.data];
        
        hasMorePages = currentPage < data.totalPages;
        currentPage++;
      } catch (error) {
        console.error('Error fetching page:', currentPage, error);
        hasMorePages = false;
      }
    }
    
    return allResults;
  }

  static async getMigrantById(id: number): Promise<Person> {
    const { data } = await api.get(`/migrants/${id}`);
    return data.data;
  }

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

  static async uploadPhotos(id: number, photos: FileList): Promise<string[]> {
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

  static async getMigrantPhotos(id: number): Promise<string[]> {
    const { data } = await api.get(`/migrants/${id}/photos`);
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
}
