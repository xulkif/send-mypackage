import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Package, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

const PackagesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fromLocation: '',
    toLocation: '',
    sendDate: '',
    urgency: '',
    weightRange: '',
    valueRange: ''
  });

  // Mock data - in real app, this would come from your backend
  const packages = [
    {
      id: 1,
      description: 'Important business documents and small electronics',
      fromLocation: 'New York, USA',
      toLocation: 'London, UK',
      sendDate: '2024-02-15',
      urgency: 'high',
      weight: 2.5,
      value: 500,
      sender: 'John Smith',
      recipient: 'Sarah Wilson',
      specialInstructions: 'Handle with care, contains fragile items',
      status: 'active'
    },
    {
      id: 2,
      description: 'Clothing and personal items for family',
      fromLocation: 'Los Angeles, USA',
      toLocation: 'Tokyo, Japan',
      sendDate: '2024-02-18',
      urgency: 'normal',
      weight: 8.0,
      value: 200,
      sender: 'Maria Garcia',
      recipient: 'Takeshi Sato',
      specialInstructions: 'Weather-appropriate clothing for winter',
      status: 'active'
    },
    {
      id: 3,
      description: 'Medication and medical supplies',
      fromLocation: 'Chicago, USA',
      toLocation: 'Paris, France',
      sendDate: '2024-02-20',
      urgency: 'urgent',
      weight: 1.2,
      value: 150,
      sender: 'Dr. Robert Johnson',
      recipient: 'Marie Dubois',
      specialInstructions: 'Temperature controlled, urgent delivery needed',
      status: 'active'
    },
    {
      id: 4,
      description: 'Gifts and souvenirs for friends',
      fromLocation: 'Miami, USA',
      toLocation: 'Madrid, Spain',
      sendDate: '2024-02-22',
      urgency: 'low',
      weight: 5.0,
      value: 300,
      sender: 'Carlos Rodriguez',
      recipient: 'Ana Martinez',
      specialInstructions: 'Gift items, please keep dry',
      status: 'active'
    }
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.toLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (!filters.fromLocation || pkg.fromLocation.toLowerCase().includes(filters.fromLocation.toLowerCase())) &&
      (!filters.toLocation || pkg.toLocation.toLowerCase().includes(filters.toLocation.toLowerCase())) &&
      (!filters.sendDate || pkg.sendDate >= filters.sendDate) &&
      (!filters.urgency || pkg.urgency === filters.urgency) &&
      (!filters.weightRange || (() => {
        switch (filters.weightRange) {
          case 'light': return pkg.weight < 5;
          case 'medium': return pkg.weight >= 5 && pkg.weight < 15;
          case 'heavy': return pkg.weight >= 15;
          default: return true;
        }
      })()) &&
      (!filters.valueRange || (() => {
        switch (filters.valueRange) {
          case 'low': return pkg.value < 200;
          case 'medium': return pkg.value >= 200 && pkg.value < 500;
          case 'high': return pkg.value >= 500;
          default: return true;
        }
      })());

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Link to="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Available Packages</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search packages, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 flex items-center text-blue-600 text-sm font-medium"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </button>
        </div>
      </header>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From Location</label>
                <input
                  type="text"
                  placeholder="e.g., New York"
                  value={filters.fromLocation}
                  onChange={(e) => handleFilterChange('fromLocation', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To Location</label>
                <input
                  type="text"
                  placeholder="e.g., London"
                  value={filters.toLocation}
                  onChange={(e) => handleFilterChange('toLocation', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Send Date</label>
                <input
                  type="date"
                  value={filters.sendDate}
                  onChange={(e) => handleFilterChange('sendDate', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Urgency</label>
                <select
                  value={filters.urgency}
                  onChange={(e) => handleFilterChange('urgency', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Weight</label>
                <select
                  value={filters.weightRange}
                  onChange={(e) => handleFilterChange('weightRange', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="light">Light (&lt;5kg)</option>
                  <option value="medium">Medium (5-15kg)</option>
                  <option value="heavy">Heavy (15kg+)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                <select
                  value={filters.valueRange}
                  onChange={(e) => handleFilterChange('valueRange', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="low">Low (&lt;$200)</option>
                  <option value="medium">Medium ($200-$500)</option>
                  <option value="high">High ($500+)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="max-w-md mx-auto px-4 py-3">
        <p className="text-sm text-gray-600">
          {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Packages List */}
      <main className="max-w-md mx-auto px-4 pb-20">
        <div className="space-y-4">
          {filteredPackages.map((pkg) => (
            <Link
              key={pkg.id}
              to={`/package/${pkg.id}`}
              className="block bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-blue-600 mr-2" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(pkg.urgency)}`}>
                    {pkg.urgency.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center text-green-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">${pkg.value}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {pkg.description}
              </h3>
              
              <div className="text-sm text-gray-600 mb-3">
                <div className="flex items-center mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pkg.fromLocation} → {pkg.toLocation}
                </div>
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Send by {new Date(pkg.sendDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Weight: {pkg.weight}kg
                </div>
              </div>
              
              {pkg.specialInstructions && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> {pkg.specialInstructions}
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  From {pkg.sender} to {pkg.recipient}
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No packages found matching your criteria</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PackagesList;
