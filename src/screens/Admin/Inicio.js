import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Lugares from './Lugares'
import Usuarios from './Usuarios'
import Categorias from './Categorias'

const Tab = createBottomTabNavigator();

const Inicio = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Lugares" component={Lugares} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
      <Tab.Screen name="Categorias" component={Categorias} />
    </Tab.Navigator>
  )
}

export default Inicio