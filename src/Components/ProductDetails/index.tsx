import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { useEffect, useState } from 'react'
import IProduct from 'interfaces/IProduct'
import http from 'Utils/Http'

export default function ProductDetails() {

  const { product_id } = useParams()

  const [product, setProduct] = useState<IProduct>()

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
                <button className={styles.content__details__buttons__button}>Comprar Agora</button>
                <button className={styles.content__details__buttons__button}>Colocar no carrinho</button>
              </div>
            </div>
          </div>}
      </section>
    </>
  )
};
