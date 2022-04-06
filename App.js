import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/screens/Login';
import RegistroUsuario from './src/screens/RegistroUsuario';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
