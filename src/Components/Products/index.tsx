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
    <section onClick={() => console.log("Produtos",products)}>
      {products.length >= 0 ? products.map((product, index) => {
          return(
            <div className={styles.div} key={index}>
              <img src={product.imagem} alt={product._id}/>
              <p>{product.titulo}</p>
              <p>{product.descricao}</p>
              <p>{product.preco}</p>
            </div>
          )
      }) : "nope"}
    </section>
  )
};
