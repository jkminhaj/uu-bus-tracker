import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function WebApp() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const newLocation = { latitude, longitude };
    setLocation(newLocation);

    if (!map) {
      // Initialize map if not already initialized
      const newMap = L.map('map').setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(newMap);
      const marker = L.marker([latitude, longitude]).addTo(newMap);
      setMap({ map: newMap, marker });
    } else {
      // Update map center and marker position
      map.map.setView([latitude, longitude], 13);
      map.marker.setLatLng([latitude, longitude]);
    }
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  if(location){
    console.log(location.latitude)
  }

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WebApp;
