// JourneyPlanner.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Weather from './Weather';
import SuggestedRoutes from './SuggestedRoutes';

const JourneyPlanner = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const navigate = useNavigate();

  const formattedDepartureTime = departureTime ? `${departureTime}:00Z` : '';

  const requestBody = {
    origin: { address: startingPoint },
    destination: { address: destination },
    travelMode: "TRANSIT",
    departureTime: formattedDepartureTime,
    computeAlternativeRoutes: true,
    transitPreferences: {
      routingPreference: "LESS_WALKING",
      allowedTravelModes: ["BUS"]
    }
  };

  const handleSearch = async () => {
    try {
      setShowRoutes(true);

      const placeholderResults = [
        {
          id: "1",
          name: "T310",
          departure: { name: "Pusat Sejahtera", time: "2024-11-08T00:05:39Z" },
          stops: { number: 17 },
          arrival: { name: "Queensbay Mall", time: "2024-11-08T00:29:55Z" }
        },
        {
          id: "2",
          name: "T320",
          departure: { name: "Komtar", time: "2024-11-08T01:10:00Z" },
          stops: { number: 12 },
          arrival: { name: "Batu Ferringhi", time: "2024-11-08T01:40:00Z" }
        },
        {
          id: "3",
          name: "T330",
          departure: { name: "Jelutong", time: "2024-11-08T02:00:00Z" },
          stops: { number: 10 },
          arrival: { name: "Penang Hill", time: "2024-11-08T02:30:00Z" }
        }
      ];

      setResults(placeholderResults);

      /*
      const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'YOUR_API_KEY',
          'X-Goog-FieldMask': 'routes.legs.steps.transitDetails'
        }
      });
      setResults(response.data.routes);
      */
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md text-white h-full flex flex-col">
      <div className="mb-4">
        <input
          type="text"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
          placeholder="Choose starting point"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
          placeholder="Choose destination"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search
      </button>

      {showRoutes && (
        <div className="mt-4 overflow-y-auto h-[calc(100vh-300px)]"> {/* Limit height and enable scrolling */}
          <SuggestedRoutes routes={results} />
        </div>
      )}
    </div>
  );
};

export default JourneyPlanner;
