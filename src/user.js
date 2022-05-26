import { nuevoPedido } from './API.js'

let cliente = {
  pedido: []
}



let day, month, year
const btnNewOrder = document.querySelector('#btnNewOrder')

btnNewOrder.addEventListener('click', saveOrder)

function saveOrder(){
  console.log('desde la funcion')

  cliente = {...cliente}
  
  //mostrarsecciones
  showSections()

  //mostrar fecha
  // showDate()

  //obtener platillos de la API
  getData()
}

//mostrar secciones ocultas
function showSections(){
  const hideSection = document.querySelectorAll('.d-none')
  hideSection.forEach(section => section.classList.remove('d-none'))
}


function getData(){
  const url = 'http://localhost:4000/Platillos'

  fetch(url)
    .then( respuesta => respuesta.json())
    .then( resultado => mostrarPlatillos(resultado))
    .catch( error => console.log('error'))
}

function mostrarPlatillos(platillos){
  const menu = document.getElementById('containDish')
  const description = document.getElementById('description')
  platillos.forEach( platillo =>{
    menu.className = 'row container'

    //agregando nombre del platillo
    const divName = document.createElement('div')
    divName.className = 'col-7'
    const name = document.createElement('p')
    name.textContent = `${platillo.nombre}`
    divName.appendChild(name)

    //agregando precio
    const divPrice = document.createElement('div')
    divPrice.className = 'col-2'
    const price = document.createElement('p')
    price.textContent = `$${platillo.precio}`
    divPrice.appendChild(price)

    //agregando input
    const inputDiv = document.createElement('div')
    inputDiv.className = 'col-3'

    const inputCantidad = document.createElement('input')
    inputCantidad.type = "number"
    inputCantidad.min = 0
    inputCantidad.value = 0
    inputCantidad.id = `${platillo.id}`
    inputCantidad.className = 'form-control'
    inputDiv.appendChild(inputCantidad)

    menu.appendChild(divName)
    menu.appendChild(divPrice)
    menu.appendChild(inputDiv)

    showDate()
    const btnRegisterOrder = document.getElementById('btnRegisterOrder')
  btnRegisterOrder.addEventListener('click', btnAdd)

  function btnAdd(){
    const cantidad = parseInt(inputCantidad.value)
      // console.log(cantidad)
      agregarPlatillo({...platillo, cantidad})
  }
    
  })

  

  function agregarPlatillo(producto){
    // let dateOrder = saveMonth()
    let dateOrder = createDate()

    if(producto.cantidad !== 0){
      // console.log(producto.cantidad)
      const {nombre, cantidad, precio} = producto 
      const subtotal = cantidad * precio    
      // console.log(producto)
      agregarABD({...producto, subtotal, dateOrder})
    }else{
      console.log('es cero xd')
    }
  }


  function agregarABD(orden){
    cliente.pedido = orden
    const pedidos = {
      orden: cliente.pedido
    }
    // console.log(pedidos)
    nuevoPedido(pedidos)
  }


  function showDate(){
    // const dateOrder = document.getElementById('dateOrder')
    // const btnChangeDate = document.getElementById('btnChangeDate')
    const labelDate = document.getElementById('labelDate')

    createDate()
    labelDate.innerHTML = `Fecha: ${day}/0${month}/${year}`
    // dateOrder.classList.add('d-none')

    // btnChangeDate.addEventListener('click', changeDate)
    // function changeDate(){
    //   labelDate.classList.add('d-none')
    //   dateOrder.classList.add('d-none')
    //   btnChangeDate.classList.add('d-none')
    // }

    //evento al cambiar la fecha sobre el input Date
    // dateOrder.onchange = function(){
    //   saveMonth()
    // }
  }

  // function saveMonth(){
  //   let dateNow = dateOrder.value
  //   dateNow = dateNow.split('-')
  //   let dateOrderNow = dateNow[1]
  //   return dateOrderNow
  // }

  function createDate(){
    let date = new Date()
    day = date.getDate()
    month = date.getMonth()+1
    year = date.getFullYear()
    return `0${month}`
  }
  

  //mostrar los datos en resumen del pedido
  // function actualizarResumen(){
  //   const {pedido} = cliente
  //   let sumTotal = 0

  //   pedido.forEach( articulo => {
  //     const {nombre, cantidad, precio, id} = articulo
  //     let subtotal 
  //     subtotal = parseInt(cantidad*precio)
  //     sumTotal = sumTotal + subtotal
      
  //     const divName = document.createElement('div')
  //     const name = document.createElement('p')
  //     name.textContent = `${cantidad} órdenes de ${nombre}`
  //     divName.appendChild(name)
      

  //     const divTotal = document.createElement('div')
  //     const total = document.createElement('p')
  //     total.textContent = `subtotal: $${subtotal}`
  //     divTotal.appendChild(total)

  //     description.appendChild(divName)
  //     description.appendChild(divTotal)
  //     // let agregaD = {...articulo, cantidad, subtotal}
  //     // console.log(agregaD)
  //     console.log(pedido)
  //   })
    
  //   const divTotal = document.createElement('div')
  //   const total = document.createElement('p')
  //   total.textContent = `Total: $${sumTotal}`
  //   divTotal.appendChild(total)
  //   description.appendChild(divTotal)
  // }

  

  //evitar que se impriman varias veces dentro del resumen del pedido
  // function limpiarHtml(){
  //     while( description.firstChild){
  //       description.removeChild(description.firstChild)
  //     }
  // }
  

}

