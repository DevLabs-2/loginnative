import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles';
const GoodDayScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>¡Buen día!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default GoodDayScreen;
