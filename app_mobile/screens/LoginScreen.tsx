import React, { useState } from 'react';
import {
  StyleSheet, View, TextInput, Pressable, Text, Platform, StatusBar, Image, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useTheme } from '@react-navigation/native';
import { firebase } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} translucent={true} backgroundColor={colors.background} />
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={[styles.heading, { color: colors.text }]}>Clarus-TEA</Text>

          <View style={[styles.form, { backgroundColor: colors.card }]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.text}
              style={[styles.input, { color: colors.text, borderColor: 'transparent' }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor={colors.text}
                style={[styles.input, { flex: 1, color: colors.text, borderColor: 'transparent' }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
              />
              <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <MaterialIcons name={secureTextEntry ? "visibility-off" : "visibility"} size={24} color={colors.text} />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#008080' : '#40E0D0' },
              styles.button,
            ]}
            android_ripple={{ color: '#008080' }}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.linkText, { color: colors.primary }]}>Não tem uma conta? Cadastre-se</Text>
          </Pressable>
        </ScrollView>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
  },
  form: {
    width: '75%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
    borderColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    borderColor: 'transparent',
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
  linkText: {
    fontSize: 16,
    marginTop: 16,
  },
});
