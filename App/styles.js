import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    width: 30,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default globalStyles;
