import React, { useState } from 'react';

import { FiShoppingCart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useCartContext } from 'context/CartContext';
import './Cart.scss';
import Modal from '../Modal/Modal';
import ProductItem from '../ProductItem/ProductItem';


const Cart = ({ partnerId }) => {
  const [showCart, setShowCart] = useState(false);
  const { cart, total, addProduct, delProduct } = useCartContext();
  const [t] = useTranslation('cart');
  return (
    <section className={`Cart ${showCart ? 'Cart--shown' : ''}`}>
      <button className="Cart-button" onClick={() => setShowCart(!showCart)}>
        <FiShoppingCart size="25"/>
        {t('cartButton')} ({cart.length})
      </button>
      {
        showCart &&
        <Modal showCart onClose={() => setShowCart(false)}>
          {cart.map(product =>
            <ProductItem key={product.id} product={product}/>)}
          {total}
        </Modal>
      }
    </section>
  );
}

Cart.defaultProps = {
  type: 'add',
}

export default Cart;
