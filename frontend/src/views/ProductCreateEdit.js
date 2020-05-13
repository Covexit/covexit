import React, { useState, useEffect } from 'react'

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import ProductForm from 'components/ProductForm/ProductForm';
import ProductList from 'components/ProductList/ProductList';
import useApi from '../shared/api';

const ProductCreateEdit = ({ match }) => {

  const [products, setProducts] = useState([]);
  const { API } = useApi();
  const id = match.params.id;
  const editId = match.params.editId;

  useEffect(() => {
    const getProducts = async () => {
      const response = await API.productList.get(id);
      setProducts(response.data);
    };
    getProducts();
  },[id, API]);

  const productOverview =
  <ViewWrappers.View className="PhotoSelect" container renderFn={isBigScreen => (
    <>
        <ViewWrappers.ViewSplitter withPadding>
          <ProductList edit={true} products={products}/>
        </ViewWrappers.ViewSplitter>

      {isBigScreen ?
        <ViewWrappers.ViewSplitter withPadding>
            <ProductForm id={match.params.id} editId={match.params.editId}/>
        </ViewWrappers.ViewSplitter> : null }
    </>
  )} />

  const editView =
  <ViewWrappers.View className="PhotoSelect" container renderFn={isBigScreen => (
    <>
      {isBigScreen ?
        <ViewWrappers.ViewSplitter withPadding>
          <ProductList edit={true} products={products}/>
        </ViewWrappers.ViewSplitter> : null }
      {!isBigScreen && editId ?
        <ViewWrappers.ViewSplitter withPadding>
            <ProductForm id={match.params.id} editId={match.params.editId}/>
        </ViewWrappers.ViewSplitter> : null }
      {isBigScreen && editId ?
        <ViewWrappers.ViewSplitter withPadding>
            <ProductForm id={match.params.id} editId={match.params.editId}/>
        </ViewWrappers.ViewSplitter> : null }
    </>
  )} />

  return (  editId ? editView : productOverview
  )
}

export default ProductCreateEdit
