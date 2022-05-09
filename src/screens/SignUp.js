import { View, Text, Button, TextInput, LogBox } from 'react-native'
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
})

const SignUp = ({ navigation }) => {
    return (
        <View>
            <Formik
                initialValues={{ nombre: '', celular: '', sector: '', correo: '', contraseña: '', validacion: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/usuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombre: values.nombre,
                            celular: values.celular,
                            correo: values.correo,
                            contraseña: values.contraseña,
                            sector: values.sector,
                        })
                    }).then(() => {
                        alert("Usuario creado")
                        navigation.navigate('Sign-In');
                    }).catch(err => {
                        alert("Ocurrio un error")
                    })
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
                        <Button title='submit' color='blue' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SignUp