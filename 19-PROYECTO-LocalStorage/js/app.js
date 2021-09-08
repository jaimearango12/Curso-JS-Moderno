//Variables
const formulario= document.querySelector('#formulario');
const listaTweets =document.querySelector('#lista-tweets');
let tweets= []; 


//Event Listeners
eventListeners()
function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cunado el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets= JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML()
    })
}


//funiones
function agregarTweet(e){
    e.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj= {
        id: Date.now(),
        tweet   //es lo mismo que tweet:tweet
    }

    //añadir al arreglo de tweets con spread operator 
    tweets = [...tweets, tweetObj];

    //una vez agregado se crea el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset()
}

//Mostrar mensaje de error 
function mostrarError(error){ 
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //insetarlo en el contenido
    const contenido= document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    //elimina la alerta despues de tres segundos
    setTimeout( ()=>{
        mensajeError.remove();
    }, 3000)
}

//muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if ( tweets.length > 0){
        tweets.forEach( tweet=>{
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion eliminar
            btnEliminar.onclick = () => { 
                borrarTweet(tweet.id);
            }


            //crear html
            const li= document.createElement('li');

            //añadir texo
            li.innerText= tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //insettar en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agrega los tweet actuales a localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//eliminar tweet
function borrarTweet (id){
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

//limpiar el html
function limpiarHTML(){
    while ( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

