import { StyleSheet } from 'react-native';

export const GlobalStyles = {
  colors: {
    primary: '#2E86DE',
    secondary: '#FF6B6B',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#6C757D',
    border: '#DEE2E6',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: StyleSheet.create({
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
    },
    h2: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333333',
    },
    body: {
      fontSize: 16,
      color: '#333333',
    },
    caption: {
      fontSize: 14,
      color: '#6C757D',
    },
  }),
};