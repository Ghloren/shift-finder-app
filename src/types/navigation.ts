import { StackNavigationProp } from '@react-navigation/stack';
import { Shift } from './shift';

export type RootStackParamList = {
  Shifts: undefined;
  ShiftDetails: { shift: Shift };
};

export type ShiftsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shifts'>;
export type ShiftDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShiftDetails'>;