import React, { useState, Fragment } from 'react';

import ProductItem from '../ProductItem/ProductItem';


const products = ['bread', 'teas', 'oils', 'pots'];

const ProductList = () => {
  const [currentProduct, setCurrentProduct] = useState('bread');

  return (
    <section className="Product-list">
      <h2 className="high-emphasis product-heading">Products</h2>

      <div className="Product-catelogs">
        {products.map(product => <a href={`#${product}`} onClick={() => setCurrentProduct(product)} className={`Product-catelog ${product === currentProduct ? 'active': ''}`} key={product}>{product}</a>)}
      </div>

      <ProductItem products={products} />
    </section>
  );
}

export default ProductList;
