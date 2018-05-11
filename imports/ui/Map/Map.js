import React, { Component } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from 'react-google-maps';

const defaultLoc = { lat: 48.9067221, lng: 2.2622592 };

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    bootstrapURLKeys={{ key: 'AIzaSyAsJJY1LTeZ8txsmO0SLWiwVUzpudOghE0' }}
    defaultCenter={defaultLoc}
    defaultZoom={12}
    center={props.markerPos || defaultLoc}
  >
    {props.markerPos &&
      <Marker position={props.markerPos} />
    }
  </GoogleMap>
));

const MapWithKey = props => {
  return <Map
    googleMapURL={'https://maps.googleapis.com/maps/api/js'
      + '?v=3.exp&libraries=drawing'
      + '&key=AIzaSyAsJJY1LTeZ8txsmO0SLWiwVUzpudOghE0'}
    loadingElement={<div className="map-container" />}
    containerElement={<div className="map-container" />}
    mapElement={<div className="map-container" />}
    {...props}
  />
}

export default MapWithKey;
