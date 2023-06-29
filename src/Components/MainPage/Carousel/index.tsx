import { useState } from 'react'
import styles from './Slider.module.scss'
import { Link } from 'react-router-dom'

export default function Carousel() {

  const location = window.location.origin
  const slides = [{url: `${location}/assets/carousel/Carousel1.png`},
                  {url: `${location}/assets/carousel/Carousel2.png`},
                  {url: `${location}/assets/carousel/Carousel3.png`},
                  {url: `${location}/assets/carousel/Carousel4.png`}]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    currentIndex === (slides.length - 1) ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
  }

  const goToPrevious = () => {
    currentIndex === 0 ? setCurrentIndex(slides.length - 1) : setCurrentIndex(currentIndex - 1)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className={styles.section}>
      <div className={styles.section__container}>
        <div className={styles.section__container__slides} style={{ transform: `translate(0,-${currentIndex * 100}%)`}}>
          <span className={styles.section__container__slide} style={{ backgroundImage: `url(${slides[0].url})`}}></span>
          <Link to={'/products/'} className={styles.section__container__slide} style={{ backgroundImage: `url(${slides[1].url})`}}></Link>
          <Link to={'/products/celular'} className={styles.section__container__slide} style={{ backgroundImage: `url(${slides[2].url})`}}></Link>
          <Link to={'/products/aparelho'} className={styles.section__container__slide} style={{ backgroundImage: `url(${slides[3].url})`}}></Link>
        </div>
        <div className={styles.section__arrows} onClick={goToNext}>
          ❱
        </div>
        <div className={styles.section__arrows} onClick={goToPrevious}>
          ❰
        </div>
      </div>
      <div className={styles.dots}>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className={currentIndex === slideIndex ? styles.dots__currentdot : styles.dots__dot} onClick={() => goToSlide(slideIndex)}>●</div>
        ))}
      </div>
    </div>
  )
};