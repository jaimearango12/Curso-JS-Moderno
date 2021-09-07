'use strict'

const prod4={
    nombre:'jaime',
    edad: '25',
    ciudad: 'bogotá'
};

 
//ya no puedo modificar el objeto desde afuera
Object.freeze(prod4);

//para saber si esta congelado el objeto
console.log(Object.isFrozen(prod4));

//para solo modificar no agregar ni quitar
Object.seal(prod4);