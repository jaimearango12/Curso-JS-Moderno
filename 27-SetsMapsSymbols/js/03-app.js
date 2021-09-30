//Map

const cliente = new Map();


// para qgregar un elemento

cliente.set('nombre', 'lili');

// ver su cantidad de elementos

cliente.size;

//par aver si existe un valor  de la llave

cliente.has('nombre2');

//para traer un valor de una llave

cliente.get('nombre');


//para eliminar

cliente.delete();

//para limpiar

cliente.clear();

//se puede crear un map con valores

const cliente = new Map([['nombre', 'angeli'], [ 'habitacion','303']]);