import IProduct from 'interfaces/IProduct'
import { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import http from 'Utils/Http'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductsList() {
  const [products, setProducts] = useState<Array<IProduct>>([])

  const { query } = useParams()
  
  const navigate = useNavigate()

  useEffect(() => {
    http.get('getAllProducts')
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section className={styles.section} onClick={() => console.log("Produtos", products)}>
      <div className={styles.section__products}>
        <div className={styles.section__products__container}>
          <p className={styles.section__products__container__title} onClick={() => console.log(products)}>Resultados</p>
          <div className={styles.section__products__container__filters}>
            Ordenadores
          </div>
        </div>
        <div className={styles.section__products__list}>
          {(products.length >= 0) ? products.filter((item) => item.titulo.toLowerCase().includes(query || "")).map((product, index) => {
            return (
              <div onClick={() => navigate(`/product/${product._id}`)} className={styles.section__products__list__product} key={index}>
                <img className={styles.section__products__list__product__img} src={product.imagem} alt={product._id} />
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
