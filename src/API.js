const url = 'http://localhost:5000/Pedidos'

export const nuevoPedido = async client => {
  try{
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify( client ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('etsitoo')
    
  } catch(error){
    console.log('error')
  }
}

export const getData = async () =>{
  try{
    const res = await fetch(url)
    const orders = await res.json()
    return orders
  } catch(error){
    console.log('error')
  }
}