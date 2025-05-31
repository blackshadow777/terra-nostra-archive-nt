
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Person, SearchFilters } from '@/types';
import { ApiService } from '@/services/apiService';

export const usePersonSearch = () => {
  const queryClient = useQueryClient();

  const searchPersons = useMutation({
    mutationFn: (filters: SearchFilters) => ApiService.searchPersons(filters),
    onSuccess: (data) => {
      // Cache individual persons for detail views
      data.forEach((person) => {
        queryClient.setQueryData(['person', person.person_id], person);
      });
    },
  });

  const getFeaturedPersons = useQuery({
    queryKey: ['persons', 'featured'],
    queryFn: () => ApiService.getAllPersons(1, 4),
    select: (data) => data.data,
  });

  const getAllPersons = useQuery({
    queryKey: ['persons', 'all'],
    queryFn: () => ApiService.getAllPersons(),
    select: (data) => data.data,
  });

  return {
    searchPersons,
    getFeaturedPersons,
    getAllPersons,
    isSearching: searchPersons.isPending,
    searchResults: searchPersons.data || [],
    searchError: searchPersons.error,
  };
};

export const usePersonById = (id: number) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => ApiService.getPersonById(id),
    enabled: !!id,
  });
};
