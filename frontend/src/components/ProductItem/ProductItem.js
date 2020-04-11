import React from 'react';
import { useCartContext } from '../../context/CartContext';
import roundedPlusIcon from "../../assets/rounded_plus.svg";
import penIcon from "../../assets/pen.svg";

const ProductItem = ({ product, type }) => {
  const { addProduct } = useCartContext()
  const { name, description, price, image } = product

  const productIcons = {
    add: roundedPlusIcon,
    edit: penIcon,
    remove: penIcon,
  }

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
          src={productIcons[type]}
          alt="add product"
        />
      </div>
    </div>
  );
}

export default ProductItem;
