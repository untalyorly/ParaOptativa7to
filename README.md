# ParaOptativa7to
Micro Proyecto para la materia Optativa I

# Elaborado por:
Párraga Pazmiño Yorly Alexander
Mero Vélez César Enrique

# Funcionamiento
Lo primero en la página principal, procedemos a darle clic en "iniciar sesión" para poder empezar creando una cuenta de USUARIO.
Tomamos en cuenta que tenemos tres (3) tipos de usuarios con sus diferencias y los listamos a continuación
1. El administrador: Es quien crea las cuentas para los doctores (mas adelante las credenciales del Administrador)
2. Los doctores: Estos son los que mas adelante pueden aceptar o declinar una cita y cambiar el horario de esta misma y tienen 4 especialidades que son: 
    Medicina General.
    Ginecología.
    Cardiología.
    Odontología.
3. Los usuarios: Estos son en otras palabras los pacientes que requieren atención por lo cual antes de aquello solicitaran una cita

## Iniciar sesión
Luego de estár en este apartado nos vamos a dirigir a la parte de abajo donde dice "Regístrate ahora" para así poder registrarnos.
Dentro del registro procedemos a llenar el formulario con los Nombres, Apellidos, Correo Electronico y por ultimo una contraseña que tiene que tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
Luego de ingresar los datos correctamente procedemos a dar clic en "Registrarse" si todo está correcto aparece un aviso de confirmación donde nos dice que nuestro usuario fue registrado con éxito, le damos clic en "ok"

Automaticamente volveremos a la página de incio de sesion, lo que haremos ahora es en el formulario que nos solicita nuestro correo y contraseña, ingresar los que previamente habiamos ingresado para registrarnos y damos clic en "INGRESAR"
Nos aparece una animación mientras inicia sesión, si la información no es correcta nos aparece un aviso de que la contraseña es incorrecta o el usuario no está registrado dependiendo de cual es el caso. Al ingresar correctamente la información y dar clic en ingresar, automaticamente nos llevará al FORMULARIO DE SOLICITUD DE CITAS donde tenemos que llenar un nuevo formulario para empezar a solicitar una cita.
## Reservar una cita para una consulta
En el formulario tenemos que llenarlo con nuestro nombre, apellidos, cédula, edad, género, teléfono, especialidad solicitada para la cita, fecha que requerimos la cita, hora que requerimos la cita y una descripción del malestar que tenemos.
Damos clic en "reservar" y nos aparece un aviso de que nuestra cita fue guardada y damos clic en "OK" 

## Menú
En el menú superior tenemos cinco (5) apartados
1. Inicio: Aquí se muestra la información principal de nuestro sistema y algunas palabras sobre nosotros
2. Reservar cita: En este apartado tenemos el formulario donde podemos llenarlo para solicitar una cita
3. Mis citas: Aquí podemos ver las citas que hemos solicitado y su estado, es decir si han sido aprobadas, rechazadas, cambiadas o sin aprobación aun.
4. Nosotros: En este apartado Aparece información puntual sobre nosotros (SAGE) los valores y el contacto directo con nosotros.
5. Cerrar Sesión: En este botón del menú hacemos clic cuando querramos finalizar sesión y nos llevará automaticamente al apartado de inicio de sesión con nuestra sesión ya finalizada y listo para iniciar una nueva sesión.


# Administrador
Al ingresar al sistema con las credenciales de administrador, tenemos un unico apartado donde podemos añadir un doctor llenando el formulario con los nombres, apellidos del doctor, seleccionando una (1) de las cuatro (4) especialidades que dispone, ingresamos el correo electronico y la contraseña para crearlo, damos clic en "registrarse" y tendremos una cuenta de doctor creada.

# Doctor
Al ingresar al sistema con las credenciales de Doctor de alguna de las areas que se disponen tenemos un filtro para buscar en la lista de citas con el número de cédula y también otro filtro para buscar por medio de dos fechas, una inicial y una final.
En la parte final tenemos la lista completa de citas requeridas con la información del paciente que solicita.
damos clic en detalle para mostrar más información, donde podemos modificar la fecha y hora, así como de aprobar o negar la cita.

## Menú
En el menú tenemos tres (3) apartados los cuales son:
1. Consulta: donde vemos la lista completa de citas requeridas con la información del paciente que solicita.
2. Administración: donde podemos ver las citas que hemos aprobado y tenemos un botón para cuando hayamos terminado la atención en esa cita y retirarla de los pendientes en este apartado.
3. Cerrar sesión: En este botón del menú hacemos clic cuando querramos finalizar sesión y nos llevará automaticamente al apartado de inicio de sesión con nuestra sesión ya finalizada y listo para iniciar una nueva sesión.

# Cuentas
## Cuenta del Administrador:
#### El administrador es el unico que puede creear las cuentas a los doctores.
    usuario: administrador1@gmail.com
    contraseña: admin1

## Cuentas de los doctores:
### Medicina General:
    usuario: doctor1@gmail.com
    contraseña: doctor1
### Ginecología:
    usuario: doctor2@gmail.com
    contraseña: doctor2
### Cardiología:
    usuario: doctor3@gmail.com
    contraseña: doctor3
### Odontología:
    usuario: doctor4@gmail.com
    contraseña: doctor4


# Acerca del proyecto
    Para la realización de este proyecto utilizamos:
    HTML
    CSS
    JavaScript
    Base de datos en Firebase
    Hosteo Gratuito de Heroku