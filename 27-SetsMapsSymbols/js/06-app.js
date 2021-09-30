function crearIterador(carrito){
    let i = 0;

    return{
        siguiente: ()=>{
            const fin = (i >= carrito.length);
            const valor = !fin ? carrito[i++] : undefined;

            return {
                fin,
                valor
            }
        }
    }
}

const carrito = ['producto1', 'producto2'];

//utilizar el iterador
const recorrerCarrito = crearIterador(carrito);