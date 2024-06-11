import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AssetManager from '../utils/AssetManager';

const SelectCharacter: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const navigation = useNavigation();

  const characters = [
    { name: 'player1', uri: require('../../assets/images/player1.png') },
    { name: 'player2', uri: require('../../assets/images/player2.png') },
  ];

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
  };

  const handleNext = async () => {
    const assetManager = AssetManager.getInstance();
    await assetManager.loadSprites([{ name: 'player', uri: selectedCharacter }]);
    navigation.navigate('SelectScenario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Character</Text>
      <View style={styles.charactersContainer}>
        {characters.map((char) => (
          <TouchableOpacity key={char.name} onPress={() => handleCharacterSelect(char.uri)}>
            <Image
              source={char.uri}
              style={[
                styles.character,
                { borderWidth: selectedCharacter === char.uri ? 2 : 0 },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Next" onPress={handleNext} disabled={!selectedCharacter} />
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
  charactersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  character: {
    width: 100,
    height: 100,
    margin: 10,
    borderColor: 'blue',
  },
});

export default SelectCharacter;
