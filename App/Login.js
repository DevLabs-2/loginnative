import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import globalStyles from './styles';
import GradientButton from './components/GradientButton/gradientButton';
const Login = () => {
  const [inputUsername, setinputUsername] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [user, setUser] = useState({
    name: "Maxi",
    surname: "Sher",
    username: "maximusprime",
    contraseña: "1234"
  })

  const handleLogin = () => {
    if (inputUsername === 'caca' && inputPassword === 'caca') {
      alert('Login Successful', `Welcome ${inputUsername}!`);
    } else {
      alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={inputUsername}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={inputPassword}
        onChangeText={text => setPassword(text)}
      />
      <GradientButton onPress={handleLogin} title={Ingresar} style={globalStyles.gradientButton} textStyle={globalStyles.buttonText}/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Login;
