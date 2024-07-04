import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TextInput, Pressable, Text, ScrollView, ActivityIndicator, Alert, Keyboard, Platform, StatusBar
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  SavedResponses: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const KEY_GPT = ''; // Defina a chave da API diretamente aqui

export default function HomeScreen() {
  const { colors } = useTheme();
  const [situation, setSituation] = useState("");
  const [age, setAge] = useState(9);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const loadSolution = async () => {
      try {
        const storedSolution = await AsyncStorage.getItem('@solution');
        if (storedSolution) {
          setSolution(storedSolution);
        }
      } catch (error) {
        console.error('Error loading solution:', error);
      }
    };
    loadSolution();
  }, []);

  async function handleGenerate() {
    if (situation === "") {
      Alert.alert("Atenção", "Preencha a situação que você está enfrentando!");
      return;
    }

    setSolution("");
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Estou trabalhando com uma criança com TEA de ${age} anos em um ambiente educacional, que esta apresentando as seguintes necessidades: ${situation}. Quais são algumas estratégias eficazes e práticas que posso usar para apoiar o aprendizado e o desenvolvimento dessa criança?`;
    
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.20,
        max_tokens: 100,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then(async (data) => {
        console.log('Response data:', data);

        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
          const newSolution = data.choices[0].message.content;
          setSolution(newSolution);
          await AsyncStorage.setItem('@solution', newSolution);
        } else {
          throw new Error('Resposta inesperada da API');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert("Erro", "Ocorreu um erro ao gerar as estratégias. Por favor, tente novamente mais tarde.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={[styles.heading, { color: colors.text }]}>Guia educativo TEA</Text>

      <View style={[styles.form, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Qual necessidade a criança esta apresentando?</Text>
        <TextInput
          placeholder="Ex: Dificuldade de concentração em sala de aula"
          placeholderTextColor={colors.text}
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={situation}
          onChangeText={(text) => setSituation(text)}
        />

        <Text style={[styles.label, { color: colors.text }]}>Idade da criança: <Text style={[styles.idade, { backgroundColor: colors.card }]}>{age.toFixed(0)}</Text> anos</Text>
        <Slider
          minimumValue={3}
          maximumValue={15}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={age}
          onValueChange={(value) => setAge(value)}
        />
      </View>

      <Pressable 
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#008080' : '#40E0D0' },
          styles.button,
        ]}
        android_ripple={{ color: '#008080' }}
        onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar estratégias</Text>
        <MaterialIcons name="lightbulb" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Carregando estratégias...</Text>
            <ActivityIndicator color={colors.text} size="large" />
          </View>
        )}

        {solution && (
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Estratégias sugeridas 👇</Text>
            <Text style={{ lineHeight: 24, color: colors.text }}>{solution}</Text>
          </View>
        )}
      </ScrollView>

      <Pressable style={({ pressed }) => [
          { backgroundColor: pressed ? '#008080' : '#40E0D0' },
          styles.button,
        ]}
        android_ripple={{ color: '#008080' }}
        onPress={() => navigation.navigate('SavedResponses')}>
        <Text style={styles.buttonText}>Ver Respostas Guardadas</Text>
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
  form: {
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  idade: {
    padding: 4,
  },
  button: {
    width: '90%',
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
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
});
