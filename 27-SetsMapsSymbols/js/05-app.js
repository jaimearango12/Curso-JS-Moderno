//symbols

const sym = Symbol();

const persona ={};

persona[sym]= 'jaime';
persona.apellido ='Arango';


console.log(persona[sym]);

//usando descripcion
 const symi = Symbol('Esta es la descripcion');

 const client = {}

 client[symi] = 'pedro';

 console.log(client[symi]);
 