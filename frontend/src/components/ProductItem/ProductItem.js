import React from 'react';
import { useCartContext } from '../../context/CartContext'
import roundedPlusIcon from "../../assets/rounded_plus.svg";

const ProductItem = ({ id, name, description, category, price, image }) => {
  const { addProduct } = useCartContext()

  const product = { id, name, description, category, price, image }

  return (
    <div className="Product-item">
      <img className="Product-img" src={image} alt="product" />
      <div className="Product-content">
        <div className="Product-review">
          <h4>{name}</h4>
          <p>{description}</p>
          <h4 className="variant-price">{price}€</h4>
        </div>

        <img
          onClick={() => addProduct(product)}
          className="medium-icon"
          src={roundedPlusIcon}
          alt="add product"
        />
      </div>
    </div>
  );
}

export default ProductItem;
