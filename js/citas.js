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

const BodyCitas = document.querySelector('#BodyCitas');
const BodyCitasBusqueda = document.querySelector('#BodyCitasBusqueda');

const ventanaModal = document.querySelector('#ventanaModal');
const modal = document.querySelector('#modal');
const cerrarModal = document.querySelector('#cerrarModal');
const aprobar = document.querySelector('#aprobar');
const negar = document.querySelector('#negar');

const getCita = (id) => db.collection('citas').doc(id).get();
const ActualizaCita = (id, ActualizaCita) => db.collection('citas').doc(id).update(ActualizaCita);

const onGetTasks = (callback) => db.collection('citas').onSnapshot(callback);
window.addEventListener("DOMContentLoaded", (e) => {
    onGetTasks((querySnapshot)=>{
        BodyCitas.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const citas = doc.data();
            citas.id= doc.id;
            BodyCitas.innerHTML += `
                <tr>
                    <td>${doc.data().nombres}</td>
                    <td>${doc.data().apellidos}</td>
                    <td>${doc.data().edad}</td>
                    <td>${doc.data().sexo}</td>
                    <td>${doc.data().telefono}</td>
                    <td>${doc.data().correo}</td>
                    <td><button class='btnVer' data-id='${citas.id}'>Ver</button></td>
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
                    <p>Sexo: ${doc.data().sexo}</p>
                    <p>Telefono: ${doc.data().telefono}</p>
                    <p>Correo: ${doc.data().correo}</p>
                    <p>Especialidad: ${doc.data().especialidad}</p>
                    <p>Descripción del malestar: ${doc.data().descripcion}</p>
                    <p>Fecha: <input type="datetime-local" value='${doc.data().fecha}'></p>
                    `;
                    
                    aprobar.addEventListener('click', () => {
                        console.log('aprobar');
                    });
                    negar.addEventListener('click', () => {
                        console.log('negar');
                    });
                })
            });
            cerrarModal.addEventListener('click', () => {
                ventanaModal.classList.remove('show');
            });
        });
    })
        
});
    
//Filtrar

const FiltrarCita = document.querySelector('#Filtrar');
FiltrarCita.addEventListener('submit', async (e) =>{ 
    e.preventDefault();
    const filtrarPor = FiltrarCita['filtrarPor'];
    console.log(filtrarPor.value);
    const getssCitas = () =>  db.collection("citas").where("especialidad", "==", `${filtrarPor.value}`).get();
    const querySnapshot = await getssCitas();
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
                <td>${doc.data().sexo}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().correo}</td>
                <td><button class='btnVer' data-id='${citas.id}'>Ver</button></td>
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
                    <p>Sexo: ${doc.data().sexo}</p>
                    <p>Telefono: ${doc.data().telefono}</p>
                    <p>Correo: ${doc.data().correo}</p>
                    <p>Especialidad: ${doc.data().especialidad}</p>
                    <p>Descripción del malestar: ${doc.data().descripcion}</p>
                    <p>Fecha: <input type="datetime-local" value='${doc.data().fecha}'></p>
                    `;
                })
            })
            cerrarModal.addEventListener('click', () => {
                ventanaModal.classList.remove('show');
            })
        });
    }else{
        console.log('no encontre');
        
    }
});
    
//Busqueda

const BusquedaCita = document.querySelector('#BusquedaCita');
BusquedaCita.addEventListener('submit', async (e) =>{ 
    e.preventDefault();
    const busquedaPor = BusquedaCita['busquedaPor'];
    const Busqueda = BusquedaCita['Busqueda'];
    console.log(Busqueda);
    console.log(busquedaPor.value);
    if(busquedaPor.value == 'cedula'){
        var getssCitas = () =>  db.collection("citas").where("cedula", "==", `${Busqueda.value}`).get();
    }else if(busquedaPor.value == 'nombres'){
        var getssCitas = () =>  db.collection("citas").where("nombres", "==", `${Busqueda.value}`).get();
    }else if(busquedaPor.value == 'apellidos'){
        var getssCitas = () =>  db.collection("citas").where("apellidos", "==", `${Busqueda.value}`).get();
    }else if(busquedaPor.value == 'edad'){
        var getssCitas = () =>  db.collection("citas").where("edad", "==", `${Busqueda.value}`).get();
        
    }
    const querySnapshot = await getssCitas();
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
                <td>${doc.data().sexo}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().correo}</td>
                <td><button class='btnVer' data-id='${citas.id}'>Ver</button></td>
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
                    <p>Sexo: ${doc.data().sexo}</p>
                    <p>Telefono: ${doc.data().telefono}</p>
                    <p>Correo: ${doc.data().correo}</p>
                    <p>Especialidad: ${doc.data().especialidad}</p>
                    <p>Descripción del malestar: ${doc.data().descripcion}</p>
                    <p>Fecha: <input type="datetime-local" value='${doc.data().fecha}'></p>
                    `;
                })
            })
            cerrarModal.addEventListener('click', () => {
                ventanaModal.classList.remove('show');
            })
        });
    }else{
        console.log('no encontre');
        
    }
});

//FILTAR FECHA

//Filtrar

const FiltrarFecha = document.querySelector('#FiltrarFecha');
FiltrarFecha.addEventListener('submit', async (e) =>{ 
    e.preventDefault();
    const desde = FiltrarFecha['desde'];
    const hasta = FiltrarFecha['hasta'];
    console.log(desde.value);
    const getssCitas = () =>  db.collection("citas").where("fecha", ">=", `${desde.value}`).where("fecha", "<=", `${hasta.value}`).get();
    const querySnapshot = await getssCitas();
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
                <td>${doc.data().sexo}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().correo}</td>
                <td><button class='btnVer' data-id='${citas.id}'>Ver</button></td>
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
                    <p>Sexo: ${doc.data().sexo}</p>
                    <p>Telefono: ${doc.data().telefono}</p>
                    <p>Correo: ${doc.data().correo}</p>
                    <p>Especialidad: ${doc.data().especialidad}</p>
                    <p>Descripción del malestar: ${doc.data().descripcion}</p>
                    <p>Fecha: <input type="datetime-local" value='${doc.data().fecha}'></p>
                    `;
                })
            })
            cerrarModal.addEventListener('click', () => {
                ventanaModal.classList.remove('show');
            })
        });
    }else{
        console.log('no encontre');
        
    }
});
    
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('logiado');
        console.log(user.displayName);
    }else{
        console.log('no logiado');
        window.location.href='../view/login.html';
    }
});

//Cerrar sesión
const sesion = document.querySelector('#sesion');
sesion.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        window.location.href='../view/login.html';
    })
})