import React, { useState, useEffect, useRef } from 'react';
 
import { useSelector } from 'react-redux';
import {  Country } from 'country-state-city';




const CityAutocomplete = ({inputValue, CityFilter}) => {
    const {city,loading}=useSelector((state)=>state.citys)
  const [suggestions, setSuggestions] = useState([]);
  const [citiesData, setCitiesData] = useState(city);
   
  const inputRef=useRef(null)

  const handleInputChange = (e) => {
    const input = e.target.value;
    CityFilter(input);
    if (input.length > 0) {
        // Filter the cities based on the user's input
        const filteredCities = citiesData.filter(city =>
          city.name.toLowerCase().startsWith(input.toLowerCase())
        );
        // FIX: Apply a limit to reduce render load (previously discussed optimization)
        // Since you asked for fixes, I'm including the one that addresses "jank"
        setSuggestions(filteredCities.slice(0, 50)); 
      } else {
        setSuggestions([]);
      }
  };

  const handleSelectCity = (city) => {
    CityFilter(city.name);
    setSuggestions([]); // Close suggestions after selection
  };

  const getCountryName = (countryCode) => {
    const country = Country.getCountryByCode(countryCode);
    return country ? country.name : countryCode;
  };
  
  useEffect(() => {
  
    const handleClickOutside = (event) => {
     
      if (inputRef.current && !inputRef.current.contains(event.target)) {
         setSuggestions();
      }
    };

    // Add the event listener to the document body
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this runs only on mount and unmount

  return (
    // 1. relative container keeps the input fixed and anchors the absolute list
    <div className='relative flex justify-center item-center ' ref={inputRef} >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange} 
        placeholder="Type a city name..."
        // w-full ensures it takes the container's width
        className='w-full p-2 border border-gray-300 text-sm font-extralight rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      {suggestions&&suggestions.length > 0 && (
        <ul
          // 2. absolute position prevents input movement
          // 3. max-h-[100px] and overflow-y-auto ensures fixed height and scrolling
          className='absolute bg-white top-full left-0 z-10 max-h-[100px] overflow-y-auto w-full min-w-fit border border-gray-300 border-t-0 list-none p-0 m-0 shadow-lg rounded-b-md'
        >
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city)}
              // Hover effect for UX
              className='px-2 cursor-pointer border-gray-400 border-2 rounded-md hover:bg-gray-200 text-sm font-extralight'
            >
              {city.name}, {getCountryName(city.countryCode)},
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;