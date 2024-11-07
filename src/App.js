import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JourneyPlanner from './components/JourneyPlanner';
import LiveTracking from './components/LiveTracking';
import Weather from './components/Weather';
import Bookmarks from './components/Bookmarks';
import ReportIssue from './components/ReportIssue';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-500 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Bus Tracker</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/plan-journey" element={<JourneyPlanner />} />
            <Route path="/tracking/:busId" element={<LiveTracking />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/report/:busId" element={<ReportIssue />} />
            <Route path="/" element={<JourneyPlanner />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Bus Tracker App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
