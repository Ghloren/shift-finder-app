

import { useState, useEffect } from 'react';
 import { LocationService, Location } from '../services/locationService';

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    try {
      console.log('useLocation: начат запрос геолокации');
      setLoading(true);
      setError(null);
      
      const coords = await LocationService.getCurrentLocation();
      console.log('useLocation: координаты получены', coords);
      setLocation(coords);
      
    } catch (err: any) {
      console.error('useLocation: ошибка', err);
      const errorMessage = err.message || 'Неизвестная ошибка геолокации';
      setError(errorMessage);
    } finally {
      console.log('useLocation: завершено, loading=false');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useLocation: эффект запущен');
    getLocation();
  }, []);

  return { location, error, loading, refetch: getLocation };
};