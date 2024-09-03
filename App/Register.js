import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import globalStyles from './styles';
import GradientButton from './components/GradientButton/gradientButton';
import ApiCalls from './apiCalls';
const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [regError, setRegError] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (firstName && lastName && username && password) {
      const api = new ApiCalls();
      const apiBack = await api.register(firstName, lastName, username, password)
      if(apiBack.status != 200){
        setRegError(true);
        setError(apiBack.msj);
      }
      else{
        navigation.navigate('Login');
      }
    } else {
      alert('Registration Failed', 'Please fill out all fields');
    }
  };

  return (
    <>
      <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
      >
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
        
        {regError && <Text style={globalStyles.text}>{error}</Text>}

        <GradientButton onPress={handleRegister} title={'Registrarse'} style={globalStyles.gradientButton} textStyle={globalStyles.buttonText}/>

        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
          <Text>ya tengo cuenta!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
    
  );
};

export default RegisterScreen;
