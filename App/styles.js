import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  linkText: {
    color: '#007bff',
    marginTop: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    height: 50,
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center',
  },
  buttonContent: {
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#000',
  },
});

export default globalStyles;
