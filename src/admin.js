import { getOrder } from "./API.js";

const setOrder = document.getElementById('setOrder')
const containResults = document.getElementById('contain-results')
const selectMonth = document.getElementById('selectMonth')

let myChart



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
    let topProducts = []
    let ids = []

    orders.forEach( order =>{
      const {nombre, cantidad, subtotal, dateOrder, id} = order.orden
      if(month === dateOrder && cantidad !== null){
        
        const tr = document.createElement('tr')
        numProducts = numProducts + cantidad
        salesAmount = salesAmount + subtotal

        setOrder.appendChild(tr)

        //add numbers to array
        topProducts.push(cantidad)
        ids.push({id,cantidad, nombre})
        
      }else{
        // console.log('error')
      }
    })

    //agregar productos iguales en uno solo
    incrementProducts(ids)

    //creando elementos y mostrarlos en la vista
    const p = document.createElement('p')
    const pSalesAmount = document.createElement('p')
    
    p.innerHTML = `<b>Productos vendidos: ${numProducts}</b>`
    pSalesAmount.innerHTML = `<b>Importe total de ventas: $${salesAmount}</b>`

    containResults.appendChild(p)
    containResults.appendChild(pSalesAmount)
    containResults.classList.remove('d-none')
  }

  function incrementProducts(idArray){
    //creando título para la seccion 'Total de ventas durante el mes'
    const title = document.createElement('h2')
    title.textContent = `TOTAL DE VENTAS DURANTE EL MES`
    containResults.appendChild(title)

    let data, d 
    let arrName = []
    let arrNum = []
    
    for(let i=1; i<=10; i++){
      //busca si hay ids iguales (pedidos)
      if(idArray.filter(order => order.id === i)){
        idArray.sort((a,b)=> a.id-b.id)
        //crea nuevo array con las ordenes de un tipo de id
        data = idArray.filter(order => order.id === i)
      }
      
      //si el arreglo no esta vacío
      if(data.length){
        // console.log(data)
        let count = 0
        //recorriendo por arreglo
        for(let k=0;k<data.length;k++){
          count += data[k].cantidad
          d= data[k].nombre
          
        }
        //agregando los valores (nombre y cantidad)
        arrName.push(d)
        arrNum.push(count)
        // console.log(count)
        const p = document.createElement('p')
        p.textContent = `${count} ${d}`
        containResults.appendChild(p)
        //CHART
        grafica(arrName, arrNum)
      }
    }
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

  // CHART
  function grafica(name, num){

    if(name !== null && num !== null){
      const ctx = document.getElementById('myChart').getContext('2d');
      if(myChart) {
        myChart.destroy();
      }
      
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: name,
            datasets: [{
                label: 'Ventas por Producto',
                data: num,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });
    }else{

    }
  }

  // function mostSelledProducts(products){
  //   let newProducts

  //   products.length >= 4 ? (
  //     products.reverse(),
  //     products.sort((a,b) => a-b),
  //     newProducts = products.slice(1,4),
  //     console.log(newProducts)
  //   ) : (
  //     console.log(products)
  //   )
      
  // }

}

mostrarClientes()

