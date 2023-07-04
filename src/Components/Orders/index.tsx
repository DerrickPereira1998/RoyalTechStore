import { useEffect, useState, useContext } from 'react'
import { Context } from 'context/Context'
import styles from './Orders.module.scss'
import http from 'Utils/Http'
import IOrder from 'interfaces/IOrder'
import { Link } from 'react-router-dom'

export default function Orders() {

  const { customer } = useContext(Context)
  const [orders, setOrders] = useState<Array<IOrder>>([])

  const dateFormat = (date: any) => {
    const f = Intl.DateTimeFormat("pt-br",{
      dateStyle: "long"
    })
    return date = f.format(date)
  }

  useEffect(() => {
    if(customer._id !== ""){
      http.post('getOrderByCustomer', { customerId: customer._id })
      .then(res => (setOrders(res.data.data)))
      .catch(err => console.log(err))
    }
  },[customer])

  return(
    <>
      {orders.length === 0 ? 
      "" :
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <p className={styles.title}>Seus Pedidos</p>
          <p className={styles.counter}>Você realizou {orders.length} pedido{orders.length === 1 ? '' : 's'}</p>
          {orders.map((order, index) => (
            <div className={styles.order} key={index}>
              <div className={styles.order__header}>
                <div className={styles.order__header__content}>
                  <p className={styles.order__header__content__top}>Pedido realizado em</p>
                  <p>{dateFormat(order.date)}</p>
                </div>
                <div className={styles.order__header__content}>
                  <p className={styles.order__header__content__top}>Valor Pago</p>
                  <p>{order.product[0].preco}</p>
                </div>
                <div className={styles.order__header__content}>
                  <p className={styles.order__header__content__top}>Enviado para</p>
                  <p>{customer.name}</p>
                </div>
              </div>
              <div className={styles.order__main}>
                <img className={styles.order__main__img} src={order.product[0].imagem} alt={order.product[0].titulo} />
                <div className={styles.order__main__content}>
                  <Link className={styles.order__main__content__link} to={`/product/${order.product_id}`}>{order.product[0].titulo}</Link>
                  <button>Comprar novamente</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      }
    </>
  )
};
