import { StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native-web'

const DeleteModal = ({visible, setVisibility, setConfirmation, event}) => {

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
                        <Text style={styles.modalTitle}>Deseas eliminar el evento: {event.name}?</Text>
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
});
export default DeleteModal;