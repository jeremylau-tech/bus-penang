// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar with component content */}
        <Sidebar />

        {/* Right side for the map */}
        <p className="text-gray-600 text-lg">Your map will be displayed here.</p>
        {/* Map image */}

      </div>
    </Router >
  );
}

export default App;
