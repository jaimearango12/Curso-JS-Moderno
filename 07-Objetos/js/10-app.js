//UNIR DOS OBJETOS

const prod5={
    nombre:'jaime',
    edad: '25',
    ciudad: 'bogotá'
};

const mascotas= {
    perro= 'juan',
    gato= 'mateo',
    loro: 'mitch'
}

const resultado = Object.assign(prod5, mascotas);

//spread operator o rest operator

const result = {...prod5, ...mascotas}  //---> los tres puntos significa copiar