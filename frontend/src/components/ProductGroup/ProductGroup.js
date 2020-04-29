import React from 'react';

import ProductItem from 'components/ProductItem/ProductItem';

const ProductGroup = ({ products, type, groupName, storeId }) => {
  return (
    <article id={groupName} className="Product-group">
      <h3 className="Product-heading high-emphasis text-capitalize">{groupName}</h3>

      {products.map(product =>
        <ProductItem key={product.id} product={product} type={type} storeId={storeId}/>
      )}
    </article>
  );
}

export default ProductGroup;
