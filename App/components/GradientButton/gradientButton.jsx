import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import globalStyles from '../../styles';

const GradientButton = ({ onPress, title, style, textStyle }) => {
    return (
      <LinearGradient
        colors={['#FF7E5F', '#FFB88C']}
        style={style}
      >
        <TouchableOpacity onPress={onPress} style={globalStyles.buttonContent}>
          <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

export default GradientButton;