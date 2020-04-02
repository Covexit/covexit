import React from 'react';

import ProductItem from 'components/ProductItem/ProductItem';

const ProductGroup = ({ type, variants, groupName }) => {
  return (
    <article id={groupName} className="Product-group">
      <h3 className="Product-heading high-emphasis text-capitalize">{groupName}</h3>

      {variants.map((variant, idx) =>
      <ProductItem
        key={'product-section ' + idx}
        price={variant.price}
        image={variant.image}
        type={type}
      />
      )}
    </article>
  );
}

export default ProductGroup;
