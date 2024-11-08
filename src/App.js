// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Report from './components/Report';
import BusRatings from './components/busRatings';
import SuggestedRoutes from './components/SuggestedRoutes';
import './App.css';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';


function App() {
  // mock review data
  const [reviews, setReviews] = useState([
    {
      busNumber: "123",
      ratings: { busCondition: 4, staffService: 5, punctuality: 3 },
      comment: "Good service, but could be more punctual.",
      date: "2024-11-07"
    },
    {
      busNumber: "456",
      ratings: { busCondition: 5, staffService: 5, punctuality: 5 },
      comment: "Excellent experience!",
      date: "2024-11-06"
    }
  ]);
  const [showReport, setShowReport] = useState(false);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <Router>
      <Routes>
        {/* Full-page busRatings component on /busRatings route */}
        <Route path="/busRatings" element={<BusRatings reviews={reviews} />} />
        <Route path="/suggestedRoutes" element={<SuggestedRoutes />} />
        {/* Other routes with sidebar and report button */}
        <Route
          path="*"
          element={
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar with scrollable content */}
              <div className="w-1/3 h-full overflow-y-auto bg-gray-800 sidebar">
                <Sidebar />
              </div>

              {/* Right side for the main content and Report button */}
              <div className="flex-grow bg-gray-100 relative h-full">
                <Routes>
                  <Route path="/report" element={<Report addReview={addReview} />} />
                </Routes>

                {/* Placeholder for the map or other content */}
                <div className="h-full w-full flex items-center justify-center">

                  <APIProvider apiKey='AIzaSyC1a3VDKXzUloohjWfOgln8dpmHPXFXm50'>
                    <Map
                      mapId={'map'}
                      style={{ width: '100%', height: '100%' }}
                      defaultZoom={13}
                      gestureHandling={'greedy'}
                      disableDefaultUI={true}
                      defaultCenter={{ lat: 5.354867516914033, lng: 100.30160169632266 }}
                    >
                      <AdvancedMarker position={{ lat: 5.354867516914033, lng: 100.30160169632266 }} />
                    </Map>
                  </APIProvider>

                </div>

                {/* Report Button at the bottom-right */}
                <button
                  className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                  onClick={() => setShowReport(!showReport)}
                >
                  {showReport ? "Close Report" : "Report"}
                </button>

                {/* Display Report component as a modal-like overlay if showReport is true */}
                {showReport && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Report addReview={(review) => {
                      addReview(review);
                      setShowReport(false);
                    }} />
                  </div>
                )}
              </div>
            </div>
          }
        />
      </Routes>
    </Router>

  );
}



export default App;
