import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import globalStyles from '../styles';
import GradientButton from '../components/GradientButton/gradientButton';
import ApiCalls from '../apiCalls';

const Login = ({navigation}) => {
  const [inputUsername, setinputUsername] = useState('');
  const [inputPassword, setPassword] = useState('');

  const [regError, setRegError] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const api = new ApiCalls();
    const apiBack = await api.login(inputUsername, inputPassword);
    console.log(apiBack)
    if(apiBack.success){
      navigation.navigate('Home', {
        token: apiBack.token,
      });
    }
    else{
      console.log("a")
      setRegError(true);
      setError(apiBack.message);
    }
  };

  return (
    <>
      <KeyboardAvoidingView 
      style={globalStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <Text style={globalStyles.title}>Login</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Username"
          value={inputUsername}
          onChangeText={text => setinputUsername(text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry
          value={inputPassword}
          onChangeText={text => setPassword(text)}
        />

      {regError && <Text style={globalStyles.text}>{error}</Text>}

        <GradientButton onPress={handleLogin} title={'Ingresar'}/>

        <TouchableOpacity onPress={() => {navigation.navigate('RegisterScreen')}}>
          <Text>No tengo cuenta!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
    
  );
};

export default Login;