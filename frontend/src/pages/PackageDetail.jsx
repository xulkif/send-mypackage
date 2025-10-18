import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Calendar, Clock, DollarSign, User, Phone, Mail, AlertTriangle } from 'lucide-react';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Mock data - in real app, this would come from your backend
  const packageData = {
    id: parseInt(id),
    description: 'Important business documents and small electronics including laptop charger, USB cables, and presentation materials',
    fromLocation: 'New York, USA',
    toLocation: 'London, UK',
    sendDate: '2024-02-15',
    urgency: 'high',
    weight: 2.5,
    dimensions: '30 x 20 x 10 cm',
    value: 500,
    sender: 'John Smith',
    senderEmail: 'john.smith@email.com',
    senderPhone: '+1 (555) 987-6543',
    recipient: 'Sarah Wilson',
    recipientPhone: '+44 20 7123 4567',
    specialInstructions: 'Handle with care, contains fragile electronics. Keep dry and avoid extreme temperatures.',
    status: 'active',
    createdAt: '2024-01-20',
    category: 'Electronics & Documents'
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

  const getUrgencyIcon = (urgency) => {
    if (urgency === 'urgent' || urgency === 'high') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return null;
  };

  const handleGetContactInfo = () => {
    navigate('/payment', { 
      state: { 
        type: 'package',
        id: packageData.id,
        description: packageData.description,
        price: 12.99
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Link to="/packages" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Package Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Package Header */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getUrgencyColor(packageData.urgency)}`}>
                {getUrgencyIcon(packageData.urgency)}
                <span className="ml-1">{packageData.urgency.toUpperCase()}</span>
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <DollarSign className="w-5 h-5 mr-1" />
                <span className="text-xl font-bold">${packageData.value}</span>
              </div>
              <div className="text-xs text-gray-500">Package Value</div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">{packageData.description}</h2>
          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <strong>Category:</strong> {packageData.category}
          </div>
        </div>

        {/* Package Specifications */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-600" />
            Package Specifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium text-gray-800">{packageData.weight} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Dimensions</span>
              <span className="font-medium text-gray-800">{packageData.dimensions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                {packageData.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Posted</span>
              <span className="font-medium text-gray-800">
                {new Date(packageData.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Delivery Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Route</div>
                <div className="text-sm text-gray-600">{packageData.fromLocation} → {packageData.toLocation}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Send By</div>
                <div className="text-sm text-gray-600">{new Date(packageData.sendDate).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Urgency</div>
                <div className="text-sm text-gray-600 capitalize">{packageData.urgency} priority</div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {packageData.specialInstructions && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Special Instructions
            </h3>
            <p className="text-yellow-800 text-sm leading-relaxed">{packageData.specialInstructions}</p>
          </div>
        )}

        {/* Sender Information */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-600" />
            Sender Information
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-800">{packageData.sender}</div>
              <div className="text-sm text-gray-600">Package Owner</div>
            </div>
            
            {showContactInfo && (
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-green-800">{packageData.senderPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-green-800">{packageData.senderEmail}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-orange-600" />
            Recipient Information
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-800">{packageData.recipient}</div>
              <div className="text-sm text-gray-600">Package Recipient</div>
            </div>
            
            {showContactInfo && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-green-800">{packageData.recipientPhone}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        {showContactInfo && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact Information Unlocked
            </h3>
            
            <div className="text-sm text-green-700">
              <p className="mb-2">You now have access to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Sender's phone number and email</li>
                <li>Recipient's phone number</li>
                <li>Direct communication channels</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="sticky bottom-4">
          {!showContactInfo ? (
            <button
              onClick={handleGetContactInfo}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Get Contact Information - $12.99
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-2">Contact information unlocked!</p>
              <p className="text-sm text-gray-600">You can now contact the sender and recipient directly</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PackageDetail;
