import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import Form from '../Form/Form';
import Fields from '../Fields/Fields';
import CategorySelect from '../CategorySelect/CategorySelect';
import Button from '../Button/Button';
import useApi from '../../shared/api';
import { apiDataTransform, apiErrorTransform, } from '../../shared/apiDataTransform';


const ProductForm = ({ id, editId }) => {
  const history = useHistory();
  const { API } = useApi();
  const [t] = useTranslation('product-cru');
  const [product, setProduct] = useState({
    title: '',
    price_excl_tax: '',
    product_class: '',
    description: '',
    num_in_stock: '',
    partner_sku: '',
    categories: [],
    original: [],
  });

  const data = {
    ...product,
    slug: slugify(product.title),
    structure: 'standalone',
    stockrecords: [
      {
        partner: id,
        partner_sku: product.partner_sku,
        price_excl_tax: product.price_excl_tax,
        num_in_stock: product.num_in_stock,
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
          price_excl_tax: response.data.stockrecords[0].price_excl_tax,
          partner_sku: response.data.stockrecords[0].partner_sku,
          num_in_stock: response.data.stockrecords[0].num_in_stock,
          description: response.data.description,
          original: response.data.images && response.data.images[0].original,
        });
      };
      getCurrentProduct();
    }
  }, [id, editId, API]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (product.original.length && product.categories.length) {
      const formData = new FormData();
      Array.from(product.original).forEach(item => {
        formData.append('original', item);
      });

      if (editId) {
        try {
          await API.products.patch({ id: editId, data: apiDataTransform(data) });

          // Image Patch request needs update
          // await API.productImages.patch(
          //   response.data.id,
          //   formData,
          //   headers,
          // )
          history.push(`/stores/${id}`);
        } catch (e) {
          if (e.response && e.response.status === 400)
            setProduct((oldState) => apiErrorTransform(oldState, e.response.data))
        }
      } else {
        try {
          const response = await API.products.post(apiDataTransform({ data }));

          if (response.status === 201) {
            // images are separate because we need form data here
            await API.productImages.post(
              formData,
              response.data.id,
            )
            history.push(`/stores/${id}`);
          }
        } catch (e) {
          if (e.response && e.response.status === 400)
            setProduct((oldState) => apiErrorTransform(oldState, e.response.data))
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
    <Form onSubmit={onSubmit} errors={product.non_field_errors} body={<>
      {/*editId ?
        <Fields.FileUpload onChange={onChange} label={t('product-cru:photoEdit')} name="original" value={product.original}
                           helpText={t('product-cru:photoHelp')} editView/> : null*/}
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:name')} name="title" value={product.title}/>
      {!editId && (
        <CategorySelect onSelected={onCategorySelect} value={product.categories} />
      )}
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:price')} name="price_excl_tax" value={product.price_excl_tax}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:partner_sku')} name="partner_sku" value={product.partner_sku} readOnly={!!editId}/>
      <Fields.TextInput onChange={onChange} placeholder={t('product-cru:quantity')} type="number" name="num_in_stock" value={product.num_in_stock}/>
      <Fields.TextArea onChange={onChange} placeholder={t('product-cru:description')} name="description" value={product.description}/>
      {editId ? null :
        <Fields.FileUpload onChange={onChange} label={product.original.length ? t('product-cru:photoEdit') : t('product-cru:photo')} name="original" value={product.original}
                           helpText={t('product-cru:photoHelp')}/>}
    </>} footer={
      <Button label={`${t('product-cru:saveProduct')} →`} disabled={!product.categories.length}/>}
    />
  )
}

export default ProductForm;
