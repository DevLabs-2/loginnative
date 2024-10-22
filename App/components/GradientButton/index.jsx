import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import globalStyles from '../../styles';

const GradientButton = ({ onPress, title, style, textStyle }) => {
    return (
      
      
      <TouchableOpacity style={[globalStyles.buttonContainer, style]} onPress={onPress}>
        <LinearGradient 
          colors={['#FF7E5F', '#FFB88C']}
          style={globalStyles.gradientButton}>
          <Text style={[globalStyles.buttonText, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
     
      
    );
  };
export default GradientButton;