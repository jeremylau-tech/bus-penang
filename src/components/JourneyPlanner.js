// JourneyPlanner.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Weather from './Weather';
import SuggestedRoutes from './SuggestedRoutes';

const JourneyPlanner = () => {
  const [weather, setWeather] = useState(null); // state for storing weather data
  const [startingPoint, setStartingPoint] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const navigate = useNavigate();

  const formattedDepartureTime = departureTime ? `${departureTime}:00Z` : '';

  const fetchWeather = async () => {
    if (!startingPoint || !departureTime) return;

    const apiKey = '844b455ef1106a8b3ae4911e3f12709f';
    console.log("YOYO:" + startingPoint);
    console.log("YOYO:" + departureTime);
    const date = new Date(departureTime);
    const timestamp = Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
    console.log(timestamp);
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=4.2105&lon=101.9758&dt=${timestamp}&appid=${apiKey}`;
    // const weatherUrl = `https://api.openweathermap.org/data/3.0/timemachine?lat=4.2105&lon=101.9758&dt=${timestamp}&appid=${apiKey}&units=metric`;
    console.log("YOYO:" + weatherUrl)

    axios.get(weatherUrl)
      .then(response => {
        const currentWeather = response.data.data[0]; // Access the first item in the data array

        // Extract relevant data
        const weatherDescription = currentWeather.weather[0].description;
        const weatherIcon = currentWeather.weather[0].icon;
        const temperature = currentWeather.temp - 273.15; // Convert Kelvin to Celsius
        const humidity = currentWeather.humidity;
        const windSpeed = currentWeather.wind_speed;

        // Log the data to the console
        console.log("Weather Description:", weatherDescription);
        console.log("Weather Icon:", weatherIcon);
        console.log("Temperature:", temperature); // Now in Celsius
        console.log("Humidity:", humidity);
        console.log("Wind Speed:", windSpeed);

        // Update state with the fetched weather data
        setWeather({
          description: weatherDescription,
          icon: weatherIcon,
          temperature: temperature, // Celsius temperature
          humidity: humidity,
          windSpeed: windSpeed,
        });
      })

      .catch(error => {
        console.error("Error fetching weather data:", error);
      });


  };


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
      setWeather(null); // Reset weather before new search
      fetchWeather(); // Fetch weather after search

      await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'AIzaSyC1a3VDKXzUloohjWfOgln8dpmHPXFXm50',
          'X-Goog-FieldMask': 'routes.legs.steps.transitDetails'
        }
      })
        .then(response => {
          // Assuming 'response' is the API response object returned by axios
          const data = response.data;

          // Extract arrival, departure, and intermediate stops
          var extractedStops = data.routes.map(route => {
            return route.legs.map(leg => {
              const stops = [];
              let index = 0;
              leg.steps.forEach(step => {
                if (step.transitDetails) {
                  // Add the departure stop
                  stops.push({
                    id: (index++),
                    name: step.transitDetails.transitLine.name,
                    departure: { name: step.transitDetails.stopDetails.departureStop.name, time: step.transitDetails.stopDetails.departureTime },
                    stops: { number: step.transitDetails.stopCount },
                    arrival: { name: step.transitDetails.stopDetails.arrivalStop.name, time: step.transitDetails.stopDetails.arrivalTime }
                  });
                }
              });

              return stops;
            });
          });

          // Log the extracted stops
          console.log(JSON.stringify(extractedStops.flat(Infinity), null, 2));
          //console.log('Route response:', response.data);
          setResults(extractedStops.flat(Infinity));
        })
        .catch(error => {
          console.error('Error fetching route:', error);
        });


    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md text-white h-full flex flex-col">
      <div className="mb-4">
        <label htmlFor="starting-point" className="block text-sm mb-2">Choose Starting Point</label>
        <select
          id="starting-point"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
        >
          <option value="">Select Starting Point</option>
          <option value="School of Physics, Gelugor, Penang">School of Physics, Gelugor, Penang</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-sm mb-2">Choose Destination</label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md outline-none"
        >
          <option value="">Select Destination</option>
          <option value="Queensbay Mall, 100, Persiaran Bayan Indah, 11900 Bayan Lepas, Penang">Queensbay Mall, 100, Persiaran Bayan Indah, 11900 Bayan Lepas, Penang</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="departure-time" className="block text-sm mb-2 ">Choose Departure Time</label>
        <input
          type="datetime-local"
          id="departure-time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="input input-bordered  w-full p-2 bg-gray-700 text-white rounded-md outline-none text-lg"
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary bg-blue-500 text-white p-2 rounded-md">
        Search
      </button>
      {weather && (
        <div className="mt-4 text-white">
          <h3>Weather at {startingPoint}:</h3>
          <p><strong>Condition:</strong> {weather.description}</p>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
            className="w-16 h-16"
          />
        </div>
      )}



      {showRoutes && (
        <SuggestedRoutes routes={results} />
      )}
    </div >
  );
};

export default JourneyPlanner;
