import { useParams } from 'react-router-dom'
import { Context } from 'context/Context'
import styles from './ProductDetails.module.scss'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import IProduct from 'interfaces/IProduct'
import http from 'Utils/Http'

export default function ProductDetails() {

  const { customer } = useContext(Context)
  const { product_id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState<IProduct>()

  const submitOrder = async (e: any, customer_id: string, product_id: string) => {
    e.preventDefault()
    if(customer_id && product_id){
      try {
        await http.post('registerOrder', { customer_id, product_id })
        navigate('/')
      } catch (error) {
        console.log('error on submiting order: ', error)
      }
    }
  }

  useEffect(() => {
    if (product_id) {
      http.post('getProductData', { product_id })
        .then(res => setProduct(res.data.data))
        .catch(err => console.log(err))
    }
  }, [product_id])

  return (
    <>
      <section className={styles.flex}>
        {product === undefined
          ? <div className={styles.loading}></div>
          : <div className={styles.content}>
            <img className={styles.content__img} src={product?.imagem} alt='Imagem do Produto' />
            <div className={styles.content__details}>
              <div className={styles.content__details__text}>
                <h1 className={styles.content__details__text__title}>{product?.titulo}</h1>
                <p className={styles.content__details__text__price}>R$ {product?.preco}</p>
                <p className={styles.content__details__text__desc}>{product?.descricao}</p>
              </div>
              <div className={styles.content__details__buttons}>
                <button className={styles.content__details__buttons__button} onClick={(e) => submitOrder(e ,customer._id, product._id)}>Comprar Agora</button>
                <button className={styles.content__details__buttons__button}>Colocar no carrinho</button>
              </div>
            </div>
          </div>}
      </section>
    </>
  )
};
