import React, { useState } from 'react';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import Fields from '../components/Fields/Fields';
import Form from '../components/Form/Form';
import Button from '../components/Button/Button';

import './ProductCreateEdit.scss';


const ProductCreateEdit = ({ match }) => {
  const editId = match.params.id;
  const [product, setProduct] = useState({
    name: '', category: '', price: '', phone: '', description: '',
    photo: editId ? '/public/photos/business_clothes.jpg' : ''
  });

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  const onClick = () => {
    // PUT or PATCH to API
  }

  return <ViewWrappers.View className="ProductCreateEdit">
    <Form head={
      editId ? null : <h1>Add a new product</h1>
    } body={<>
      {editId ? <Fields.FileUpload onChange={onChange} label="Upload photo" name="photo" value={product.photo}
                   helpText="JPEG .JPG .PNG (Just these file formats will work)" editView/> : null}
      <div className="ProductCreateEdit-wrap">
        <Fields.TextInput onChange={onChange} placeholder="Name of the product" name="name" value={product.name}/>
        <Fields.TextInput onChange={onChange} placeholder="Category" name="category" value={product.category}/>
        <Fields.TextInput onChange={onChange} placeholder="Price" name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder="Phone number" name="phone" value={product.phone}/>
        <Fields.TextArea onChange={onChange} placeholder="Description of your product" name="description" value={product.description}/>
        {editId ? null : <Fields.FileUpload onChange={onChange} label="Upload photo" name="photo" value={product.photo}
                           helpText="JPEG .JPG .PNG (Just these file formats will work)"/>}
      </div>
    </>
    } footer={<Button label={editId ? 'Save product' : 'Add product'} onClick={onClick} />}/>
</ViewWrappers.View>;
};

export default ProductCreateEdit

