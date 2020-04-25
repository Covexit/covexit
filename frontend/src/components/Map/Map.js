import React, { useState, useEffect } from 'react'
import { GoogleMap, OverlayView, Marker, useLoadScript, } from '@react-google-maps/api'
import mapStyles from '../../shared/mapStyles.json'
import banner from '../../assets/info_banner.png'
import marker from '../../assets/marker.svg'
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useLocationContext } from '../../context/useCurrentLocation';
import axios from 'axios'


const Map = () => {
  const [t] = useTranslation();
  const [locations, setLocations] = useState([])

  const [selectedLocation, setSelect] = useState({
    title: "",
    description: "",
    id: 0,
    showInfo: false
  })

  const [showInfo, setShowInfo] = useState(false)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc"
  })

  const { setCurrentLocation, coordinates: [lng, lat] } = useLocationContext()

  const mountOnce = () => {
    setCurrentLocation();
    const getLocations = async () => {
      let stores = []
      const response = await axios('http://localhost:8000/api/v1/admin/partners/')
      console.log(response.data);
      response.data.map(store => {
        stores.push({
          id: store.id,
          text: store.name,
          labelOrigin: { x: 70, y: 14 },
          location: { lat: Number(store.addresses[0].latitude), lng: Number(store.addresses[0].longitude) },
          description: store.description
        })
      })
      console.log(stores);
      setLocations(stores);

    }
    getLocations();
    const unmount = () => console.log('unmounted');
    return unmount
  }

  useEffect(mountOnce, []);

  if (loadError) {
    return <div>{t('cantLoadMap')}</div>
  }

  const mapJsx = <GoogleMap
    mapContainerClassName="Map"
    zoom={16}
    center={{lng, lat}}
    options={{ styles: mapStyles }}
  >
    {locations.map( loc =>
      <Marker
        key={loc.text}
        position={loc.location}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        label={{
          text: loc.text,
          fontWeight: 'bold',
          fontSize: '12px',
        }}
        onClick={() => setSelect({
          id: loc.id,
          description: loc.description,
          title: loc.text,
          showInfo: !showInfo
        })  /* setShowInfo(!showInfo) */}
      />
    )}

    <OverlayView
      position={{lng, lat}}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className={`Map-infoWrapper ${selectedLocation.showInfo && 'Map-infoWrapper--visible'}`}>
        <img className="Map-infoImg" src={banner} alt="banner"/>
        <div className="Map-info">
          <h2>{selectedLocation.title}</h2>
          <p>{selectedLocation.description}</p>
          <Button to={`/stores/${selectedLocation.id}`} label={t('goToStoreButton')}/>
        </div>
      </div>
    </OverlayView>
  </GoogleMap>;


  return isLoaded && mapJsx;
};

export default Map
