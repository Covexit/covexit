import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import API from '../../shared/api';
import slugify from 'slugify';
import Form from '../Form/Form';
import Fields from '../Fields/Fields';
import CategorySelect from '../CategorySelect/CategorySelect';
import Button from '../Button/Button';

const ProductForm = ({ id, editId }) => {
  const { token } = useUserContext();
  const history = useHistory();
  const [t] = useTranslation(['product-cru', 'first-product']);
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
       }
     ]
   };

  useEffect(() => {
    if (editId){
      const getCurrentProduct = async () => {
        const response = await API.products.get({id: editId});
        console.log(response.data);
        setProduct({
          title: response.data.title,
          categories: response.data.url,
          product_class: response.data.product_class,
          price: response.data.stockrecords[0].price_excl_tax,
          sku: response.data.stockrecords[0].partner_sku,
          stock: response.data.stockrecords[0].num_in_stock,
          description: response.data.description,
          _photos: response.data.images[0].original
        });
      };
      getCurrentProduct();
    };
  }, [id, editId]);



  const onSubmit = async (e) => {
    e.preventDefault();
    const headers = { headers: { 'Authorization': `Token ${token}` }};
    if (product._photos.length) {
      const formData = new FormData();
      Array.from(product._photos).forEach(item => {
        formData.append('original', item);
      });

      // edit existing Product
    if (editId){
      // const response =
      await API.products.patch({
        id: editId,
        data,
        config: headers,
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
      const response = await API.products.post({
        data,
        config: headers
      });
      if (response.status === 201) {
        // if there are images patch them in later because we need form data here
          await API.productImages.post(
            formData,
            headers,
            response.data.id
          )
        history.push(`/stores/${id}`);
      } else {
        console.error(response);
      }
    }
  }
};

  const onCategorySelect = React.useCallback(
    (obj) => setProduct(product => ({...product, categories: [obj.url] || obj, product_class: obj.class})),
    []
  );

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  return (
    <Form onSubmit={onSubmit} body={<>
      {editId ? <h1> {t('first-product:edit')} </h1> : <h1> {t('first-product:next')} </h1> }
      {editId ? <Fields.FileUpload onChange={onChange} label={t('product-cru:photo')} name="_photos" value={product._photos}
           helpText={t('product-cru:photoHelp')} editView/> : null}

      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
      <CategorySelect onSelected={onCategorySelect} />
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price" value={product.price}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:sku')} name="sku" value={product.sku} readOnly={editId ? true:false}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:quantity')}  type="number" name="stock" value={product.stock}/>
      <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
      {editId ? null : <Fields.FileUpload onChange={onChange} label="Upload photo" name="_photos" value={product._photos}
                         helpText="JPEG .JPG .PNG (Just these file formats will work)"/>}
      </>} footer={<Button label={`${t('first-product:next')} →`}/>}
    />
  )
}

export default ProductForm;
