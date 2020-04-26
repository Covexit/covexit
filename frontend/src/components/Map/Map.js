import React, { useState, useEffect } from 'react'
import { GoogleMap, OverlayView, Marker, useLoadScript, } from '@react-google-maps/api'
import mapStyles from '../../shared/mapStyles.json'
import banner from '../../assets/info_banner.png'
import marker from '../../assets/marker.svg'
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useLocationContext } from '../../context/useCurrentLocation';
import API from '../../shared/api';


const Map = () => {
  const [t] = useTranslation();
  const [locations, setLocations] = useState([]);

  const [selectedLocation, setSelect] = useState({
    title: "",
    description: "",
    id: 0,
    showInfo: false
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc"
  });

  const { setCurrentLocation, coordinates: [lng,lat] } = useLocationContext()
  console.log(lng,lat);
  const mountOnce = () => {
    setCurrentLocation();
    const getLocations = async () => {
      const response = await API.partners.get();

      setLocations(response.data);
    };
    getLocations();
  };

  useEffect(mountOnce, []);

  if (loadError) {
    return <div>{t('cantLoadMap')}</div>
  }

  const mapJsx = <GoogleMap
    mapContainerClassName="Map"
    zoom={lng === 10.205347 ? 6 : 12}
    center={{lng: parseFloat(lng), lat: parseFloat(lat) }}
    options={{ styles: mapStyles }}
  >
    {locations.map( loc =>
      <Marker
        key={loc.id}
        position={{lat: parseFloat(loc.addresses[0].latitude), lng: parseFloat(loc.addresses[0].longitude)}}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        label={{
          text: loc.name,
          fontWeight: 'bold',
          fontSize: '12px',
        }}
        onClick={() => setSelect({
          id: loc.id,
          description: loc.description,
          title: loc.text,
          showInfo: !loc.showInfo
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
