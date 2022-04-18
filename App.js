import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import MenuUsuario from './src/screens/Usuario/MenuUsuario';
import Admin from './src/screens/Admin/Inicio';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Usuario" component={MenuUsuario} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
