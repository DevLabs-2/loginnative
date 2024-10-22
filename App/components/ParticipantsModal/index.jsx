import { StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native'
import { View, Text } from 'react-native-web'
import { useEffect, useState } from 'react';
import ApiCalls from '../../apiCalls';

const apiCalls = new ApiCalls();

const ParticipantsModal = ({visible, setVisibility, event}) => {
    
    const [participants, setParticipants] = useState([]);
    
    useEffect(() => {
        const callApi = async () => {
            const enrollments = await apiCalls.getEnrollmentsByEventID(event.id);
            const addUser = async (id) => {
                const user = await apiCalls.getUserByID(id);
                user.id = id;
                setParticipants(prevParticipants => [...prevParticipants, user])
            }
            enrollments.forEach(element => {
                addUser(element.id_user)
            });
        }
        callApi();
    },[])

    useEffect(() => {console.log(participants)},[participants])

    const renderItem = ({ item }) => {
        return(
            <View style={styles.card}>
                    <Text style={styles.description}>Nombre: {item.first_name}</Text>
                    <Text style={styles.description}>Apellido: {item.last_name}</Text>
                    <Text style={styles.description}>Usuario: {item.username}</Text>
                {/*
                PODRIA SERVIR MAS ADELANTE
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
                </View> */}
            </View>
        )
    }
    return(
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisibility(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lista</Text>
                        <FlatList
                            data={participants}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() =>{setVisibility(false)}}
                        >
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        width:'30%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 4,
    },
    card: {
        backgroundColor: '#d8d8d8',
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
        flexDirection: 'row',
        minHeight: 50,
    },
    main: {
        width: '80%'
    },
    description: {
        marginVertical: 5,
        marginHorizontal: 35,
        color: '#666',
    },
});
export default ParticipantsModal;