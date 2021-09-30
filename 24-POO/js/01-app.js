// Class declaration
class CLiente{  
    constructor (nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }
}

//class expretion

const Cliente2 = class {
    constructor (nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }
}

const jaime= new CLiente('jaime', 1000);
console.log(jaime);

const jaime2= new Cliente2('jaime',1000);
console.log(jaime2);