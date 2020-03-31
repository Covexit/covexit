import React from 'react';

import { bakeryImages } from '../../shared/businessImages'

import roundedPlusIcon from "../../assets/rounded_plus.svg";
import penIcon from "../../assets/pen.svg";

const ProductItem = ({ type, products }) => {
  const prices = [5.60, 3.45, 3.45, 3.45, 3.45];
  const variants = bakeryImages
    .map((eachBackeryImage, index) => ({ image: eachBackeryImage, price: prices[index] }));

  const productIcons = {
    add: roundedPlusIcon,
    edit: penIcon,
  }

  return (
    products.map(product =>
      <article id={product} key={'product-item ' + product} className="Product-item">
        <h3 className="high-emphasis product-heading text-capitalize">{product}</h3>
  
        {variants.map(variant =>
        <div key={'product-section ' + variant.price} className="Product-section">
          <img className="Product-img" src={variant.image} alt="product image" />
          <div className="Product-content">
            <div className="Product-review">
              <h4>Very great bread indeed</h4>
              <p>mix of some flourish stuff and water, plus some salty crystals looking like salt</p>
              <h4 className="variant-price">{variant.price}€</h4>
            </div>
            <img className="add-product" src={productIcons[type]} alt="add product" className="medium-icon" />
          </div>
        </div>
        )}
      </article>
    )
  );
}

export default ProductItem;
