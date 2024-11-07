import React, { useState } from 'react';
import axios from 'axios';

const BusStop = () => {
    const [busStop, setBusStop] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bus-stops?search=${busStop}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching bus stops", error);
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded-md text-white">
            <div className="mb-4 px-4">
                <input
                    type="text"
                    value={busStop}
                    onChange={(e) => setBusStop(e.target.value)}
                    className="w-full p-2 mb-2 bg-gray-200 text-gray-900 rounded-md outline-none"
                    placeholder="Enter bus stop name or ID"
                />
            </div>
            <div className="px-4">
                <button onClick={handleSearch} className="w-full p-2 bg-blue-500 text-white rounded-md">
                    Search
                </button>
            </div>

            {results.length > 0 && (
                <div className="mt-4 px-4">
                    <h2 className="text-xl text-gray-900">Available Bus Stops</h2>
                    <ul>
                        {results.map((result) => (
                            <li
                                key={result.id}
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md mb-2 text-gray-900"
                            >
                                <div>Bus Stop: {result.name}</div>
                                <div>Location: {result.location}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BusStop;
