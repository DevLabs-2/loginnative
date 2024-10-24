import React from 'react';
import { StyleSheet } from 'react-native';
import GradientButton from '../GradientButton/index';
import { View } from 'react-native-web';


const AddEventButton = ({onPress}) => {
    return (
      <>
        <View style={style.container}>
            <GradientButton style={style.btnStyle} onPress={onPress} title={"Agregar Evento +"} textStyle={style.textStyle}/>
        </View> 
      </>
    );
  };
  const style = StyleSheet.create({
    container: {
        width: "10%",
        marginTop: '-5%'
    },
    btnStyle: {
        
    },
    textStyle: {
        fontSize: "10 vm",
    },
  })
export default AddEventButton;