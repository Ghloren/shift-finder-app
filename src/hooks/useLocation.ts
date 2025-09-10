import { useState, useEffect } from 'react';
import { LocationService, Location } from '../services/locationService';

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const coords = await LocationService.getCurrentLocation();
      setLocation(coords);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, loading, refetch: getLocation };
};