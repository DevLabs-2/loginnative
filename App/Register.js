import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import globalStyles from './styles';
import GradientButton from './components/GradientButton/gradientButton';
const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (firstName && lastName && username && password) {
      navigation.navigate('Login');
    } else {
      alert('Registration Failed', 'Please fill out all fields');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Register</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <GradientButton onPress={handleRegister} title={'Registrarse'} style={globalStyles.gradientButton} textStyle={globalStyles.buttonText}/>

      <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
        <Text>ya tengo cuenta!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default RegisterScreen;
