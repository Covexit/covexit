import React, { useState } from 'react'
import slugify from 'slugify';

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import Button from 'components/Button/Button';
import API from '../../shared/api';
import { useUserContext } from '../../context/UserContext';
import Form from '../../components/Form/Form';
import Fields from '../../components/Fields/Fields';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import { useTranslation } from 'react-i18next';


const FirstProduct = ({ match }) => {
  const { token } = useUserContext();
  const [t] = useTranslation(['first-product', 'product-cru']);
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    product_class: '',
    description: '',
    stock: '',
    sku: '',
    categories: [],
    _images: [],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await API.products.post({
      data: {
        ...product,
        slug: slugify(product.title),
        structure: 'standalone',
        stockrecords: [
          {
            partner: match.params.id,
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
      if (product._images.length) {
        const formData = new FormData();
        Array.from(product._images).forEach(item => {
          formData.append('original', item);
        });
        await API.productImages.post(
          formData,
          { headers: { 'Authorization': `Token ${token}` } },
          response.data.id
        )
      }
      //history.push(`/stores/${match.params.id}/onboarding`);
    } else {
      console.error(response);
    }
  };

  const onCategorySelect = React.useCallback(
    (obj) => setProduct(product => ({...product, categories: [obj.slug] || obj, product_class: obj.class})),
    []
  );

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  return (
    <ViewWrappers.View>
      <Form onSubmit={onSubmit} head={<>
        <h1>{t('first-product:head')}</h1>
        <p>{t('first-product:text')}</p>
      </>} body={<>
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
        <CategorySelect onSelected={onCategorySelect} />
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:sku')} name="sku" value={product.sku}/>
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:quantity')}  type="number" name="stock" value={product.stock}/>
        <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label={t('product-cru:photo')} name="_images" value={product._images}
                           helpText={t('product-cru:photoHelp')}/>
        </>} footer={<Button label={`${t('first-product:next')} →`}/>}
      />
    </ViewWrappers.View>
  )
};

export default FirstProduct
