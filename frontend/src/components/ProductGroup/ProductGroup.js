import React from 'react';

import './ProductGroup.scss';
import ProductItem from 'components/ProductItem/ProductItem';

const ProductGroup = ({ products, type, groupName, storeId }) => {
  return (
    <article id={groupName} className="ProductGroup">
      <h3 className="ProductGroup-heading">{groupName}</h3>

      {products.map(product =>
        <ProductItem key={product.id} product={product} type={type} storeId={storeId}/>
      )}
    </article>
  );
}

export default ProductGroup;
