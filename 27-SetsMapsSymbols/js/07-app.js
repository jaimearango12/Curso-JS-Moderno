//generador

function *crearGenerador(){
    yield 1;
    yield 'jaime';
    yield 1+1;
    yield true;
}

const iterador = crearGenerador();

console.log(iterador.next()); //asi llama un yield

