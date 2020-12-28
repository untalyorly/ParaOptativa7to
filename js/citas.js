var firebaseConfig = {
    apiKey: "AIzaSyD94fggvqy85G-qkatm3-9CprTamIRW8EM",
    authDomain: "optatica1.firebaseapp.com",
    databaseURL: "https://optatica1.firebaseio.com",
    projectId: "optatica1",
    storageBucket: "optatica1.appspot.com",
    messagingSenderId: "187848245776",
    appId: "1:187848245776:web:8f6c40295ecd6b2f704095"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  ////
  //LISTAR CITAS
const ContenidoConsulta = document.querySelector('#ContenidoConsulta');
const ContenidoAdministrador = document.querySelector('#ContenidoAdministrador');
const BodyCitas = document.querySelector('#BodyCitas');
const BodyCitasBusqueda = document.querySelector('#BodyCitasBusqueda');

const ventanaModal = document.querySelector('#ventanaModal');
const modal = document.querySelector('#modal');
const cerrarModal = document.querySelector('#cerrarModal');

const aprobar = document.querySelector('#aprobar');
const negar = document.querySelector('#negar');

const getCita = (id) => db.collection('citas').doc(id).get();
const ActualizaCita = (id, ActualizaCita) => db.collection('citas').doc(id).update(ActualizaCita);

const onGetCitas = (callback) => db.collection('citas').where("estado", "==", 0).onSnapshot(callback);
const onGetCitaAdmin = (callback) => db.collection('citas').where("estado", "==", 1).onSnapshot(callback);

auth.onAuthStateChanged(user =>{
    if(user){
        console.log('logiado');
    }else{
        console.log('no logiado');
        window.location.href='../view/login.html';
    }
});

//Apartado de consulta
if(ContenidoConsulta){
    console.log('consulta');
    window.addEventListener("DOMContentLoaded", (e) => {
        onGetCitas((querySnapshot)=>{
            BodyCitas.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const citas = doc.data();
                citas.id= doc.id;
                BodyCitas.innerHTML += `
                    <tr>
                        <td>${doc.data().cedula}</td>
                        <td>${doc.data().nombres}</td>
                        <td>${doc.data().apellidos}</td>
                        <td>${doc.data().edad}</td>
                        <td>${doc.data().especialidad}</td>
                        <td>${doc.data().telefono}</td>
                        <td><button class='btnVer' data-id='${citas.id}'>Detalle</button></td>
                    </tr>`;
                const btnVer = document.querySelectorAll('.btnVer');
                
                btnVer.forEach(btn =>{
                    btn.addEventListener('click', async (e) => {
                        modal.innerHTML = '';
                        const doc = await getCita(e.target.dataset.id);
                        ventanaModal.classList.add('show');
                        console.log(doc.data());
                        modal.innerHTML += `<div class='Detalle'>
                        <h5>Nombres:</h5><p> ${doc.data().nombres}</p>
                        <h5>Apellidos:</h5><p> ${doc.data().apellidos}</p>
                        <h5>Edad:</h5><p> ${doc.data().edad}</p>
                        <h5>genero:</h5> <p>${doc.data().genero}</p>
                        <h5>Telefono:</h5> <p>${doc.data().telefono}</p>
                        <h5>Correo:</h5> <p>${doc.data().correo}</p>
                        <h5>Especialidad:</h5> <p class='large1'>${doc.data().especialidad}</p>
                        <h5 class='large2'>Descripción del malestar:</h5> <p class='large2'>${doc.data().descripcion}</p>
                        <h5 class='fechaHora'>Fecha:</h5> <input type="date" id='FechaNueva' value='${doc.data().fecha}'>
                        <h5 class='fechaHora'>Hora:</h5> <input type="time" id='HoraNueva' value='${doc.data().hora}'>
                        </div>`;
                        const FechaNueva = document.querySelector('#FechaNueva');
                        const HoraNueva = document.querySelector('#HoraNueva');
                        aprobar.addEventListener('click', async() => {
                            console.log(FechaNueva.value);
                            await ActualizaCita(e.target.dataset.id,{
                                estado: 1,
                                fecha: FechaNueva.value,
                                hora: HoraNueva.value
                            })
                        });
                        negar.addEventListener('click', async() => {
                            await ActualizaCita(e.target.dataset.id,{
                                estado: 2
                            })
                        });
                    })
                });
                cerrarModal.addEventListener('click', () => {
                    ventanaModal.classList.remove('show');
                });
            });
        })
            
    });
}

//Apartado de Administracion
if(ContenidoAdministrador){
    console.log('Admini');
    window.addEventListener("DOMContentLoaded", (e) => {
        onGetCitaAdmin((querySnapshot)=>{
            BodyCitas.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const citas = doc.data();
                citas.id= doc.id;
                BodyCitas.innerHTML += `
                    <tr>
                        <td>${doc.data().cedula}</td>
                        <td>${doc.data().nombres}</td>
                        <td>${doc.data().apellidos}</td>
                        <td>${doc.data().edad}</td>
                        <td>${doc.data().especialidad}</td>
                        <td>${doc.data().telefono}</td>
                        <td><button class='btnListo' data-id='${citas.id}'>Terminada</button></td>
                    </tr>`;
                const btnListo = document.querySelectorAll('.btnListo');
                
                btnListo.forEach(btn =>{
                    btn.addEventListener('click', async (e) => {
                        console.log('elimina');
                        const doc = await getCita(e.target.dataset.id);
                        await ActualizaCita(e.target.dataset.id,{
                            estado: 3
                        })
                        
                    })
                });
            });
        })
            
    }); 
}

//Filtrar
const FiltrarCita = document.querySelector('#Filtrar');
if(FiltrarCita){
    FiltrarCita.addEventListener('submit', async (e) =>{ 
        e.preventDefault();
        const filtrarPor = FiltrarCita['filtrarPor'];
        console.log(filtrarPor.value);
        const getssCitas = () =>  db.collection("citas").where("especialidad", "==", `${filtrarPor.value}`).where("estado", "==", 0).get();
        const querySnapshot = await getssCitas();
        Pintar(querySnapshot);
    });
}
  
//Busqueda
const BusquedaCita = document.querySelector('#BusquedaCita');
if(BusquedaCita){
    BusquedaCita.addEventListener('submit', async (e) =>{ 
        e.preventDefault();
        const busquedaPor = BusquedaCita['busquedaPor'];
        const Busqueda = BusquedaCita['Busqueda'];
        console.log(Busqueda);
        console.log(busquedaPor.value);
        if(busquedaPor.value == 'cedula'){
            var getssCitas = () =>  db.collection("citas").where("cedula", "==", `${Busqueda.value}`).where("estado", "==", 0).get();
        }else if(busquedaPor.value == 'nombres'){
            var getssCitas = () =>  db.collection("citas").where("nombres", "==", `${Busqueda.value}`).where("estado", "==", 0).get();
        }else if(busquedaPor.value == 'apellidos'){
            var getssCitas = () =>  db.collection("citas").where("apellidos", "==", `${Busqueda.value}`).where("estado", "==", 0).get();
        }else if(busquedaPor.value == 'edad'){
            var getssCitas = () =>  db.collection("citas").where("edad", "==", `${Busqueda.value}`).where("estado", "==", 0).get();
            
        }
        const querySnapshot = await getssCitas();
        Pintar(querySnapshot);
    });
}

//FILTAR FECHA
const FiltrarFecha = document.querySelector('#FiltrarFecha');
if(FiltrarFecha){
    FiltrarFecha.addEventListener('submit', async (e) =>{ 
        e.preventDefault();
        const desde = FiltrarFecha['desde'];
        const hasta = FiltrarFecha['hasta'];
        console.log(hasta.value);
        const getssCitas = () =>  db.collection("citas").where("fecha", ">=", `${desde.value}`).where("fecha", "<=", `${hasta.value}`).get();
        const querySnapshot = await getssCitas();
        Pintar(querySnapshot);
    });
}   

///Funcion para pintar los datos encontrados
function Pintar(querySnapshot){
    if(querySnapshot.docChanges().length >= 1){
        console.log('encontre');
        BodyCitas.innerHTML = '';
        querySnapshot.forEach(doc => {
            const citas = doc.data();
            citas.id= doc.id;
            BodyCitas.innerHTML += `
            <tr>
                <td>${doc.data().nombres}</td>
                <td>${doc.data().apellidos}</td>
                <td>${doc.data().edad}</td>
                <td>${doc.data().genero}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().correo}</td>
                <td><button class='btnVer' data-id='${citas.id}'>Detalle</button></td>
            </tr>`;
            const btnVer = document.querySelectorAll('.btnVer');
            btnVer.forEach(btn =>{
                btn.addEventListener('click', async (e) => {
                    modal.innerHTML = '';
                    const doc = await getCita(e.target.dataset.id);
                    ventanaModal.classList.add('show');
                    console.log(doc.data());
                    modal.innerHTML += `
                    <p>Nombres: ${doc.data().nombres}</p>
                    <p>Apellidos: ${doc.data().apellidos}</p>
                    <p>Edad: ${doc.data().edad}</p>
                    <p>genero: ${doc.data().genero}</p>
                    <p>Telefono: ${doc.data().telefono}</p>
                    <p>Correo: ${doc.data().correo}</p>
                    <p>Especialidad: ${doc.data().especialidad}</p>
                    <p>Descripción del malestar: ${doc.data().descripcion}</p>
                    <p>Fecha: <input type="date" id='FechaNueva' value='${doc.data().fecha}'></p>
                    <p>Hora: <input type="time" id='HoraNueva' value='${doc.data().hora}'></p>
                    `;
                    const FechaNueva = document.querySelector('#FechaNueva');
                    const HoraNueva = document.querySelector('#HoraNueva');
                    aprobar.addEventListener('click', async() => {
                        console.log(FechaNueva.value);
                        await ActualizaCita(e.target.dataset.id,{
                            estado: 1,
                            fecha: FechaNueva.value,
                            hora: HoraNueva.value
                        })
                    });
                    negar.addEventListener('click', async() => {
                        await ActualizaCita(e.target.dataset.id,{
                            estado: 2
                        })
                    });
                })
            })
            cerrarModal.addEventListener('click', () => {
                ventanaModal.classList.remove('show');
            })
        });
    }else{
        console.log('no encontre');
        swal('No se encontraron datos','','error')
    }
}

//Cerrar sesión
const sesion = document.querySelector('#sesion');
sesion.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        window.location.href='../view/login.html';
    })
})