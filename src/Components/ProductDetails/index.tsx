import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { useEffect, useState, useContext } from 'react'
import IProduct from 'interfaces/IProduct'
import http from 'Utils/Http'
import { CustomerContext } from 'context/CustomerContext'

export default function ProductDetails() {

  const { product_id } = useParams()
  const { customer } = useContext(CustomerContext)

  const [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    http.post('getProductData', { product_id })
      .then(res => setProduct(res.data.data))
      .catch(err => console.log('erro ao pegar produto: ', err))
  }, [product_id])

  return (
    <>
      <section className={styles.flex}>
        <div className={styles.content}>
          <img className={styles.content__img} src={product?.imagem} alt='Imagem do Produto' />
          <div className={styles.content__details}>
            <div className={styles.content__details__text}>
              <h1 className={styles.content__details__text__title}>{product?.titulo}</h1>
              <p className={styles.content__details__text__price}>R$ {product?.preco}</p>
              <p className={styles.content__details__text__desc}>{product?.descricao}</p>
            </div>
            <div className={styles.content__details__buttons}>
              <button className={styles.content__details__buttons__button}>Comprar Agora</button>
              <button className={styles.content__details__buttons__button}>Colocar no carrinho</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};
