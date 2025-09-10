import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Shift } from '../types/shift';
import { ShiftCardStyles } from '../styles/ShiftCard.styles';
import { GlobalStyles } from '../styles/global';

interface ShiftCardProps {
  shift: Shift;
  onPress: () => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onPress }) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const formatWorkers = (current: number, plan: number) => {
    return `${current}/${plan} человек`;
  };

  return (
    <TouchableOpacity 
      style={ShiftCardStyles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={ShiftCardStyles.header}>
        <Image
          source={{ uri: shift.logo }}
          style={ShiftCardStyles.logo}
          resizeMode="contain"
        />
        <View style={ShiftCardStyles.companyInfo}>
          <Text style={ShiftCardStyles.companyName} numberOfLines={1}>
            {shift.companyName}
          </Text>
          <Text style={ShiftCardStyles.address} numberOfLines={2}>
            {shift.address}
          </Text>
        </View>
      </View>

      <View style={ShiftCardStyles.details}>
        <Text style={ShiftCardStyles.dateTime}>
          {shift.dateStartByCity} • {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
        <Text style={ShiftCardStyles.price}>
          {formatPrice(shift.priceWorker)}
        </Text>
        <Text style={ShiftCardStyles.workers}>
          {formatWorkers(shift.currentWorkers, shift.planWorkers)}
        </Text>
        <Text style={ShiftCardStyles.workType}>
          {shift.workTypes[0]?.name || 'Разнорабочий'}
        </Text>
      </View>

      <View style={ShiftCardStyles.footer}>
        {shift.customerRating && (
          <Text style={ShiftCardStyles.rating}>
            ★ {shift.customerRating.toFixed(1)}
          </Text>
        )}
        <Text style={ShiftCardStyles.reviews}>
          {shift.customerFeedbacksCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};