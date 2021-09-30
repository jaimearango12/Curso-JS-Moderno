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