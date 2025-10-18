import React, { useState } from 'react';

// Simple city search component that works without external dependencies
function CitySearch({ onCitySelect }) {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Comprehensive cities list
    const cities = [
        // US Cities
        'New York, NY, USA',
        'Los Angeles, CA, USA',
        'Chicago, IL, USA',
        'Houston, TX, USA',
        'Phoenix, AZ, USA',
        'Philadelphia, PA, USA',
        'San Antonio, TX, USA',
        'San Diego, CA, USA',
        'Dallas, TX, USA',
        'San Jose, CA, USA',
        'Austin, TX, USA',
        'Jacksonville, FL, USA',
        'Fort Worth, TX, USA',
        'Columbus, OH, USA',
        'Charlotte, NC, USA',
        'San Francisco, CA, USA',
        'Indianapolis, IN, USA',
        'Seattle, WA, USA',
        'Denver, CO, USA',
        'Washington, DC, USA',
        'Boston, MA, USA',
        'El Paso, TX, USA',
        'Nashville, TN, USA',
        'Detroit, MI, USA',
        'Oklahoma City, OK, USA',
        'Portland, OR, USA',
        'Las Vegas, NV, USA',
        'Memphis, TN, USA',
        'Louisville, KY, USA',
        'Baltimore, MD, USA',
        'Milwaukee, WI, USA',
        'Albuquerque, NM, USA',
        'Tucson, AZ, USA',
        'Fresno, CA, USA',
        'Sacramento, CA, USA',
        'Kansas City, MO, USA',
        'Mesa, AZ, USA',
        'Atlanta, GA, USA',
        'Omaha, NE, USA',
        'Colorado Springs, CO, USA',
        'Raleigh, NC, USA',
        'Virginia Beach, VA, USA',
        'Miami, FL, USA',
        'Oakland, CA, USA',
        'Minneapolis, MN, USA',
        'Tulsa, OK, USA',
        'Arlington, TX, USA',
        'Tampa, FL, USA',
        'New Orleans, LA, USA',
        
        // European Cities
        'London, UK',
        'Paris, France',
        'Berlin, Germany',
        'Madrid, Spain',
        'Rome, Italy',
        'Amsterdam, Netherlands',
        'Vienna, Austria',
        'Prague, Czech Republic',
        'Budapest, Hungary',
        'Warsaw, Poland',
        'Stockholm, Sweden',
        'Copenhagen, Denmark',
        'Oslo, Norway',
        'Helsinki, Finland',
        'Zurich, Switzerland',
        'Geneva, Switzerland',
        'Brussels, Belgium',
        'Dublin, Ireland',
        'Edinburgh, Scotland',
        'Glasgow, Scotland',
        'Manchester, UK',
        'Birmingham, UK',
        'Liverpool, UK',
        'Leeds, UK',
        'Sheffield, UK',
        'Bristol, UK',
        'Newcastle, UK',
        'Nottingham, UK',
        'Leicester, UK',
        'Coventry, UK',
        'Belfast, Northern Ireland',
        'Cardiff, Wales',
        
        // Asian Cities
        'Tokyo, Japan',
        'Seoul, South Korea',
        'Shanghai, China',
        'Beijing, China',
        'Hong Kong, China',
        'Singapore, Singapore',
        'Bangkok, Thailand',
        'Kuala Lumpur, Malaysia',
        'Jakarta, Indonesia',
        'Manila, Philippines',
        'Mumbai, India',
        'Delhi, India',
        'Bangalore, India',
        'Chennai, India',
        'Kolkata, India',
        'Hyderabad, India',
        'Pune, India',
        
        // Canadian Cities
        'Toronto, ON, Canada',
        'Montreal, QC, Canada',
        'Vancouver, BC, Canada',
        'Calgary, AB, Canada',
        'Edmonton, AB, Canada',
        'Ottawa, ON, Canada',
        'Winnipeg, MB, Canada',
        'Quebec City, QC, Canada',
        'Hamilton, ON, Canada',
        'Kitchener, ON, Canada',
        
        // Australian Cities
        'Sydney, NSW, Australia',
        'Melbourne, VIC, Australia',
        'Brisbane, QLD, Australia',
        'Perth, WA, Australia',
        'Adelaide, SA, Australia',
        'Gold Coast, QLD, Australia',
        'Newcastle, NSW, Australia',
        'Canberra, ACT, Australia',
        'Wollongong, NSW, Australia',
        'Hobart, TAS, Australia',
        
        // Middle Eastern Cities
        'Dubai, UAE',
        'Abu Dhabi, UAE',
        'Doha, Qatar',
        'Kuwait City, Kuwait',
        'Riyadh, Saudi Arabia',
        'Jeddah, Saudi Arabia',
        'Tel Aviv, Israel',
        'Jerusalem, Israel',
        'Beirut, Lebanon',
        'Amman, Jordan',
        'Cairo, Egypt',
        'Alexandria, Egypt',
        
        // African Cities
        'Cape Town, South Africa',
        'Johannesburg, South Africa',
        'Durban, South Africa',
        'Pretoria, South Africa',
        'Lagos, Nigeria',
        'Abuja, Nigeria',
        'Cairo, Egypt',
        'Alexandria, Egypt',
        'Casablanca, Morocco',
        'Rabat, Morocco',
        'Nairobi, Kenya',
        'Addis Ababa, Ethiopia',
        
        // South American Cities
        'São Paulo, Brazil',
        'Rio de Janeiro, Brazil',
        'Buenos Aires, Argentina',
        'Lima, Peru',
        'Bogotá, Colombia',
        'Santiago, Chile',
        'Caracas, Venezuela',
        'Quito, Ecuador',
        'La Paz, Bolivia',
        'Asunción, Paraguay',
        'Montevideo, Uruguay',
        'Recife, Brazil',
        'Porto Alegre, Brazil',
        'Belo Horizonte, Brazil',
        'Brasília, Brazil'
    ];

    // Handle input changes
    const handleInput = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        setShowSuggestions(inputValue.length > 0);
    };

    // Handle city selection
    const handleSelect = (city) => {
        setValue(city);
        setShowSuggestions(false);
            onCitySelect({ 
            name: city.split(',')[0], 
            fullAddress: city 
        });
    };

    // Filter cities based on input
    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Input Field */}
            <input
                value={value}
                onChange={handleInput}
                onFocus={() => value.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search for a city..."
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredCities.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredCities.slice(0, 10).map((city, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleSelect(city)}
                            className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            {city}
                            </li>
                    ))}
                </ul>
            )}

            {/* No results */}
            {showSuggestions && filteredCities.length === 0 && value && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 text-xs text-gray-500">
                    No cities found. Try a different search term.
                </div>
            )}
        </div>
    );
}

export default CitySearch;