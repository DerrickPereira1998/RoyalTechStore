import { useEffect, useState, useContext } from 'react'
import { Context } from 'context/Context'
import styles from './ShoppingCart.module.scss'
import http from 'Utils/Http'
import IShoppingCart from 'interfaces/IShoppingCart'
import { Link, useNavigate } from 'react-router-dom'

export default function ShoppingCart() {

  const { customer } = useContext(Context)
  const navigate = useNavigate()
  const [popup, setPopup] = useState<Boolean>(false)
  const [shoppingCart, setShoppingCart] = useState<Array<IShoppingCart>>([{ _id: '', product_id: '', customer_id: '', product: [] }])

  const sum = () => {
    let result = 0
    shoppingCart.forEach((item) => {
      result += parseFloat(item.product[0].preco.replace(",", ""));
    })
    return result
  }

  const togglePopup = () => {
    setPopup(!popup)
  }

  const emptyCart = async () => {
    await http.post('emptyShoppingCart', { customer_id: customer._id })
    setShoppingCart([])
  }

  const buyAllProducts = async () => {
    shoppingCart.forEach((item) => {
      try {
        http.post('registerOrder', { customer_id: customer._id, product_id: item.product_id })
      } catch (error) {
        console.log('error on submiting item: ', error)
      }
    })
    emptyCart()
    navigate('/')
  }

  const addToCart = async (customer_id: string, product_id: string) => {
    if (customer_id && product_id) {
      try {
        await http.post('registerShoppingCart', { customer_id, product_id })
        navigate('/')
      } catch (error) {
        console.log('error on submiting shopping cart item: ', error)
      }
    }
    togglePopup()
  }

  useEffect(() => {
    if (customer._id !== "") {
      http.post('getShoppingCartByCustomer', { customerId: customer._id })
        .then(res => (setShoppingCart(res.data.data)))
        .catch(err => console.log(err))
    }
  }, [customer])

  return (
    <section className={styles.section}>
      {shoppingCart.length === 0 ?
        <div className={styles.wrapper}>
          <p className={styles.wrapper__title}>Carrinho de compras</p>
          <p className={styles.counter}>Seu carrinho esta vazio</p>
        </div> :
        <div className={styles.wrapper}>
          {shoppingCart[0]._id === "" ?
            <div className={styles.loading} /> :
            <>
              <p className={styles.wrapper__title}>Carrinho de compras</p>
              <div className={styles.wrapper__buyall}>
                <div className={styles.wrapper__buyall__info}>
                  <p>Numero de itens no carrinho: {shoppingCart.length}</p>
                  <p>Valor total: R$ {sum()}</p>
                </div>
                <button className={styles.wrapper__buyall__button} onClick={buyAllProducts}>Comprar todos os items</button>
                <button className={styles.wrapper__buyall__button} onClick={emptyCart}>Esvaziar Carrinho</button>
              </div>
              <div className={styles.shoppingcart}>
                {shoppingCart.map((item, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.order__main}>
                      <img className={styles.order__main__img} src={item.product[0].imagem} alt={item.product[0].titulo} />
                      <div className={styles.order__main__content}>
                        <Link className={styles.order__main__content__link} to={`/product/${item.product_id}`}>{item.product[0].titulo}</Link>
                        <p>R$ {item.product[0].preco}</p>
                        <button className={styles.order__main__content__button} onClick={togglePopup}>Comprar produto</button>
                      </div>
                    </div>
                    {
                      popup ?
                        <>
                          <div onClick={togglePopup} className={styles.popup} id='popup'></div>
                          <div className={styles.popup__container}>
                            <p>Tem certeza que deseja realizar a compra?</p>
                            <div className={styles.popup__container__buttons}>
                              <button className={styles.popup__container__buttons__button} onClick={() => addToCart(customer._id, item.product_id)}>Sim</button>
                              <button className={styles.popup__container__buttons__button} onClick={togglePopup}>Não</button>
                            </div>
                          </div>
                        </> :
                        ""
                    }
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      }
    </section>
  )
};
