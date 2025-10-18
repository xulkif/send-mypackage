import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Package, MapPin, DollarSign, Calendar, Star } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', travelers: 120, packages: 85, deliveries: 78, revenue: 1250 },
    { month: 'Feb', travelers: 135, packages: 92, deliveries: 89, revenue: 1420 },
    { month: 'Mar', travelers: 148, packages: 108, deliveries: 102, revenue: 1680 },
    { month: 'Apr', travelers: 162, packages: 125, deliveries: 118, revenue: 1890 },
    { month: 'May', travelers: 175, packages: 142, deliveries: 135, revenue: 2150 },
    { month: 'Jun', travelers: 189, packages: 158, deliveries: 152, revenue: 2380 }
  ];

  const routeData = [
    { name: 'NYC-London', travelers: 45, packages: 32 },
    { name: 'LA-Tokyo', travelers: 38, packages: 28 },
    { name: 'Chicago-Paris', travelers: 42, packages: 35 },
    { name: 'Miami-Madrid', travelers: 35, packages: 29 },
    { name: 'Boston-Rome', travelers: 28, packages: 22 }
  ];

  const userTypesData = [
    { name: 'Travelers', value: 1247, color: '#3B82F6' },
    { name: 'Senders', value: 892, color: '#10B981' },
    { name: 'Both', value: 356, color: '#8B5CF6' }
  ];

  const revenueData = [
    { period: 'Week 1', revenue: 450 },
    { period: 'Week 2', revenue: 520 },
    { period: 'Week 3', revenue: 480 },
    { period: 'Week 4', revenue: 610 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const statsCards = [
    {
      title: 'Total Users',
      value: '2,495',
      change: '+23%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Travelers',
      value: '1,247',
      change: '+18%',
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Packages Posted',
      value: '892',
      change: '+31%',
      changeType: 'positive',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Successful Deliveries',
      value: '3,156',
      change: '+27%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+35%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Star,
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center">
          <Link to="/" className="mr-3 sm:mr-4">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Platform Statistics</h1>
        </div>
      </header>

      {/* Period Selector */}
      <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 lg:px-6 pb-6 sm:pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-600`} />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Monthly Growth Chart */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
            Monthly Growth
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="travelers" fill="#3B82F6" name="Travelers" />
                <Bar dataKey="packages" fill="#10B981" name="Packages" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
            Revenue Trend
          </h3>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Routes */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
            Popular Routes
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {routeData.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800 text-sm sm:text-base">{route.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {route.travelers} travelers • {route.packages} packages
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-medium text-gray-800">
                    {Math.round((route.packages / route.travelers) * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">match rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
            User Distribution
          </h3>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">4.8</div>
              <div className="text-xs sm:text-sm text-blue-700">Avg Rating</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-green-600">2.3</div>
              <div className="text-xs sm:text-sm text-green-700">Days Avg Delivery</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">$18.50</div>
              <div className="text-xs sm:text-sm text-purple-700">Avg Transaction</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">87%</div>
              <div className="text-xs sm:text-sm text-orange-700">Repeat Users</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
