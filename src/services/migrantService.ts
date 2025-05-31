
import { api } from './apiService';
import { Person } from '@/types';
import { MigrantQueryParams, ApiResponse } from '@/types/admin';

export class MigrantService {
  static async getMigrants(params: MigrantQueryParams): Promise<ApiResponse<Person[]>> {
    const queryParams = new URLSearchParams();
    
    // Add pagination
    queryParams.append('page', params.page.toString());
    queryParams.append('per_page', params.limit.toString());
    
    // Add sorting - map to backend parameters
    queryParams.append('sort_by', String(params.sort.field));
    queryParams.append('sort_order', params.sort.direction);
    
    // Add filters - map to backend parameter names
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'fullName') {
          queryParams.append('full_name', value.toString());
        } else if (key === 'date_range' && typeof value === 'object') {
          if (value.start) queryParams.append('arrival_from', value.start);
          if (value.end) queryParams.append('arrival_to', value.end);
        } else {
          // Map frontend keys to backend keys
          const backendKey = key === 'fullName' ? 'full_name' : key;
          queryParams.append(backendKey, value.toString());
        }
      }
    });

    const { data } = await api.get(`/migrants?${queryParams.toString()}`);
    
    // Handle both paginated and non-paginated responses
    if (data.data.data) {
      // Paginated response
      return {
        data: data.data.data,
        total: data.data.total,
        page: data.data.current_page,
        limit: data.data.per_page,
        totalPages: data.data.last_page,
      };
    } else {
      // Non-paginated response
      return {
        data: data.data,
        total: data.data.length,
        page: 1,
        limit: data.data.length,
        totalPages: 1,
      };
    }
  }

  static async searchMigrantsAllPages(filters: any): Promise<Person[]> {
    let allResults: Person[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('per_page', '50'); // Larger page size for bulk search
      
      // Add search filters - map to backend parameter names
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          const backendKey = key === 'fullName' ? 'full_name' : key;
          queryParams.append(backendKey, value.toString());
        }
      });

      try {
        const { data } = await api.get(`/migrants?${queryParams.toString()}`);
        
        if (data.data.data) {
          // Paginated response
          allResults = [...allResults, ...data.data.data];
          hasMorePages = currentPage < data.data.last_page;
        } else {
          // Non-paginated response
          allResults = [...allResults, ...data.data];
          hasMorePages = false;
        }
        
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
