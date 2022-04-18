import React, {useState, useEffect} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Categoria from './Categoria';
import Inicio from './Inicio';
import StackLugarCategoria from './StackLugarCategoria';

const Drawer = createDrawerNavigator();

const Usuario = ({ }) => {
  const [data, setData] = useState([]);

  const getCategorias = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/categorias');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <Drawer.Navigator initialRouteName='Inicio'>
      <Drawer.Screen name="Inicio" component={Inicio} />
      {
        data.map(item => {
          return (
            <Drawer.Screen key={item._id} name={item.nombre} component={StackLugarCategoria} />
          )
        })
      }
    </Drawer.Navigator>
  )
}

export default Usuario