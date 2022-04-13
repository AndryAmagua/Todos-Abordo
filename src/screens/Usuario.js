import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Categoria from './Categoria';
import Inicio from './Inicio';

const Drawer = createDrawerNavigator();

var categorias = [];

(function () {
  fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/categorias')
    .then(response => response.json())
    .then(function (data) {
      categorias = data
    });
})();

const Usuario = ({ }) => {

  return (
    <Drawer.Navigator initialRouteName='Inicio'>
      <Drawer.Screen name="Inicio" component={Inicio} />
      {
        categorias.map(item => {
          return (
            <Drawer.Screen key={item._id} name={item.nombre} component={Categoria} />
          )
        })
      }
    </Drawer.Navigator>
  )
}

export default Usuario