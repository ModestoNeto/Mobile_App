import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartGame from './src/components/StartGame';
import SelectCharacter from './src/components/SelectCharacter';
import SelectScenario from './src/components/SelectScenario';
import Game from './src/components/Game';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartGame">
        <Stack.Screen name="StartGame" component={StartGame} />
        <Stack.Screen name="SelectCharacter" component={SelectCharacter} />
        <Stack.Screen name="SelectScenario" component={SelectScenario} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
