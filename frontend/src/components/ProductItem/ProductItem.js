import React from 'react';

import roundedPlusIcon from "../../assets/rounded_plus.svg";

const ProductItem = ({ name, description, price, image }) => {
  // const productIcons = {
  //   add: roundedPlusIcon,
  //   edit: penIcon,
  //   remove: penIcon,
  // }

  return (
    <div className="Product-item">
      <img className="Product-img" src={image} alt="product" />
      <div className="Product-content">
        <div className="Product-review">
          <h4>{name}</h4>
          <p>{description}</p>
          <h4 className="variant-price">{price}€</h4>
        </div>

        <img className="medium-icon" src={roundedPlusIcon} alt="add product" />
      </div>
    </div>
  );
}

export default ProductItem;
