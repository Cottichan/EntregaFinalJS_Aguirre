
let etiqueta = document.getElementById("etiqueta");
let carritoCompra = document.getElementById("carrito-compras");
let carrito = JSON.parse(localStorage.getItem("datosCarrito")) || [];

let calcular = () => {
    let carritoIcono = document.getElementById("cantCarrito");
    carritoIcono.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcular();

let generarProductosCarro = () => { 
if (carrito.length !== 0) {
    return (carritoCompra.innerHTML = carrito
    .map((x) => {
        let {id, item} = x;
        let buscar = productosTiendaData.find((y)=> y.id === id) || []
        let {img, nombre, precio} = buscar;
        return `
        <div class="producto-carrito">
         <img width="100" src=${img} alt=""></img>
          <div class="detalles">
            <div class="titulo-precio-x">
                <h4 class="titulo-precio">
                <p>${nombre}
                <p class="precio-item-carrito">$ ${precio}</p>
                </h4>
                <i onclick="quitarProducto(${id})" class="bi bi-trash3-fill"></i>
            </div>

            <div class="botones">
                <i onclick="reducir(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="cantidad">${item}</div>
                <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$ ${item * buscar.precio}</h3>
          </div>
        </div>
        `;
    })
    .join(""));
    
} else {
    carritoCompra.innerHTML = ``;
    etiqueta.innerHTML = `
    <h2>El carrito está vacío</h2>
    <a href="index.html">
        <button class="botonHome">Volver al inicio</button>
    </a>
    `; 
}
};

generarProductosCarro();   


let aumentar = (id) => {
    let productoSeleccionado = id;
    let buscar = carrito.find((x)=> x.id === productoSeleccionado.id);

    if(buscar === undefined){
        carrito.push({
            id: productoSeleccionado.id,
            item:1,
        });
    }
   else{
    buscar.item += 1;
   }
   
   generarProductosCarro();  
    actualizar(productoSeleccionado.id);
    localStorage.setItem("datosCarrito", JSON.stringify(carrito));
};
 

let reducir = (id)=>{
    let productoSeleccionado = id;
    let buscar = carrito.find((x)=> x.id === productoSeleccionado.id);

    if(buscar === undefined) return;
   else if(buscar.item === 0) return;
   else{
    buscar.item -= 1;
   }
   actualizar(productoSeleccionado.id);
   carrito = carrito.filter((x) => x.item !== 0);
   generarProductosCarro();   
   localStorage.setItem("datosCarrito", JSON.stringify(carrito));
};

let actualizar = (id)=>{
    let buscar = carrito.find((x) => x.id === id)
    //console.log(buscar.item);
    document.getElementById(id).innerHTML = buscar.item;
    calcular ();
    total ();

};

let quitarProducto = (id)=> {
    let productoSeleccionado = id;
   carrito = carrito.filter((x) => x.id !== productoSeleccionado.id);
   generarProductosCarro(); 
   total();
   calcular ();
   localStorage.setItem("datosCarrito", JSON.stringify(carrito));
};

let vaciarCarrito = ()=> {
    carrito = []
    generarProductosCarro();  
    calcular ();
    localStorage.setItem("datosCarrito", JSON.stringify(carrito));
};

let total = ()=>{
    if(carrito.length !==0){
        let cantidad = carrito.map((x)=> {
          let {item, id} = x;
          let buscar = productosTiendaData.find((y)=> y.id === id) || []

          return item * buscar.precio; 
        }).reduce((x, y)=> x + y, 0);
        etiqueta.innerHTML =`
        <h2>Total: $ ${cantidad}</h2>
        <button class="pagar">Pagar</button>
        <button onclick="vaciarCarrito()" class="vaciar-carrito">Vaciar Carrito</button>
        `;
    } else return;
};

total();