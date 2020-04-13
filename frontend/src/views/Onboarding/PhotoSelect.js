import React, { useState } from 'react'
import PhotoSelector from 'components/PhotoSelector/PhotoSelector'
import { bakeryImages } from 'shared/businessImages'

import './PhotoSelect.scss'
import ViewWrappers from 'components/ViewWrappers/ViewWrappers';
import Button from 'components/Button/Button';
import API from '../../shared/api';
import { useUserContext } from '../../context/UserContext';


const PhotoSelect = ({ match, history }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const { user } = useUserContext();
  const googleBusiness = false;

  const getImages = () => {
    // here we make an api call to get images from the google business account.
    // if the user registered with email, use preloaded business images

    return googleBusiness ? bakeryImages : [
      'business_books.jpg',
      'business_clothes.jpg',
      'business_coffee.jpg',
      'business_drugstore.jpg',
      'business_electronics.jpg',
      'business_garden.jpg',
      'business_jewellry.jpg',
      'business_living.jpg',
      'business_other.jpg',
      'business_toys.jpg',
    ];
  };
  const onNext = async () => {
    const response = await API.partners.patch(
      match.params.id,
      { image: selectedPhoto },
      { headers: {'Authorization': `Token ${user.token}`}}
      );
    if (response.status === 201) {
      //history.push(`/stores/${response.data.id}/onboarding`);
    } else {
      console.error(response);
    }
  }
  const footer = selectedPhoto && <Button onClick={onNext} label="Next →" />;

  return (
    <ViewWrappers.MobileView renderFn={isBigScreen => (
      <>
        <ViewWrappers.ViewSplitter className="PhotoSelect" withPadding>
          <div className="Intro">
            <h1>Choose a photo</h1>
            <p>Choose a profile picture to represent your business on the first
              impression.</p>
          </div>
          {isBigScreen && footer}
        </ViewWrappers.ViewSplitter>
        <ViewWrappers.ViewSplitter>
          <PhotoSelector images={getImages()} onSelected={(photo) => setSelectedPhoto(photo)} photo={selectedPhoto}/>
        </ViewWrappers.ViewSplitter>
        {!isBigScreen && <div className="ViewSplitter-footer">{footer}</div>}
      </>
    )} />
  )
};

export default PhotoSelect
