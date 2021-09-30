import nuevaFuncion, { nombreCliente, ahorro, mostrarNombre, Cliente } from './cliente.js';
import { Empresa } from './empresa.js';


console.log(nombreCliente + ' '+ ahorro);
console.log(mostrarNombre(nombreCliente));


const cliente = new Cliente(nombreCliente, ahorro);

console.log(cliente);

const empresa = new Empresa('Tejidos Dargon', 100, 'tejidos');
console.log(empresa);

nuevaFuncion();