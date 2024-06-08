import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartGame from 'Mobile_Game\Infinit_Runner\src\components\StartGame.tsx';
import SelectCharacter from 'Mobile_Game\Infinit_Runner\src\components\SelectCharacter.tsx';
import SelectScenario from 'Mobile_Game\Infinit_Runner\src\components\SelectScenario.tsx';
import Game from 'Mobile_Game\Infinit_Runner\src\components\Game.tsx';

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
