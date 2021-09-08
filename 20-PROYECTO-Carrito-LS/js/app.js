//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //cuando se agrega un curso al presionar 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))||[];

        carritoHTML();
    })

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    });
};


//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado= e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}



//lee el contenido al que se le dio click y extrae su informacion
function leerDatosCurso (curso) {
    
    //crear un objeto del contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    //Revisa si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
    if (existe){
        //Actualizamos carrito
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retona el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos]; 
    } else {
        //agregar elementos al arreglos del carrito
        articulosCarrito= [...articulosCarrito, infoCurso ];
    }

    carritoHTML();
}

//elimina un curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //elimina del arreglo de articulosCarrito por el data Id
        articulosCarrito= articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
};

// muestra el carrito de compras en el HTML
function carritoHTML(){
    //limpiar el HTML
    limpiarHTML();

    //REcorrel el carrito y genera al HTML
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo,precio,cantidad, id}=curso;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src='${imagen}' width =100>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a herf='#' class='borrar-curso' data-id='${id}'> X </a>
        </td>
        `;

        //Agrega en el HTML de carrito en el tbody 
        contenedorCarrito.appendChild(row); 
    })

    //aGREGAR LOCAL STORAGE
    sincronizarStorage();
}

function  sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los curos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML ='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
