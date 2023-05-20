import IProduct from 'interfaces/IProduct'
import { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import axios from 'axios'

export default function Products() {

  const [products, setProducts] = useState<Array<IProduct>>([])

  useEffect(() => {
    axios.get('http://localhost:5000/getAllProducts')
      .then(res => setProducts(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section>
      {products.length >= 0 ? products.map((product, index) => {
          return(
            <div className={styles.div} key={index}>
              titulo: {product.titulo}
              desc: {product.descricao}
              preço: {product.preco}
              user: {product.user_id}
            </div>
          )
      }) : "nope"}
    </section>
  )
};
