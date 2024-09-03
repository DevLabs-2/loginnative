import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles';
const GoodDayScreen = ({route, navigation}) => {
  const {token} = route.params;
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>¡Buen día!</Text>
      <Text style={{textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '80%'}}>{`Tu token es \n ${token}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default GoodDayScreen;
