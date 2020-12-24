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
//RESERVAR CITA
const ReservaCita = document.querySelector('#ReservaCita');
const GuardaCitas = (nombres,apellidos,cedula,edad,sexo,telefono,correo,especialidad,fecha,descripcion,estado) =>
    db.collection('citas').doc().set({
        nombres,
        apellidos,
        cedula,
        edad,
        sexo,
        telefono,
        correo,
        especialidad,
        fecha,
        descripcion,
        estado
    });
auth.onAuthStateChanged( async user =>{
    if(user){
        //Reserva
        if(ReservaCita){
            ReservaCita.addEventListener('submit', async (e) =>{
                e.preventDefault();
                const nombres = ReservaCita['nombres'];
                const apellidos = ReservaCita['apellidos'];
                const cedula = ReservaCita['cedula'];
                const edad = ReservaCita['edad'];
                const sexo = ReservaCita['sexo'];
                const telefono = ReservaCita['telefono'];
                //const correo = ReservaCita['correo'];
                const estado = 0;
                const especialidad = ReservaCita['especialidad'];
                const fecha = ReservaCita['fecha'];
                const descripcion = ReservaCita['descripcion'];
                await GuardaCitas(
                    nombres.value,
                    apellidos.value,
                    cedula.value,
                    edad.value,
                    sexo.value,
                    telefono.value,
                    user.email,
                    especialidad.value,
                    fecha.value,
                    descripcion.value,
                    estado
                );
                ReservaCita.reset();
                nombres.focus();
            });
        }else{    
            //Mis citas
            //// 
            console.log(user.email);
            const getssCitas = () =>  db.collection("citas").where("correo", "==", `${user.email}`).get();
            const querySnapshot = await getssCitas();
            if(querySnapshot.docChanges().length >= 1){
                console.log('encontre');
                BodyCitas.innerHTML = '';
                querySnapshot.forEach(doc => {
                    const citas = doc.data();
                    citas.id= doc.id;
                    if(doc.data().estado == 0){
                        var estado = 'Sin Aprobar'
                    }else if (doc.data().estado == 1){
                        var estado = 'Aprobada'
                    }else{
                        var estado = 'Negada'
                    }
                    BodyCitas.innerHTML += `
                    <tr>
                        <td>${doc.data().nombres}</td>
                        <td>${doc.data().apellidos}</td>
                        <td>${doc.data().edad}</td>
                        <td>${doc.data().sexo}</td>
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