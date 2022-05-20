import { View, Text, StyleSheet, Image, FlatList, Button, LogBox, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
LogBox.ignoreAllLogs()

import Lugar from './Lugar'

function Lugares({ navigation }) {
  const [data, setData] = useState([]);

  const getLugares = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLugares();
  }, []);

  return (
    <View style={{ padding: 24 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "beige",
            borderWidth: 1,
            padding: 10
          }}>
            <Pressable
              onPress={() => navigation.navigate('Lugar', { lugar: item })}
            >
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + item.imagenPerfil }}
                style={styles.images}
              />
              <Text>{item.titulo}, {item.descripcion}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

function Eventos() {
  const [data, setData] = useState([]);

  const getEventos = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/eventos');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEventos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "beige",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10
          }}>
            <Image
              source={{ uri: 'data:image/jpeg;base64,' + item.imagen }}
              style={styles.images}
            />
            <Text>{item.titulo}, {item.fecha}</Text>
          </View>
        )}
      />
    </View>
  )
}

function Favoritos() {
  const [data, setData] = useState([]);

  const getFavoritos = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('usuario'))
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/favoritos/' + user._id);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  const eliminarFavorito = async (id) => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/favoritos/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json()
      if (json) {
        Alert.alert("Aviso", "Lugar elminado de favoritos")
      } else {
        Alert.alert("Aviso", "No se pudo eliminar de favoritos")
      }
      getFavoritos()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFavoritos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "beige",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10
          }}>
            <Text>{item.lugarID}, {item.usuarioID}</Text>
            <Button title='Eliminar' color='red' onPress={() => eliminarFavorito(item._id)} />
          </View>
        )}
      />
    </View>
  )
}

function Perfil(props) {
  const logout = async () => {
    AsyncStorage.removeItem('usuario')
    AsyncStorage.setItem('login', "false")
    props.route.params.funcion()
  }
  console.log({ ajustes: props.route.params.funcion })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title='LogOut'
        onPress={() => logout()}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function StackLugar() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lugares" component={Lugares} />
      <Tab.Screen name="Lugar" component={Lugar} />
    </Stack.Navigator>
  )
}

const TabNavigator = (props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackLugar" component={StackLugar} />
      <Tab.Screen name="Eventos" component={Eventos} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Perfil" component={Perfil} initialParams={{ funcion: props.route.params.funcion }} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  images: {
    width: 'auto',
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    resizeMode: 'cover'
  },
})