const prode = '            monitor           ';

console.log(prode);
console.log(prode.lenght);

//eliminar el inicio  QUITAR LOS ESPACIOS EN BLANCO trim<ambos lados>
console.log(prode.trimStart());
console.log(prode.trimEnd());

//chaining encadenar metodos
console.log(prode.trimStart().trimEnd());