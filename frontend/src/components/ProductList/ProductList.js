import React, { useState } from 'react';

import Button from '../Button/Button';
import ProductGroup from '../ProductGroup/ProductGroup';

import { bakeryImages } from '../../shared/businessImages'
import magnifierIcon from '../../assets/magnifier.svg'

const products = ['bread', 'teas', 'oils', 'pots'];

const ProductList = ({ type, editorView }) => {
  const [currentProduct, setCurrentProduct] = useState('bread');
  const prices = [5.60, 3.45, 3.45, 3.45, 3.45];
  const variants = bakeryImages
    .map((eachBackeryImage, index) => ({ image: eachBackeryImage, price: prices[index] }));


  return (
    <section className="Product-list">
      <h2 className="Product-heading high-emphasis">Products</h2>

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

      {products.map(product => 
        <ProductGroup key={'product-group ' + product} variants={variants} groupName={product} type={type} />
      )}
    </section>
  );
}

ProductList.defaultProps = {
  type: 'add'
}

export default ProductList;
