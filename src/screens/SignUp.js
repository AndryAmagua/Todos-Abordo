import { View, Text, Button, TextInput, LogBox, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Picker } from '@react-native-picker/picker'
LogBox.ignoreAllLogs()

const validationSchema = yup.object({
    nombre: yup.string()
        .required("Nombre de usuario obligatorio"),
    celular: yup.string()
        .min(10, "Minimo 10 numeros")
        .max(10, "Maximo 10 numeros")
        .required("Numero celular obligatorio"),
    sector: yup.string()
        .oneOf(
            ["Yacucalle", "La Victoria", "Caranqui", "Los Ceibos", "Otro"], "Sector no valido"
        )
        .required("Seleccione un sector"),
    correo: yup.string()
        .email('Correo no valido')
        .required("Correo Obligatorio"),
    contraseña: yup.string()
        .min(4, "Minimo 4 caracteres")
        .required("Contraseña obligatoria"),
    validacion: yup.string()
        .required('Validacion de contraseña obligatoria')
        .test("passwords-match", "Los valores no coinciden", function (valor) {
            return this.parent.contraseña == valor;
        }),
    primera: yup.string()
        .required('Respuesta de seguridad obligatoria'),
    segunda: yup.string()
        .required('Respuesta de seguridad obligatoria'),
    tercera: yup.string()
        .required('Respuesta de seguridad obligatoria'),
})

const SignUp = ({ navigation: { goBack } }) => {

    const onSignUp = async (nombre, celular, correo, contraseña, sector, respuestas) => {
        try {
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    celular: celular,
                    correo: correo,
                    contraseña: contraseña,
                    sector: sector,
                    respuestas: respuestas
                })
            });
            const json = await response.json()
            if (json.ok == true) {
                Alert.alert("Aviso", json.message)
                goBack()
            } else {
                Alert.alert("Aviso", json.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView style={{ margin: 10 }}>
            <Formik
                initialValues={{ nombre: '', celular: '', sector: '', correo: '', contraseña: '', validacion: '', primera: '', segunda: '', tercera: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSignUp(values.nombre, values.celular, values.correo, values.contraseña, values.sector, [values.primera, values.segunda, values.tercera])
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            placeholder='Nombre'
                            onChangeText={props.handleChange('nombre')}
                            value={props.values.nombre}
                            onBlur={props.handleBlur('nombre')}
                        />
                        <Text>{props.touched.nombre && props.errors.nombre}</Text>
                        <TextInput
                            placeholder='Celular'
                            keyboardType='numeric'
                            onChangeText={props.handleChange('celular')}
                            value={props.values.celular}
                            onBlur={props.handleBlur('celular')}
                        />
                        <Text>{props.touched.celular && props.errors.celular}</Text>

                        <Picker
                            selectedValue={props.values.sector}
                            onValueChange={props.handleChange('sector')}
                            onBlur={props.handleBlur('sector')}
                        >
                            <Picker.Item label="Selecione un sector" value="Unknown" />
                            <Picker.Item label="Yacucalle" value="Yacucalle" />
                            <Picker.Item label="Caranqui" value="Caranqui" />
                        </Picker>
                        <Text>{props.touched.sector && props.errors.sector}</Text>
                        <TextInput
                            placeholder='Correo'
                            onChangeText={props.handleChange('correo')}
                            value={props.values.correo}
                            onBlur={props.handleBlur('correo')}
                        />
                        <Text>{props.touched.correo && props.errors.correo}</Text>
                        <TextInput
                            placeholder='Contraseña'
                            secureTextEntry={true}
                            onChangeText={props.handleChange('contraseña')}
                            value={props.values.contraseña}
                            onBlur={props.handleBlur('contraseña')}
                        />
                        <Text>{props.touched.contraseña && props.errors.contraseña}</Text>
                        <TextInput
                            placeholder='Validar contraseña'
                            secureTextEntry={true}
                            onChangeText={props.handleChange('validacion')}
                            value={props.values.validacion}
                            onBlur={props.handleBlur('validacion')}
                        />
                        <Text>{props.touched.validacion && props.errors.validacion}</Text>

                        <Text>¿Pelicula favorita?</Text>
                        <TextInput
                            placeholder='Respuesta 1'
                            onChangeText={props.handleChange('primera')}
                            value={props.values.primera}
                            onBlur={props.handleBlur('primera')}
                        />
                        <Text>{props.touched.primera && props.errors.primera}</Text>
                        <Text>¿Comida favorita?</Text>
                        <TextInput
                            placeholder='Respuesta 2'
                            onChangeText={props.handleChange('segunda')}
                            value={props.values.segunda}
                            onBlur={props.handleBlur('segunda')}
                        />
                        <Text>{props.touched.segunda && props.errors.segunda}</Text>
                        <Text>¿Nombre de su primera mascota?</Text>
                        <TextInput
                            placeholder='Respuesta 3'
                            onChangeText={props.handleChange('tercera')}
                            value={props.values.tercera}
                            onBlur={props.handleBlur('tercera')}
                        />
                        <Text>{props.touched.tercera && props.errors.tercera}</Text>

                        <Button title='crear cuenta' color='blue' onPress={props.handleSubmit} />
                        <Button title='cancelar' color='grey' onPress={() => goBack()} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default SignUp