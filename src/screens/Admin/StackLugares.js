import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

import ReadLugares from './ReadLugares'
import EditLugares from './EditLugares'

const Stack = createNativeStackNavigator();

const StackCategorias = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ReadLugares' component={ReadLugares}/>
        <Stack.Screen name='EditLugares' component={EditLugares}/>
    </Stack.Navigator>
  )
}

export default StackCategorias