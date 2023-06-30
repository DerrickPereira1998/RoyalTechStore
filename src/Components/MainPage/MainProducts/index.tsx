import IProduct from 'interfaces/IProduct'
import styles from './MainProducts.module.scss'
import notebooks from './notebooks.json'
import { Link } from 'react-router-dom'

export default function MainProducts() {
  
  const lista: Array<IProduct> = notebooks

  return (
    <>
      <section className={styles.flex}>
        <p className={styles.title}>Notebooks mais vendidos</p>
        <div className={styles.content}>
          {lista.map((item: IProduct, index) =>
            <Link to={`/product/${item._id}`} className={styles.content__product} key={index}>
              <img className={index === 0 || index === 4 ? styles.content__product__img2 : styles.content__product__img} src={item.imagem} alt={item.titulo}/>
              <p className={styles.content__product__price}>{item.preco}</p>
              <div className={index % 2 === 0 ? styles.content__product__info : styles.none}>
                <p className={styles.content__product__info__title}>{item.titulo}</p>
                <p className={styles.content__product__info__desc}>{item.descricao}</p>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
};