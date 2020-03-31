import React, { useState, Fragment } from 'react';

import Button from '../Button/Button';
import ProductItem from '../ProductItem/ProductItem';

import magnifierIcon from '../../assets/magnifier.svg'

const products = ['bread', 'teas', 'oils', 'pots'];

const ProductList = ({ type, editorView }) => {
  const [currentProduct, setCurrentProduct] = useState('bread');

  return (
    <section className="Product-list">
      <h2 className="high-emphasis product-heading">Products</h2>

     {editorView &&
      <section className="Store-actions product-actions-group product-border-padding-top--0">
        <Button to="/store" label="Manage product" secondary type="group" />
        <Button to="/store" label="Add new product" secondary type="group" />
      </section>
      }

      <div className="Product-catelogs">
        <img src={magnifierIcon} alt="magnifier" />
        {products.map(product => <a href={`#${product}`} onClick={() => setCurrentProduct(product)} className={`Product-catelog ${product === currentProduct ? 'active': ''}`} key={product}>{product}</a>)}
      </div>

      <ProductItem products={products} type={type} />
    </section>
  );
}

ProductList.default = {
  type: 'add'
}

export default ProductList;
