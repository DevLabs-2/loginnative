import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Navbar = ({ navigation, token }) => {
  const nav = (str) => {
    navigation.navigate(str, {
      token: token,
    });
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => nav('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav('Admin')} style={styles.button}>
        <Text style={styles.buttonText}>Panel de Administrador</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'base-line',
    alignItems: 'Left',
    paddingVertical: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#61dafb',
    marginLeft: 20
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navbar;
