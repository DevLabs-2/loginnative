import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ onPress, title, style, textStyle }) => {
    return (
      <LinearGradient
        colors={['#FF7E5F', '#FFB88C']}
        style={style}
      >
        <TouchableOpacity onPress={onPress} style={styles.buttonContent}>
          <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

export default GradientButton;