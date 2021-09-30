//Variables campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');


let editando;

//clases
class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id); //en este caso quita un elemento
    }

    editarCita(citaActualizada){
        this.citas=this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada: cita ); //recorre los datos y crea un nuevo arreglo y reescribe lo que tengamos
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');

        }

        //Mensaje de error 
        divMensaje.textContent =  mensaje;

        //agregar al dom 
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        
        //quitar la alerta despues de 5 segundos
        setTimeout(()=>{
            divMensaje.remove();
        },5000);
    }

    imprimirCitas({citas}){  //destructuring desde los parametros de las funciones

        this.limpiarHTML();

        citas.forEach( cita =>{
            const {mascota, propietario, telefono,fecha,hora,sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id= id; //reemplaza el setAttribute

            //scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-tittle', 'font-weight-bolder');
            mascotaParrafo.textContent= mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span>${telefono}
                `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>${fecha}
                `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>${hora}
                `;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span>${sintomas}
                `;


            //boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML= 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = ()=> eliminarCita(id);

            //Añade un boton para editar 
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML ='Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = ()=> cargarEdicion(cita);

            //Agregar los parrafosal divCIta
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })

    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

//Event listeners
eventListeners();
function eventListeners (){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit', nuevaCita);
}


//objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora:'',
    sintomas: ''
}


//agegra datos al objeto de la cita
function datosCita(e){
    citaObj[e.target.name] = e.target.value  //Con los corchetes accede a las propiedades del objeto y funciona si el html tiene el name igual que el obj

}

//Valida y agrega una nueva cita  a la clase de citas 
function nuevaCita(e){
    e.preventDefault();

    //extraer informacion del objeto de cita
    const {mascota, propietario, telefono,fecha,hora,sintomas} = citaObj;

    //validar 
    if (mascota === '' || propietario === ''|| telefono ==='' || fecha ==='' ||hora==='' ||sintomas=== ''){
        ui.imprimirAlerta('Todos los cambios son obligatorios', 'error');

        return;
    }

    if (editando){
         //mensaje Agregado correctamente
         ui.imprimirAlerta('Editado correctamente');

         //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //regresar el texto del boton a su estado original


         //cambiar el texto despues de edicion 
         formulario.querySelector('button[type="submit"]').textContent ='Crear cita';

         //quitar modo edicion
         editando=false;

    }else{
        //generar un id unico
        citaObj.id = Date.now();

        //Creando una nuvea cita
        administrarCitas.agregarCita({...citaObj}); //spread operator

        //mensaje Agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente');
    }

    

    //reiniciar el objeto para la validacion y no se queden guardados los datos en el boton y repita el contenido
    reiniciarObjeto();

    //reiniciar el formulario
    formulario.reset();

    //mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

    
}

function reiniciarObjeto (){
    citaObj.mascota= '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

function eliminarCita (id){
    // Eliminar la cita 
    administrarCitas.eliminarCita(id);

    //muestre un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
function cargarEdicion(cita){
    const {mascota, propietario, telefono,fecha,hora,sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value =telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    citaObj.mascota= mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas= sintomas;
    citaObj.id = id;


    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent ='Guardar cambios';

    editando = true

    
}