import React, { useState, useEffect } from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import ProductForm from 'components/ProductForm/ProductForm';
import ProductList from 'components/ProductList/ProductList';
import API from '../shared/api';

const ProductCreateEdit = ({ match }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const id = match.params.id;
      const response = await API.productList.get(id);
      setProducts(response.data);
    };
    getProducts();
  },[]);

  return (
    <ViewWrappers.View container withPadding renderFn={isBigScreen => (
      <>
        <ViewWrappers.ViewSplitter withPadding>
          <ProductList products={products}/>
          {isBigScreen}
        </ViewWrappers.ViewSplitter>
        <ViewWrappers.ViewSplitter>
          <ProductForm id={match.params.id} editId={match.params.editId}/>
        </ViewWrappers.ViewSplitter>
        {!isBigScreen}
      </>
    )} />

  )
}

export default ProductCreateEdit
