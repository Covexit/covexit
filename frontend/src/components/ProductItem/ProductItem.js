import React from 'react';
import { useCartContext } from '../../context/CartContext';
import roundedPlusIcon from "../../assets/rounded_plus.svg";
import penIcon from "../../assets/pen.svg";
import { useHistory } from "react-router-dom";

const ProductItem = ({ product, type, storeId }) => {
  const { addProduct } = useCartContext()
  const { name, description, price, image } = product
  let history = useHistory();

  const productIcons = {
    add: roundedPlusIcon,
    edit: penIcon,
    remove: penIcon,
  }

  const iconHandler = () => {
    if(type === "edit"){
      history.push(`/stores/${storeId}/product/${product.id}`)
    }
    else if(type === "add"){
      addProduct(product)
    }
  }

  return (
    <div className="Product-item">
      <img className="Product-img" src={image} alt="product" />
      <div className="Product-content">
        <div className="Product-review">
          <h4>{name}</h4>
          <p>{description}</p>
          <h4 className="variant-price">{price.toFixed(2)}€</h4>
        </div>


        <img
          onClick={iconHandler}
          className="medium-icon"
          src={productIcons[type]}
          alt="add product"
        />
      </div>
    </div>
  );
}

export default ProductItem;
