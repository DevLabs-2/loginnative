import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Picker, Switch } from "react-native";
import EventModal from "../components/EventModal/index.jsx";
import ApiCalls from "../apiCalls";
import Arrow from "../components/Arrow/index.jsx";
import { ScrollView } from "react-native-web";
import Navbar from "../components/NavBar/index.jsx";

const Form = ({navigation, route}) => {
    const {token, mode, eventParam} = route.params;

    const [showModalEvent, setModalEvent] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(undefined);
    const [event, setEvent] = useState({});

    const [id, setId] = useState();
    const [nombreEvento, setNombreEvento] = useState();
    const [descripcion, setDescripcion] = useState();
    const [duracion, setDuracion] = useState();
    const [maxAsistentes, setMaxAsistentes] = useState();
    const [precio, setPrecio] = useState();
    const [fechaInicio, setFechaInicio] = useState();
    const [categoria, setCategoria] = useState();
    const [ubicacion, setUbicacion] = useState();
    const [habilitado, setHabilitado] = useState();

    const [categorias, setCategorias] = useState(null);
    const [ubicaciones, setUbicaciones] = useState(null);

    const [categoriasObj, setCategoriasObj] = useState(null);
    const [ubicacionesObj, setUbicacionesObj] = useState(null);

    const apiCalls = new ApiCalls();
    const getCategoriesAndLocations = async () => {
        setCategoriasObj(await apiCalls.getEventCategories())
        setUbicacionesObj(await apiCalls.getEventLocations(token))
    }
    
    //INICIALIZACION
    useEffect(()=>{
        setId(eventParam.id);
        setNombreEvento(eventParam.nombreEvento);
        setDescripcion(eventParam.descripcion);
        setDuracion(eventParam.duracion.toString());
        setMaxAsistentes(eventParam.maxAsistentes.toString());
        setPrecio(eventParam.precio.toString());
        setFechaInicio(eventParam.fechaInicio);
        setCategoria(eventParam.categoria);
        setUbicacion(eventParam.ubicacion);
        setHabilitado(eventParam.habilitado);

        getCategoriesAndLocations();
    },[eventParam])
    useEffect(() => {
        console.log("a")
        if(categoriasObj !== null){
            setCategorias(categoriasObj.map(item => item.name));
            const cat = (categoriasObj.find((item) => item.id === categoria))
            if(cat){
                setCategoria(cat.name)
            }
        }
    },[categoriasObj])
    useEffect(() => {
        console.log(ubicacionesObj)
        if(ubicacionesObj !== null){
            setUbicaciones(ubicacionesObj.map(item => item.name));
            const ubi = (ubicacionesObj.find((item) => item.id === ubicacion))
            if(ubi){
                setUbicacion(ubi.name)
            }
        }
    },[ubicacionesObj])

    const handleSubmit = async () => {
        const catId = categoriasObj.find((item) => item.name === categoria).id;
        const ubiId = ubicacionesObj.find((item) => item.name === ubicacion).id;
        const eventoData = {
            name: nombreEvento,
            description: descripcion,
            id_event_category: catId,
            id_event_location: ubiId,
            start_date: validarFecha(fechaInicio).date,
            duration_in_minutes: parseInt(duracion, 10),
            price: parseFloat(precio),
            enabled_for_enrollment: habilitado,
            max_assistance: parseInt(maxAsistentes, 10),
            
        };
        console.log(eventoData)
        if (checkBlanks() && checkValidations()) {
            setEvent(eventoData);
            setModalEvent(true);
        } else {
            alert("Todos los campos deben estar llenos y ser válidos. El nombre y descripcion deben ser de al menos 3 caracteres.");
        }
    };

    useEffect(() => {
        if(modalConfirm){
            if(mode === "add"){
                apiCalls.uploadEvent(event, token)
            }
            else {
                let data = event;
                data.id = id;
                apiCalls.updateEvent(data, token)
            }
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
        console.log(campos)
        return campos.every(campo => campo.trim() !== '');
    };

    const checkValidations = () => {
        return (
            nombreEvento.length > 2 &&
            descripcion.length > 2 &&
            Number.isInteger(parseInt(duracion, 10)) &&
            Number.isInteger(parseInt(maxAsistentes, 10)) &&
            !isNaN(parseFloat(precio)) &&
            validarFecha(fechaInicio).success
        );
    };

    validarFecha = (dateStr) => {
        let result = {
            success: false,
            date: undefined
        };
        let dateObj = new Date(dateStr);
        if (!isNaN(dateObj.getTime())) {
            result.success = true;
            result.date = dateObj;
        }
        return result;
    }

    const handleBack = () => {
        navigation.navigate('Home', {
            token: token,
          });
    }

    const toggleSwitch = () => setHabilitado(previousState => !previousState);

    return (
        <>
        <Navbar navigation={navigation} token={token}/>
            <ScrollView style={styles.page}>
                <Arrow style={styles.arrow} onPress={() => {handleBack()}}/>
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
                            {   
                                ubicaciones.map((ubic, index) => (
                                <Picker.Item key={index} label={ubic} value={ubic} />
                            ))}
                        </Picker>
                        <View style={styles.container}>
                            <Text style={styles.label}>Inscripción {habilitado ? 'Habilitada' : 'Deshabilitada'}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={habilitado ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={toggleSwitch}
                                value={habilitado}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>{mode === "add" ? 'Crear Evento' : 'Editar Evento'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 3,
    },
    arrow: {
        marginLeft: 5,
        width: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

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
        fontSize: 18,
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
