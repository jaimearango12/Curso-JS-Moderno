//variables 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto= document.querySelector('#asunto');
const mensaje= document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//listener
eventeLlisteners();
function eventeLlisteners(){
    //Arranque de app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campo del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
};

function validarFormulario (e) {



    if(e.target.value.length > 0){

        //Elimina los errores
        const error= document.querySelector('p.error');
        if(error){
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios'); 
    }

    if (e.target.type === 'email') {
        
        
        if (er.test(e.target.value) ) {

            const error= document.querySelector('p.error');
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El Email no es válido');
        }
    }

    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 
    'text-red-500','p-3', 'mt-5','text-center', 'error');

    const errores= document.querySelectorAll('.error');
    if (errores.length === 0){
        formulario.appendChild(mensajeError);   
    }
    
}

function enviarEmail(e) {
    e.preventDefault();

    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    //despues de tres seg ocultar spinner y mostrar mensaje
    setTimeout( ()=>{spinner.style.display = 'none';

        //Mensaje que dice que se envió correctamente 
        const parrafo= document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2','bg-green-500','text-white','font-bold','uppercase')

        //inerta parrafo despues de spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Elimina el mensaje 

            resetearFormulario();
        }, 5000)

        }, 3000)
}

//funcion que resetea el formulario
function resetearFormulario(){
    formulario.reset(); 

    iniciarApp();
}