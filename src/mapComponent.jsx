import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import mapStylings from "./data/mapStylings.json"

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const defaultMapOptions = {
    styles: mapStylings
}

const center = {
  lat: 34.057919,
  lng: -117.821342
};

const zoom = 16

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(zoom);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{streetViewControl: false}}
        center={center}
        radius={20}
        zoom={zoom}
        options = {defaultMapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)