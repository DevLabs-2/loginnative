import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import globalStyles from '../styles';
import ApiCalls from '../apiCalls';
import AddEventButton from '../components/AddEventButton/index.jsx';
import Navbar from '../components/NavBar/index.jsx';
const apicall = new ApiCalls();
const Home = ({route, navigation}) => {


  const {token} = route.params;

  const [arrayEvents, setArrayEvents] = useState([]);
  const [arrayFiltrado, setArrayFiltrado] = useState([]);
  const callEvents = async () => {
    setArrayEvents(await apicall.getAllEvents())
  }
  useEffect(() => {
    setArrayFiltrado(filtrarArray(arrayEvents));
  }, [arrayEvents])
  useEffect(() => {
    callEvents()
  },[])

  const formPress = () => {
    navigation.navigate('Form', {
        token: token,
        mode: 'add',
        eventParam: {
        id: '',
        nombreEvento: '',
        descripcion: '',
        duracion: '',
        maxAsistentes: '',
        precio: '',
        fechaInicio: '',
        categoria: '',
        ubicacion: '',
        habilitado: ''
      },
      });
  }
  const filtrarArray = (array) => {
    let result = [];
    array.forEach(element => {
      let date = new Date(element.start_date)
      if(date.getTime() > Date.now()){
        result.push(element)
      } 
    });
    return result;
  }
  const handleSubscribe = async (id) => {
    if(await (apicall.uploadSuscribe(id, token))){
      alert("Se subscribió correctamente")
    }
    else{
      alert("Hubo un error")
    }
    
  }
  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.duration}>Duración: {item.duration_in_minutes} mins</Text>
        <Text style={styles.price}>Precio: ${item.price}</Text>
        <Text style={styles.date}>Fecha de Inicio: {new Date(item.start_date).toLocaleDateString()}</Text>
        <View style={styles.flex}>
          <Text style={[styles.status, item.enabled_for_enrollment === "1" ? styles.enabled : styles.disabled]}>
              {item.enabled_for_enrollment === "1" ? 'Habilitado' : 'No Habilitado'}
          </Text>
          {item.enabled_for_enrollment === "1" ? <TouchableOpacity style={styles.boton} onPress={() => {handleSubscribe(item.id)}}>
            <Text style={styles.botonText}>Suscribirse</Text>
          </TouchableOpacity> : <></>}
        </View>
    </View>
);

  return (
    <>
    <Navbar navigation={navigation} token={token}/>
    <FlatList
            data={arrayFiltrado}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    <View style={globalStyles.container}>
      <AddEventButton onPress={formPress}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',

  },
  botonText: {
    color: 'black',
    fontFamily: 'Segoe UI',
    fontWeight: 500,
  },
  card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      elevation: 3, // Para Android
      shadowColor: '#000', // Para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  description: {
      marginVertical: 5,
      color: '#666',
  },
  duration: {
      color: '#333',
  },
  price: {
      marginVertical: 5,
      color: '#007BFF',
  },
  date: {
      marginTop: 10,
      color: '#999',
  },
  status: {
      marginTop: 10,
      fontWeight: 'bold',
  },
  enabled: {
      color: 'green',
  },
  disabled: {
      color: 'red',
  },
});


export default Home;
