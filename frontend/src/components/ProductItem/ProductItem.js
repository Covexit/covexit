import React from 'react';

import { bakeryImages } from '../../shared/businessImages'

import roundedPlusIcon from "../../assets/rounded_plus.svg";
import penIcon from "../../assets/pen.svg";

const ProductItem = ({ type, price, image }) => {
  const productIcons = {
    add: roundedPlusIcon,
    edit: penIcon,
    remove: penIcon,
  }

  return (
    <div className="Product-item">
      <img className="Product-img" src={image} alt="product image" />
      <div className="Product-content">
        <div className="Product-review">
          <h4>Very great bread indeed</h4>
          <p>mix of some flourish stuff and water, plus some salty crystals looking like salt</p>
          <h4 className="variant-price">{price}€</h4>
        </div>
        <img className="medium-icon" src={productIcons[type]} alt={`${type} product`} />
      </div>
    </div>
  );
}

export default ProductItem;
