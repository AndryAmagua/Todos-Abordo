import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, FlatList, Text, View, Pressable, Modal, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

const K_OPTIONS = [
    {
        item: 'Gastronomía',
        id: 'Gastronomía',
    },
    {
        item: 'Hotelería',
        id: 'Hotelería',
    },
    {
        item: 'Aventura',
        id: 'Aventura',
    },
    {
        item: 'Diversión',
        id: 'Diversión',
    }
]

const ReadLugares = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [contacto, setContacto] = useState('');
    const [valoracion, setValoracion] = useState('');
    const [categorias, setCategorias] = useState([])


    const launchCamera = () => {
        let options = {
            title: 'Take Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5
        };
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImagen(response.assets[0].base64)
            }
        });
    }

    const launchImageLibrary = () => {
        let options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImagen(response.assets[0].base64)
            }
        });

    }

    function renderFileUri() {
        if (imagen) {
            return <Image
                source={{ uri: 'data:image/jpeg;base64,' + imagen }}
                style={styles.images}
            />
        } else {
            return <Image source={{ uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png' }}
                style={styles.images}
            />
        }
    }

    function crearLugar() {
        const nuevoArray = []
        categorias.map(item =>{
            nuevoArray.push(item.item)
        })

        fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                imagenPerfil: imagen,
                ubicacion: ubicacion,
                contacto: contacto,
                servicio: nuevoArray,
                valoracion: valoracion,
            })
        }).then(() => {
            setModalVisible(!modalVisible);
            setTitulo('');
            setDescripcion('');
            setImagen('');
            setUbicacion('');
            setContacto('');
            setCategorias([]);
            setValoracion('');
            getLugares();
        })
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

    function onMultiChange() {
        return (item) => setCategorias(xorBy(categorias, [item]))
    }
    function verArray() {
        const nuevoArray = []
        categorias.map(item =>{
            nuevoArray.push(item.item)
        })
        console.log(nuevoArray)
    }

    useEffect(() => {
        getLugares();
    }, []);

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
                    setTitulo('');
                    setDescripcion('');
                    setImagen('');
                    setUbicacion('');
                    setContacto('');
                    setCategorias([]);
                    setValoracion('');
                }}
            >
                <ScrollView>
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

                        <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Imagen de Portada</Text>
                        <View style={styles.ImageSections}>
                            <View>
                                {renderFileUri()}
                            </View>
                        </View>
                        <View style={styles.btnParentSection}>
                            <TouchableOpacity onPress={launchCamera} style={styles.btnSection}  >
                                <Text style={styles.btnText}>Abrir Camara</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={launchImageLibrary} style={styles.btnSection}  >
                                <Text style={styles.btnText}>Abrir Galeria</Text>
                            </TouchableOpacity>
                        </View>

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
                            value={valoracion}
                            onChangeText={setValoracion}
                            placeholder="valoracion"
                        />
                        <Pressable
                            onPress={() => crearLugar()}
                        >
                            <Text>CREAR</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={{ margin: 30 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 10 }}>Seleccione las categorías</Text>
                    <SelectBox
                        label="Select multiple"
                        options={K_OPTIONS}
                        selectedValues={categorias}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                    />
                </View>
                <Pressable
                    onPress={() => verArray()}
                >
                    <Text>VER ARRAY</Text>
                </Pressable>
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
                            <Pressable
                                onPress={() => navigation.navigate('EditLugares', { lugar: item })}>
                                <Text>{item.titulo}, {item.descripcion}</Text>
                            </Pressable>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default ReadLugares

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },

    body: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    }
});