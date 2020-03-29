import React, { useState, Fragment } from 'react';
import Carousel from '../components/Carousel/Carousel';
import Button from '../components/Button/Button';

import shareIcon from '../assets/share.svg';
import backArrowIcon from '../assets/back-arrow.svg';
import chevronDown from '../assets/chevron-down.svg';
import businessImage from "../assets/business.jpg";
import smallBusiness from "../assets/business1.jpg";
import plusIcon from "../assets/plus.svg";

const businessData = [
  { name: 'business 1', businessImage },
  { name: 'business 2', businessImage: smallBusiness },
  { name: 'business 3', businessImage },
  { name: 'business 4', businessImage },
  { name: 'business 5', businessImage },
]

const products = ['bread', 'teas', 'oils', 'pots'];

const Business = () => {
  const [showMore, requestMore] = useState(false);
  const [currentProduct, setCurrentProduct] = useState('bread');

  return (
  <div className="Business">
    <header className="Business-header">
      <div className="Business-header-item">
        <img src={backArrowIcon} alt="back icon" className="small-icon" /> <span className="pl-1 text-capitalize md-size">back</span>
      </div>
      <div className="text-capitalize md-size high-emphasis">menfred's bakery</div>
      <div>
        <img className="medium-icon" alt="next icon" src={shareIcon} />
      </div>
    </header>

    <section className="Business-showcase">
      <Carousel carouselData={businessData} />
      <article className="Business-Details">
        <h2 className="high-emphasis text-capitalize">Mafred's bakery</h2>
        <p className="Business-Detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, perferendis harum! Incidunt hic corrupti dolores ex vel veniam explicabo corporis quis harum molestiae totam earum magni architecto, dolore quo qui deserunt! Excepturi veritatis sed voluptate. Officiis fuga molestias iusto earum numquam labore eius nihil totam facere non, quas voluptas ab asperiores soluta quos odit qui, quidem adipisci aspernatur? Ea repellat error fuga doloremque vitae a, nisi quod ipsa labore officiis veniam illum magni minus ad numquam quos quas sint molestiae ducimus? Est quibusdam corporis officia iure tempora illo, maxime minus odit,ullam quod dolor magni earum ipsam quasi beatae hic.</p>
        {!showMore && <p onClick={() => requestMore(true)} className="show-more-detail">Show me more info <img src={chevronDown} alt="chevronDown" className="left-spacing" /></p>}
        {showMore &&
        <Fragment>
          <p className="Business-Detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, perferendis harum! Incidunt hic corrupti dolores ex vel veniam explicabo corporis quis harum molestiae totam earum magni architecto, dolore quo qui deserunt! Excepturi veritatis sed voluptate. Officiis fuga molestias iusto earum numquam labore eius nihil totam facere non, quas voluptas ab asperiores soluta quos odit qui, quidem adipisci aspernatur? Ea repellat error fuga doloremque vitae a, nisi quod ipsa labore officiis veniam illum magni minus ad numquam quos quas sint molestiae ducimus? Est quibusdam corporis officia iure tempora illo, maxime minus odit,ullam quod dolor magni earum ipsam quasi beatae hic.</p>
          <p onClick={() => requestMore(false)} className="show-more-detail">Show me less info <img src={chevronDown} alt="chevronDown" className="rotate-up" /></p>
        </Fragment>
        }
      </article>
    </section>

    <section className="Business-actions">
      <Button to="/business" label="Make a call" secondary />
      <Button to="/business" label="Show products" />
    </section>

    <section className="Business-Products">
      <h2 className="high-emphasis product-heading">Products</h2>

      <div className="Product-lists">
        {products.map(product => <a href={`#${product}`} className={`Product-list ${product === currentProduct ? 'active': ''}`} key={product}>{product}</a>)}
      </div>

      {products.map(product =>
      <article id={product} key={'product-catalogs ' + product} className="product-catalogs">
        <h3 className="high-emphasis product-heading text-capitalize">{product}</h3>

        {products.map(product =>
        <div key={'product-section ' + product} className="product-section">
          <img className="product-img" src={businessImage} alt="product image" />
          <div className="product-content">
            <div className="product-review">
              <h4>Very great bread indeed</h4>
              <p>mix of some flourish stuff and water, plus some salty crystals looking like salt</p>
            </div>
            <img className="add-product" src={plusIcon} alt="add product" className="medium-icon" />
          </div>
        </div>
        )}
      </article>)}
    </section>
  </div>
  );
}

export default Business;
