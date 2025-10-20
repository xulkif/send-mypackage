import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Star, Phone, Mail } from 'lucide-react';

const TravelerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    fromLocation: '',
    toLocation: '',
    travelDate: '',
    returnDate: '',
    description: '',
    rating: 5,
    experience: '',
    maxWeight: '',
    maxVolume: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    //console.log('Traveler registration:', formData);
    alert('Registration successful! You can now help others send packages.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center">
          <Link to="/" className="mr-3 sm:mr-4">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Register as Traveler</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="18"
                    max="80"
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
              Travel Information
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Location *
                </label>
                <input
                  type="text"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Location *
                </label>
                <input
                  type="text"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., London, UK"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Package Capabilities */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
              Package Capabilities
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Max Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="maxWeight"
                    value={formData.maxWeight}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="50"
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Max Volume (L)
                  </label>
                  <input
                    type="number"
                    name="maxVolume"
                    value={formData.maxVolume}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Tell us about yourself and your travel experience..."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Previous Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Any previous experience carrying packages or traveling..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 sm:py-4 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Register as Traveler
          </button>
        </form>
      </main>
    </div>
  );
};

export default TravelerRegistration;
