import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from './src/Screens/Inicial';
import OnBoarding from './src/Screens/OnBoarding';
import OnBoarding2 from './src/Screens/OnBoarding2';
import OnBoarding3 from './src/Screens/OnBoarding3';
import TelaInicial from './src/Screens/TelaInicial';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Inicial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
