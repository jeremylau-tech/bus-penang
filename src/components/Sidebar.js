// components/Sidebar.js
import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import JourneyPlanner from './JourneyPlanner';
import LiveTracking from './LiveTracking';
import Weather from './Weather';
import Bookmarks from './Bookmarks';
import BusStop from './BusStop';

const Sidebar = () => {
    return (
        <aside className="w-96 bg-gray-900 text-white h-screen flex flex-col">
            <div className="bg-black text-white p-4 w-full">
                <h2 className="text-2xl font-bold mb-7">Bus Tracker</h2>
                <nav className="flex space-x-4">
                    <NavLink
                        to="/plan-journey"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "text-gray-500"
                        }
                    >
                        Directions
                    </NavLink>
                    <NavLink
                        to="/busStop"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "text-gray-500"
                        }
                    >
                        Buses
                    </NavLink>
                    <NavLink
                        to="/tracking/1"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "text-gray-500"
                        }
                    >
                        Live Tracking
                    </NavLink>
                    <NavLink
                        to="/bookmarks"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "text-gray-500"
                        }
                    >
                        Bookmarks
                    </NavLink>
                </nav>
            </div>

            {/* Sidebar Content (Components) */}
            <div className="flex-grow">
                <Routes>
                    <Route path="/plan-journey" element={<JourneyPlanner />} />
                    <Route path="/tracking/:busId" element={<LiveTracking />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/busStop" element={<BusStop />} />
                    <Route path="/" element={<JourneyPlanner />} /> {/* Default route */}
                </Routes>
            </div>
        </aside>
    );
};

export default Sidebar;