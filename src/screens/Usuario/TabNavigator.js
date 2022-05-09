import { View, Text, StyleSheet, Image, FlatList, Button, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
LogBox.ignoreAllLogs()


function Inicio() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getLugares = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLugares();
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
              source={{ uri: 'data:image/jpeg;base64,' + item.imagenPerfil }}
              style={styles.images}
            />
            <Text>{item.titulo}, {item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

function Ajustes(props) {
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

const TabNavigator = (props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Ajustes" component={Ajustes} initialParams={{ funcion: props.route.params.funcion }} />
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
    marginHorizontal: 3
  },
})