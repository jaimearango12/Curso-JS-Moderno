class CLiente{ 
    
    #nombre;

    constructor (nombre, saldo){
        this.#nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion(){
        return `Cliente: ${this.#nombre}, tu saldo es de ${this.saldo}`;
    }


    //metodos estaticos
    static bienvenida(){
        return `Bienvenido al cajero`;
    }
}

const jaime = new CLiente('jaime', 2000);