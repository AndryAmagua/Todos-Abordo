import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'

const Lugar = ({ route }) => {
    return (
        <View>
            <Image
                source={{ uri: 'data:image/jpeg;base64,' + route.params.lugar.imagenPerfil }}
                style={styles.images}
            />
            <Text>{route.params.lugar.titulo}</Text>
            <Text>{route.params.lugar.descripcion}</Text>
            <FlatList
                data={route.params.lugar.servicio}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <View style={{
                        backgroundColor: "beige",
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10
                    }}>
                            <Text>{item}</Text>
                    </View>
                )}
            />
            <Text>{route.params.lugar.ubicacion}</Text>
            <Text>{route.params.lugar.contacto}</Text>

        </View>
    )
}

export default Lugar

const styles = StyleSheet.create({
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
})