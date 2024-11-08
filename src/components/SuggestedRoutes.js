import React from 'react';
import RouteCard from './RouteCard';

const SuggestedRoutes = ({ routes }) => {
    return (
        <div className="space-y-2 mt-2">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Suggested Routes</h3>
            {routes.map((route, index) => (
                <RouteCard key={index} route={route} />
            ))}
        </div>
    );
};

export default SuggestedRoutes;