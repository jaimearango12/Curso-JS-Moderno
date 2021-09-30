class CLiente{  
    constructor (nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion(){
        return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
    }


    //metodos estaticos
    static bienvenida(){
        return `Bienvenido al cajero`;
    }
}

//heriencia
class Empresa extends CLiente{
    constructor (nombre, saldo, telefono, catgoria){
        super(nombre, saldo);
        this.telefono = telefono;
        this.categoria = categoria;
    }

    //cunado se declara un metodo co el mismo nombre que el padre este lo reescribe e ignora el padre
    static bienvenida(){
        return `Bienvenido al cajero de empresas`;
    }
}

const jaime = new CLiente('jaime', 2000);
const empresa= new Empresa('JAIMEArango inc', 10000);