import { useState } from 'react'
import styles from './Slider.module.scss'

interface slide{
  url: string
}

export default function Slider() {

  const location = window.location.origin
  const slides = [{url: `${location}/assets/slider/image-1.jpg`},
                  {url: `${location}/assets/slider/image-2.jpg`},
                  {url: `${location}/assets/slider/image-3.jpg`},
                  {url: `${location}/assets/slider/image-4.jpg`}]

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
          {slides.map((slide: slide) => (
            <span className={styles.section__container__slide} style={{ backgroundImage: `url(${slide.url})`}}></span>
          ))}
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