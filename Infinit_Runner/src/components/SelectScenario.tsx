import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AssetManager from 'Mobile_Game\Infinit_Runner\src\utils\AssetManager.ts';

const SelectScenario: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const navigation = useNavigation();

  const scenarios = [
    { name: 'scenario1', uri: require('../../assets/images/scenario1.png') },
    { name: 'scenario2', uri: require('../../assets/images/scenario2.png') },
  ];

  const handleScenarioSelect = (scenario: any) => {
    setSelectedScenario(scenario);
  };

  const handleStartGame = async () => {
    const assetManager = AssetManager.getInstance();
    await assetManager.loadBackgrounds([{ name: 'gameBackground', uri: selectedScenario }]);
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Scenario</Text>
      <View style={styles.scenariosContainer}>
        {scenarios.map((scen) => (
          <TouchableOpacity key={scen.name} onPress={() => handleScenarioSelect(scen.uri)}>
            <Image
              source={scen.uri}
              style={[
                styles.scenario,
                { borderWidth: selectedScenario === scen.uri ? 2 : 0 },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Start Game" onPress={handleStartGame} disabled={!selectedScenario} />
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
  scenariosContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  scenario: {
    width: 100,
    height: 100,
    margin: 10,
    borderColor: 'blue',
  },
});

export default SelectScenario;
