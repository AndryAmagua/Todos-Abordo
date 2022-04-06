import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButtons from '../components/SocialButtons';

const RegistroUsuario = ({navigation}) => {
    const [nombre, setNombre] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [sector, setSector] = useState('');
  
    const onResgisterPressed = () => {
      console.warn("Register Pressed");
    }
  
    const onSignInPressed = () => {
      console.warn("Sign In Pressed");
    }
    
    return (
      <ScrollView>
      <View style={styles.root}>
        <Text style={styles.titulo}>Crea una cuenta</Text>
        <CustomInput
        placeholder="Nombre" 
        value={nombre} 
        setValue={setNombre}  
        secureTextEntry={false}
        />
        <CustomInput 
        placeholder="Celular" 
        value={celular} 
        setValue={setCelular} 
        secureTextEntry={false}
        />
        <CustomInput
        placeholder="Correo" 
        value={correo} 
        setValue={setCorreo}  
        secureTextEntry={false}
        />
        <CustomInput 
        placeholder="Contraseña" 
        value={contraseña} 
        setValue={setContraseña} 
        secureTextEntry={true}
        />
        <CustomInput
        placeholder="Sector" 
        value={sector} 
        setValue={setSector} 
        secureTextEntry={false}
        />
        <CustomButton 
        texto="Registrar" 
        onPress={onResgisterPressed} 
        bgColor="#3498DB"
        fgColor="#FDFEFE"
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
    )
}

export default RegistroUsuario

const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
    }
})