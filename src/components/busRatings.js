// busRatings.js
import React from 'react';

const BusRatings = ({ reviews }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bus Ratings</h1>
            <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Bus Number: {review.busNumber}
                                </h2>
                                <p className="text-gray-500 text-sm">{review.date}</p>
                            </div>
                            <div className="mt-2">
                                <p><strong>Bus Condition:</strong> {review.ratings.busCondition} / 5</p>
                                <p><strong>Staff Service:</strong> {review.ratings.staffService} / 5</p>
                                <p><strong>Punctuality:</strong> {review.ratings.punctuality} / 5</p>
                            </div>
                            <div className="mt-2">
                                <p><strong>Comment:</strong> {review.comment || "No comment provided"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews available</p>
                )}
            </div>
        </div>
    );
};

export default BusRatings;
