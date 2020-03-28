import React, { useState } from 'react'
import { GoogleMap, LoadScript, OverlayView, Marker } from '@react-google-maps/api'
import mapStyles from '../../utils/mapStyles.json'
import banner from '../../assets/info_banner.png'
import marker from '../../assets/marker.svg'
import Button from '../Button/Button';

const center = {
  lat: 47.672010,
  lng: 9.179327
}

const bakery = {
  lat: 47.673862,
  lng: 9.179261
}

const shop = {
  lat: 47.671899,
  lng: 9.179291
}

const Map = () => {
  const [showInfo, setShowInfo] = useState(false)
  const apiKey = 'AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc'

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerClassName="Map"
        zoom={16}
        center={center}
        options={{ styles: mapStyles }}
      >
        <Marker
          position={bakery}
          icon={{
            url: marker,
            labelOrigin: { x: 85, y: 14}
          }}
          label={{
            text: "Manfred's Bakery",
            fontWeight: 'bold',
            fontSize: '12px'
          }}
          onClick={() => setShowInfo(true)}
        />

        <Marker
          position={shop}
          icon={{
            url: marker,
            labelOrigin: { x: 70, y: 14}
          }}
          label={{
            text: "Jenny's Shop",
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        />

        <OverlayView
          position={center}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className={`Map-infoWrapper ${showInfo && 'Map-infoWrapper--visible'}`}>
            <img className="Map-infoImg" src={banner} alt="banner" />
            <div className="Map-info">
              <h1>Manfred's Bakery</h1>
              <p>Only the finest, hand sorted ingredients</p>
              <Button to="/page" label="Show Products & Info" />
            </div>
          </div>
        </OverlayView>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map