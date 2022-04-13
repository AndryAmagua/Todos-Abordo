import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, Modal, TextInput } from 'react-native';

const Lugares = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fotografias, setFotografias] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [contacto, setContacto] = useState('');
    const [servicio, setServicio] = useState('');
    const [menu, setMenu] = useState('');
    const [promociones, setPromociones] = useState('');
    const [valoracion, setValoracion] = useState('');

    function crearLugar() {
        fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                fotografias: fotografias,
                ubicacion: ubicacion,
                contacto: contacto,
                servicio: servicio,
                menu: menu,
                promociones: promociones,
                valoracion: valoracion,
            })
        }).then(() => setModalVisible(!modalVisible))
    }

    const getLugares = async () => {
        try {
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLugares();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ padding: 24 }}>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text>Añadir</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
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
                    <TextInput
                        value={fotografias}
                        onChangeText={setFotografias}
                        placeholder="fotografias"
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
                    <TextInput
                        value={servicio}
                        onChangeText={setServicio}
                        placeholder="servicio"
                    />
                    <TextInput
                        value={menu}
                        onChangeText={setMenu}
                        placeholder="menu"
                    />
                    <TextInput
                        value={promociones}
                        onChangeText={setPromociones}
                        placeholder="promociones"
                    />
                    <TextInput
                        value={valoracion}
                        onChangeText={setValoracion}
                        placeholder="valoracion"
                    />
                    <Pressable
                        onPress={() => crearLugar()}
                    >
                        <Text>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>

            {isLoading ? <ActivityIndicator /> : (
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
                            <Text>{item.titulo}, {item.descripcion}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default Lugares