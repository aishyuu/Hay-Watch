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

// This loads the actual google maps
function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(zoom);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // To see the options that were put
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        radius={20}
        zoom={zoom}
        options = {defaultMapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        // Markers will be put here
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)