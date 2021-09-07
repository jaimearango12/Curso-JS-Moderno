const prod3={
    nombre:'jaime',
    edad: '25',
    ciudad: 'bogotá',
    gustos: {
        musica:{
            edm,
            rock,
            pop
        },
        lectura,
        entrenamiento:{
            taichi,
            stretching
        }
    }
};

const {nombre, gustos:{musica, musica:{pop}, entrenamiento:{taichi}}}=prod3

console.log(taichi);
console.log(pop);
console.log(musica);
console.log(nombre);