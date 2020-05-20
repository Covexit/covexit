import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import Form from '../Form/Form';
import Fields from '../Fields/Fields';
import CategorySelect from '../CategorySelect/CategorySelect';
import Button from '../Button/Button';
import useApi from '../../shared/api';


const ProductForm = ({ id, editId }) => {
  const history = useHistory();
  const { API } = useApi();
  const [t] = useTranslation('product-cru');
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    product_class: '',
    description: '',
    stock: '',
    sku: '',
    categories: [],
    _photos: [],
  });

  const data = {
    ...product,
    slug: slugify(product.title),
    structure: 'standalone',
    stockrecords: [
      {
        partner: id,
        partner_sku: product.sku,
        price_excl_tax: product.price,
        num_in_stock: product.stock,
      },
    ],
  };

  useEffect(() => {
    if (editId) {
      const getCurrentProduct = async () => {
        const response = await API.products.get({ id: editId });
        setProduct({
          title: response.data.title,
          categories: response.data.categories,
          product_class: response.data.product_class,
          price: response.data.stockrecords[0].price_excl_tax,
          sku: response.data.stockrecords[0].partner_sku,
          stock: response.data.stockrecords[0].num_in_stock,
          description: response.data.description,
          _photos: response.data.images && response.data.images[0].original,
        });
      };
      getCurrentProduct();
    }
  }, [id, editId, API]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (product._photos.length && product.categories.length) {
      const formData = new FormData();
      Array.from(product._photos).forEach(item => {
        formData.append('original', item);
      });

      // edit existing Product
      if (editId) {
        // const response =
        await API.products.patch({
          id: editId,
          data,
        });
        // Image Patch request needs update
        // await API.productImages.patch(
        //   response.data.id,
        //   formData,
        //   headers,
        // )
        history.push(`/stores/${id}`);

        //add new Product
      } else {
        const response = await API.products.post({ data });
        if (response.status === 201) {
          // if there are images patch them in later because we need form data here
          await API.productImages.post(
            formData,
            response.data.id,
          )
          history.push(`/stores/${id}`);
        } else {
          console.error(response);
        }
      }
    }
  };

  const onCategorySelect = React.useCallback(
    (obj) => setProduct(product => ({ ...product, categories: (obj.url && [obj.url]) || obj, product_class: obj.class })),
    [],
  );

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  return (
    <Form onSubmit={onSubmit} body={<>
      {/*editId ?
        <Fields.FileUpload onChange={onChange} label={t('product-cru:photoEdit')} name="_photos" value={product._photos}
                           helpText={t('product-cru:photoHelp')} editView/> : null*/}
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
      {!editId && (
        <CategorySelect onSelected={onCategorySelect} value={product.categories} />
      )}
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price" value={product.price}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:sku')} name="sku" value={product.sku} readOnly={!!editId}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:quantity')} type="number" name="stock" value={product.stock}/>
      <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
      {editId ? null :
        <Fields.FileUpload onChange={onChange} label={product._photos.length ? t('product-cru:photoEdit') : t('product-cru:photo')} name="_photos" value={product._photos}
                           helpText={t('product-cru:photoHelp')}/>}
    </>} footer={
      <Button label={`${t('product-cru:saveProduct')} →`} disabled={!product.categories.length}/>}
    />
  )
}

export default ProductForm;
