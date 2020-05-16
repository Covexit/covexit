import React from 'react'
import './ButtonWithImage.scss'

function ButtonWithImage ({ label, icon, labelStyles, onClick }) {
  return (
    <div
      onClick={onClick}
      className="Button-with-image">
      {icon}
      <p
        style={{
          ...labelStyles
        }}
        className="Button-with-image-label">
        {label}
      </p>
    </div>
  )
}

export default ButtonWithImage
