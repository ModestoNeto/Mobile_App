import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Platform, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';

type RootStackParamList = {
  Home: undefined;
};

type SavedResponsesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface SavedResponse {
  question: string;
  answer: string;
}

export default function SavedResponsesScreen() {
  const { colors } = useTheme();
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([]);
  const navigation = useNavigation<SavedResponsesScreenNavigationProp>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadSavedResponses = async () => {
      try {
        const responses = await AsyncStorage.getItem('@responses');
        if (responses) {
          setSavedResponses(JSON.parse(responses));
        }
      } catch (error) {
        console.error('Error loading responses:', error);
      }
    };
    loadSavedResponses();
  }, []);

  const handleDelete = async (index: number) => {
    const updatedResponses = [...savedResponses];
    updatedResponses.splice(index, 1);
    setSavedResponses(updatedResponses);
    await AsyncStorage.setItem('@responses', JSON.stringify(updatedResponses));
    Alert.alert("Sucesso", "Resposta deletada com sucesso.");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} translucent={true} backgroundColor={colors.background} />
      <Text style={[styles.heading, { color: colors.text }]}>Respostas Guardadas</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {savedResponses.map((response, index) => (
          <View key={index} style={[styles.responseContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.question, { color: colors.text }]}>Pergunta: {response.question}</Text>
            <Text style={{ color: colors.text }}>Resposta: {response.answer}</Text>
            <Pressable onPress={() => handleDelete(index)} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.deleteButton]}>
              <MaterialIcons name="delete" size={24} color={colors.text} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <Pressable 
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#008080' : '#40E0D0' },
          styles.button,
        ]}
        android_ripple={{ color: '#008080' }}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
  responseContainer: {
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    position: 'relative',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  button: {
    width: '50%',
    borderRadius: 8,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
