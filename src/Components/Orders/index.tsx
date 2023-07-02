import { useEffect, useState, useContext } from 'react'
import { Context } from 'context/Context'
import styles from './Orders.module.scss'
import http from 'Utils/Http'
import IOrder from 'interfaces/IOrder'

export default function Orders() {

  const { customer } = useContext(Context)
  const [orders, setOrders] = useState<Array<IOrder>>([{_id:'', customer_id:'', product_id:''}])

  useEffect(() => {
    if(customer._id !== ""){
      http.post('getOrderByCustomer', { customer_id: customer._id })
      .then(res => (setOrders(res.data.data)))
      .catch(err => console.log(err))
    }
  },[customer])

  return(
    <>
      {orders[0]._id === '' ? 
      "":
      <section>
        <p className={styles.title} onClick={() => console.log(orders)}>Ola</p>
        <p>Você fez {orders.length} pedidos</p>
        <p>Você fez {orders[0]._id} pedidos</p>
      </section>
      }
    </>
  )
  

};
