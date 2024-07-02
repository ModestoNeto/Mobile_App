import React from 'react';
import { LogBox, Platform } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return <RootNavigator />;
}