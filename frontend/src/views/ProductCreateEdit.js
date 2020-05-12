import React, { useState, useEffect } from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import ProductForm from 'components/ProductForm/ProductForm';
import ProductList from 'components/ProductList/ProductList';
import useApi from '../shared/api';

const ProductCreateEdit = ({ match }) => {

  const [products, setProducts] = useState([]);
  const { API } = useApi();
  const id = match.params.id;

  useEffect(() => {
    const getProducts = async () => {
      const response = await API.productList.get(id);
      setProducts(response.data);
    };
    getProducts();
  },[id, API]);

  return   (
    <ViewWrappers.View className="PhotoSelect" container renderFn={isBigScreen => (
      <>
        <ViewWrappers.ViewSplitter withPadding>
          <ProductList edit={true} products={products}/>
          {isBigScreen}
        </ViewWrappers.ViewSplitter>
        <ViewWrappers.ViewSplitter withPadding>
          <ProductForm id={match.params.id} editId={match.params.editId}/>
        </ViewWrappers.ViewSplitter>
        {!isBigScreen}
      </>
    )} />
  )
}

export default ProductCreateEdit
