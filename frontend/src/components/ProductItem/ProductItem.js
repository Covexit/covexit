import React from 'react';

import businessImage from "../../assets/business.jpg";
import plusIcon from "../../assets/plus.svg";

const ProductItem = ({ products }) => (
  products.map(product =>
    <article id={product} key={'product-item ' + product} className="Product-item">
      <h3 className="high-emphasis product-heading text-capitalize">{product}</h3>

      {products.map(product =>
      <div key={'product-section ' + product} className="Product-section">
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
    </article>
  )
);

export default ProductItem;
