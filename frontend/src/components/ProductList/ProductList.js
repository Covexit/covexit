import React, { useState } from 'react';

import ProductGroup from '../ProductGroup/ProductGroup';
import magnifierIcon from '../../assets/magnifier.svg'
import { useTranslation } from 'react-i18next';
import ViewWrappers from '../../components/ViewWrappers/ViewWrappers';

const ProductList = ({ products, edit }) => {
  const [segment, setSegment] = useState('');
  const [t] = useTranslation('product-list');
  const categories = products.reduce((result, currentValue) => {
    (result[currentValue.product_class] = result[currentValue.product_class] || []).push(
      currentValue,
    );
    return result;
  }, {});

  return (
    <ViewWrappers.View withPadding>
      <section className="ProductList">
        <h2 className="Product-heading high-emphasis">{t('head')}</h2>

        <div className="ProductList-filter">
          <img src={magnifierIcon} alt="magnifier"/>
          <select onChange={(e) => setSegment(e.target.value)} value={segment}>
            <option value="">{t('chooseCategory')}</option>
            {Object.keys(categories).map(product_class => (
              <option value={product_class} key={product_class}>{product_class}</option>))
            }
          </select>
        </div>


        {
          segment ?
            <ProductGroup
              groupName={segment}
              products={categories[segment]}
              edit={edit}
              /> :
              Object.keys(categories).map(product_class => {
                return (
                  <ProductGroup
                  key={product_class}
                  groupName={product_class}
                  products={categories[product_class]}
                  edit={edit}
                  />
                )
              })
            }
      </section>
    </ViewWrappers.View>
  );
}

ProductList.defaultProps = {
  type: 'add',
}

export default ProductList;
