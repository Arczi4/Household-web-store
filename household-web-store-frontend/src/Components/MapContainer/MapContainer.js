import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };
  
    return (
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 51.111330, lng: 17.059298 }}
      >
        <Marker position={{ lat: 51.111330, lng: 17.059298 }} />
      </Map>
    );
  };
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAFSFvcVZWmMQDFbGpiAJfOP8vLpHbj2dQ',
  })(MapContainer);
