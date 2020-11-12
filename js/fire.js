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

const formRegistro = document.querySelector('#formregis');
if(formRegistro){
    formRegistro.addEventListener('submit',(e)=>{
        e.preventDefault();
        const correo = document.querySelector('#correo').value;
        const password = document.querySelector('#password').value;
        
        auth
            .createUserWithEmailAndPassword(correo,password)
            .then(userCredential=>{
                swal('Usuario Registrado con exito!','','success')
                .then((value) => {
                    window.location.href='../view/login.html';
                  });
               
                console.log('registrado')
            })
    })
}
///
const formIngresar = document.querySelector('#formIngresar');
if(formIngresar){
    formIngresar.addEventListener('submit',(e)=>{
        e.preventDefault();
        const correo = document.querySelector('#logiCorreo').value;
        const password = document.querySelector('#logiPassword').value;
        auth
            .signInWithEmailAndPassword(correo,password)
            .then(userCredential=>{
                window.location.href='../view/principal.html';
                console.log('ingreso')
            })
    })
}

