import React, { useState } from 'react'
import slugify from 'slugify';

import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import Button from 'components/Button/Button';
import API from '../../shared/api';
import { useUserContext } from '../../context/UserContext';
import Form from '../../components/Form/Form';
import Fields from '../../components/Fields/Fields';
import CategorySelect from '../../components/CategorySelect/CategorySelect';


const FirstProduct = ({ match }) => {
  const { token } = useUserContext();
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    product_class: '',
    description: '',
    stock: '',
    sku: '',
    categories: [],
    image: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await API.products.post(
      {
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
      { headers: { 'Authorization': `Token ${token}` } },
    );
    if (response.status === 200) {
      console.log(response);
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
        <h1>Finally, your first product!</h1>
        <p>You are close to getting your store online! Just one last step is
          needed. To create your first online product.</p>
      </>} body={<>
        <Fields.TextInput onChange={onChange} placeholder="Name of the product" name="title" value={product.title}/>
        <CategorySelect onSelected={onCategorySelect} />
        <Fields.TextInput onChange={onChange} placeholder="Netto Price" name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder="SKU" name="sku" value={product.sku}/>
        <Fields.TextInput onChange={onChange} placeholder="In stock"  type="number" name="stock" value={product.stock}/>
        <Fields.TextArea onChange={onChange} placeholder="Description of your product" name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label="Upload image" name="image" value={product.image}
                           helpText="JPEG .JPG .PNG (Just these file formats will work)"/>
      </>} footer={<Button label="Next →"/>}
      />
    </ViewWrappers.View>
  )
};

export default FirstProduct
