import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ date }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`YOUR_WEATHER_API_URL?date=${date}`);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    if (date) {
      fetchWeather();
    }
  }, [date]);

  return (
    <div>
      <h3>Weather Forecast for your journey</h3>
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
