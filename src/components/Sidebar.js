import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa'; // Import camera icon from react-icons
import JourneyPlanner from './JourneyPlanner';
import LiveTracking from './LiveTracking';
import Weather from './Weather';
import Bookmarks from './Bookmarks';
import BusStop from './BusStop';
import Logo from './TOPLogo.png';
import LRT from './LRT';

const Sidebar = () => {
    return (
        <aside className="bg-gray-900 text-white h-screen flex flex-col">
            <div className="bg-black text-white p-4 w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={Logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                        <h2 className="text-2xl font-bolds ml-4 mb-1">Public Transport</h2>
                    </div>
                    <a
                        href="https://teachablemachine.withgoogle.com/models/4YRlJIKT5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white"
                    >
                        <FaCamera size={24} />
                    </a>
                </div>
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
                        to="/LRT"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "text-gray-500"
                        }
                    >
                        LRT
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
                    <Route path="/LRT" element={<LRT />} />

                    {/* Redirect the root path to "/plan-journey" */}
                    <Route path="/" element={<Navigate to="/plan-journey" replace />} />
                </Routes>
            </div>
        </aside>
    );
};

export default Sidebar;