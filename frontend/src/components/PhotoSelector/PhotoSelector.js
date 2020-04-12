import React  from 'react'
import checkmark from '../../assets/checkmark.svg'

import './PhotoSelector.scss'

const PhotoSelector = ({ images, selectedName, onSelected, photo }) => {

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

      <div
        className={`PhotoSelector-nextBtn
          ${!photo && 'PhotoSelector-nextBtn--disabled'}
        `}
      >
        {/* TODO: add upload image */}
      </div>
    </div>
  )
}

export default PhotoSelector
