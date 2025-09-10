import { StyleSheet } from 'react-native';

export const ShiftCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#6C757D',
  },
  details: {
    marginBottom: 12,
  },
  dateTime: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 8,
  },
  workers: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  workType: {
    fontSize: 14,
    color: '#2E86DE',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DEE2E6',
    paddingTop: 12,
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: '600',
  },
  reviews: {
    fontSize: 14,
    color: '#6C757D',
  },
});