import React, { Fragment, useState, useRef, useEffect } from 'react';

const Carousel = ({ showControl, carouselData }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  /**
   * @param {inc} increase - true or false
   */
  const handleControl = (inc) => {
    const max = carouselData.length - 1;
    if (inc) {
      const isNotMaximum = activeSlide !== max;
      const increamentByOne = activeSlide + 1;
      setActiveSlide(isNotMaximum ? increamentByOne : 0);
    } else {
      const isNotMinimum = activeSlide !== 0;
      const decreaseByOne = activeSlide - 1;
      setActiveSlide(isNotMinimum ? decreaseByOne : 0);
    }
  }

  const resetAnimation = useRef(false) //now you can pass timer to another component

  useEffect(
    () => {
      resetAnimation.current = setInterval(() => handleControl(true), 5000)
      return () => {
        clearTimeout(resetAnimation.current)
      }
    },[resetAnimation.current])

    useEffect(() => {
        setTimeout(() => clearInterval(resetAnimation.current), 150000)
    }, [])

  return (
    <section id="myCarousel" className="Carousel">
      <ol className="Carousel-indicator-wrapper">
        {carouselData.map( (eachData, index) => <li key={'ind' + index} onClick={() => setActiveSlide(index)} className={index === activeSlide ?  "active" : ''}></li>)}
      </ol>
      <div className="Carousel-slides">
        {carouselData.map( (eachData, index) =>
        <div className={`Carousel-item secondary-transition ${index === activeSlide ? ' active' : ''}`} key={'carousel' + index}>
          <img src={eachData.image} alt="Los Angeles" style={{ width: "100%" }} />
        </div>
        )}
      </div>
      {showControl &&
      <Fragment>
        <a class="Carousel-control prev" onClick={() => handleControl()}>&#10094;</a>
        <a class="Carousel-control next" onClick={() => handleControl(true)}>&#10095;</a>
      </Fragment>
      }
    </section>
  )
}

export default Carousel;
