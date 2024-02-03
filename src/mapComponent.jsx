import React, {useState} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapStylings from "./data/mapStylings.json"
import restaurantData from "./data/data.json"
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

console.log(restaurantData)

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
  const [open, setOpen] = useState(-1)

  const onOpenModal = (id) => {
    setOpen(id);
    console.log(id)
  }
  const onCloseModal = () => {
    setOpen(-1)
    // const test = document.querySelector(".react-responsive-modal-root")
    // test.parentNode.remove()
};

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
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
        {restaurantData.map(restaurant => (
            <div>
            <Marker 
                position={restaurant.location}
                onClick={() => onOpenModal(restaurant.id)}
                key = {restaurant.id}
            >
                    <Modal open={open == restaurant.id} onClose={onCloseModal}>
                        <div className='modal-text'>
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.description}</p>
                            <h3>Hours</h3>
                            {restaurant.time.split(",").map((indiv) => {
                                const timeSplit = indiv.split("-")
                                if(timeSplit[1] == "00:00" && timeSplit[2] == "00:00") {
                                    return(<p>{timeSplit[0]}: Closed</p>)
                                } else {
                                    return(<p>{timeSplit[0]}: {timeSplit[1]}am - {parseInt(timeSplit[2])-12}:00pm</p>)
                                }
                            })}
                        </div>
                    </Modal>
            </Marker>          
            </div>
        ))}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)