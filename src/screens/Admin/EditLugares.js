import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'

const EditLugares = ({ route }) => {

    const [titulo, setTitulo] = useState(route.params.lugar.titulo)
    const [descripcion, setDescripcion] = useState(route.params.lugar.descripcion);
    const [fotografias, setFotografias] = useState(route.params.lugar.fotografias);
    const [ubicacion, setUbicacion] = useState(route.params.lugar.ubicacion);
    const [contacto, setContacto] = useState(route.params.lugar.contacto);
    const [servicio, setServicio] = useState(route.params.lugar.servicio);
    const [valoracion, setValoracion] = useState(route.params.lugar.valoracion);

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
            {
                <FlatList
                    data={fotografias}
                    keyExtractor={(index) => index}
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
            }
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
            <TextInput
                value={servicio}
                onChangeText={setServicio}
                placeholder="servicio"
            />
            <TextInput
                value={valoracion}
                onChangeText={setValoracion}
                placeholder="valoracion"
            />
        </View>
    )
}

export default EditLugares