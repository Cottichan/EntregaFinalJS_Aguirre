let tienda = document.getElementById('tienda');


let carrito = JSON.parse(localStorage.getItem("datosCarrito")) || []

let generarTienda =()=>{
    return (tienda.innerHTML = productosTiendaData
     .map((x)=>{
        let {id, nombre, precio, desc, img} =x;
        let buscar = carrito.find ((x)=>x.id === id ) || []
        return `
        <div id=id-producto-${id} class="producto">
        <img width="220" src=${img} alt="">
        <div class="detalles">
            <h3>${nombre}</h3>
            <p>${desc}</p>
            <div class="precio-cantidad">
                <h2>$ ${precio}</h2>
                <div class="botones">
                    <i onclick="reducir(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="cantidad">
                    ${buscar.item === undefined? 0: buscar.item}
                        </div>
                    <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>

                </div>
            </div>
        </div>
    </div>
    `;
    }).join(""));
};

generarTienda()

// ajuste de cantidades de producto

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
   
  // console.log(carrito);
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
   // console.log(carrito);
   
    localStorage.setItem("datosCarrito", JSON.stringify(carrito));
};
 

let actualizar = (id)=>{
    let buscar = carrito.find((x) => x.id === id)
    //console.log(buscar.item);
    document.getElementById(id).innerHTML = buscar.item;
    calcular ();

};

let calcular = () => {
    let carritoIcono = document.getElementById("cantCarrito");
    carritoIcono.innerHTML = carrito.map((x) => x.item).reduce((x,y) => x+y, 0);
}

calcular();