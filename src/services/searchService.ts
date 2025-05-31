
import { ApiService } from './apiService';
import { Person, SearchFilters } from '@/types';
import { sanitizeFilters } from '@/utils/textUtils';

export class SearchService {
  static async searchAllPages(filters: SearchFilters): Promise<Person[]> {
    const sanitizedFilters = sanitizeFilters(filters);
    let allResults: Person[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      try {
        const response = await ApiService.getMigrants(currentPage, 10, sanitizedFilters);
        allResults = [...allResults, ...response.data];
        
        hasMorePages = currentPage < response.totalPages;
        currentPage++;
        
        // Add a small delay to prevent overwhelming the server
        if (hasMorePages) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error('Error fetching search results page:', currentPage, error);
        hasMorePages = false;
      }
    }
    
    return allResults;
  }

  static async searchSinglePage(filters: SearchFilters, page = 1, limit = 10): Promise<{ data: Person[]; total: number; totalPages: number }> {
    const sanitizedFilters = sanitizeFilters(filters);
    return ApiService.getMigrants(page, limit, sanitizedFilters);
  }
}
