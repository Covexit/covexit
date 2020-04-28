import React, { useState } from 'react'
import slugify from 'slugify';

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import Button from 'components/Button/Button';
import API from '../shared/api';
import { useUserContext } from '../context/UserContext';
import Form from '../components/Form/Form';
import Fields from '../components/Fields/Fields';
import { useTranslation } from 'react-i18next';
import CategorySelect from '../components/CategorySelect/CategorySelect';


const ProductCreateEdit = ({ match }) => {
  const { token } = useUserContext();
  const editId = match.params.id;
  const [t] = useTranslation(['first-product', 'product-cru']);
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    product_class: '',
    description: '',
    photo: editId ? '/public/photos/business_clothes.jpg' : '',
    categories: [],
    _images: [],
  });

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    const response = await API.products.post({
      data: {
        ...product,
        slug: slugify(product.title),
        structure: 'standalone'
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

  return (
    <ViewWrappers.View>
      <Form onSubmit={onSubmit} head={<>
        <h1>{t('first-product:next')}</h1>
      </>} body={<>
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
        <CategorySelect onSelected={onCategorySelect} />
        <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price" value={product.price}/>
        <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label={t('product-cru:photo')} name="_images" value={product._images}
                           helpText={t('product-cru:photoHelp')}/>
        </>} footer={<Button label={`${t('first-product:next')} →`}/>}
      />
    </ViewWrappers.View>
  )
};

export default ProductCreateEdit
