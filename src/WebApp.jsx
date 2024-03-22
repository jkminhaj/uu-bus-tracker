import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// import customIconUrl from './custom-icon.png'; // Import your custom icon image

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

      // Custom marker icon
      const customIcon = L.icon({
        iconUrl: "https://z-p3-scontent.fdac12-1.fna.fbcdn.net/v/t39.30808-1/428690369_703619118640900_7428981901892590195_n.jpg?stp=c17.0.200.200a_dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHubv9B76YRGJzyB0DpqtHf_i763wYHwQf-LvrfBgfBB8vXcKUMmtEyauJv0a365ACFhAoZzXudJex67j-t19fE&_nc_ohc=rpdBzKtsn_oAX9BbhFA&_nc_ht=z-p3-scontent.fdac12-1.fna&oh=00_AfAJM2K1WzmoRKKKB4dFUCfyEd03B0-wuqZLikhjPwJz0w&oe=6602931B", // Path to your custom icon image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
      });

      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(newMap);
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
