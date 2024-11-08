import React from 'react';
import RouteCard from './RouteCard';

const SuggestedRoutes = ({ routes, weather }) => {
    return (
        <div className="w-full mt-4 rounded-lg">
            <div className="bg-gray-700 p-4 w-full">
                <h3 className="text-xl font-semibold text-gray-200">Suggested Routes</h3>

                {weather && (
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p><strong>Condition:</strong> {weather.description}</p>
                                <p><strong>Temperature:</strong> {Math.round(weather.temperature * 10) / 10}°C</p>
                            </div>
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                                alt={weather.description}
                                className="w-16 h-16"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full mt-2">
                {routes.map((route, index) => (
                    <RouteCard key={index} route={route} />
                ))}
            </div>
        </div>
    );
};

export default SuggestedRoutes;