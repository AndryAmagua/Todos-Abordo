import { View, Text } from 'react-native'
import React from 'react'

const Lugar = ({ route }) => {
    return (
        <View>
            <Text>{route.params.lugar.titulo}</Text>
            <Text>{route.params.lugar.descripcion}</Text>
            <Text>{route.params.lugar.ubicacion}</Text>
            <Text>{route.params.lugar.contacto}</Text>
            
        </View>
    )
}

export default Lugar