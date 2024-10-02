import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Picker } from "react-native";
import EventModal from "../components/EventModal/eventModal";
import ApiCalls from "../apiCalls";

const Form = ({navigation, route}) => {
    const {token} = route.params;

    const [showModalEvent, setModalEvent] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(undefined);
    const [event, setEvent] = useState({});

    const [nombreEvento, setNombreEvento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [maxAsistentes, setMaxAsistentes] = useState('');
    const [precio, setPrecio] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ubicacion, setUbicacion] = useState('');

    const [categorias, setCategorias] = useState(null);
    const [ubicaciones, setUbicaciones] = useState(null)
    const apiCalls = new ApiCalls();
    const getCategoriesAndLocations = async () => {
        setCategorias((await apiCalls.getEventCategories()).map(item => item.name))
        setUbicaciones((await apiCalls.getEventLocations()).map(item => item.name))
    }

    //INICIALIZACION
    useEffect(() => {
        getCategoriesAndLocations();
    },[])

    const handleSubmit = () => {
        const eventoData = {
            nombreEvento,
            descripcion,
            duracion: parseInt(duracion, 10),
            maxAsistentes: parseInt(maxAsistentes, 10),
            precio: parseFloat(precio),
            fechaInicio,
            categoria,
            ubicacion,
        };

        if (checkBlanks() && checkValidations()) {
            setEvent(eventoData);
            setModalEvent(true);
        } else {
            alert("Todos los campos deben estar llenos y ser válidos");
        }
    };

    //cuando hay confirm del modal, se triggerea esto
    useEffect(() => {
        if(modalConfirm){
            apiCalls.uploadEvent(event);
            setModalConfirm(false);
        }
    },[modalConfirm])

    const checkBlanks = () => {
        const campos = [
            nombreEvento,
            descripcion,
            duracion,
            maxAsistentes,
            precio,
            fechaInicio,
            categoria,
            ubicacion
        ]; 
        return campos.every(campo => campo.trim() !== '');
    };

    const checkValidations = () => {
        return (
            Number.isInteger(parseInt(duracion, 10)) &&
            Number.isInteger(parseInt(maxAsistentes, 10)) &&
            !isNaN(parseFloat(precio)) &&
            !isNaN(Date.parse(fechaInicio))
        );
    };

    return (
        <>
            {showModalEvent && <EventModal event={event} visible={showModalEvent} setVisibility={setModalEvent} setConfirmation={setModalConfirm}/>}
            {categorias !== null && ubicaciones !== null &&
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Nombre del Evento:</Text>
                    <TextInput style={styles.input} value={nombreEvento} onChangeText={setNombreEvento} />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput style={styles.textarea} value={descripcion} onChangeText={setDescripcion} />

                    <Text style={styles.label}>Duración en minutos:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={duracion} 
                        onChangeText={setDuracion} 
                        keyboardType="numeric" // Permitir solo números
                    />

                    <Text style={styles.label}>Máximo de Asistentes:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={maxAsistentes} 
                        onChangeText={setMaxAsistentes} 
                        keyboardType="numeric" // Permitir solo números
                    />

                    <Text style={styles.label}>Precio:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={precio} 
                        onChangeText={setPrecio} 
                        keyboardType="decimal-pad" // Permitir enteros y decimales
                    />

                    <Text style={styles.label}>Fecha de Inicio:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={fechaInicio} 
                        onChangeText={setFechaInicio} 
                        placeholder="YYYY-MM-DD" // Placeholder para formato de fecha
                    />

                    <Text style={styles.label}>Categoría:</Text>
                    <Picker
                        selectedValue={categoria}
                        style={styles.select}
                        onValueChange={(itemValue) => setCategoria(itemValue)}
                    >
                        <Picker.Item label="Seleccione una categoría" value="" />
                        {categorias.map((cat, index) => (
                            <Picker.Item key={index} label={cat} value={cat} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Ubicación:</Text>
                    <Picker
                        selectedValue={ubicacion}
                        style={styles.select}
                        onValueChange={(itemValue) => setUbicacion(itemValue)}
                    >
                        <Picker.Item label="Seleccione una ubicación" value="" />
                        {ubicaciones.map((ubic, index) => (
                            <Picker.Item key={index} label={ubic} value={ubic} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Crear Evento</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            
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
