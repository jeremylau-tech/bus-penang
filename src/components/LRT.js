// BusStop.js
import React, { useState } from 'react';

const BusStop = () => {
    const [busStop, setBusStop] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // Open the link in a new tab
        window.open('https://www.malaymail.com/news/malaysia/2024/10/15/penang-hopes-to-launch-lrt-project-by-end-2024-says-chief-minister/153712#google_vignette', '_blank');
      };

    return (
        <div className="bg-gray-800 p-3 rounded-md text-white h-full flex flex-col">
           
            <div className="px-4">
                <button onClick={handleSearch} className="w-full p-2 bg-orange-500 text-white rounded-md">
                    Coming Soon 
                    #PenangOneBetter
                </button>
            </div>

            <div className="mt-4 px-4 overflow-y-auto h-[calc(100vh-250px)]"> {/* Scrollable area */}
                {results.length > 0 ? (
                    <>
                        <h2 className="text-xl text-gray-300 mb-2">View the latest status.</h2>
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
                    <p className="text-center text-gray-400">View the latest news here.</p>
                )}
            </div>
        </div>
    );
};

export default BusStop;
