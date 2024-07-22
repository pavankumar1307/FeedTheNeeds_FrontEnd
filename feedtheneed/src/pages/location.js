
// export default Location;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: 0, lng: 0 };

function Location() {
  const [locationLink, setLocationLink] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [markedLocation, setMarkedLocation] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    handleGetLocationLink();
  }, []); // Fetch location link on component mount

  const handleGetLocationLink = () => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentLocation({ lat: latitude, lng: longitude });

          try {
            const response = await axios.post('http://localhost:2003/Location', {
              latitude,
              longitude,
              apiKey: 'AIzaSyBk8JKEJNIi1v67GOJc5FS5UEXaOpQ7MWA', // Replace with your API key
            });

            setLocationLink(response.data.link);
          } catch (error) {
            console.error('Error sending location to the server:', error.message);
          }

          // If you only need the location once, uncomment the line below to stop watching
          // navigator.geolocation.clearWatch(watchId);
        },
        (error) => {
          console.error('Error getting current position:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  const handleSendLocation = async () => {
    try {
      const response = await axios.post('http://localhost:2003/Location', {
        latitude,
        longitude,
        apiKey: 'AIzaSyBk8JKEJNIi1v67GOJc5FS5UEXaOpQ7MWA', // Replace with your API key
      });

      setLocationLink(response.data.link);
    } catch (error) {
      console.error('Error getting location link:', error.message);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setLatitude(latitude);
    setLongitude(longitude);
    setMarkedLocation({ lat: latitude, lng: longitude });
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatitude(latitude)
      setLongitude(longitude)
      handleSendLocation();
      // setCurrentLocation({ lat: latitude, lng: longitude });
      // setMarkedLocation(null);
    });
  };

  return (
    <div>
      <h1>Live Location</h1>
      <LoadScript googleMapsApiKey="AIzaSyCvh1ujpwIHIqLDHNRNytYUxF-D6Hbzec4"> {/* Replace with your API key */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          onClick={handleMapClick}
        >
          {markedLocation && <Marker position={markedLocation} />}
          <Marker position={currentLocation} />
        </GoogleMap>
      </LoadScript>
      <button onClick={handleGetLocationLink}>Get Live Location Link</button>
      <button onClick={handleGetCurrentLocation}>Show Current Location</button>
      <button onClick={handleSendLocation}>Send Location</button>
      {locationLink && (
        <div>
          <p>Live Location Link:</p>
          <a href={locationLink} target="_blank" rel="noopener noreferrer">
            {locationLink}
          </a>
        </div>
      )}
    </div>
  );
}



export default Location;
