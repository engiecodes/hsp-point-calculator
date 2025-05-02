import React from "react";

const ResultDisplay = ({points, message }) => {
    return (
        <div className="p-4 bg-white shadow rounded border border-gray-200 mt-6">
            <h2 className="text-xl font-semibold mb-2">Total Score</h2>
            <p className="text-3xl font-bold text-indigo-700">{points} points</p>
            <p className="mt-2 text-gray-700">{message}</p>
        </div>
    );
};

export default ResultDisplay;
