import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JourneyPlanner = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bus-schedules?from=${startingPoint}&to=${destination}`);
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
    <div className="p-4 bg-gray-800 rounded-md text-white">
      <div className="mb-4">
        <input
          type="text"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
          placeholder="Choose starting point"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
          placeholder="Choose destination"
        />
      </div>

      <button onClick={handleSearch} className="btn btn-primary bg-blue-500 text-white p-2 rounded-md">
        Search
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl text-white">Available Buses</h2>
          <ul>
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => navigate(`/tracking/${result.id}`)}
                className="cursor-pointer hover:bg-gray-200 p-2 text-black rounded-md mb-2"
              >
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
