import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

const LiveTracking = ({ match }) => {
  const { busId } = match.params;
  const [busData, setBusData] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    // Fetch live tracking data from your API
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bus-live-tracking/${busId}`);
        setBusData(response.data);
      } catch (error) {
        console.error("Error fetching live tracking data", error);
      }
    };

    fetchBusData();
  }, [busId]);

  const center = busData ? { lat: busData.latitude, lng: busData.longitude } : { lat: 0, lng: 0 };

  return (
    <div className="p-4">
      <h2>Live Bus Tracking</h2>
      {busData && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerClassName="w-full h-96"
          >
            <Marker position={center} />
            {/* Optionally, show directions */}
            {busData.route && (
              <DirectionsService
                options={{
                  origin: busData.origin,
                  destination: busData.destination,
                  travelMode: 'DRIVING',
                }}
                callback={(response) => {
                  if (response.status === 'OK') {
                    setDirections(response);
                  }
                }}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default LiveTracking;
