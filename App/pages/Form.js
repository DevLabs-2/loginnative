import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import EventModal from "../components/EventModal/eventModal";

const Form = () => {

    const [showModalEvent, setModalEvent] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(undefined);
    const [event, setEvent] = useState({})

    const [nombreEvento, setNombreEvento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [maxAsistentes, setMaxAsistentes] = useState('');
    const [precio, setPrecio] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ubicacion, setUbicacion] = useState('');

    const handleSubmit = () => {
        const eventoData = {
            nombreEvento,
            descripcion,
            duracion,
            maxAsistentes,
            precio,
            fechaInicio,
            categoria,
            ubicacion,
        };
        setEvent(eventoData)
        setModalEvent(true)
    };

    return (
        <>
            {showModalEvent && <EventModal event={event} visibility={setModalEvent} confirmation={setModalConfirm}/>}
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Nombre del Evento:</Text>
                    <TextInput style={styles.input} value={nombreEvento} onChangeText={setNombreEvento} />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput style={styles.textarea} value={descripcion} onChangeText={setDescripcion} />

                    <Text style={styles.label}>Duración en minutos:</Text>
                    <TextInput style={styles.input} value={duracion} onChangeText={setDuracion} />

                    <Text style={styles.label}>Máximo de Asistentes:</Text>
                    <TextInput style={styles.input} value={maxAsistentes} onChangeText={setMaxAsistentes} />

                    <Text style={styles.label}>Precio:</Text>
                    <TextInput style={styles.input} value={precio} onChangeText={setPrecio} />

                    <Text style={styles.label}>Fecha de Inicio:</Text>
                    <TextInput style={styles.input} value={fechaInicio} onChangeText={setFechaInicio} />

                    <Text style={styles.label}>Categoría:</Text>
                    <TextInput style={styles.select} value={categoria} onChangeText={setCategoria} />

                    <Text style={styles.label}>Ubicación:</Text>
                    <TextInput style={styles.select} value={ubicacion} onChangeText={setUbicacion} />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Crear Evento</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        marginHorizontal: 20,
    },
    label: {
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    textarea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    select: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Form;