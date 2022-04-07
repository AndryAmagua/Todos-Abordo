import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Categorias from './Categorias';
import Inicio from './Inicio';

const Drawer = createDrawerNavigator();

const Contenido = () => {
  return (
      <Drawer.Navigator initialRouteName='Inicio'>
          <Drawer.Screen name="Inicio" component={Inicio}/>
          <Drawer.Screen name="Categorias" component={Categorias}/>
      </Drawer.Navigator>
  )
}

export default Contenido