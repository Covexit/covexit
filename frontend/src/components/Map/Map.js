import React, { useState, useEffect } from 'react'
import { GoogleMap, OverlayView, Marker, useLoadScript, } from '@react-google-maps/api'
import mapStyles from '../../shared/mapStyles.json'
import banner from '../../assets/info_banner.png'
import marker from '../../assets/marker.svg'
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useLocationContext } from '../../context/useCurrentLocation';
import useApi from '../../shared/api';
import ClickOut from '../ClickOut/ClickOut'
import { useStoreListContext } from 'context/StoreListContext.js'

const Map = () => {
  const [t] = useTranslation();
  const [locations, setLocations] = useState([]);
  const { API } = useApi();
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    description: "",
    id: 0,
    latitude: "",
    longitude: ""
  });
  const [showOverlay, setShowOverlay] = useState(false)
  const [isSelfHovered, setIsSelfHovered] = useState(false)
  const [centerZoom, setCenterZoom] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc"
  });

  const { setCurrentLocation, coordinates: [lng,lat] } = useLocationContext()
  const { store, setHoveredStore } = useStoreListContext()

  useEffect(() => {
    if (store && !isSelfHovered) {
      setCenterZoom({
        lng: parseFloat(store.addresses[0].longitude),
        lat: parseFloat(store.addresses[0].latitude)
      })
    }
  }, [store, isSelfHovered])

  const mountOnce = () => {
    setCurrentLocation();
    const getLocations = async () => {
      const response = await API.partners.get();
      setLocations(response.data);
    };
    getLocations();
  };

  useEffect(mountOnce, []);

  const handleMarkerClick = location => {
    const { id, description, name, addresses } = location
    setSelectedLocation({
      id,
      description,
      name,
      latitude: addresses[0].latitude,
      longitude: addresses[0].longitude
    })

    if (store) {
      setCenterZoom({
        lng: parseFloat(store.addresses[0].longitude),
        lat: parseFloat(store.addresses[0].latitude)
      })
    }

    setShowOverlay(true)
  }

  if (loadError) {
    return <div>{t('cantLoadMap')}</div>
  }

  const isHovered = storeLocation => {
    if (storeLocation && store) {
      return storeLocation.id === store.id ? true : false
    }
  }

  const handleSelfHovering = store => {
    store ? setIsSelfHovered(true) : setIsSelfHovered(false)
    setHoveredStore && setHoveredStore(store)
  }

  const mapJsx = <GoogleMap
    mapContainerClassName="Map"
    zoom={lng === 10.205347 ? 6 : 12}
    center={centerZoom || {lng, lat}}
    options={{ styles: mapStyles, gestureHandling: 'greedy' }}
  >
    {locations.map( loc => {
      return <Marker
        key={loc.id}
        position={{ lat: parseFloat(loc.addresses[0].latitude), lng: parseFloat(loc.addresses[0].longitude) }}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        animation={(isHovered(loc) && !isSelfHovered) ? 1 : null}
        label={{
          text: loc.name,
          fontWeight: 'bold',
          fontSize: `${(isHovered(loc) && !isSelfHovered) ? '18px' : '14px'}`,
        }}
        onClick={() => handleMarkerClick(loc)}
        onMouseOver={() => handleSelfHovering(loc)}
        onMouseOut={() => handleSelfHovering(null)}
      />
      }
    )}

    {showOverlay && <OverlayView
      position={{lng: selectedLocation.longitude, lat: selectedLocation.latitude}}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <ClickOut onClickOut={() => setShowOverlay(false)}>
        <div className='Map-infoWrapper Map-infoWrapper--visible'>
          <img className="Map-infoImg" src={banner} alt="banner"/>
          <div className="Map-info">
            <h2>{selectedLocation.name}</h2>
            <p>{selectedLocation.description}</p>
            <Button to={`/stores/${selectedLocation.id}`} label={t('goToStoreButton')} type="small"/>
          </div>
        </div>
      </ClickOut>
    </OverlayView>}
  </GoogleMap>;


  return isLoaded && mapJsx;
};

export default Map
