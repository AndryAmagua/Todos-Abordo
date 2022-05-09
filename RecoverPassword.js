import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
    correo: yup.string()
        .email('Correo no valido')
        .required("Correo Obligatorio"),
})

const RecoverPassword = () => {
    const [data, setData] = useState({})

    const getUsuario = async (correo) => {
        try {
            const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/usuarios/recover/' + correo);
            const json = await response.json();
            if (json[0] != null) {
                setData(json[0])
                console.log(data.contraseña)
            }else{
                Alert.alert("Aviso", "No existe un usuario creado con este correo")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
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
                        <Button title='submit' color='blue' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default RecoverPassword