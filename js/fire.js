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
const Carga = document.querySelector('#contenedorCarga');
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
                console.log(error);
                console.log(error.code);
                if(error.code == 'auth/user-not-found' || error.code =='auth/invalid-email'){
                    swal('El usuario no esta registrado','','error');
                }else if(error.code == 'auth/wrong-password'){
                    swal('La contraseña esta incorrecta','','error')
                }
            });
            
    })
}

/////Verificar Usuario

const VeriUsuario = ()=>{
    auth.onAuthStateChanged( async user =>{
        if(user){
            const getPacientes = await db.collection("pacientes").where("correo", "==", `${user.email}`).get();
            if(getPacientes.docChanges().length >= 1){
                console.log('encontre');
                getPacientes.forEach(doc => {
                    const pacientes = doc.data().correo;
                    console.log(pacientes);
                    window.location.href='../view/principal.html';
                })
            }else{
                window.location.href='../view/consulta.html';
            }
        }else{
            console.log('no login');
        }
    });
}


//Cerrar sesión
const sesion = document.querySelector('#sesion');
sesion.addEventListener('click',e =>{
    console.log('cerrar');
    e.preventDefault();
    auth.signOut().then(()=>{
        window.location.href='../view/login.html';
    })
})

