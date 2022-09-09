
// VARIABLES
const formulario = document.querySelector('#enviar-mail');
// lo primero que vamos a hacer es seleccionar el boton enviar para desabilitarlo
const enviarBtn = document.querySelector('#enviar');
// seleccionamos el boton de reseteo
const btnReset = document.querySelector('#resetBtn');

// variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
// creamos una variable con el contenido de una expresion regular para validar el mail
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// EVENTOS primero cargamos la funcion de eventos donde llamamos a todas las funciones al cumplirse un evento   
eventListeners();
function eventListeners() {
    // vamos a iniciar una funcion que inicie cuando el documento entero cargue por primera vez
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario, blur cuando entras en el input y te salis ahi se activa el evento
    email.addEventListener('blur', validarFormulario); // blur para validar como por ejemplo este campo no puede ir vacio
    asunto.addEventListener('blur', validarFormulario); // hacemos lo mismo para los otros campos que tienen que ir con informacion si o si
    mensaje.addEventListener('blur', validarFormulario);


    // vamos a resetear el formulario cargado previamente
    btnReset.addEventListener('click', resetearForm);

    // vamos a enviar el mail escuchando desde el formulario el boton de submit
    formulario.addEventListener('submit', enviarMail);

    
};


// FUNCIONES

// en esta funcion desabilitamos y opacamos el boton de enviar y asi tiene que arrancar la app
function iniciarApp() {
    enviarBtn.disabled = true;
    enviarBtn.classList.add('opacity-50', 'cursor-not-allowed');
};

function validarFormulario(e) {
    if(e.target.value.length > 0) { // comprobamos si el contenido del campo esta vacio o no
        
        //validamos que en los campos ya no hay errores, seleccionamos el p con la clase error si esta lo eliminamos automaticamente
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500'); // eliminamos la clase de red para que muestre el green
        e.target.classList.add('border', 'border-green-500'); // eliminamos las clases predeterminadas por el framework asi desaparecen los bordes rojos cuando hay informacion en el input
    } else {
        e.target.classList.remove('border', 'border-green-500'); // eliminamos la clase green para que muestre la red
        e.target.classList.add('border', 'border-red-500'); // agregamos las clases definidas por TAILWIND lo cual aparecen los bordes al estar vaciios
        // cuando hay un error mandamos a llamar una funcion que muestra un error
        mostrarError('Todos los campos son obligatorios');
    };

    // ahora vamos a validar el email con target.type
    if(e.target.type === 'email') {

        // comprobamos la expresion regular con test y le pasamos el valor que contiene ese input
        if(er.test(e.target.value)) {

            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500'); // eliminamos la clase de red para que muestre el green
            e.target.classList.add('border', 'border-green-500'); // eliminamos las clases predeterminadas por el framework asi desaparecen los bordes rojos cuando hay 
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            // utilizamos la misma funcion para mostrar un mensaje de error
            mostrarError('El email no es valido'); 
        }
    };

    // aca verificamos que todos los campos NO ESTEN VACIOS
    // ademas verificamos el email con la expresion regular, y el mail en este caso lo validamos desde la variable general ya que si usamos e.target lo estariamos validando por el campo actual donde hacemos click
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        enviarBtn.disabled = false;
        enviarBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    };
};

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'p-3', 'bg-red-100', 'uppercase', 'text-red-500', 'mt-5', 'text-center', 'error');

    // cuando hay un error le asignamos tambien la clase de error al campo y aca comprobamos que si hay al menos un elemento que contenga la clase de error entonces no lo inyectamos en el HTML, si no lo tiene nadie si lo colocamos debajo   
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) { // .length solo funciona con el query all 
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10')); // con insertbefore ponemos el mensaje y despues el elemento que indica donde lo colocamos en este caso seria arriba
    };
};

// vamos a enviar un email, lo mas probable es que siempre tengas un evento- e
// y un prevent default
// en esta funcion vamos a colocar un spinner que gire durante un tiempo y luego se quita y muestra un cartel de enviado correctamente
// en el index.html tenemos un div con el id spinner que esta con display none en css
function enviarMail(e) {
    e.preventDefault();

    // mostramos el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // despues de 3 segundos ocultar el spinner y mostrae el mensaje, con setTimeout 
    setTimeout(() => {
        spinner.style.display = 'none';

        // luego enviamos el mensaje que dice que se envio correctamente
        mostrarEnviado();
    }, 3000);


    // console.log('enviando'); // siempre probando los eventos desde la consola
};

function mostrarEnviado() {
    const mensajeEnviado = document.createElement('p');
    mensajeEnviado.textContent = 'Enviado correctamente';
    mensajeEnviado.classList.add('border', 'border-green-500', 'p-3', 'bg-green-100', 'uppercase', 'text-white-500', 'my-5', 'text-center', 'enviado');

    // agregamos el mensaje al html de enviado correctamente
    formulario.insertBefore(mensajeEnviado, document.querySelector('#spinner'));
    

    //eliminamos el mensaje de enviado correctamente luego de 3 segundos y tambien reseteamos el formulario
    setTimeout(() => {
        mensajeEnviado.remove();
        resetearForm();
    }, 3000);
};

// reiniciamos el formulario con el boton de resetear
function resetearForm() {
    formulario.reset();
    
    // tambien reiniciamos todo el boton tambien con una funcion previamente hecha
    iniciarApp();
}

