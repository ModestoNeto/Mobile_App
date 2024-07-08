import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Platform, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useColorScheme } from '../hooks/useColorScheme';

type RootStackParamList = {
  Home: undefined;
};

type SavedResponsesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function SavedResponsesScreen() {
  const { colors } = useTheme();
  const [savedResponses, setSavedResponses] = useState<string[]>([]);
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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} translucent={true} backgroundColor={colors.background} />
          <Text style={[styles.heading, { color: colors.text }]}>Respostas Guardadas</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
            {savedResponses.map((response, index) => (
              <View key={index} style={[styles.responseContainer, { backgroundColor: colors.card }]}>
                <Text style={{ color: colors.text }}>{response}</Text>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
