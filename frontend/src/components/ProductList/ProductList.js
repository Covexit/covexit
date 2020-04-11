import React, { useState } from 'react';

import Button from '../Button/Button';
import ProductGroup from '../ProductGroup/ProductGroup';
import magnifierIcon from '../../assets/magnifier.svg'

const ProductList = ({ products, type, editorView }) => {
  const [segment, setSegment] = useState('bread');

  const categories = products.reduce((acc, current) => {
    const x = acc.find(item => item.category === current.category)

    return x ? acc : acc.concat([current])
  }, []).map(category => category.category)

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
        {categories.map(category => <a href={`#${category}`} onClick={() => setSegment(category)} className={`Product-catelog ${category === segment ? 'active': ''}`} key={category}>{category}</a>)}
      </div>

      {categories.map(category => {
        const filteredProducts = products.filter(product => product.category === category)

        return (
          <ProductGroup
            key={category}
            groupName={category}
            products={filteredProducts}
            type={type}
          />
        )
      })}
    </section>
  );
}

ProductList.defaultProps = {
  type: 'add'
}

export default ProductList;
