//traer los datos de localstorage
const nombre = localStorage.getItem('nombre');

//convertir un string de localStorage a un objeto o un array

const zen = localStorage.getItem('prodArray');
console.log(JSON.parse(zen));