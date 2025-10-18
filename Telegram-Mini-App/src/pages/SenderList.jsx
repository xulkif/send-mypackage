
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Package, Clock, Star, User } from 'lucide-react';

const SenderList = ({ dataList }) => {
  /*Mock data for senders/packages
  const senders = [
    {
      id: 1,
      name: 'John Smith',
      avatar: '👨‍💼',
      fromLocation: 'New York, USA',
      toLocation: 'London, UK',
      packageDate: '2024-02-15',
      weight: '5-10 kg',
      description: 'Important documents and small electronics. Need reliable delivery.',
      status: 'Urgent',
      packageType: 'Documents',
      value: '$500',
      experience: 'First time user, but package is very important'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: '👩‍💼',
      fromLocation: 'Los Angeles, USA',
      toLocation: 'Madrid, Spain',
      packageDate: '2024-02-18',
      weight: '10-15 kg',
      description: 'Gifts for family. Clothing and small items. Flexible delivery time.',
      status: 'Normal',
      packageType: 'Gifts',
      value: '$200',
      experience: 'Regular user, very understanding about timing'
    },
    {
      id: 3,
      name: 'David Chen',
      avatar: '👨‍🔬',
      fromLocation: 'Chicago, USA',
      toLocation: 'Tokyo, Japan',
      packageDate: '2024-02-20',
      weight: '1-5 kg',
      description: 'Research samples. Must be handled carefully and delivered promptly.',
      status: 'Urgent',
      packageType: 'Research Materials',
      value: '$1000',
      experience: 'Academic researcher, needs careful handling'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      avatar: '👩‍🎨',
      fromLocation: 'Miami, USA',
      toLocation: 'Paris, France',
      packageDate: '2024-02-22',
      weight: '15-20 kg',
      description: 'Art supplies and tools. Can be flexible with delivery timing.',
      status: 'Flexible',
      packageType: 'Art Supplies',
      value: '$300',
      experience: 'Artist, understanding of creative schedules'
    }
  ];

  const filteredSenders = senders.filter(sender => {
    // Search functionality
    const matchesSearch = 
      sender.name.toLowerCase().includes(filters.search?.toLowerCase() || '') ||
      sender.fromLocation.toLowerCase().includes(filters.search?.toLowerCase() || '') ||
      sender.toLocation.toLowerCase().includes(filters.search?.toLowerCase() || '') ||
      sender.description.toLowerCase().includes(filters.search?.toLowerCase() || '');
    
    // Filter functionality
    const matchesFilters = 
      (!filters.startinglocation || sender.fromLocation.toLowerCase().includes(filters.startinglocation.toLowerCase())) &&
      (!filters.destinationlocation || sender.toLocation.toLowerCase().includes(filters.destinationlocation.toLowerCase())) &&
      (!filters.date || sender.packageDate >= filters.date) &&
      (!filters.weight || sender.weight === filters.weight);

    return matchesSearch && matchesFilters;
  });

 
*/
const getStatusColor = (status) => {
  switch (status) {
    case 'Urgent': return 'bg-red-100 text-red-800';
    case 'Normal': return 'bg-blue-100 text-blue-800';
    case 'Flexible': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
  return (
    <div className="bg-gray-50">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <p className="text-xs sm:text-sm text-gray-600">
          {dataList.length} package{dataList.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 pb-16 sm:pb-20">
        <div className="space-y-3 sm:space-y-4">
          {dataList.map((sender) => (
            <Link
              key={sender.id}
              to={`/package/${sender.id}`}
              className="block bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="text-2xl sm:text-3xl">{sender.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{sender.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sender.status)}`}>
                      {sender.status}
                    </span>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="truncate">{sender.initiallocation} → {sender.toLocation}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Needs delivery by {new Date(sender.travelDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center mb-1">
                      <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {sender.packageType} • {sender.weight}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Package value: {sender.value}
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-2">
                    {sender.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {sender.experience}
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
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm sm:text-base">No packages found matching your criteria</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SenderList;