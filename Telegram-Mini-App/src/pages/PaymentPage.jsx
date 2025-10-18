import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Check, Lock, DollarSign, User, Package } from 'lucide-react';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, id, name, description, price } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setPaymentData(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPaymentData(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    setCompleted(true);

    // Redirect to detail page after payment
    setTimeout(() => {
      if (type === 'traveler') {
        navigate(`/traveler/${id}`, { 
          state: { paymentCompleted: true }
        });
      } else {
        navigate(`/package/${id}`, { 
          state: { paymentCompleted: true }
        });
      }
    }, 3000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully. You now have access to the contact information.
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center">
          <Link to={type === 'traveler' ? '/travelers' : '/packages'} className="mr-3 sm:mr-4">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Payment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Order Summary</h3>
          
          <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              {type === 'traveler' ? <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> : <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                {type === 'traveler' ? 'Traveler Contact Information' : 'Package Contact Information'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {type === 'traveler' ? name : description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-base sm:text-lg font-bold text-gray-800">${price}</div>
              <div className="text-xs text-gray-500">One-time payment</div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Total</span>
              <span className="text-lg sm:text-xl font-bold text-green-600">${price}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-800">Credit/Debit Card</span>
            </label>
            
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-medium text-gray-800">PayPal</span>
            </label>
          </div>
        </div>

        {/* Payment Form */}
        {paymentMethod === 'card' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Card Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={paymentData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Secure Payment</h4>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pay ${price} Now
                </>
              )}
            </button>
          </form>
        )}

        {paymentMethod === 'paypal' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">PayPal Payment</h3>
              <p className="text-gray-600 text-sm mb-4">
                You will be redirected to PayPal to complete your payment securely.
              </p>
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Redirecting...' : 'Pay with PayPal'}
              </button>
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By proceeding with payment, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
