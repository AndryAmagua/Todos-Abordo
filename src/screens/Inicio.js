import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

function Favoritos() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Favoritos</Text>
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
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Ajustes" component={Ajustes} />
    </Tab.Navigator>
  )
}

export default Inicio