
import { useState, useCallback, useEffect } from 'react';
import { Person, SearchFilters } from '@/types';
import { ApiService } from '@/services/apiService';

export const useSearch = () => {
  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await ApiService.searchPersons(filters);
      setResults(results);
    } catch (err) {
      setError('Failed to search persons');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFeaturedResults = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.getAllPersons(1, 4);
      setResults(response.data);
    } catch (err) {
      setError('Failed to load featured persons');
      console.error('Featured results error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasSearched) {
      getFeaturedResults();
    }
  }, [getFeaturedResults, hasSearched]);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    search,
    getFeaturedResults
  };
};
