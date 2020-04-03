import React, { useState } from 'react';

import './Onboarding.scss';
import Button from "../components/Button/Button";
import SteppedForm from "../components/SteppedForm/SteppedForm";
import InlineInputs from "../components/InlineInputs/InlineInputs";
import Fields from "../components/Fields/Fields";

const Onboarding = (props) => {
  const match = props.match;
  const step = match.params.step;

  const [categories, setCategories] = useState([]);
  const categoriesAreSet = categories.some(e => !!e);

  const [product, setProduct] = useState({name: '', category: '', price: '', phone: '', description: '', photo: ''});
  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  const steps = [
    {
      head: (<>
        <h1>Create a category</h1>
        <p>First, let’s help your customers find the products they’re searching
          for by creating a category.</p>
      </>),
      footer: categoriesAreSet &&
        <Button label="Next" to={'/stores/1/onboarding/1'}/>,
      body: <InlineInputs addLabel="Add category" values={categories}
                          onAdd={() => setCategories([...categories, ""])}
                          onChange={(val, i) => setCategories(prev => {
                            prev[i] = val;
                            return prev.concat();
                          })}/>,
    },
    {
      head: (<>
        <h1>Finally, your first product!</h1>
        <p>You are close to getting your store online! Just one last step is
          needed. To create your first online product.</p>
      </>),
      footer: <Button label="Add Product" to={'/stores/1'}/>,
      body: <>
        <Fields.TextInput onChange={onChange} placeholder="Name of the product" name="name" value={product.name}/>
        <Fields.TextInput onChange={onChange} placeholder="Category" name="category" value={product.category}/>
        <Fields.TextInput onChange={onChange} placeholder="Price" name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder="Phone number" name="phone" value={product.phone}/>
        <Fields.TextArea onChange={onChange} placeholder="Description of your product" name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label="Upload photo" name="photo" value={product.photo}
                           helpText="JPEG .JPG .PNG (Just these file formats will work)"/>
      </>,
    },
  ];


  return (
    <div className={`Onboarding Onboarding--${step}`}>
      <SteppedForm {...steps[step]} />
    </div>
  );
};

export default Onboarding

