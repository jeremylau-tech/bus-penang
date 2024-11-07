// BusStop.js
import React, { useState } from 'react';

const BusStop = () => {
    const [busStop, setBusStop] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // Placeholder data with Penang locations
        const placeholderData = [
            { id: "1", name: "101", location: "QueensBay Mall", eta1: "3 mins", eta2: "10 mins" },
            { id: "2", name: "300", location: "Penang International Airport", eta1: "5 mins", eta2: "15 mins" },
            { id: "3", name: "303", location: "Komtar", eta1: "8 mins", eta2: "20 mins" },
            { id: "4", name: "404", location: "Gurney Plaza", eta1: "2 mins", eta2: "12 mins" },
            { id: "5", name: "505", location: "Batu Ferringhi Beach", eta1: "7 mins", eta2: "18 mins" },
        ];

        setResults(placeholderData);
    };

    return (
        <div className="bg-gray-800 rounded-md text-white h-full flex flex-col">
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

            <div className="mt-4 px-4 overflow-y-auto h-[calc(100vh-250px)]"> {/* Scrollable area */}
                {results.length > 0 ? (
                    <>
                        <h2 className="text-xl text-gray-300 mb-2">Available Buses</h2>
                        <ul>
                            {results.map((result) => (
                                <li
                                    key={result.id}
                                    className="bg-white w-full p-4 rounded-md mb-2 text-gray-900"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="text-lg font-semibold text-gray-800">Bus {result.name}</div>
                                        <div className="text-right">
                                            <p className="text-gray-500">{result.eta1}</p>
                                            <p className="text-gray-500">{result.eta2}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">Leaves from {result.location}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-center text-gray-400">No buses available. Enter a bus stop to search.</p>
                )}
            </div>
        </div>
    );
};

export default BusStop;
