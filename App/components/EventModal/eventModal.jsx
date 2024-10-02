import { StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native-web'

const EventModal = ({visible, setVisibility, setConfirmation, event}) => {

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
                        <Text style={styles.modalTitle}>Información del Evento</Text>
                        <Text>Nombre: {event.nombreEvento}</Text>
                        <Text>Descripción: {event.descripcion}</Text>
                        <Text>Duración: {event.duracion} minutos</Text>
                        <Text>Máximo de Asistentes: {event.maxAsistentes}</Text>
                        <Text>Precio: {event.precio}</Text>
                        <Text>Fecha de Inicio: {event.fechaInicio}</Text>
                        <Text>Categoría: {event.categoria}</Text>
                        <Text>Ubicación: {event.ubicacion}</Text>

                        <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {setConfirmation(true); setVisibility(false)}}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {setConfirmation(false); setVisibility(false)}}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
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
});
export default EventModal;