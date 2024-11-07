// RouteCard.js
import React from 'react';

const RouteCard = ({ route }) => {
    const { name, departure, stops, arrival } = route;

    const formatTime = (time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <div className="bg-white p-4 text-black rounded-lg shadow-md mb-4 w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Route: {name}</h3>
                <p className="text-gray-500">• Arrive at {formatTime(arrival.time)}</p>
            </div>
            <p className="text-gray-600 mb-2">Leaves from {departure.name} at {formatTime(departure.time)}</p>
            <div className="flex items-center space-x-2">
                <span className="text-gray-500">{stops.number} stops</span>
            </div>
            <p className="text-gray-600 mt-2">Arrives at {arrival.name}</p>
        </div>
    );
};

export default RouteCard;
