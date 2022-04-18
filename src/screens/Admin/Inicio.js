import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import StackLugares from './StackLugares'
import Usuarios from './Usuarios'
import Categorias from './ReadCategorias'

const Tab = createBottomTabNavigator();

const Inicio = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackLugares" component={StackLugares} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
      <Tab.Screen name="Categorias" component={Categorias} />
    </Tab.Navigator>
  )
}

export default Inicio