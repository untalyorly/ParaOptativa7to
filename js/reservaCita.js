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
const inputs = document.querySelectorAll('#ReservaCita input');

//Guardamos las citas
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
//obtenemos al usuario para reservar la cita
auth.onAuthStateChanged( async user =>{
    if(user){
        //Reserva
        if(ReservaCita){

            //Validaciones
            const expresiones ={
                Exnombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
                Expassword: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, // 4 a 12 digitos.
                Excorreo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                Excedula: /^\d{10,10}$/,
                Extelefono: /^\d{9,10}$/
            }
            const campos={
                Vnombre: false,
                Vapellido: false,
                Vcedula: false,
                Vedad: false,
                Vtelefono: false,
            }
            const ValidarInputs = (e) => {
                console.log(e.target.name);
                switch(e.target.name){
                    case 'nombres':
                        
                        validadCampo(expresiones.Exnombre, e.target, 'Vnombre')
                    break;
                    case 'apellidos':
                        validadCampo(expresiones.Exnombre, e.target, 'Vapellido')
                    break;
                    case 'cedula':
                        validadCampo(expresiones.Excedula, e.target, 'Vcedula')
                    break;
                    case 'edad':
                        const error = document.querySelector('#ErrorVedad')
                        if(e.target.value > 0 && e.target.value < 150){
                            console.log('correcto');
                            error.style.visibility = 'hidden';
                            campos['Vedad'] = true;
                        }else{
                            console.log('incorrecto');
                            error.style.visibility = 'visible';
                            campos['Vedad'] = false;
                        }
                    break;
                    case 'telefono':
                        validadCampo(expresiones.Extelefono, e.target, 'Vtelefono')
                    break;
                }
            }
            const validadCampo= (expresion, input, campo)=>{
                const error = document.querySelector(`#Error${campo}`)
                if(expresion.test(input.value)){
                    console.log('correcto');
                    error.style.visibility = 'hidden';
                    campos[campo] = true;
                }else{
                    console.log('incorrecto');
                    error.style.visibility = 'visible';
                    campos[campo] = false;
                }
            }
            ///
            inputs.forEach((input) => {
                input.addEventListener('keyup', ValidarInputs);
            });

            ReservaCita.addEventListener('submit', async (e) =>{
                e.preventDefault();
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
                if(campos.Vnombre && campos.Vapellido && campos.Vcedula && campos.Vedad && campos.Vtelefono){
                    Carga.style.visibility = 'visible';
                    Carga.style.opacity = '1';
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
                }else{
                    console.log('no correcto');
                }
                
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
                            modal.innerHTML += `<div class='Detalle'>
                            <h5>Nombres:</h5><p> ${doc.data().nombres}</p>
                            <h5>Apellidos:</h5><p> ${doc.data().apellidos}</p>
                            <h5>Edad:</h5><p> ${doc.data().edad}</p>
                            <h5>genero:</h5> <p>${doc.data().genero}</p>
                            <h5>Telefono:</h5> <p>${doc.data().telefono}</p>
                            <h5>Correo:</h5> <p>${doc.data().correo}</p>
                            <h5>Especialidad:</h5> <p class='large1'>${doc.data().especialidad}</p>
                            <h5 class='large2'>Descripción del malestar:</h5> <p class='large2'>${doc.data().descripcion}</p>
                            <h5 class='fechaHora'>Fecha:</h5><p> ${doc.data().fecha}</p>
                            <h5 class='fechaHora'>Hora:</h5><p> ${doc.data().hora}</p>
                            </div>`;
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