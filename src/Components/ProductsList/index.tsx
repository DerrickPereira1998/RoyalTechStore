import IProduct from 'interfaces/IProduct'
import { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import http from 'Utils/Http'

// products.filter((product: IProduct) => product.titulo.toLowerCase().includes(query || "")).length !== 0 &&

export default function ProductsList() {

  const [products, setProducts] = useState<Array<IProduct>>([{ _id: "", imagem: "", titulo: "", descricao:"" ,preco: "" }])
  const { query } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    http.get('getAllProducts')
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err))
    console.log("ola")
  },[])

  return (
    <section className={styles.section}>
      <div className={styles.section__products}>
        <div className={styles.section__products__container}>
          <p className={styles.section__products__container__title}>Resultados</p>
        </div>
        <div className={styles.section__products__list}>
          { products.length === 1 
            ? <div className={styles.loading}></div> 
            : query && products.filter((product: IProduct) => product.titulo.toLowerCase().includes(query)).length === 0 
              ? <div>Nenhum produto encontrado</div> 
              : products.filter((product: IProduct) => product.titulo.toLowerCase().includes(query || "")).map((product: IProduct) => {
              return (
                <div onClick={() => navigate(`/product/${product._id}`)} className={styles.section__products__list__product} key={product._id}>
                  <img className={styles.section__products__list__product__img} src={product.imagem} alt={product._id} />
                  <p className={styles.section__products__list__product__price}>R$ {product.preco}</p>
                  <p className={styles.section__products__list__product__name}>{product.titulo}</p> 
                </div>
              )
          })}
        </div>
      </div>
    </section>
  )
};
