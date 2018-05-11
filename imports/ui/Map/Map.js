import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    bootstrapURLKeys={{ key: 'AIzaSyAsJJY1LTeZ8txsmO0SLWiwVUzpudOghE0' }}
    defaultCenter={{ lat: 48.9067221, lng: 2.2622592 }}
    defaultZoom={12}
  />));

const MapWithKey = props => {
  return <Map
    googleMapURL={'https://maps.googleapis.com/maps/api/js'
      + '?v=3.exp&libraries=drawing'
      + '&key=AIzaSyAsJJY1LTeZ8txsmO0SLWiwVUzpudOghE0'}
    loadingElement={<div className="map-container" />}
    containerElement={<div className="map-container" />}
    mapElement={<div className="map-container" />}
  />
}

export default MapWithKey;
