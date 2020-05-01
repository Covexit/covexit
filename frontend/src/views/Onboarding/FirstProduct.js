import React from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import { useTranslation } from 'react-i18next';
import ProductForm from '../../components/ProductForm/ProductForm';


const FirstProduct = ({ match }) => {
  const [t] = useTranslation('first-product');

  return (
    <ViewWrappers.View container withPadding>
      <div className="Intro">
        <h1>{t('first-product:head')}</h1>
        <p>{t('first-product:text')}</p>
        <ProductForm id={match.params.id} />
      </div>
    </ViewWrappers.View>
  )
};

export default FirstProduct
