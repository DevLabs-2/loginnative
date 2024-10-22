import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ApiCalls from '../apiCalls';
import Navbar from '../components/NavBar/index.jsx';
import DeleteModal from '../components/DeleteModal/index.jsx';
import ParticipantsModal from '../components/ParticipantsModal/index.jsx';

/*
    Dividir en dos la pantalla 

    1: Eventos no ocurridos::
    Editar (Form completado)
    Eliminar
    Participantes (Modal con busqueda[opcional])

    2: Eventos ocurridos::
    Participantes (Modal con busqueda)
    

*/
const apicall = new ApiCalls();

const Admin = ({navigation, route}) => {
    const {token} = route.params;

    const [arrayEvents, setArrayEvents] = useState([]);
    const [arrayProximos, setArrayProximos] = useState([]);
    const [arrayPasados, setArrayPasados] = useState([]);

    const [event, setEvent] = useState({});
    const [showModalDelete, setModalDelete] = useState(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(undefined);
    const [showModalParticipants, setModalParticipants] = useState(false);

    const callEvents = async () => {
      setArrayEvents(await apicall.getAllEvents())
    }
    useEffect(() => {
        callEvents()
    },[])
    useEffect(() => {
        filtrarArray(arrayEvents);
    }, [arrayEvents])


    const filtrarArray = (array) => {
        let proximos = [], pasados = [];
        array.forEach(element => {
          let date = new Date(element.start_date)
          if(date.getTime() > Date.now()){
            proximos.push(element)
          }
          else {
            pasados.push(element)
        }
        setArrayPasados(pasados);
        setArrayProximos(proximos);
        });
    }

    const editEvent = (item) => {
        navigation.navigate('Form', {
            token: token,
            mode: 'edit',
            eventParam: {
            id: item.id,
            nombreEvento: item.name,
            descripcion: item.description,
            duracion: item.duration_in_minutes,
            maxAsistentes: item.max_assistance,
            precio: item.price,
            fechaInicio: item.start_date,
            categoria: item.id_event_category,
            ubicacion: item.id_event_location,
            habilitado: item.enabled_for_enrollment
          },
          });
      }
    
    //Delete
    const deleteEvent = (eventoData) => {
        setEvent(eventoData);
        setModalDelete(true);
    }
    useEffect(() => {
        if(modalConfirmDelete){
            apicall.deleteEvent(event.id, token);
            setModalConfirmDelete(false);
        }
    },[modalConfirmDelete])

    //Participants
    const modalParticipants = (eventoData) => {
        setEvent(eventoData);
        setModalParticipants(true);
    }


    const renderItem = ({ item }) => {
        let date = new Date(item.start_date)
        return(
            <View style={styles.card}>
                <View style={styles.main}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.duration}>Duración: {item.duration_in_minutes} mins</Text>
                    <Text style={styles.price}>Precio: ${item.price}</Text>
                    <Text style={styles.date}>Fecha de Inicio: {new Date(item.start_date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.buttons}>
                    {date.getTime() > Date.now() && <>
                        <View>
                            <TouchableOpacity style={styles.boton} onPress={() => {editEvent(item)}}>
                                <Text style={styles.botonText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.boton} onPress={() => {deleteEvent(item)}}>
                                <Text style={styles.botonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                    <View>
                        <TouchableOpacity style={styles.boton} onPress={() => {modalParticipants(item)}}>
                            <Text style={styles.botonText}>Participantes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <>
            <Navbar navigation={navigation} token={token}/>
            {showModalDelete && <DeleteModal event={event} visible={showModalDelete} setVisibility={setModalDelete} setConfirmation={setModalConfirmDelete}/>}
            {showModalParticipants && <ParticipantsModal event={event} visible={showModalParticipants} setVisibility={setModalParticipants}/>}
            <View style={styles.page}>
                <View style={styles.section}>
                   <Text style={styles.title}>Próximos Eventos</Text> 
                   <FlatList
                        data={arrayProximos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Eventos Pasados</Text>
                    <FlatList
                        data={arrayPasados}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
        </>
    )

}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 3,
        display: 'flex',
        flexDirection: 'row',

    },
    section: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
        width: '45%',
    },
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
        marginTop: 3,
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
        display: 'flex',
        flexDirection: 'row'
    },
    main: {
        width: '80%'
    },
    buttons: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
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
    }
});

export default Admin;