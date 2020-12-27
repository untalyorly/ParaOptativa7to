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

  const getCita = (id) => db.collection('citas').doc(id).get();
const BodyCitas = document.querySelector('#BodyCitas');
const Carga = document.querySelector('#contenedorCarga');
//RESERVAR CITA
const ReservaCita = document.querySelector('#ReservaCita');
const GuardaCitas = (nombres,apellidos,cedula,edad,genero,telefono,correo,especialidad,fecha,hora,descripcion,estado) =>
    db.collection('citas').doc().set({
        nombres,
        apellidos,
        cedula,
        edad,
        genero,
        telefono,
        correo,
        especialidad,
        fecha,
        hora,
        descripcion,
        estado
    }).then(registrado =>{
        Carga.style.visibility = 'hidden';
        Carga.style.opacity = '0';
        swal('Cita Guardada','','success')
    })
auth.onAuthStateChanged( async user =>{
    if(user){
        //Reserva
        if(ReservaCita){
            ReservaCita.addEventListener('submit', async (e) =>{
                e.preventDefault();
                Carga.style.visibility = 'visible';
                Carga.style.opacity = '1';
                const nombres = ReservaCita['nombres'];
                const apellidos = ReservaCita['apellidos'];
                const cedula = ReservaCita['cedula'];
                const edad = ReservaCita['edad'];
                const genero = ReservaCita['genero'];
                const telefono = ReservaCita['telefono'];
                //const correo = ReservaCita['correo'];
                const estado = 0;
                const especialidad = ReservaCita['especialidad'];
                const fecha = ReservaCita['fecha'];
                const hora = ReservaCita['hora'];
                const descripcion = ReservaCita['descripcion'];
                await GuardaCitas(
                    nombres.value,
                    apellidos.value,
                    cedula.value,
                    edad.value,
                    genero.value,
                    telefono.value,
                    user.email,
                    especialidad.value,
                    fecha.value,
                    hora.value,
                    descripcion.value,
                    estado
                );
                ReservaCita.reset();
                nombres.focus();
            });
        }else{    
            //Mis citas
            //// 
            Carga.style.visibility = 'visible';
            Carga.style.opacity = '1';
            console.log(user.email);
            const getssCitas = () =>  db.collection("citas").where("correo", "==", `${user.email}`).where("estado", "<=", 2).get();
            const querySnapshot = await getssCitas();
            if(querySnapshot.docChanges().length >= 1){
                Carga.style.visibility = 'hidden';
                Carga.style.opacity = '0';
                console.log('encontre');
                BodyCitas.innerHTML = '';
                querySnapshot.forEach(doc => {
                    const citas = doc.data();
                    citas.id= doc.id;
                    if(doc.data().estado == 0){
                        var estado = 'Sin Aprobar'
                    }else if (doc.data().estado == 1){
                        var estado = 'Aprobada'
                    }else if(doc.data().estado == 2){
                        var estado = 'Negada'
                    }else{
                        var estado = 'Eliminada'
                    }
                    BodyCitas.innerHTML += `
                    <tr>
                        <td>${doc.data().nombres}</td>
                        <td>${doc.data().apellidos}</td>
                        <td>${doc.data().edad}</td>
                        <td>${doc.data().genero}</td>
                        <td>${doc.data().telefono}</td>
                        <td>${doc.data().correo}</td>
                        <td>${estado}</td>
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
                            <p>genero: ${doc.data().genero}</p>
                            <p>Telefono: ${doc.data().telefono}</p>
                            <p>Correo: ${doc.data().correo}</p>
                            <p>Especialidad: ${doc.data().especialidad}</p>
                            <p>Descripción del malestar: ${doc.data().descripcion}</p>
                            <p>Fecha: ${doc.data().fecha}</p>
                            <p>Hora: ${doc.data().hora}</p>
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
        }
        
        /////

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