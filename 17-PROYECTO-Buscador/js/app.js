//Variables
const  marca= document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

    //contenedor para resultados
const resultado = document.querySelector('#resultado');
    //fechas
const max = new Date().getFullYear();
const min = max-10;
    //generar un onjeto co la busqueda
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);  //muestra los atutomoviles al cargar

    //lena las opciones de años
    llenarSelect();
});

    //listener para los select de busqueda
marca.addEventListener('change', e=>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});
year.addEventListener('change', e=>{
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});
maximo.addEventListener('change', e=>{
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});
puertas.addEventListener('change', e=>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
})
transmision.addEventListener('change', e=>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});
color.addEventListener('change', e=>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})

//Funciones
function mostrarAutos(autos){
    
    limpiarHTML(); //elimina el htmlprevio

    autos.forEach( auto => {
        //distructuring para hacer mejor el template string
        const {marca, modelo, year, precio,
               puertas, color, transmision } = auto;

        const autoHTML = document.createElement('p');

        autoHTML.textContent=`
            ${marca} ${modelo} - ${year} - ${puertas} puertas - Trasmisión ${transmision} - Precio: ${precio}- ${color}

        `;

        //insertar en el HTML 
        resultado.appendChild(autoHTML);
    });
};

    //limpiar el HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

    // genera los años del select
function llenarSelect(){
    for (let i = max; i >= min; i--){
        const opcion =document.createElement('option');
        opcion.value =i; // asigna un valor al elemento
        opcion.textContent= i;

        year.appendChild(opcion); //Agrega las opciones de año al select
    }
};

    //filtra en base a la busqueda  =>FUNCIONES DE ALTO NIVEL
function filtrarAuto(){
    //chaining de un metodo
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo).filter(filtrarMaximo)
    .filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);


    if (resultado.length){
        mostrarAutos(resultado)
    }else{
        noResultado();
    }
}

function noResultado (){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent= 'No hay resultados, intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    //aplicando destructuring
    const {marca} = datosBusqueda;
    if (marca ){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if (year ){
        return auto.year === parseInt(year); //como biene de un formulario toca pasarlo a numero porque esra string
    }
    return auto; 
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if (minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if (maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if (puertas){
        return auto.puertas === puertas; //como es estricto se debe convertir en puertas
    }
    return auto;
}

function filtrarTransmision (auto){
    const {transmision} = datosBusqueda;
    if (transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor (auto){
    const {color} = datosBusqueda;
    if (color){
        return auto.color === color;
    }
    return auto;
}
