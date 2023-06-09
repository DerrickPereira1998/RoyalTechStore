import IProduct from 'interfaces/IProduct'
import styles from './MainPage.module.scss'
import notebooks from './notebooks.json'

export default function MainPage() {
  
  const lista: Array<IProduct> = notebooks

  return (
    <>
      <section className={styles.flex}>
        <div className={styles.content} onClick={() => console.log(lista)}>
          {lista.map((item: IProduct) =>
            <div className={styles.content__product} key={item._id}>
              <img className={styles.content__product__img} src={item.imagem} alt={item.titulo}/>
              {item.descricao}
            </div>
          )}
        </div>
      </section>
    </>
  )
};