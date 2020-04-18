import React, { useState } from 'react'

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
    name: '',
    category: '',
    price: '',
    phone: '',
    description: '',
    photo: '',
  });

  const onNext = async () => {
    const response = await API.partners.patch(
      match.params.id,
      { headers: { 'Authorization': `Token ${token}` } },
    );
    if (response.status === 201) {
      //history.push(`/stores/${match.params.id}/onboarding`);
    } else {
      console.error(response);
    }
  };

  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  return (
    <ViewWrappers.View>
      <Form head={<>
        <h1>Finally, your first product!</h1>
        <p>You are close to getting your store online! Just one last step is
          needed. To create your first online product.</p>
      </>} body={<>
        <Fields.TextInput onChange={onChange} placeholder="Name of the product" name="name" value={product.name}/>
        <CategorySelect onSelected={(e) => setProduct({...product, category: e.slug || e})} />
        <Fields.TextInput onChange={onChange} placeholder="Price" name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder="Phone number" name="phone" value={product.phone}/>
        <Fields.TextArea onChange={onChange} placeholder="Description of your product" name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label="Upload photo" name="photo" value={product.photo}
                           helpText="JPEG .JPG .PNG (Just these file formats will work)"/>
      </>} footer={<Button onClick={onNext} label="Next →"/>}
      />
    </ViewWrappers.View>
  )
};

export default FirstProduct
