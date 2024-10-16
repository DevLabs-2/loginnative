import Navbar from "../components/NavBar/NavBar";

/*
    Dividir en dos la pantalla 

    1: Eventos no ocurridos::
    Editar (Form completado)
    Eliminar
    Participantes (Modal con busqueda[opcional])

    2: Eventos ocurridos::
    Participantes (Modal con busqueda)
    

*/

const Admin = ({navigation, route}) => {
    const {token} = route.params;
    return(
        <>
            <Navbar navigation={navigation} token={token}/>

        </>
    )

}
export default Admin;