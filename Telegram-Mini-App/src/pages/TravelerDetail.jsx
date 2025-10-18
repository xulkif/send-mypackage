import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Users, Phone, Mail, Shield, Clock, Package } from 'lucide-react';

const TravelerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Mock data - in real app, this would come from your backend
  const traveler = {
    id: parseInt(id),
    name: 'Sarah Johnson',
    age: 28,
    gender: 'female',
    rating: 4.8,
    totalDeliveries: 47,
    fromLocation: 'New York, USA',
    toLocation: 'London, UK',
    travelDate: '2024-02-15',
    returnDate: '2024-02-22',
    maxWeight: 15,
    maxVolume: 25,
    description: 'Frequent business traveler with extra luggage space. Very reliable and punctual. I travel internationally for work every month and have plenty of room in my checked baggage.',
    experience: 'Traveled internationally for 5 years, carried packages for friends multiple times. I understand the importance of careful handling and timely delivery.',
    avatar: '👩‍💼',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    verified: true,
    languages: ['English', 'Spanish', 'French'],
    preferences: ['Electronics', 'Documents', 'Clothing'],
    reviews: [
      {
        id: 1,
        sender: 'John M.',
        rating: 5,
        comment: 'Sarah was extremely reliable and delivered my package on time. Highly recommended!',
        date: '2024-01-15'
      },
      {
        id: 2,
        sender: 'Maria L.',
        rating: 4,
        comment: 'Great communication throughout the process. Package arrived in perfect condition.',
        date: '2024-01-08'
      },
      {
        id: 3,
        sender: 'David K.',
        rating: 5,
        comment: 'Professional and trustworthy. Will definitely use her services again.',
        date: '2023-12-20'
      }
    ]
  };

  const handleGetContactInfo = () => {
    navigate('/user/payment', { 
      state: { 
        type: 'traveler',
        id: traveler.id,
        name: traveler.name,
        price: 15.99
      }
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center">
          <Link to="/user/travelers" className="mr-3 sm:mr-4">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Traveler Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{traveler.avatar}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{traveler.name}</h2>
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center mr-2">
                {renderStars(traveler.rating)}
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-700">{traveler.rating}</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1">({traveler.totalDeliveries} deliveries)</span>
            </div>
            {traveler.verified && (
              <div className="flex items-center justify-center text-green-600 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Verified Traveler
              </div>
            )}
          </div>
        </div>

        {/* Travel Information */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Travel Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Route</div>
                <div className="text-sm text-gray-600">{traveler.fromLocation} → {traveler.toLocation}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Travel Dates</div>
                <div className="text-sm text-gray-600">
                  {new Date(traveler.travelDate).toLocaleDateString()} - {new Date(traveler.returnDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Package className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Package Capacity</div>
                <div className="text-sm text-gray-600">
                  Max {traveler.maxWeight}kg, {traveler.maxVolume}L volume
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">About</h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{traveler.description}</p>
          
          <h4 className="font-medium text-gray-800 mb-2">Experience</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{traveler.experience}</p>
        </div>

        {/* Languages & Preferences */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {traveler.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Preferred Items</h4>
              <div className="flex flex-wrap gap-2">
                {traveler.preferences.map((pref, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Reviews</h3>
          
          <div className="space-y-4">
            {traveler.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 text-sm">{review.sender}</span>
                    <div className="flex items-center ml-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        {showContactInfo && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-green-600 mr-3" />
                <span className="text-green-800">{traveler.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-green-600 mr-3" />
                <span className="text-green-800">{traveler.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="sticky bottom-3 sm:bottom-4">
          {!showContactInfo ? (
            <button
              onClick={handleGetContactInfo}
              className="w-full bg-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Contact Information - $15.99
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-2 text-sm sm:text-base">Contact information unlocked!</p>
              <p className="text-xs sm:text-sm text-gray-600">You can now contact {traveler.name} directly</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TravelerDetail;
