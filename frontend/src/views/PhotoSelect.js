import React from 'react'
import PhotoSelector from '../components/PhotoSelector/PhotoSelector'
import { businessImages, bakeryImages } from '../shared/businessImages'

import './PhotoSelect.scss'
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import Button from '../components/Button/Button';


const PhotoSelect = () => {
  const googleBusiness = false

  const getImages = () => {
    // here we make an api call to get images from the google business account.
    // if the user registered with email, use preloaded business images

    return googleBusiness ? bakeryImages : businessImages
  }

  const footer = <Button to="/" label="Next →" />;

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
          <PhotoSelector images={getImages()}/>
        </ViewWrappers.ViewSplitter>
        {!isBigScreen && <div className="ViewSplitter-footer">{footer}</div>}
      </>
    )} />
  )
};

export default PhotoSelect
