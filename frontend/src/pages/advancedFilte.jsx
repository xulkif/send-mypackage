// AdvancedFilterOptions.jsx

import React, { useState, useEffect } from "react";
import CityAutocomplete from "./getCitys";

const AdvancedFilterOptions = ({ 
    filters, 
    setFilters, 
    onApplyFilters,  
    onCancel,        
    isPopup,      
    AdvancedOptions  
}) => {
    
    // 💡 Use a local state to stage changes before they are applied globally
    const [stagedFilters, setStagedFilters] = useState(filters);

    // Sync external filters to stagedFilters when the popup opens
    useEffect(() => {
        setStagedFilters(filters);
    }, [filters, isPopup]);


    // Handler updates the local/staged state, not the global state
    const HandleFilter = (value, name) => {
        setStagedFilters(prev => ({ ...prev, [name]: value }));
    };

    // --- Action Handlers ---
    const handleApply = () => {
        onApplyFilters(stagedFilters); // Pass the staged changes to the parent
        onCancel();
    };

    const handleCancel = () => {
        setStagedFilters(filters); // Reset staged changes back to current active filters
        onCancel();
    };

    const displayFilters = (item) => {
        // Use stagedFilters for input values
        const value = stagedFilters[item.name] || ''; 
        
        // ... (Your switch statement logic is mostly fine, using stagedFilters)
        switch (item.type) {
            case "CitySearch":
                return (
                    <div className="w-full">
                        <CityAutocomplete 
                            inputValue={value}
                            CityFilter={(val) => HandleFilter(val, item.name)}
                        /> 
                    </div>
                );
            case "select":
                return (
                    <select 
                        className="text-sm font-extralight w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out" 
                        value={value} 
                        onChange={(e) => HandleFilter(e.target.value, item.name)} 
                    >
                        {/* Ensure your base filter value (e.g., 'any' or '') is included here */}
                        <option value="">{item.label}</option> 
                        {item?.options?.length > 0 && item.options.map(list => (
                            <option key={list} value={list}>{list}</option>
                        ))}
                    </select>
                );
            case "date":
                return (
                    <div className="w-full">
                        <input 
                            className="text-sm font-extralight w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out" 
                            type="date" 
                            value={value} 
                            onChange={(e) => HandleFilter(e.target.value, item.name)}
                        />
                    </div> 
                );
            default:
                return null;
        }
    };

    // Hide the component if isPopup is false
    if (!isPopup) return null;

    // --- Main Pop-up UI ---
    return (
        // Modal Overlay (Fixed, dark background)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 transition-opacity duration-300">
            
            {/* Modal Content Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                
                {/* Header/Title */}
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Advanced Filters 🔎</h2>
                </div>

                {/* Filter Grid (Scrollable) */}
                <div className="p-4 overflow-y-auto flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                        {
                            AdvancedOptions?.map(item => (
                                <div key={item.name} className="flex flex-col w-full"> 
                                    <label className="text-sm font-medium text-gray-600 text-left mb-1">{item.label}</label>
                                    {displayFilters(item)} 
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Action Buttons (Sticky Footer) */}
                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end space-x-3 shadow-top">
                    <button 
                        onClick={handleCancel}
                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleApply}
                        className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out font-semibold"
                    >
                        Apply Filters ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilterOptions;