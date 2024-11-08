// RouteCard.js
import React, { useState } from 'react';
import Notify from '../Notification';
import { FaHeart } from 'react-icons/fa';

const RouteCard = ({ route }) => {
    const { name, departure, stops, arrival } = route;
    const [isBookmarked, setIsBookmarked] = useState(false);

    const formatTime = (time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className="bg-white p-4 text-black rounded-lg shadow-md mb-4 w-full relative">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Route: {name}</h3>
                <p className="text-gray-500">• Arrive at {formatTime(arrival.time)}</p>
            </div>
            <p className="text-gray-600 mb-2">Leaves from {departure.name} at {formatTime(departure.time)}</p>
            <div className="flex items-center space-x-2">
                <span className="text-gray-500">{stops.number} stops</span>
            </div>
            <p className="text-gray-600 mt-2">Arrives at {arrival.name}</p>

            <div className="absolute bottom-4 right-14">
                {Notify()}
            </div>
            <FaHeart
                onClick={toggleBookmark}
                className={`absolute bottom-5 right-4 cursor-pointer ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`} // Red if bookmarked
                size={24}
            />
        </div>
    );
};

export default RouteCard;
