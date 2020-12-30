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
const inputs = document.querySelectorAll('#formregis input');
const formADoctor = document.querySelector('#formADoctor');
const Carga = document.querySelector('#contenedorCarga');
const men = document.querySelector('#men');

const ojo = document.getElementById('ojo');
const pwp = document.getElementById('logiPassword');
//mostrar contraseña
if(ojo){
    ojo.addEventListener('click',MostrarPassword);
    function MostrarPassword(){
        ojo.classList.toggle('activo');
        (pwp.type == 'password') ? pwp.type = 'text':
        pwp.type = 'password';
    }
}

//expresiones iregulares
const expresiones ={
    Exnombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
	Expassword: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, // 4 a 12 digitos.
	Excorreo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}
const campos={
    Vnombre: false,
    Vapellido: false,
    Vcorreo: false,
    Vpassword: false
}
//velidamos los inputs
const ValidarInputs = (e) => {
    switch(e.target.name){
        case 'nombre':
            validadCampo(expresiones.Exnombre, e.target, 'Vnombre')
        break;
        case 'apellido':
            validadCampo(expresiones.Exnombre, e.target, 'Vapellido')
        break;
        case 'correo':
            validadCampo(expresiones.Excorreo, e.target, 'Vcorreo')
        break;
        case 'password':
            validadCampo(expresiones.Expassword, e.target, 'Vpassword')
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

//registramos a los pacientes
if(formRegistro){
    
    inputs.forEach((input) => {
        input.addEventListener('keyup', ValidarInputs);
    });
    
    formRegistro.addEventListener('submit', e =>{
        e.preventDefault();
        console.log(campos.Vnombre+'+'+ campos.Vapellido+'+'+ campos.Vcorreo+'+'+ campos.Vpassword);
        if(campos.Vnombre && campos.Vapellido && campos.Vcorreo && campos.Vpassword){
            const nombre = document.querySelector('#nombre').value;
            const apellido = document.querySelector('#apellido').value;
            const correo = document.querySelector('#correo').value;
            const password = document.querySelector('#password').value;
            console.log('correcto');
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
            
            .catch(function(error) {
                console.log('ERRO');
                if(error.code =='auth/invalid-email'){
                    swal('El correo es invalido','','error');
                }
            });
        }else{
            console.log('no correcto');
        }
    })
}
//registramos a los doctores
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

//Verificamos al usuario
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

//Si se logea
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

//cerrar secion
const sesionAdmin = document.querySelector('#sesionAdmin');
if(sesionAdmin){
    sesionAdmin.addEventListener('click',e =>{
        console.log('cerrar');
        e.preventDefault();
        auth.signOut().then(()=>{
            window.location.href='../view/login.html';
        })
    })
}

