//Object constructor 
//declara objetode una forma mas dinamica
function Cliente(nombre, saldo){
    this.nombre= nombre;
    this.saldo= saldo;
}

const jaime= new Cliente( 'jaime', 500);  // A esta variable se le puede hacer distructuring