// SuggestedRoutes.js
import React from 'react';
import RouteCard from './RouteCard';

const SuggestedRoutes = ({ routes }) => {
    return (
        <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Suggested Routes</h3>
            {routes.map((route, index) => (
                <RouteCard key={index} route={route} />
            ))}
        </div>
    );
};

export default SuggestedRoutes;
