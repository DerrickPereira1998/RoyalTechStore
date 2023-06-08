import IProduct from 'interfaces/IProduct'
import { useContext } from 'react'
import styles from './Products.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from 'context/Context'

export default function ProductsList() {

  const { products } = useContext(Context)
  const { query } = useParams()
  const navigate = useNavigate()

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
          {products.filter((product: IProduct) => product.titulo.toLowerCase().includes(query || "")).length !== 0 ? 
            products.filter((product: IProduct) => product.titulo.toLowerCase().includes(query || "")).map((product: IProduct) => {
            return (
              <div onClick={() => navigate(`/product/${product._id}`)} className={styles.section__products__list__product} key={product._id}>
                <img className={styles.section__products__list__product__img} src={product.imagem} alt={product._id} />
                <p className={styles.section__products__list__product__price}>R$ {product.preco}</p>
                <p className={styles.section__products__list__product__name}>{product.titulo}</p>
              </div>
            )
          }) : ''}
        </div>
      </div>
    </section>
  )
};
