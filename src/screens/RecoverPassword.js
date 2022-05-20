import { View, Text, TextInput, Button, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { set } from 'react-native-reanimated'

const validationSchema = yup.object({
    correo: yup.string()
        .email('Correo no valido')
        .required("Correo Obligatorio"),
})

const validationModal = yup.object({
    primera: yup.string()
        .required('Respuesta de seguridad obligatoria'),
    segunda: yup.string()
        .required('Respuesta de seguridad obligatoria'),
    tercera: yup.string()
        .required('Respuesta de seguridad obligatoria'),
})

const RecoverPassword = ({ navigation: { goBack } }) => {
    const [data, setData] = useState({})
    const [modalVisible, setModalVisible] = useState(false)

    const getUsuario = async (correo) => {
        try {
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/usuarios/recover/' + correo);
            const json = await response.json();
            if (json[0] != null) {
                setData(json[0])
                setModalVisible(true)
            } else {
                Alert.alert("Aviso", "No existe un usuario creado con este correo")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                style={{ padding: 20 }}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View>
                    <Formik
                        initialValues={{ primera: '', segunda: '', tercera: '' }}
                        validationSchema={validationModal}
                        onSubmit={(values) => {
                            if (data.respuestas[0] == values.primera && data.respuestas[1] == values.segunda && data.respuestas[2] == values.tercera) {
                                Alert.alert("Su contrseña es: ", data.contraseña)
                                setModalVisible(false)
                            } else {
                                Alert.alert("Aviso", "Las respuestas no coinciden")
                            }
                        }}
                    >
                        {(props) => (
                            <View>
                                <Button title='Enviar' color='blue' onPress={props.handleSubmit} />
                                <Text>¿Pelicula favorita?</Text>
                                <TextInput
                                    placeholder='Primera respuesta'
                                    onChangeText={props.handleChange('primera')}
                                    value={props.values.primera}
                                    onBlur={props.handleBlur('primera')}
                                />
                                <Text>{props.touched.primera && props.errors.primera}</Text>
                                <Text>¿Comida favorita?</Text>
                                <TextInput
                                    placeholder='Segunda respuesta'
                                    onChangeText={props.handleChange('segunda')}
                                    value={props.values.segunda}
                                    onBlur={props.handleBlur('segunda')}
                                />
                                <Text>{props.touched.segunda && props.errors.segunda}</Text>
                                <Text>¿Nombre de su primera mascota?</Text>
                                <TextInput
                                    placeholder='Tercera respuesta'
                                    onChangeText={props.handleChange('tercera')}
                                    value={props.values.tercera}
                                    onBlur={props.handleBlur('tercera')}
                                />
                                <Text>{props.touched.tercera && props.errors.tercera}</Text>
                            </View>
                        )}
                    </Formik>
                </View>
                <Button title='cancelar' color='red' onPress={() => {
                    setModalVisible(false)
                }} />
            </Modal>

            <Formik
                initialValues={{ correo: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => { getUsuario(values.correo) }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            placeholder='Correo'
                            onChangeText={props.handleChange('correo')}
                            value={props.values.correo}
                            onBlur={props.handleBlur('correo')}
                        />
                        <Text>{props.touched.correo && props.errors.correo}</Text>
                        <Button title='enviar' color='blue' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
            <Button title='regresar' color='grey' onPress={() => goBack()} />
        </View>
    )
}

export default RecoverPassword