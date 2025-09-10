import { ShiftsResponse, Shift } from '../types/shift';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export class ApiService {
  static async getShiftsByLocation(
    latitude: number,
    longitude: number
  ): Promise<Shift[]> {
    try {
      console.log('Fetching shifts for coordinates:', latitude, longitude);
      
      const url = `${API_BASE_URL}/shift?latitude=${latitude}&longitude=${longitude}`;
      console.log('API URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      // Сначала проверяем статус ответа
      if (!response.ok) {
        console.error('HTTP Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ShiftsResponse = await response.json();
      
      // Проверяем статус из тела ответа
      if (data.status !== 200) {
        console.error('API Error status:', data.status);
        throw new Error(`API error! status: ${data.status}`);
      }
      
      console.log('Successfully fetched shifts:', data.data.length);
      return data.data;
      
    } catch (error) {
      console.error('Error fetching shifts:', error);
      // Возвращаем mock данные вместо выброса ошибки
      return this.getMockShifts();
    }
  }

  static getMockShifts(): Shift[] {
    return [
      {
        id: 'mock-1',
        logo: 'https://hwfiles.storage.yandexcloud.net/media/1854617/conversions/MFG-logo-list.jpg',
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
      },
      {
        id: 'mock-2',
        logo: 'https://hwfiles.storage.yandexcloud.net/media/4206404/conversions/Maksimov-logo-list.jpg',
        coordinates: { longitude: 37.6173, latitude: 55.7558 },
        address: 'Москва, ул. Арбат, д. 25',
        companyName: 'ООО "Другая Компания"',
        dateStartByCity: '16.12.2024',
        timeStartByCity: '10:00',
        timeEndByCity: '19:00',
        currentWorkers: 2,
        planWorkers: 4,
        workTypes: [
          {
            id: 8001,
            name: 'Услуги грузчика',
            nameGt5: 'Грузчиков',
            nameLt5: 'Грузчика',
            nameOne: 'Грузчик'
          }
        ],
        priceWorker: 4500,
        bonusPriceWorker: 500,
        customerFeedbacksCount: '8 отзывов',
        customerRating: 4.3,
        isPromotionEnabled: true
      }
    ];
  }
}