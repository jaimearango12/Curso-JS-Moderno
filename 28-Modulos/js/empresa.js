import { Cliente } from './cliente.js';

export class Empresa extends Cliente{
     construtor(nombre,ahorro,categoria){
         super(nombre,ahorro);
         this.categoria = categoria;
     }
}