import React from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import ProductForm from 'components/ProductForm/ProductForm';


const FirstProduct = ({ match }) => (
  <ViewWrappers.View container withPadding>
    <ProductForm id={match.params.id} editId={match.params.editId}/>
  </ViewWrappers.View>
)

export default FirstProduct
