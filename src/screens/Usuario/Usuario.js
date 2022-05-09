import React, { useState, useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { LogBox, ImageBackground, Text, Image, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
LogBox.ignoreAllLogs()

import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();
const image = { uri: "https://reactjs.org/logo-og.png" };

const Usuario = (props) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  console.log({ menu: props })

  const getCategorias = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/categorias');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  const getUsuario = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('usuario'));
    console.log(user)
    setUserData(user)
  }

  function CustomDrawerContent(props) {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}
          // contentContainerStyle={{ backgroundColor: '#f43f4f' }}
          >
          <ImageBackground source={image} style={{ padding: 20 }} >
            <Image source={require('../../assets/profile.png')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
            <Text style={{ color: 'white' }}>{userData.nombre}</Text>
            <Text style={{ color: 'white' }}>{userData.correo}</Text>
          </ImageBackground>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }

  useEffect(() => {
    getCategorias();
    getUsuario();
  }, []);

  return (
    <Drawer.Navigator initialRouteName='Inicio' useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Inicio" component={TabNavigator} initialParams={{ funcion: props.funcion }} />
      {
        data.map(item => {
          return (
            <Drawer.Screen key={item._id} name={item.nombre} component={StackNavigator} />
          )
        })
      }
    </Drawer.Navigator>
  )
}

export default Usuario