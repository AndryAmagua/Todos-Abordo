import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

import Loading from './src/screens/Loading';
import SigIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import RecoverPassword from './src/screens/RecoverPassword';
import Usuario from './src/screens/Usuario/Usuario';
import Admin from './src/screens/Admin/Inicio';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [rol, setRol] = useState("usuario");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      readData();
    }, 3000)
  }, []);

  const readData = async () => {
    try {
      const isLoggedIn = JSON.parse(await AsyncStorage.getItem('login'));
      if (isLoggedIn) {
        const isRol = JSON.parse(await AsyncStorage.getItem('usuario'));
        setRol(isRol.rol)
        console.log(isRol)
      }

      if (isLoggedIn !== null) {
        setLoginStatus(isLoggedIn);
      }

      setLoading(false)
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  function Login(props) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign-In" component={SigIn} initialParams={{ funcion: props.funcion }} />
        <Stack.Screen name="Sign-Up" component={SignUp} />
        <Stack.Screen name="Recover-Password" component={RecoverPassword} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {loading ? <Loading /> :
        (loginStatus ?
          (rol == "usuario" ?
            <Usuario funcion={readData} /> :
            <Admin funcion={readData} />) :
          <Login funcion={readData} />)}
    </NavigationContainer>
  );
};

export default App;