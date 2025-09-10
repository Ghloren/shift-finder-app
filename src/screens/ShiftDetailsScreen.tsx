import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ShiftDetailsScreenNavigationProp } from '../types/navigation';
import { Shift } from '../types/shift';
import { ShiftDetailsScreenStyles } from '../styles/ShiftDetailsScreen.styles';
import { GlobalStyles } from '../styles/global';

export const ShiftDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ShiftDetailsScreenNavigationProp>();
  const route = useRoute();
  const { shift } = route.params as { shift: Shift };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const formatWorkers = (current: number, plan: number) => {
    return `${current} из ${plan} человек`;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={ShiftDetailsScreenStyles.container}>
      <ScrollView 
        contentContainerStyle={ShiftDetailsScreenStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={ShiftDetailsScreenStyles.card}>
          <View style={ShiftDetailsScreenStyles.header}>
            <Image
              source={{ uri: shift.logo }}
              style={ShiftDetailsScreenStyles.logo}
              resizeMode="contain"
            />
            <View style={ShiftDetailsScreenStyles.companyInfo}>
              <Text style={ShiftDetailsScreenStyles.companyName}>
                {shift.companyName}
              </Text>
              <Text style={ShiftDetailsScreenStyles.address}>
                {shift.address}
              </Text>
            </View>
          </View>

          <View style={ShiftDetailsScreenStyles.section}>
            <Text style={ShiftDetailsScreenStyles.sectionTitle}>Детали смены</Text>
            
            <View style={ShiftDetailsScreenStyles.detailRow}>
              <Text style={ShiftDetailsScreenStyles.detailLabel}>Дата:</Text>
              <Text style={ShiftDetailsScreenStyles.detailValue}>
                {shift.dateStartByCity}
              </Text>
            </View>

            <View style={ShiftDetailsScreenStyles.detailRow}>
              <Text style={ShiftDetailsScreenStyles.detailLabel}>Время:</Text>
              <Text style={ShiftDetailsScreenStyles.detailValue}>
                {shift.timeStartByCity} - {shift.timeEndByCity}
              </Text>
            </View>

            <View style={ShiftDetailsScreenStyles.detailRow}>
              <Text style={ShiftDetailsScreenStyles.detailLabel}>Тип работы:</Text>
              <Text style={ShiftDetailsScreenStyles.detailValue}>
                {shift.workTypes[0]?.name || 'Разнорабочий'}
              </Text>
            </View>

            <View style={ShiftDetailsScreenStyles.detailRow}>
              <Text style={ShiftDetailsScreenStyles.detailLabel}>Набрано работников:</Text>
              <Text style={ShiftDetailsScreenStyles.detailValue}>
                {formatWorkers(shift.currentWorkers, shift.planWorkers)}
              </Text>
            </View>
          </View>

          <View style={ShiftDetailsScreenStyles.section}>
            <Text style={ShiftDetailsScreenStyles.sectionTitle}>Оплата</Text>
            <Text style={ShiftDetailsScreenStyles.price}>
              {formatPrice(shift.priceWorker)}
            </Text>
            {shift.bonusPriceWorker > 0 && (
              <View style={ShiftDetailsScreenStyles.detailRow}>
                <Text style={ShiftDetailsScreenStyles.detailLabel}>Бонус:</Text>
                <Text style={ShiftDetailsScreenStyles.detailValue}>
                  +{formatPrice(shift.bonusPriceWorker)}
                </Text>
              </View>
            )}
          </View>

          <View style={ShiftDetailsScreenStyles.section}>
            <Text style={ShiftDetailsScreenStyles.sectionTitle}>О работодателе</Text>
            {shift.customerRating && (
              <View style={ShiftDetailsScreenStyles.ratingContainer}>
                <Text style={ShiftDetailsScreenStyles.rating}>
                  ★ {shift.customerRating.toFixed(1)}
                </Text>
                <Text style={ShiftDetailsScreenStyles.reviews}>
                  {shift.customerFeedbacksCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity style={ShiftDetailsScreenStyles.backButton} onPress={handleBack}>
          <Text style={ShiftDetailsScreenStyles.backButtonText}>Назад к списку</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ShiftDetailsScreen;