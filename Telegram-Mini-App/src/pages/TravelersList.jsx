import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Calendar, Star, Users, Clock } from 'lucide-react';

const TravelersList = ({ dataList }) => {
  const [searchTerm, setSearchTerm] = useState('');

   

 /* const filteredTravelers = travelers.filter(traveler => {
    // Search functionality
    const matchesSearch = !searchTerm || 
      traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.toLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter functionality
    const matchesFilters = 
      (!filters.search || 
        traveler.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        traveler.fromLocation.toLowerCase().includes(filters.search.toLowerCase()) ||
        traveler.toLocation.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.startinglocation || traveler.fromLocation.toLowerCase().includes(filters.startinglocation.toLowerCase())) &&
      (!filters.destinationlocation || traveler.toLocation.toLowerCase().includes(filters.destinationlocation.toLowerCase())) &&
      (!filters.date || traveler.travelDate >= filters.date) &&
      (!filters.weight || {
        '1-5 kg': traveler.maxWeight <= 5,
        '5-10 kg': traveler.maxWeight <= 10,
        '10-15 kg': traveler.maxWeight <= 15,
        '15-20 kg': traveler.maxWeight <= 20,
        '20-25 kg': traveler.maxWeight <= 25,
        '25-30 kg': traveler.maxWeight <= 30
      }[filters.weight]) &&
      (!filters.gender || traveler.gender === filters.gender.toLowerCase() || filters.gender === 'Any') &&
      (!filters.agecategory || {
        '15-30': traveler.age >= 15 && traveler.age <= 30,
        '30-45': traveler.age >= 30 && traveler.age <= 45,
        '45+': traveler.age >= 45,
        'Any': true
      }[filters.agecategory]);

    return matchesSearch && matchesFilters;
  });*/

  return (
    <div className="bg-gray-50">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <p className="text-xs sm:text-sm text-gray-600">
          {dataList.length} traveler{dataList.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 pb-16 sm:pb-20">
        <div className="space-y-3 sm:space-y-4">
          {dataList.map((traveler) => (
            <Link
              key={traveler.id}
              to={`/user/traveler/${traveler.id}`}
              className="block bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="text-2xl sm:text-3xl">{traveler.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{traveler.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">{traveler.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> 
                      <span className="truncate">{traveler.initialLocation} → {traveler.destination}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Travels on {new Date(traveler.travelDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Can carry up to {traveler.weight}kg
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                    {traveler.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <span className="text-xs text-gray-500">
                      {traveler.age} years old • {traveler.gender}
                    </span>
                    <span className="text-xs text-blue-600 font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {dataList.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm sm:text-base">No travelers found matching your criteria</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelersList;
