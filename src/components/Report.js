// Report.js
import React, { useState } from 'react';

const categories = [
    { name: "Bus Condition", id: "busCondition" },
    { name: "Staff Service", id: "staffService" },
    { name: "Punctuality", id: "punctuality" }
];

const Report = ({ addReview }) => {
    const [ratings, setRatings] = useState({
        busCondition: 0,
        staffService: 0,
        punctuality: 0
    });
    const [hoveredRating, setHoveredRating] = useState({
        busCondition: 0,
        staffService: 0,
        punctuality: 0
    });
    const [comment, setComment] = useState('');
    const [busNumber, setBusNumber] = useState('');

    const handleRating = (categoryId, rating) => {
        setRatings({ ...ratings, [categoryId]: rating });
    };

    const handleMouseOver = (categoryId, rating) => {
        setHoveredRating({ ...hoveredRating, [categoryId]: rating });
    };

    const handleMouseOut = (categoryId) => {
        setHoveredRating({ ...hoveredRating, [categoryId]: 0 });
    };

    const handleSubmit = () => {
        const newReview = {
            busNumber: busNumber || "Unknown", // Temporary placeholder for bus number
            ratings,
            comment,
            date: new Date().toISOString().split('T')[0] // Current date
        };

        // Call the addReview function passed from App.js to save the review
        addReview(newReview);

        const fileContent = `
    Bus Number: ${newReview.busNumber}
    Date: ${newReview.date}
    
    Ratings:
    Bus Condition: ${ratings.busCondition}
    Staff Service: ${ratings.staffService}
    Punctuality: ${ratings.punctuality}
    
    Comment: ${comment || 'No comment'}
    `; 

    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Create a URL for the Blob
    const fileUrl = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `bus_report_${newReview.date}.txt`;

    // Trigger the click event on the link to download the file
    link.click();

        // Clear fields after submitting
        setRatings({ busCondition: 0, staffService: 0, punctuality: 0 });
        setComment('');
        setBusNumber('');
    };

    return (
        <div className="bg-white w-full max-w-md flex flex-col rounded-xl shadow-lg p-4">
            <div className="text-center mb-4">
                <h2 className="text-gray-800 text-2xl font-semibold">Your opinion matters to us!</h2>
            </div>
            <div className="mb-4 px-4">
                <input
                    type="text"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    className="w-full p-2 mb-2 bg-gray-100 text-gray-900 rounded-md outline-none"
                    placeholder="Enter Bus Number"
                />
            </div>
            {categories.map((category) => (
                <div key={category.id} className="mb-4">
                    <div className="text-lg text-gray-800 text-center">{category.name}</div>
                    <div className="flex justify-center space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => handleRating(category.id, star)}
                                onMouseOver={() => handleMouseOver(category.id, star)}
                                onMouseOut={() => handleMouseOut(category.id)}
                                className={`w-8 h-8 cursor-pointer ${star <= (hoveredRating[category.id] || ratings[category.id])
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            ))}
            <div className="w-full flex flex-col items-center px-4">
                <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 text-gray-500 bg-gray-100 rounded-xl border border-gray-300 resize-none w-full"
                    placeholder="Leave a message, if you want"
                ></textarea>
                <button
                    onClick={handleSubmit}
                    className="py-3 my-4 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white w-full"
                >
                    Submit Report
                </button>
            </div>
            <div className="h-10 flex items-center justify-center">
                <a href="" className="text-gray-600">Maybe later</a>
            </div>
        </div>
    );
};

export default Report;
