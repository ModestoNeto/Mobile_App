import React, { useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SoundManager from '../utils/SoundManager';

const StartGame: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const soundManager = SoundManager.getInstance();
    soundManager.loadSounds([
      { name: 'background', uri: require('../../assets/sounds/background.mp3') },
      { name: 'start', uri: require('../../assets/sounds/start.mp3') },
      { name: 'gameOver', uri: require('../../assets/sounds/gameOver.mp3') }
    ]);
  }, []);

  const handleStart = async () => {
    const soundManager = SoundManager.getInstance();
    await soundManager.playSound('start');
    navigation.navigate('SelectCharacter');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Infinite Runner</Text>
      <Button title="Start Game" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StartGame;
