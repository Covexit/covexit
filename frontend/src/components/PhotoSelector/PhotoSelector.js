import React, { useState } from 'react'
import checkmark from '../../assets/checkmark.svg'

import './PhotoSelector.scss'

const PhotoSelector = ({ images }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(false)

  return (
    <div className="PhotoSelector">
      {images.map((image, i) =>
        <label
          key={i}
          className={`PhotoSelector-option
            ${selectedPhoto === i && 'PhotoSelector-option--selected'}
          `}
        >
          <input
            className="PhotoSelector-radio"
            type="radio"
            value={i}
            checked={selectedPhoto === i}
            onChange={e => setSelectedPhoto(parseInt(e.target.value))}
          />

          <img className="PhotoSelector-photo" src={image} alt={i} />

          {selectedPhoto === i &&
            <img className="PhotoSelector-checkmark" src={checkmark} alt="checkmark" />
          }
        </label>
      )}

      <div
        className={`PhotoSelector-nextBtn
          ${!selectedPhoto && 'PhotoSelector-nextBtn--disabled'}
        `}
      >
        {/* TODO: add upload image */}
      </div>
    </div>
  )
}

export default PhotoSelector
