import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ShiftsScreenNavigationProp } from '../types/navigation';
import { useLocation } from '../hooks/useLocation';
import { useShifts } from '../hooks/useShifts';
import { ShiftCard } from '../components/ShiftCard';
import { ShiftsScreenStyles } from '../styles/ShiftsScreen.styles';
import { GlobalStyles } from '../styles/global';

export const ShiftsScreen: React.FC = () => {
  const navigation = useNavigation<ShiftsScreenNavigationProp>();
  const { location, error: locationError, loading: locationLoading, refetch: refetchLocation } = useLocation();
  const { shifts, loading: shiftsLoading, error: shiftsError, refetch: refetchShifts } = useShifts(
    location?.latitude,
    location?.longitude
  );

  const handleShiftPress = (shift: any) => {
    navigation.navigate('ShiftDetails', { shift });
  };

  const handleRetry = () => {
    if (locationError) {
      refetchLocation();
    } else {
      refetchShifts();
    }
  };

  if (locationLoading) {
    return (
      <View style={ShiftsScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary} />
        <Text style={[GlobalStyles.typography.body, { marginTop: 16 }]}>
          Получение геолокации...
        </Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={ShiftsScreenStyles.errorContainer}>
        <Text style={ShiftsScreenStyles.errorText}>
          Ошибка доступа к геолокации: {locationError}
        </Text>
        <TouchableOpacity style={ShiftsScreenStyles.retryButton} onPress={handleRetry}>
          <Text style={ShiftsScreenStyles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shiftsLoading) {
    return (
      <View style={ShiftsScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary} />
        <Text style={[GlobalStyles.typography.body, { marginTop: 16 }]}>
          Загрузка смен...
        </Text>
      </View>
    );
  }

  if (shiftsError) {
    return (
      <View style={ShiftsScreenStyles.errorContainer}>
        <Text style={ShiftsScreenStyles.errorText}>
          Ошибка загрузки смен: {shiftsError}
        </Text>
        <Text style={[GlobalStyles.typography.caption, { marginBottom: 16, textAlign: 'center' }]}>
          Показаны демонстрационные данные
        </Text>
        <TouchableOpacity style={ShiftsScreenStyles.retryButton} onPress={handleRetry}>
          <Text style={ShiftsScreenStyles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shifts.length === 0) {
    return (
      <View style={ShiftsScreenStyles.emptyContainer}>
        <Text style={ShiftsScreenStyles.emptyText}>
          Нет доступных смен в вашем районе
        </Text>
        <TouchableOpacity style={ShiftsScreenStyles.retryButton} onPress={handleRetry}>
          <Text style={ShiftsScreenStyles.retryButtonText}>Обновить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={ShiftsScreenStyles.container}>
      <Text style={ShiftsScreenStyles.header}>
        Доступные смены
      </Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            onPress={() => handleShiftPress(shift)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ShiftsScreen;