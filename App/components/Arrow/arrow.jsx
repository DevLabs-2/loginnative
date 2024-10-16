import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import globalStyles from '../../styles';

const Arrow = ({ onPress, style }) => {
    return (
      
      
      <TouchableOpacity style={style} onPress={onPress}>
        <Image
            source={require('../../assets/arrowIcon.png')}
            style={styles.icon}
            alt="arrow"
        />
      </TouchableOpacity>
     
      
    );
  };

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});

export default Arrow;