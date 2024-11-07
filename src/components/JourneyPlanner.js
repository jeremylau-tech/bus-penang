import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  // Update to useNavigate

const JourneyPlanner = () => {
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); 

  const handleSearch = async () => {
    // API call to get bus schedules
    try {
      const response = await axios.get(`http://localhost:5000/bus-schedules?from=${destination}&to=${departureTime}`);

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching bus schedules", error);
    }
  };

  const handleSelectJourney = (journeyId) => {
    // history.push(`/tracking/${journeyId}`);
    navigate(`/tracking/${journeyId}`);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter destination"
        />
      </div>
      <div className="mb-4">
        <input
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary">Search</button>

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl">Available Buses</h2>
          <ul>
            {results.map((result) => (
              <li key={result.id} onClick={() => handleSelectJourney(result.id)} className="cursor-pointer hover:bg-gray-200 p-2">
                <div>Bus {result.busNumber}</div>
                <div>Departure: {result.departureTime}</div>
                <div>ETA: {result.eta}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JourneyPlanner;
