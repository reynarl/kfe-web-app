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
    // let pruebita = []

    orders.forEach( order =>{
      const {nombre, cantidad, subtotal, dateOrder, id} = order.orden
      if(month === dateOrder){
        
        const tr = document.createElement('tr')
        numProducts = numProducts + cantidad
        salesAmount = salesAmount + subtotal
        
        tr.innerHTML +=`
        <td>${cantidad}</td>
        <td>${nombre}</td>
        <td>$${subtotal}</td>
        <td>${id}</td>
        `

        
        setOrder.appendChild(tr)

        //add numbers to array
        topProducts.push(cantidad)
        ids.push({id,cantidad, nombre})
        // pruebita.push(order)
        
      }else{
        console.log('nada')
      }
    })

    mostSelledProducts(topProducts)
    //agregar productos iguales en uno solo
    incrementProducts(ids)
    // incrementProducts(pruebita)

    // const title = document.createElement('h2')
    const p = document.createElement('p')
    const pSalesAmount = document.createElement('p')
    
    // title.textContent = `Total de ventas durante el mes`
    p.textContent = `Productos vendidos: ${numProducts}`
    pSalesAmount.textContent = `Importe total de ventas: $${salesAmount}`

    // containResults.appendChild(title)
    containResults.appendChild(p)
    containResults.appendChild(pSalesAmount)
  }

  function incrementProducts(idArray){

    //creando título para la seccion
    //Total de ventas durante el mes
    const title = document.createElement('h2')
    title.textContent = `Total de ventas durante el mes`
    containResults.appendChild(title)

    // console.log(duplicados)
    let d 
    let no, no1, no2
    const newArray = [1,2,3,4,5]
    idArray.sort((a,b)=> a.id-b.id)

    

    // for(let i=1; i<=newArray.length; i++){
    //   no = idArray.filter(order => order.id === 1)
    //   no1 = idArray.filter(order => order.id === 2)
    //   no2 = idArray.filter(order => order.id === 3)
    // }

    let kk 
    
    for(let i=1; i<=newArray.length; i++){
      //busca si hay ids iguales (pedidos)
      if(idArray.filter(order => order.id === i)){
        //crea nuevo array con las ordenes de un tipo de id
        kk = idArray.filter(order => order.id === i)
        // kk.filter(order =>{
        //   // console.log(order.cantidad)
        //   d = order.cantidad
        // })
      }
      
      //si el arreglo no esta vacío
      if(kk.length){
        console.log(kk)
        // console.log(kk.length)
        // kk[i]
        let contador = 0
        for(let k=0;k<kk.length;k++){
          contador += kk[k].cantidad
          d= kk[k].nombre
        }
        // console.log(contador)
        const p = document.createElement('p')
        p.textContent = `${contador} ${d}`
        containResults.appendChild(p)



        //GRAFICA
        grafica()
        








        
      }else{
        console.log('vacio')
      }
      // console.log(kk)
      
      
      // kk = [kk]
      // console.log(contador)
      // console.log(d)
    }
    
    // console.log(contador)
    
    // console.log(no)
    // console.log(no1)
    // console.log(no2)

    // for(let i=0; i<idArray.length; i++){
    //   // if(idArray[i].id === 1){
    //   //   console.log(idArray[i])
    //   // }
      
    //   for(let j = 0; j<newArray.length; j++){
    //     console.log('nA:',newArray[j])
    //     console.log(i)
    //   }
      
    // }
    
    // const suma = []
    // let contador = 1
    // for(let i=0; i<idArray.length; i++){
    //   let j = 1
    //   if(idArray[j].id === idArray[i].id){
    //     contador++
    //   }else{
    //     suma.push(contador)
    //     contador = 1
    //   }
    //   // console.log(idArray[i+1])
    //   j++
    // }

    // console.log(suma)
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

  //
  function mostSelledProducts(products){
    let newProducts

    products.length >= 4 ? (
      products.reverse(),
      products.sort((a,b) => a-b),
      newProducts = products.slice(1,4),
      console.log(newProducts)
    ) : (
      console.log(products)
    )
      
  }

  // chartts()

  function grafica (){
    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
      myChart.destroy();
  }
 myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
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
              beginAtZero: false
          }
      }
  }
});
  }

}

mostrarClientes()

