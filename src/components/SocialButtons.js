import React from 'react';
import CustomButton  from './CustomButton';


const SocialButtons = () => {

    const onSignInFacebook = () => {
        console.warn("Sign In Facebook Pressed");
      }
    
      const onSignInGoogle = () => {
        console.warn("Sign In Google Pressed");
      }
    
      const onSignInApple = () => {
        console.warn("Sign In Apple Pressed");
      }

  return (
    <>
        <CustomButton 
            texto="Iniciar sesion con Facebook" 
            onPress={onSignInFacebook} 
            bgColor="#e7eaf4"
            fgColor="#4765a9" 
        />
        <CustomButton 
            texto="Iniciar sesion con Google" 
            onPress={onSignInGoogle} 
            bgColor="#fae9ea"
            fgColor="#dd4d44" 
        />
        <CustomButton 
            texto="Iniciar sesion con Apple" 
            onPress={onSignInApple} 
            bgColor="#e3e3e3"
            fgColor="#363636" 
        />
    </>      
  );
};
export default SocialButtons;