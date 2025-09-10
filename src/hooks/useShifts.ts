import { useState, useEffect } from 'react';
import { Shift } from '../types/shift';
import { ApiService } from '../services/api';

export const useShifts = (latitude?: number, longitude?: number) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let shiftsData: Shift[];
      
      if (latitude && longitude) {
        shiftsData = await ApiService.getShiftsByLocation(latitude, longitude);
      } else {
        // Fallback на mock данные если нет геолокации
        shiftsData = ApiService.getMockShifts();
      }
      
      setShifts(shiftsData);
    } catch (err: any) {
      setError(err.message);
      // Fallback на mock данные при ошибке
      setShifts(ApiService.getMockShifts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [latitude, longitude]);

  return { shifts, loading, error, refetch: fetchShifts };
};