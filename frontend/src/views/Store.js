import React, { useState, Fragment } from 'react';

import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import ProductList from '../components/ProductList/ProductList';

import businessImage from "../assets/business.jpg";
import chevronDown from '../assets/chevron-down.svg';

import products from '../shared/productData.js'

const Store = () => {
  const [showMore, requestMore] = useState(false);

  return (
    <div className="Store">
      <section className="Store-showcase">
        <div className="Store-image">
          <img src={businessImage} alt="Los Angeles" style={{ width: "100%" }} />
        </div>
        <article className="Store-Details">
          <h1 className="high-emphasis h4 text-capitalize">Manfred's bakery</h1>
          <p className="Store-Detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, perferendis harum! Incidunt hic corrupti dolores ex vel veniam explicabo corporis quis harum molestiae totam earum magni architecto, dolore quo qui deserunt! Excepturi veritatis sed voluptate. Officiis fuga molestias iusto earum numquam labore eius nihil totam facere non, quas voluptas ab asperiores soluta quos odit qui, quidem adipisci aspernatur? Ea repellat error fuga doloremque vitae a, nisi quod ipsa labore officiis veniam illum magni minus ad numquam quos quas sint molestiae ducimus? Est quibusdam corporis officia iure tempora illo, maxime minus odit,ullam quod dolor magni earum ipsam quasi beatae hic.</p>
          {!showMore && <p onClick={() => requestMore(true)} className="show-more-detail">Show me more info <img src={chevronDown} alt="chevronDown" className="left-spacing" /></p>}
          {showMore &&
          <Fragment>
            <p className="Store-Detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, perferendis harum! Incidunt hic corrupti dolores ex vel veniam explicabo corporis quis harum molestiae totam earum magni architecto, dolore quo qui deserunt! Excepturi veritatis sed voluptate. Officiis fuga molestias iusto earum numquam labore eius nihil totam facere non, quas voluptas ab asperiores soluta quos odit qui, quidem adipisci aspernatur? Ea repellat error fuga doloremque vitae a, nisi quod ipsa labore officiis veniam illum magni minus ad numquam quos quas sint molestiae ducimus? Est quibusdam corporis officia iure tempora illo, maxime minus odit,ullam quod dolor magni earum ipsam quasi beatae hic.</p>
            <p onClick={() => requestMore(false)} className="show-more-detail">Show me less info <img src={chevronDown} alt="chevronDown" className="rotate-up" /></p>
          </Fragment>
          }
        </article>
      </section>

      <section className="Store-actions">
        <Button to="/store" label="Make a call" secondary />
      </section>

      <ProductList products={products} type="add" />
      <Footer />
    </div>
  );
}

export default Store;
