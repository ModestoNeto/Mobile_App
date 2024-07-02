import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Define the type for the navigation prop
type RootStackParamList = {
  Home: undefined;
  SavedResponses: undefined;
};

type SavedResponsesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SavedResponses'
>;

export default function SavedResponsesScreen() {
  const [savedResponses, setSavedResponses] = useState<string[]>([]);
  const navigation = useNavigation<SavedResponsesScreenNavigationProp>();

  useEffect(() => {
    const loadSavedResponses = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        const responses = result
          .filter(([key]) => key.startsWith('@solution'))
          .map(([, value]) => value || '');

        setSavedResponses(responses);
      } catch (error) {
        console.error('Error loading saved responses:', error);
      }
    };

    loadSavedResponses();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Respostas Guardadas</Text>
        {savedResponses.length > 0 ? (
          savedResponses.map((response, index) => (
            <View key={index} style={styles.responseContainer}>
              <Text style={styles.responseText}>{response}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResponsesText}>Nenhuma resposta guardada.</Text>
        )}
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  responseContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  responseText: {
    fontSize: 16,
  },
  noResponsesText: {
    fontSize: 18,
    color: '#aaa',
  },
});
