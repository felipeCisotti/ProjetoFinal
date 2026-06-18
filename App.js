import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from './src/Screens/Inicial';
import OnBoarding from './src/Screens/OnBoarding';
import OnBoarding3 from './src/Screens/OnBoarding3';
import TelaInicial from './src/Screens/TelaInicial';
import TodosOsLivros from './src/Screens/TodosLivros';
import ResenhaLiteraria from './src/Screens/ResenhaLiteraria';
import TelaPerfil from './src/Screens/TelaPerfil';
import PomodoroTimer from './src/Screens/PomodoroTimer';
import { FavoritosProvider } from './src/FavoritosContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritosProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Inicial"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Inicial" component={Inicial} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="TodosOsLivros" component={TodosOsLivros} />
          <Stack.Screen name="ResenhaLiteraria" component={ResenhaLiteraria} />
          <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
          <Stack.Screen name="PomodoroTimer" component={PomodoroTimer} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
}
