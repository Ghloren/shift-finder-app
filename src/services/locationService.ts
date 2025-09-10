import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';

export interface Location {
  latitude: number;
  longitude: number;
}

export class LocationService {
  static async requestLocationPermission(): Promise<boolean> {
    try {
      console.log('Запрос разрешения для платформы:', Platform.OS);
      
      if (Platform.OS === 'android') {
        console.log('Запрашиваем разрешение для Android...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Доступ к геолокации',
            message: 'Приложению нужен доступ к вашей геолокации для поиска смен',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Отмена',
            buttonPositive: 'Разрешить',
          }
        );
        console.log('Результат запроса разрешения Android:', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      
      // Для iOS
      console.log('Для iOS разрешение запрашивается автоматически');
      return true;
      
    } catch (error) {
      console.error('Ошибка запроса разрешения:', error);
      return false;
    }
  }

  static async getCurrentLocation(): Promise<Location> {
  try {
    console.log('Начинаем получение геолокации...');
    
    const hasPermission = await this.requestLocationPermission();
    console.log('Разрешение получено:', hasPermission);
    
    if (!hasPermission) {
      throw new Error('Доступ к геолокации не предоставлен');
    }

    return new Promise((resolve, reject) => {
      console.log('Вызываем getCurrentPosition...');
      
      // Пробуем сначала с низкой точностью (быстрее)
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          console.log('Геолокация успешно получена:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error: GeolocationError) => {
          console.warn('Первая попытка не удалась, пробуем с высокой точностью...', error);
          
          // Вторая попытка с высокой точностью
          Geolocation.getCurrentPosition(
            (position: GeolocationResponse) => {
              console.log('Геолокация получена со второй попытки:', position.coords);
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error2: GeolocationError) => {
              console.error('Обе попытки получения геолокации failed:', error2);
              
              // Для разработки: возвращаем mock координаты
              console.log('Используем mock координаты для разработки');
              resolve({
                latitude: 55.7558, // Москва
                longitude: 37.6173,
              });
              
              // Или раскомментируйте для продакшн:
              // reject(new Error(`Ошибка геолокации: ${error2.message}`));
            },
            { 
              enableHighAccuracy: true, 
              timeout: 30000, // 30 секунд
              maximumAge: 60000 // 1 минута
            }
          );
        },
        { 
          enableHighAccuracy: false, // Первая попытка: низкая точность = быстрее
          timeout: 10000, // 10 секунд
          maximumAge: 300000 // 5 минут
        }
      );
    });
  } catch (error) {
    console.error('Общая ошибка в getCurrentLocation:', error);
    // Для разработки возвращаем mock данные
    return {
      latitude: 55.7558,
      longitude: 37.6173,
    };
  }
}
}