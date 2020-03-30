import React from 'react'
import PhotoSelector from '../components/PhotoSelector/PhotoSelector'
import { businessImages, bakeryImages } from '../shared/businessImages'

import './PhotoSelect.scss'

const PhotoSelect = () => {
  const googleBusiness = false

  const getImages = () => {
    // here we make an api call to get images from the google business account.
    // if the user registered with email, use preloaded business images

    return googleBusiness ? bakeryImages : businessImages
  }

  return (
    <div className="PhotoSelect">
      <div className="Intro">
        <h1>Choose a photo</h1>
        <p>Choose a profile picture to represent your business on the first impression.</p>
      </div>

      <PhotoSelector images={getImages()} />
    </div>
  )
}

export default PhotoSelect