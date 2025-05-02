import React from "react";

const ChecklistDisplay = ({ checklist }) => {
    if (!checklist || checklist.length === 0) return null;

    return(
        <div className="p-4 bg-white shadow rounded border border-gray-200 mt-6">
            <h2 className="text-xl font-semibold mb-2">Required Proof Documents</h2>
            <ul className="list-disc list-inside space-y-1">
                {[...new Set(checklist)].map((item, idx) => (
                <li key={idx} className="text-gray-800">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChecklistDisplay;
