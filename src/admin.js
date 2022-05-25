import { getOrder } from "./API.js";

const setOrder = document.getElementById('setOrder')
const containResults = document.getElementById('contain-results')
const selectMonth = document.getElementById('selectMonth')

async function mostrarClientes(){
  const orders = await getOrder()
  let monthValue

  selectMonth.onchange = () =>{
    monthValue = selectMonth.value
    clearScreen()
    getValueMonth(monthValue)
  }

  function getValueMonth(month){
    let numProducts = 0
    let salesAmount = 0
    orders.forEach( order =>{
      const {nombre, precio, cantidad, subtotal, dateOrder} = order.orden
      if(month === dateOrder){
        const tr = document.createElement('tr')
        numProducts = numProducts + cantidad
        salesAmount = salesAmount + subtotal
        
        tr.innerHTML +=`
        <td>${cantidad}</td>
        <td>${nombre}</td>
        <td>$${subtotal}</td>
        `
        setOrder.appendChild(tr)
        
      }else{
        console.log('nada')
      }
    })
    const title = document.createElement('h2')
    const p = document.createElement('p')
    const pSalesAmount = document.createElement('p')
    
    title.textContent = `Total de ventas durante el mes`
    p.textContent = `Productos vendidos: ${numProducts}`
    pSalesAmount.textContent = `Importe total de ventas: $${salesAmount}`

    containResults.appendChild(title)
    containResults.appendChild(p)
    containResults.appendChild(pSalesAmount)
  }

  //clear HTML
  function clearScreen(){
    while( setOrder.firstChild){
      setOrder.removeChild(setOrder.firstChild)
    }
    while( containResults.firstChild){
      containResults.removeChild(containResults.firstChild)
    }
  }

}

mostrarClientes()

