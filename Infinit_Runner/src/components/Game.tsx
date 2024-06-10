import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import * as Location from 'expo-location';
import AssetManager from '../utils/AssetManager';
import SoundManager from '../utils/SoundManager';
import axios from 'axios';
import styled from 'styled-components/native';

const GameContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Game: React.FC = () => {
  const [background, setBackground] = useState<any>(null);
  const [playerY, setPlayerY] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`
        );
        const weather = response.data.weather[0].main.toLowerCase();
        const assetManager = AssetManager.getInstance();

        if (weather.includes('rain')) {
          const rainyBackground = assetManager.getBackground('rainyBackground');
          if (rainyBackground) setBackground(rainyBackground);
        } else {
          const sunnyBackground = assetManager.getBackground('sunnyBackground');
          if (sunnyBackground) setBackground(sunnyBackground);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    };

    getLocation();
  }, []);

  const handleJump = () => {
    if (!jumping) {
      setJumping(true);
      Animated.sequence([
        Animated.timing(playerY, {
          toValue: -150,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(playerY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setJumping(false);
      });
    }
  };

  useEffect(() => {
    // Initialize obstacles here
    const initObstacles = [
      { id: 1, x: new Animated.Value(300), y: 0 },
      { id: 2, x: new Animated.Value(500), y: 0 },
    ];
    setObstacles(initObstacles);

    // Move obstacles
    const moveObstacles = () => {
      initObstacles.forEach(obstacle => {
        Animated.loop(
          Animated.timing(obstacle.x, {
            toValue: -100,
            duration: 3000,
            useNativeDriver: true,
          })
        ).start();
      });
    };
    moveObstacles();
  }, []);

  return (
    <GameContainer>
      {background ? (
        <TouchableOpacity onPress={handleJump} style={styles.touchable}>
          <ImageBackground source={background.uri} style={styles.background}>
            <Text>Game Screen</Text>
            <Animated.View style={[styles.player, { transform: [{ translateY: playerY }] }]}>
              <Text>Player</Text>
            </Animated.View>
            {obstacles.map(obstacle => (
              <Animated.View key={obstacle.id} style={[styles.obstacle, { transform: [{ translateX: obstacle.x }] }]}>
                <Text>Obstacle</Text>
              </Animated.View>
            ))}
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>{errorMsg ? errorMsg : 'Loading...'}</Text>
        </View>
      )}
    </GameContainer>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    position: 'absolute',
    bottom: 50,
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
  obstacle: {
    position: 'absolute',
    bottom: 50,
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Game;
