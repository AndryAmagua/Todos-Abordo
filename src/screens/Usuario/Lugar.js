import { View, ScrollView, Text, StyleSheet, Image, FlatList, LogBox, Button, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
LogBox.ignoreAllLogs()

const Lugar = ({ navigation: { goBack }, route }) => {
    const [data, setData] = useState([])
    var id = route.params.lugar._id

    const getEventos = async () => {
        try {
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/eventos/' + id)
            const json = await response.json()
            setData(json)
        } catch (error) {
            console.error(error)
        }
    }

    const createFavorito = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('usuario'))
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/favoritos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lugarId: route.params.lugar._id,
                    usuarioId: user._id,
                })
            });
            const json = await response.json()
            Alert.alert("Aviso", json.message)
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getEventos();
    }, []);

    return (
        <ScrollView>
            <Button title='Regresar' onPress={() => goBack()} />
            <Button title='Agrear a fovoritos' color='yellow' onPress={() => createFavorito()} />
            <Image
                source={{ uri: 'data:image/jpeg;base64,' + route.params.lugar.imagenPerfil }}
                style={styles.images}
            />
            <Text>{route.params.lugar.titulo}</Text>
            <Text>{route.params.lugar.descripcion}</Text>
            <FlatList
                data={route.params.lugar.servicio}
                keyExtractor={(item, index) => index}
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
            <Text onPress={() => Linking.openURL(route.params.lugar.ubicacionLink)}>
                {route.params.lugar.ubicacionTitulo}
            </Text>
            <Text>{route.params.lugar.contacto}</Text>
            <Text>Eventos</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <View style={{
                        backgroundColor: "beige",
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10
                    }}>
                        <Image
                            source={{ uri: 'data:image/jpeg;base64,' + item.imagen }}
                            style={styles.images}
                        />
                        <Text>{item.titulo}, {item.fecha}</Text>
                    </View>
                )}
            />

        </ScrollView>
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