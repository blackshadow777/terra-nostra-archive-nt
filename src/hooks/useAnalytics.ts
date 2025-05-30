
import { useState, useEffect } from 'react';
import { AnalyticsData } from '@/types';
import { ApiService } from '@/services/apiService';

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const analyticsData = await ApiService.getAnalytics();
        setData(analyticsData);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  return { data, isLoading };
};
