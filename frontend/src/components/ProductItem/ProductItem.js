import React from 'react';
import { useCartContext } from '../../context/CartContext';
import { MdAddCircleOutline } from 'react-icons/md';

const ProductItem = ({ product }) => {
  const { addProduct } = useCartContext()
  const { title, description, price, images } = product

  return (
    <div className="ProductItem">
      <div className="ProductItem-img">
      {!!images.length && <img src={images[0].original} alt="" />}
      </div>
      <div className="ProductItem-content">
        <div className="ProductItem-review">
          <h4>{title}</h4>
          <p>{description}</p>
          <h4 className="variant-price">{price.incl_tax}€</h4>
        </div>

        {
          // TODO: Maybe change the route to stores/1/edit for edit mode
          //  and then check with useRouteMatch whether this will be edit or add or delete
        }
        <button onClick={() => addProduct(product)}>
          <MdAddCircleOutline size={50} />
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
