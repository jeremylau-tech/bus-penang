// SuggestedRoutes.js
import React from 'react';
import RouteCard from './RouteCard';
import Notify from '../Notification';

const SuggestedRoutes = ({ routes }) => {
    return (
        <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Suggested Routes</h3>
            {routes.map((route, index) => (
                <RouteCard key={index} route={route} />
            ))}
            {Notify()}
        </div>
    );
};

export default SuggestedRoutes;
