import React from 'react'
import './ButtonWithImage.scss'

function ButtonWithImage ({ label, icon, labelStyles, onClick }) {
  return (
    <button
      onClick={onClick}
      className="Button-with-image">
      {icon}
      <div
        style={{
          ...labelStyles
        }}
        className="Button-with-image-label">
        {label}
      </div>
    </button>
  )
}

export default ButtonWithImage
