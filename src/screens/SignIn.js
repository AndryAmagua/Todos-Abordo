import { View, Text, StyleSheet, Button, TextInput, LogBox, Image } from 'react-native';
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
LogBox.ignoreAllLogs()

const validationSchema = yup.object({
  correo: yup.string()
    .email('Correo no valido')
    .required("Correo Obligatorio"),
  contraseña: yup.string()
    .min(4, "Minimo 4 caracteres")
    .required("Contraseña obligatoria"),
})

const SigIn = (props) => {

  const onSignIn = async (correo, contraseña) => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contraseña: contraseña,
        })
      });
      const json = await response.json();
      const value = JSON.stringify(json)
      console.log(value)
      if (json.correo) {
        console.log("sign in")
        AsyncStorage.setItem('usuario', value)
        AsyncStorage.setItem('login', "true")
        props.route.params.funcion()
      } else {
        console.log(json.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Image source={require('../assets/Todos-a-bordo.jpeg')}
        style={{ height: 200, width: 'auto', borderRadius: 10, marginBottom: 10, resizeMode: "cover" }} />
      <Formik
        initialValues={{ correo: '', contraseña: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => { onSignIn(values.correo, values.contraseña) }}
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
            <TextInput
              placeholder='Contraseña'
              secureTextEntry={true}
              onChangeText={props.handleChange('contraseña')}
              value={props.values.contraseña}
              onBlur={props.handleBlur('contraseña')}
            />
            <Text>{props.touched.contraseña && props.errors.contraseña}</Text>
            <Button title='submit' color='blue' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
      <Button title='Sign Up' color='blue' onPress={() => props.navigation.navigate('Sign-Up')} />
      <Button title='Recover Password' color='blue' onPress={() => props.navigation.navigate('Recover-Password')} />
    </View>
  )
}

export default SigIn