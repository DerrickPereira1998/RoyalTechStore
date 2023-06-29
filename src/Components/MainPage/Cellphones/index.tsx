import styles from './Cellphones.module.scss'

export default function Cellphones() {
  const drag = document.getElementById('carousel')

  let isDragStart = false, prevPageX: number, prevScrollLeft: any

  const dragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // atualizando as variaveis quando o mouse é segurado
    isDragStart = true
    prevPageX = e.pageX;
    prevScrollLeft = drag?.scrollLeft
  }

  const dragging = (e: React.MouseEvent<HTMLDivElement>) => {
    // movendo as imagens de acordo com a movimentação do mouse quando segurado
    e.preventDefault()
    if(!isDragStart) return;
    let positonDiff = e.pageX - prevPageX
    if(drag){
      drag.scrollLeft =  prevScrollLeft - positonDiff
    }
  }

  const dragStop = () => {
    isDragStart = false
  }

  return (
    <section className={styles.section}>
      <div className={styles.section__wrapper}>
        <div id='carousel' 
          className={styles.section__wrapper__carousel} 
          onMouseDown={(e) => dragStart(e)} 
          onMouseMove={(e) => dragging(e)}
          onMouseUp={() => dragStop()}>
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-1.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-2.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-3.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-4.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-5.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-6.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-7.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-8.jpg' alt='img' />
          <img className={styles.section__wrapper__carousel__img} src='assets/cellphones/img-9.jpg' alt='img' />
        </div>
      </div>
    </section>
  )
};
