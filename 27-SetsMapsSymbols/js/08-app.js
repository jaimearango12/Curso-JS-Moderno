const ciudades = ['Londres','New york', 'Madrid', 'Paris'];
const ordenes = new Set([123,21,153,102]);
const datos = new Map();

datos.set('nombre','jaime');
datos.set('profesion','desarrolador web');


//entries iterator ES7
for (let entry of ciudades.entries()){
    console.log(entry);
}

//values iterator
for (let value of ordenes.value()){
    console.log(value);
}

//keys iterator
for (let keys  of datos.keys()){
    console.log(keys);
}


//iterador poe default;
for (let cuidad of ciudades){
    console.log(cuidad);
}