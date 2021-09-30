//variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


//clases

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos=[...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto)=>total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
        
    }
}

class UI{
    insertarPresupuesto ( cantidad ){
        //extrayendo los valores
        const { presupuesto , restante } = cantidad;

        //Añadiendo valores al HTML
        document.querySelector('#total').textContent = presupuesto; 
        document.querySelector('#restante').textContent = restante; 

    }

    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if (tipo=== 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //menjase de error
        divMensaje.textContent = mensaje;

        //insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar del HTML
        setTimeout(()=>{
            divMensaje.remove();
        },3000)
    }

    mostrarGastos(gastos){
        this.limpiarHtML(); //Elimina el HTML previo

        //iterar solo los gastos
        gastos.forEach(gasto =>{
            const {cantidad, nombre, id } = gasto; 

            //Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-gorup-item d-flex justify-content-between align-items-center';
            nuevoGasto.setAttribute('data.id', id); //antigua version
            //version nueva | nuevoGasto.dataset.id = id; | es lo mismos de arriba

            //agregar el HTML del gasto
            nuevoGasto.innerHTML= ` ${nombre} <Span class="badge badge-primary badge-pill"> $${cantidad} </span>`;

            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.innerHTML='BORRAR &times';
            btnBorrar.onclick = ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //agregar el boton al HTML
            gastoListado.appendChild(nuevoGasto);

        })
    }

    limpiarHtML(){
        while (gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante; 
    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');
        //comprobar25%
        if((presupuesto / 4) >= restante ){
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto/2) >= restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else {
            restanteDiv.classList.remove('alert-warning','alert-danger');
            restanteDiv.classList.add('alert-success');
        }

        //si el total es cero o menor
        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}


//Instanciar 
let ui= new UI();
let presupuesto;


//funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto');

    //console.log(Number(presupuestoUsuario)); tambien se puede con parse int o float

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0){
        window.location.reload();
    }

    //Presupuesto Valido
    presupuesto =  new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto);

}

    //Añade gastos
function agregarGasto (e){
    e.preventDefault();

    //leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === '' || cantidad ===0){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no Valida', 'error');
        return;
    }

    //generar un objeto con el gasto
    const gasto = {nombre, cantidad, id: Date.now()};  //object literal unhandsment

    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    //Mensaje de todo bien!
    ui.imprimirAlerta('Gasto Agregado Correctamente');

    //Imprimir los gastos
    const { gastos, restante }= presupuesto;
    ui.mostrarGastos(gastos);

    //actualizar restante
    ui.actualizarRestante(restante)

    ui.comprobarPresupuesto(presupuesto);

    //reinicia formulario
    formulario.reset();
}


function eliminarGasto (id){
    //Elimina del objeto
    presupuesto.eliminarGasto(id);

    //Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante)

    ui.comprobarPresupuesto(presupuesto);
}