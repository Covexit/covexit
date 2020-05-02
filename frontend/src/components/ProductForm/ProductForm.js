import React, { useState } from 'react';
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if(editId){
      await API.products.patch({
        id: editId,
        data: {
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
        },
        config: { headers: { 'Authorization': `Token ${token}` }},
      });
      history.push(`/stores/${id}`);
    } else {
      const response = await API.products.post({
        data: {
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
        },
        config: { headers: { 'Authorization': `Token ${token}` } },
      });
      if (response.status === 201) {
        // if there are images patch them in later because we need form data here
        if (product._photos.length) {
          const formData = new FormData();
          Array.from(product._photos).forEach(item => {
            formData.append('original', item);
          });
          await API.productImages.post(
            formData,
            { headers: { 'Authorization': `Token ${token}` } },
            response.data.id
          )
        }
        history.push(`/stores/${id}`);
      } else {
        console.error(response);
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

  const editHeader = <h1>{t('first-product:edit')}</h1>
  const addHeader =
  <>
    <h1>{t('first-product:head')}</h1>
    <p>{t('first-product:text')}</p>
  </>



  return (
    <Form onSubmit={onSubmit} body={<>
      {editId ? <Fields.FileUpload onChange={onChange} label={t('product-cru:photo')} name="_photo" value={product._photos}
           helpText={t('product-cru:photoHelp')} editView/> : null}
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
      <CategorySelect onSelected={onCategorySelect} />
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price" value={product.price}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:sku')} name="sku" value={product.sku}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:quantity')}  type="number" name="stock" value={product.stock}/>
      <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
      {editId ? null : <Fields.FileUpload onChange={onChange} label="Upload photo" name="_photos" value={product._photos}
                         helpText="JPEG .JPG .PNG (Just these file formats will work)"/>}
      </>} footer={<Button label={`${t('first-product:next')} →`}/>}
    />
  )
}

export default ProductForm;
