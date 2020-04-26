import React from 'react'
import checkmark from '../../assets/checkmark.svg'

import './PhotoSelector.scss'
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';

const PhotoSelector = ({ images, onSelected, photo }) => {
  const [t] = useTranslation('owner-photo-select');

  return (
    <div className="PhotoSelector">
      {images.map((image, i) =>
        <label
          key={i}
          className={`PhotoSelector-option
            ${photo === image && 'PhotoSelector-option--selected'}
          `}
        >
          <input
            className="PhotoSelector-radio"
            type="radio"
            value={i}
            checked={photo === image}
            onChange={() => onSelected(image)}
          />

          <img className="PhotoSelector-photo" src={`/photos/${image}`} alt={i} />

          {photo === image &&
            <img className="PhotoSelector-checkmark" src={checkmark} alt="checkmark" />
          }
        </label>
      )}
    </div>
  )
}

export default PhotoSelector
