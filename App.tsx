import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShiftsScreen from './src/screens/ShiftsScreen';
import ShiftDetailsScreen from './src/screens/ShiftDetailsScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Shifts"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Shifts" 
          component={ShiftsScreen}
          options={{ title: 'Доступные смены' }}
        />
        <Stack.Screen 
          name="ShiftDetails" 
          component={ShiftDetailsScreen}
          options={{ title: 'Детали смены' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;