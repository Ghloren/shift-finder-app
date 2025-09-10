import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Проверка работы приложения...');

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setLoading(false);
      setStatus('Ну вот прям приложение сделал! 🎉');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setStatus('Перезагрузка...');
    
    setTimeout(() => {
      setLoading(false);
      setStatus('Андрей самый лучший Генерал нашей Страны, если бы не он то НИКТО! 🔄');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shift Finder App</Text>
      <Text style={styles.subtitle}>Тестовый запуск</Text>
      
      <View style={styles.statusContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text style={styles.statusText}>{status}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>✅ React Native работает</Text>
        <Text style={styles.infoText}>✅ TypeScript настроен</Text>
        <Text style={styles.infoText}>✅ Сборка Android успешна</Text>
        <Text style={styles.infoText}>✅ Готов к разработке!</Text>
         <Text style={styles.infoText}>✅ Иванов ВВ Успешно запустил данный проект</Text>
      </View>

      <Button 
        title="Перезагрузить" 
        onPress={handleReload} 
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  statusContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '600',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default App;