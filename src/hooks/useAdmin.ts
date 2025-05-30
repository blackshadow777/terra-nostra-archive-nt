
import { useState, useCallback } from 'react';
import { Admin } from '@/types';
import { ApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

export const useAdmin = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.getAdmins();
      setAdmins(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admins",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createAdmin = useCallback(async (adminData: Omit<Admin, 'id' | 'createdAt'>) => {
    try {
      const newAdmin = await ApiService.createAdmin(adminData);
      setAdmins(prev => [...prev, newAdmin]);
      toast({
        title: "Success",
        description: "Admin created successfully"
      });
      return newAdmin;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create admin",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const updateAdmin = useCallback(async (id: number, updates: Partial<Admin>) => {
    try {
      const updatedAdmin = await ApiService.updateAdmin(id, updates);
      if (updatedAdmin) {
        setAdmins(prev => prev.map(admin => admin.id === id ? updatedAdmin : admin));
        toast({
          title: "Success",
          description: "Admin updated successfully"
        });
      }
      return updatedAdmin;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const deleteAdmin = useCallback(async (id: number) => {
    try {
      const success = await ApiService.deleteAdmin(id);
      if (success) {
        setAdmins(prev => prev.filter(admin => admin.id !== id));
        toast({
          title: "Success",
          description: "Admin deleted successfully"
        });
      }
      return success;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  return {
    admins,
    isLoading,
    loadAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
  };
};
