
import { useState, useCallback, useEffect } from 'react';
import { Migrant, SearchFilters } from '@/types';
import { ApiService } from '@/services/apiService';

export const useSearch = () => {
  const [results, setResults] = useState<Migrant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await ApiService.searchMigrants(filters);
      setResults(results);
    } catch (err) {
      setError('Failed to search migrants');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFeaturedResults = useCallback(async () => {
    setIsLoading(true);
    try {
      const allMigrants = await ApiService.getAllMigrants();
      setResults(allMigrants.slice(0, 4));
    } catch (err) {
      setError('Failed to load featured migrants');
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
