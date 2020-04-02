import React from 'react';

import ProductItem from 'components/ProductItem/ProductItem';

const ProductGroup = ({ type, variants, groupName }) => {
  return (
    <article id={groupName} className="Product-group">
      <h3 className="Product-heading high-emphasis text-capitalize">{groupName}</h3>

      {variants.map(variant =>
      <ProductItem
        key={'product-section ' + variant.price}
        price={variant.price}
        image={variant.image}
        type={type}
      />
      )}
    </article>
  );
}

export default ProductGroup;
