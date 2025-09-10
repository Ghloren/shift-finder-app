import { ShiftsResponse, Shift } from '../types/shift';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export class ApiService {
  static async getShiftsByLocation(
    latitude: number,
    longitude: number
  ): Promise<Shift[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/shifts?latitude=${latitude}&longitude=${longitude}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ShiftsResponse = await response.json();
      
      if (data.status !== 200) {
        throw new Error(`API error! status: ${data.status}`);
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw new Error('Не удалось загрузить список смен');
    }
  }

  // Fallback данные для демонстрации
  static getMockShifts(): Shift[] {
    return [
      {
        id: '1',
        logo: 'https://example.com/logo1.jpg',
        coordinates: { longitude: 37.6173, latitude: 55.7558 },
        address: 'Москва, ул. Тверская, д. 1',
        companyName: 'ООО "Примерная Компания"',
        dateStartByCity: '15.12.2024',
        timeStartByCity: '09:00',
        timeEndByCity: '18:00',
        currentWorkers: 3,
        planWorkers: 5,
        workTypes: [
          {
            id: 35,
            name: 'Услуги разнорабочего',
            nameGt5: 'Разнорабочих',
            nameLt5: 'Разнорабочих',
            nameOne: 'Разнорабочий'
          }
        ],
        priceWorker: 5000,
        bonusPriceWorker: 0,
        customerFeedbacksCount: '15 отзывов',
        customerRating: 4.7,
        isPromotionEnabled: false
      }
    ];
  }
}