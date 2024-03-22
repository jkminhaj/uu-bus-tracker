import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import customIconUrl from './assets/marker.png'; // Import your custom icon image

function WebApp() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [marker, setMarker] = useState(null);

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
    
    if (!map) {
      // Initialize map if not already initialized
      const newMap = L.map('map').setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(newMap);
      
      // Create custom icon
      const customIcon = L.icon({
        iconUrl: customIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Create marker
      const newMarker = L.marker([latitude, longitude], { icon: customIcon }).addTo(newMap);
      setMarker(newMarker);

      setMap(newMap);
      setLocation(newLocation);
    } else {
      setPreviousLocation(location);
      setLocation(newLocation);
    }
  }

  useEffect(() => {
    if (previousLocation && location && map) {
      const startTime = Date.now();
      const duration = 1000; // Transition duration in milliseconds

      function animateMarker(timestamp) {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure progress does not exceed 1
        const interpolatedLat = previousLocation.latitude + (location.latitude - previousLocation.latitude) * progress;
        const interpolatedLng = previousLocation.longitude + (location.longitude - previousLocation.longitude) * progress;
        const interpolatedLatLng = [interpolatedLat, interpolatedLng];

        marker.setLatLng(interpolatedLatLng); // Update marker position

        if (progress < 1) {
          requestAnimationFrame(animateMarker);
        }
      }

      requestAnimationFrame(animateMarker);
    }
  }, [previousLocation, location, map, marker]);

  function showError(error) {
    switch (error.code) {
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
