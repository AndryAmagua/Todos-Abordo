import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Button, TextInput, View, ScrollView } from 'react-native';

import { Picker } from "@react-native-picker/picker";
import { Formik } from 'formik';
import * as yup from 'yup';


import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButtons from '../components/SocialButtons';

const SignUp = ({ navigation }) => {

  const [selectedValue, setSelectedValue] = useState("Yacucalle");
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }


  const onResgisterPressed = () => {
    console.warn("Register Pressed");
  }

  const onSignInPressed = () => {
    console.warn("Sign In Pressed");
  }

  return (
    <Formik
      initialValues={{
        nombre: "",
        celular: "",
        sector: "",
        correo: "",
        contraseña: "",
        validarcontraseña: "",
      }}
      validationSchema={yup.object({
        nombre: yup
          .string()
          .required(),
        celular: yup
          .string()
          .max(10, "Maximo 10 numeros")
          .required(),
        sector: yup
          .string()
          .oneOf(
            ["Yacucalle", "La Victoria", "Caranqui", "Los Ceibos", "Otro"]
          )
          .required("Seleccione un sector."),
        correo: yup
          .string()
          .email('Correo no valido')
          .required(),
        contraseña: yup
          .string()
          .min(4, "Minimo 4 caracteres")
          .required("Ingrese contraseña"),
        validarcontraseña: yup
          .string()
          .required('Falta la validacion')
          .test("passwords-match", "Las contraseñas deben coincidir.", function (valor) {
            return this.parent.contraseña == valor;
          }),

      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 200);
      }}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <ScrollView>
          <View style={styles.root}>
            <Text style={styles.titulo}>Crea una cuenta</Text>
            <TextInput
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onBlur={() => setFieldTouched('nombre')}
              placeholder="Nombre"
            />
            {touched.nombre && errors.nombre &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.nombre}</Text>
            }
            <TextInput
              value={values.celular}
              onChangeText={handleChange('celular')}
              onBlur={() => setFieldTouched('celular')}
              placeholder="Celular"
            />
            {touched.celular && errors.celular &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.celular}</Text>
            }

            <Picker
              selectedValue={values.sector = selectedValue}
              onChangeText={handleChange('sector')}
              onBlur={() => setFieldTouched('sector')}
              style={{ height: 50, width: 150 }}
              onValueChange={(value, index) => setSelectedValue(value)}
            >
              <Picker.Item label="Yacucalle" value="Yacucalle" />
              <Picker.Item label="Caranqui" value="Caranqui" />
            </Picker>
            {touched.sector && errors.sector &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.sector}</Text>
            }
            {/* <Text style={styles.text} value = {values.sector = selectedValue} ></Text>
            {touched.sector && errors.sector &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.sector}</Text>
            } */}
            <TextInput
              value={values.correo}
              onChangeText={handleChange('correo')}
              onBlur={() => setFieldTouched('correo')}
              placeholder="Correo electrónico"
            />
            {touched.correo && errors.correo &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.correo}</Text>
            }
            <TextInput
              value={values.contraseña}
              onChangeText={handleChange('contraseña')}
              placeholder="Contraseña"
              onBlur={() => setFieldTouched('contraseña')}
              secureTextEntry={true}
            />
            {touched.contraseña && errors.contraseña &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.contraseña}</Text>
            }
            <TextInput
              value={values.validarcontraseña}
              onChangeText={handleChange('validarcontraseña')}
              placeholder="Validar Contraseña"
              onBlur={() => setFieldTouched('validarcontraseña')}
              secureTextEntry={true}
            />
            {touched.validarcontraseña && errors.validarcontraseña &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.validarcontraseña}</Text>
            }
            <Button
              color="#3740FE"
              title='Submit'
              disabled={!isValid}
              onPress={handleSubmit}
            />
            <SocialButtons />
            <CustomButton
              texto="¿Ya tienes una cuenta?"
              onPress={onSignInPressed}
              bgColor=""
              fgColor="#34495E"
            />
          </View>
        </ScrollView>
      )}
    </Formik >
  );
}

export default SignUp

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'yellow'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    marginVertical: 10,
    width: 150,
    padding: 5,
    borderWidth: 1,
    borderColor: "#666",
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  }
});