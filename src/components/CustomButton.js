import React from 'react';
import { Text, StyleSheet, Pressable} from 'react-native';


const CustomButton = ({onPress, texto, bgColor, fgColor}) => {
  return (
    <Pressable 
    onPress={onPress} 
    style={[
      styles.container, 
      bgColor ? {backgroundColor: bgColor} : {}
      ]}>
      <Text 
        style={[
          styles.text,
          fgColor ? {color: fgColor} : {}
        ]} 
      > 
        {texto} 
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
  text: {
        fontWeight: 'bold',
    },
});

export default CustomButton;