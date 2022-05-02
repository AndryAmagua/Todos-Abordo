import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


function Favoritos() {
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

function Ajustes() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ajustes</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Inicio = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Ajustes" component={Ajustes} />
    </Tab.Navigator>
  )
}

export default Inicio

const styles = StyleSheet.create({
  images: {
      width: 'auto',
      height: 150,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 3
  },
})