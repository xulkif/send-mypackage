// BasicFilterOptions.jsx

import { useState } from "react";
import CityAutocomplete from "./getCitys"; // Assuming this exists

const BasicFilterOptions = ({ BasicOptions, filters, setFilters, onHandleFilter }) => {
    
  // FIX: Calculate the new filter state and pass it to the parent's handler
  const HandleFilter = (value, name) => {
    const newFilters = { ...filters, [name]: value };
    
    // 1. Update the local state
    setFilters(newFilters); 
    
    // 2. Call the parent handler with the NEW filters object (avoids stale state)
    onHandleFilter(newFilters);
  };

  const displayFilters = (item) => {
    const value = filters[item.name] || '';
    
    switch (item.type) {
      case "CitySearch":
        return (
          <div className="w-full">
            <CityAutocomplete 
              inputValue={value}
              CityFilter={(value) => HandleFilter(value, item.name)}
            /> 
          </div>
        )
        
      case "select":
        return (
          <select 
            className="text-sm font-extralight w-full p-2 border rounded-md" 
            value={value} 
            onChange={(e) => HandleFilter(e.target.value, item.name)} 
          >
            {/* The default 'any' is already included in BasicOptions, 
                so a generic label is fine here. */}
            <option value="" disabled hidden>{item.label}</option> 
            {item?.options?.length > 0 && item.options.map(list => (
              <option key={list} value={list}>{list}</option>
            ))}
          </select>
        )

      case "date":
        return (
          <div className="w-full">
            <input 
              className="text-sm font-extralight w-full p-2 border rounded-md" 
              type="date" 
              value={value} 
              onChange={(e) => HandleFilter(e.target.value, item.name)}
            />
          </div> 
        )
      default:
        return null;
    }
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 w-full pb-3">
      {
        BasicOptions && BasicOptions.map(item => (
          <div key={item.name} className="flex flex-col w-full"> 
            <label className="text-sm font-medium text-left mb-0.5">{item.label}</label>
            {displayFilters(item)} 
          </div>
        ))
      }
    </div>
  );
};

export default BasicFilterOptions;