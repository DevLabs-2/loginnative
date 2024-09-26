import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import globalStyles from './styles';
import ApiCalls from './apiCalls';
const apicall = new ApiCalls();
const GoodDayScreen = ({route, navigation}) => {
  const [arrayEvents, setArrayEvents] = useState([]);
  const [page, setPage] = useState(1)
  const callEvents = async (loadPage) => {
    setArrayEvents(await apicall.getEventsByPage(loadPage))
    
  }
  useEffect(() => {
    console.log(arrayEvents)
  }, [arrayEvents])
  useEffect(() => {
    callEvents(page)
  },[page])
  const {token} = route.params;
  const renderItem = ({ item }) => (
    <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.duration}>Duración: {item.duration_in_minutes} mins</Text>
        <Text style={styles.price}>Precio: ${item.price}</Text>
        <Text style={styles.date}>Fecha de Inicio: {item.start_date}</Text>
        <Text style={[styles.status, item.enabled_for_enrollment === "1" ? styles.enabled : styles.disabled]}>
            {item.enabled_for_enrollment === "1" ? 'Habilitado' : 'No Habilitado'}
        </Text>
    </View>
);
  return (
    <>
    <FlatList
            data={arrayEvents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>¡Buen día!</Text>
      <Text style={{textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '80%'}}>{`Tu token es \n ${token}`}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
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


export default GoodDayScreen;
