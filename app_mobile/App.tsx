import { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { firebase } from './firebase'; // Certifique-se de que o caminho está correto

const statusBarHeight = StatusBar.currentHeight;
const KEY_GPT = ''; // Defina a chave da API diretamente aqui

export default function App() {
  const [situation, setSituation] = useState("");
  const [age, setAge] = useState(6);
  const [frequency, setFrequency] = useState("ocasionalmente");
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [user, setUser] = useState<firebase.User | null>(null); // Estado para usuário autenticado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  async function handleGenerate() {
    if (situation === "") {
      Alert.alert("Atenção", "Preencha a situação que você está enfrentando!");
      return;
    }

    setSolution("");
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Estou enfrentando a seguinte situação com uma criança com TEA: ${situation}. Isso ocorre ${frequency}. A criança tem ${age} anos. Quais são algumas estratégias eficazes e práticas que posso usar para lidar com essa situação?`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use gpt-3.5-turbo em vez de gpt-4
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
      .then((data) => {
        console.log('Response data:', data);

        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
          setSolution(data.choices[0].message.content);
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

  if (user) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
        <Text style={styles.heading}>Guia TEA</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Indique a situação que você está presenciando</Text>
          <TextInput
            placeholder="Ex: Crise proveniente de estímulos externos"
            style={styles.input}
            value={situation}
            onChangeText={(text) => setSituation(text)}
          />

          <Text style={styles.label}>Idade da criança: <Text style={styles.idade}> {age.toFixed(0)} </Text> anos</Text>
          <Slider
            minimumValue={1}
            maximumValue={12}
            minimumTrackTintColor="#009688"
            maximumTrackTintColor="#000000"
            value={age}
            onValueChange={(value) => setAge(value)}
          />

          <Text style={styles.label}>Isso tem acontecido com frequência?</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={frequency}
              onValueChange={(itemValue) => setFrequency(itemValue)}
            >
              <Picker.Item label="Ocasionalmente" value="ocasionalmente" />
              <Picker.Item label="Frequentemente" value="frequentemente" />
              <Picker.Item label="É a primeira vez" value="pela primeira vez agora" />
            </Picker>
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Gerar estratégias</Text>
          <MaterialIcons name="lightbulb" size={24} color="#FFF" />
        </Pressable>

        <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
          {loading && (
            <View style={styles.content}>
              <Text style={styles.title}>Carregando estratégias...</Text>
              <ActivityIndicator color="#000" size="large" />
            </View>
          )}

          {solution && (
            <View style={styles.content}>
              <Text style={styles.title}>Estratégias sugeridas 👇</Text>
              <Text style={{ lineHeight: 24 }}>{solution}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
          {loading && <ActivityIndicator color="#FFF" />}
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 54,
  },
  form: {
    backgroundColor: '#FFF',
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
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  idade: {
    backgroundColor: '#F1f1f1'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
