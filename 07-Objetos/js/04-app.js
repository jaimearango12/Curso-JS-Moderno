//object destruction< estraeer del objeto y crear una variable en un mismo paso

const prod2={
    nombre:'jaime',
    edad: '25',
    ciudad: 'bogotá'
};

//forma antiguar de declarar una propiedad de un objeto a una variable
const nombre = prod2.nombre;

//object destruction
const {nombre} = prod2;
console.log(nombre);