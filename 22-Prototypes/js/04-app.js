//heredar un prototype
function Cliente(nombre, saldo){
    this.nombre= nombre;
    this.saldo= saldo;
}

Cliente.prototype.nuevaFuncion = function (){
    console.log('Mi primer prototype');
};

//instanciarlo
const jaime= new Cliente( 'jaime', 500);  

//llamada del prototype
jaime.nuevaFuncion();

function persona (nombre, saldo, telefono){
    Cliente.call(this, nombre , saldo) //el call manda a llamar una funcion
    this.telefono= telefono;
}

//heredar el prototype
persona.prototype = Object.create( Cliente.prototype );

//traer el constructor de cliente para que sirvan las funciones
persona.prototype.constructor = Cliente;

const pepe = new persona('pepe', 2000, 21264853);
console.log(pepe);
console.log(pepe.nuevaFuncion());