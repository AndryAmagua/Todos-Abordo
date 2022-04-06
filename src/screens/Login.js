import { View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react'

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButtons from '../components/SocialButtons';

const Login = ({navigation}) => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const onSignInPressed = () => {
        console.warn("Home Pressed");
    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password Pressed");
    }

    const onSignUpPressed = () => {
        navigation.navigate('RegistroUsuario');
    }

  return (
    <View style={styles.root}>
      <Text>Bienvenido</Text>
      <CustomInput
      placeholder="correo" 
      value={correo} 
      setValue={setCorreo} 
      secureTextEntry={false} 
      />
      <CustomInput 
      placeholder="contraseña" 
      value={contraseña} 
      setValue={setContraseña} 
      secureTextEntry={true} 
      />
      <CustomButton 
      texto="Iniciar sesion" 
      onPress={onSignInPressed} 
      bgColor="#3498DB"
      fgColor="#FDFEFE"
      />
      <CustomButton 
      texto="¿Olvidaste tu contraseña?" 
      onPress={onForgotPasswordPressed} 
      bgColor=""
      fgColor="#34495E" 
      />
      <SocialButtons />
      <CustomButton 
      texto="Crear una cuenta" 
      onPress={onSignUpPressed} 
      bgColor=""
      fgColor="#34495E" 
      />
    </View>
  )
}

export default Login

const styles =StyleSheet.create({
    root: {
      padding: 20,
    },
});