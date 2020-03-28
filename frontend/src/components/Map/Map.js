import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({text}) => <div>{text}</div>

const Map = () => {
  const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 })
  const [zoom, setZoom] = useState(11)

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker
          lat={11.0168}
          lng={76.9558}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map