import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Categoria from './Categoria'
import Lugar from './Lugar'

const Stack = createNativeStackNavigator()

const StackLugarCategoria = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={props.route.name+"-Stack"} component={Categoria}/>
            <Stack.Screen name="Lugar" component={Lugar} />
        </Stack.Navigator>
    )
}

export default StackLugarCategoria