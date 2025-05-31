
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MigrantService } from '@/services/migrantService';
import { MigrantQueryParams, SortOption, FilterOptions } from '@/types/admin';
import { Person } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useMigrants = (params: MigrantQueryParams) => {
  return useQuery({
    queryKey: ['migrants', params],
    queryFn: () => MigrantService.getMigrants(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMigrantMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMigrant = useMutation({
    mutationFn: MigrantService.createMigrant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrants'] });
      toast({
        title: "Success",
        description: "Migrant record created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create migrant record",
        variant: "destructive",
      });
    },
  });

  const updateMigrant = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Person> }) =>
      MigrantService.updateMigrant(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrants'] });
      toast({
        title: "Success",
        description: "Migrant record updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update migrant record",
        variant: "destructive",
      });
    },
  });

  const deleteMigrant = useMutation({
    mutationFn: MigrantService.deleteMigrant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrants'] });
      toast({
        title: "Success",
        description: "Migrant record deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete migrant record",
        variant: "destructive",
      });
    },
  });

  return {
    createMigrant,
    updateMigrant,
    deleteMigrant,
  };
};
