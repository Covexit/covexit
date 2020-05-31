import React from 'react';
import { useCartContext } from '../../context/CartContext';
import { FiPlusCircle } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ProductItem = ({ product, edit, simple }) => {
  const { addProduct } = useCartContext()
  const { id, editId } = useParams();
  const history = useHistory();
  const [t] = useTranslation(['product-cru', 'account']);
  const { title, description, price, images } = product

  const onClick = () => {
    if (edit) {
      history.push(`/stores/${id}/product/${product.id}`)
    } else {
      addProduct(product)
    }
  }

  return (
    <div className={`ProductItem ${simple && 'ProductItem--simple'} ${parseInt(editId) === product.id ? 'ProductItem--active' : ''}`}
         onClick={simple ? onClick : null}>
      <div className="ProductItem-img">
      {!!images.length && <img src={images[0].original} alt="" />}
      </div>
      <div className="ProductItem-content">
        <div className="ProductItem-review">
          <h4>{title}</h4>
          <p>{description}</p>
          <h4 className="variant-price">{price.incl_tax}€</h4>
        </div>
        {!simple && <button onClick={onClick} title={edit ? t('product-cru:editProduct') : t('account:addToCart')}>
          {edit ? <FiEdit size="40" /> : <FiPlusCircle size="50" />}
        </button>
        }

      </div>
    </div>
  );
}

export default ProductItem;
