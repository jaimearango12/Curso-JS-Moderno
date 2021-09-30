// funcion IIFE
(function(){
    console.log('ejemplo de un IIFE');
})();


//Usando un export
export const nombreCliente = 'Jaime';
export const ahorro = 200;

export function mostrarNombre (nombre){
    return `cliente ${nombre}`;
}

 export class Cliente{
    constructor (nombre, ahorro){
        this.nombre = nombre;
        this.ahorro = ahorro;
    }
}

export default function nuevaFuncion (){
    console.log('Export default');
}