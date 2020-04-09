import React  from 'react'
import checkmark from '../../assets/checkmark.svg'

import './PhotoSelector.scss'
import { useTranslation } from 'react-i18next';

const PhotoSelector = ({ images, selectedName, onSelected, photo }) => {
  const [t] = useTranslation('owner-photo-select');
  const [selectedPhoto, setSelectedPhoto] = useState(false);

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
        <Button to="/" label={`${t('continueButton')}  →`} />
      </div>
    </div>
  )
}

export default PhotoSelector
