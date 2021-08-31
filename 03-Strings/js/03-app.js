//CONCATENER STRINGS
const proda= "monitor 20\"";
const precio = "30 COP";

console.log(proda.concat(precio));
console.log(proda.concat('barato'));

console.log(proda+ 'con un precio de ' + precio); //usar , en vez de + da el mismo resultado

//template literals
console.log(`El producto ${proda} tiene un precio de ${precio}`);