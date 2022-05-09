import { View, Text, TextInput, FlatList, Alert, Pressable, Image, StyleSheet, LogBox } from 'react-native'
import React, { useState } from 'react'
LogBox.ignoreAllLogs()

const EditLugares = ({ navigation, route }) => {
    const [id, setId] = useState(route.params.lugar._id);
    const [titulo, setTitulo] = useState(route.params.lugar.titulo);
    const [descripcion, setDescripcion] = useState(route.params.lugar.descripcion);
    const [imagen, setImagen] = useState(route.params.lugar.imagenPerfil);
    const [ubicacion, setUbicacion] = useState(route.params.lugar.ubicacion);
    const [contacto, setContacto] = useState(route.params.lugar.contacto);
    const [servicio, setServicio] = useState(route.params.lugar.servicio);
    const [valoracion, setValoracion] = useState(route.params.lugar.valoracion);

    function editarLugar() {
        fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                imagenPerfil: imagen,
                ubicacion: ubicacion,
                contacto: contacto,
                servicio: servicio,
                valoracion: valoracion,
            })
        }).then(() => {
            Alert.alert("Titulo", "Lugar Editado")
            navigation.navigate("ReadLugares")
        })
    }

    return (
        <View>
            <TextInput
                value={titulo}
                onChangeText={setTitulo}
                placeholder="titulo"
            />
            <TextInput
                multiline={true}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="descripcion"
            />
            <Image
                source={{ uri: 'data:image/jpeg;base64,' + imagen }}
                style={styles.images}
            />
            <TextInput
                value={ubicacion}
                onChangeText={setUbicacion}
                placeholder="ubicacion"
            />
            <TextInput
                value={contacto}
                onChangeText={setContacto}
                placeholder="contacto"
            />
            <FlatList
                data={servicio}
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
            <TextInput
                value={valoracion}
                onChangeText={setValoracion}
                placeholder="valoracion"
            />
            <Pressable
                onPress={() => editarLugar()}>
                <Text>ACTUALIZAR</Text>
            </Pressable>
        </View>
    )
}

export default EditLugares

const styles = StyleSheet.create({
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
})