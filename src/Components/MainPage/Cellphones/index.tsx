import { useEffect, useRef} from 'react'
import styles from './Cellphones.module.scss'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import products from './cellphones.json'
import IProduct from 'interfaces/IProduct'


export default function Cellphones() {

  const cellphones: Array<IProduct> = products


  useEffect(() => {
      drag.current = document.getElementById('carousel')
      img.current = document.getElementById('img')
      imgWidth.current = img.current ? img.current.clientWidth + 14 : 0
  })

  let drag: any = useRef(document.getElementById('carousel'))
  let img: any = useRef(document.getElementById('img'))
  let imgWidth = useRef(img ? img.clientWidth + 14 : 0)
  let isDragStart = false, prevPageX: number, prevScrollLeft: any

  const clickArrow = (left: boolean) => {
    // Passa a imagem quando a seta é clicada
    if(drag.current){
      drag.current.style.scrollBehavior = 'smooth'
      drag.current.scrollLeft += left ? -imgWidth.current : imgWidth.current;
    }
  }

  const dragStart = (e: any) => {
    // atualizando as variaveis quando o mouse é segurado
    isDragStart = true
    prevPageX = (e.pageX || e.touches[0].pageX)
    prevScrollLeft = drag.current?.scrollLeft
  }

  const dragging = (e: any) => {
    // movendo as imagens de acordo com a movimentação do mouse quando segurado
    if(drag.current){
      drag.current.style.scrollBehavior = 'auto'
    }
    if(!isDragStart) return;
    let positonDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    if(drag.current){
      drag.current.scrollLeft =  prevScrollLeft - positonDiff
    }
  }

  const dragStop = () => {
    isDragStart = false
  }

  return (
    <section className={styles.section}>
      <p  className={styles.section__title}>Celulares mais novos</p>
      <div className={styles.section__wrapper}>
        <span onClick={() => clickArrow(true)} id='left' className={styles.section__wrapper__button}><BiChevronLeft/></span>
        <div id='carousel' 
          className={styles.section__wrapper__carousel} 
          
          onMouseDown={(e) => dragStart(e)} 
          onTouchStart={(e) => dragStart(e)}

          onMouseMove={(e) => dragging(e)}
          onTouchMove={(e) => dragging(e)}

          onMouseUp={() => dragStop()}
          onTouchEnd={() => dragStop()}
          onMouseLeave={() => dragStop()}
        >
            {cellphones.map((item, index) => (
              <Link className={styles.section__wrapper__carousel__link} to={`/product/${item._id}`} key={index} >
                <img id='img' className={styles.section__wrapper__carousel__img} src={item.imagem} alt='img'/>
                <div className={styles.section__wrapper__carousel__link__price}>{item.preco}</div>
              </Link>
            ))}
        </div>
        <span onClick={() => clickArrow(false)} id='right' className={styles.section__wrapper__button}><BiChevronRight/></span>
      </div>
    </section>
  )
};