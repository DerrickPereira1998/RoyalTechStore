import IProduct from 'interfaces/IProduct'
import { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import http from 'Utils/Http'

export default function ProductsList() {

  const [products, setProducts] = useState<Array<IProduct>>([])

  useEffect(() => {
    http.get('getAllProducts')
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section className={styles.section} onClick={() => console.log("Produtos",products)}>
      <div className={styles.section__filters}>
        "ola"
      </div>
      <div className={styles.section__products}>
        <p className={styles.section__products__title}>Resultados</p>
        <div className={styles.section__products__list}>
          {products.length >= 0 ? products.map((product, index) => {
              return(
                <div className={styles.section__products__list__product} key={index}>
                  <img className={styles.section__products__list__product__img} src={product.imagem} alt={product._id}/>
                  <p className={styles.section__products__list__product__price}>R$ {product.preco}</p>
                  <p className={styles.section__products__list__product__name}>{product.titulo}</p>
                </div>
              )
          }) : "nothing here"}
        </div>
      </div>
    </section>
  )
};
