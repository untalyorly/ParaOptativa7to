 // Your web app's Firebase configuration
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
//Registro Usuario 
const formRegistro = document.querySelector('#formregis');
const formADoctor = document.querySelector('#formADoctor');
const Carga = document.querySelector('#contenedorCarga');
const men = document.querySelector('#men');

if(formRegistro){
    formRegistro.addEventListener('submit', e =>{
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const apellido = document.querySelector('#apellido').value;
        const correo = document.querySelector('#correo').value;
        const password = document.querySelector('#password').value;
        auth
            .createUserWithEmailAndPassword(correo,password)
            .then(userCredential => {
                db.collection('pacientes').doc().set({
                    nombre,
                    apellido,
                    correo,
                    password
                });
                swal('Usuario Registrado con exito!','','success')
                .then((value) => {
                    window.location.href='../view/login.html';
                  });
               
                console.log('registrado')
            })
    })
}
if(formADoctor){
    formADoctor.addEventListener('submit', e =>{
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const apellido = document.querySelector('#apellido').value;
        const especialidad = document.querySelector('#especialidad').value;
        const correo = document.querySelector('#correo').value;
        const password = document.querySelector('#password').value;
        auth
            .createUserWithEmailAndPassword(correo,password)
            .then(userCredential => {
                db.collection('doctores').doc().set({
                    nombre,
                    apellido,
                    especialidad,
                    correo,
                    password
                });
                swal('Doctor Añadido con exito!','','success')
                formADoctor.reset();
                console.log('registrado')
            })
        
    })
}

//////


///Ingreso de usuario
const formIngresar = document.querySelector('#formIngresar');
if(formIngresar){
    formIngresar.addEventListener('submit', e =>{
        Carga.style.visibility = 'visible';
        Carga.style.opacity = '1';
        e.preventDefault();
        const correo = document.querySelector('#logiCorreo').value;
        const password = document.querySelector('#logiPassword').value;
        auth
            .signInWithEmailAndPassword(correo,password)
            .then(userCredential=>{
                console.log('ingreso')
                VeriUsuario();
            })
            .catch(function(error) {
                Carga.style.visibility = 'hidden';
                Carga.style.opacity = '0';
                if(error.code == 'auth/user-not-found' || error.code =='auth/invalid-email'){
                    swal('El usuario no esta registrado','','error');
                }else if(error.code == 'auth/wrong-password'){
                    swal('La contraseña esta incorrecta','','error');
                }
            });
            
    })
}

/////Verificar Usuario

const VeriUsuario = ()=>{
    auth.onAuthStateChanged( async user =>{
        if(user){
            
            const getPacientes = await db.collection("pacientes").where("correo", "==", `${user.email}`).get();
            const getDoctores = await db.collection("doctores").where("correo", "==", `${user.email}`).get();
            if(getPacientes.docChanges().length >= 1){
                getPacientes.forEach(doc => {
                    const pacientes = doc.data().correo;
                    //menuOcul2.style.display= 'none';
                    window.location.href='../view/reserva.html';
                })
            }else if(getDoctores.docChanges().length >= 1){
                getDoctores.forEach(doc => {
                    const doctores = doc.data().correo;
                    window.location.href='../view/consulta.html';
                })
            }else{
                window.location.href='../view/Admin.html';
            }
        }else{
            console.log('no login');
        }
    });
}

auth.onAuthStateChanged( async user =>{
    if(user){
        console.log('logiado');
        men.innerHTML += `
        <li><a href="./principal.html">Inicio</a></li>
        <li><a href="./reserva.html">Reservar Cita</a></li>
        <li><a href="./miscitas.html">Mis Citas</a></li>
        <li><a href="./nosotros.html">Nosotros</a></li>
        <li><a href="#" id="sesion">Cerrar sesión</a></li>
        `
        //Cerrar sesión
        const sesion = document.querySelector('#sesion');
        sesion.addEventListener('click',e =>{
            console.log('cerrar');
            e.preventDefault();
            auth.signOut().then(()=>{
                window.location.href='../view/login.html';
            })
        })
    }else{
        men.innerHTML += `
        <li><a href="./principal.html"">Inicio</a></li>
        <li><a href="./nosotros.html">Nosotros</a></li>
        <li><a href="./login.html" >iniciar sesión</a></li>
        `

    }
});


