import React from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import { useTranslation } from 'react-i18next';
import ProductForm from 'components/ProductForm/ProductForm';


const FirstProduct = ({ match }) => {
  const [t] = useTranslation('first-product');

  return (
    <ViewWrappers.View container withPadding>
      <ProductForm id={match.params.id} editId={match.params.editId}/>
    </ViewWrappers.View>
  )
};

export default FirstProduct
