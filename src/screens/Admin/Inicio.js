import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

import StackLugares from './StackLugares'
import Usuarios from './Usuarios'
import Categorias from './ReadCategorias'
import Ajustes from './Ajustes'

const Tab = createBottomTabNavigator();

const Inicio = (props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackLugares" component={StackLugares} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
      <Tab.Screen name="Categorias" component={Categorias} />
      <Tab.Screen name="Ajustes" component={Ajustes} initialParams={{funcion: props.funcion}}/>
    </Tab.Navigator>
  )
}

export default Inicio