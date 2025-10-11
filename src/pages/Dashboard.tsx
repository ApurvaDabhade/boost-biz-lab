import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Gift,
  MapPin,
  Bot,
  Bell,
  Settings,
  LogOut,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Download,
  Filter,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTrendTab, setActiveTrendTab] = useState('price-tracker');

  // Mock data for trends features
  const priceTrackerData = [
    { ingredient: 'Onions', unit: 'per kg', currentPrice: 45, change: '+5%', trend: 'up', weeklyAvg: 42, monthlyAvg: 38 },
    { ingredient: 'Tomatoes', unit: 'per kg', currentPrice: 60, change: '-12%', trend: 'down', weeklyAvg: 68, monthlyAvg: 72 },
    { ingredient: 'Paneer', unit: 'per kg', currentPrice: 320, change: '0%', trend: 'neutral', weeklyAvg: 320, monthlyAvg: 315 },
    { ingredient: 'Rice', unit: 'per kg', currentPrice: 55, change: '+8%', trend: 'up', weeklyAvg: 51, monthlyAvg: 48 },
    { ingredient: 'Oil', unit: 'per liter', currentPrice: 180, change: '+3%', trend: 'up', weeklyAvg: 175, monthlyAvg: 170 },
    { ingredient: 'Spices Mix', unit: 'per 100g', currentPrice: 25, change: '-5%', trend: 'down', weeklyAvg: 26, monthlyAvg: 28 },
  ];

  const recipeBreakdownData = [
    { dish: 'Palak Paneer', ingredient: 'Paneer', quantity: '200g', price: 64, predictedPrice: 66, trend: 'up' },
    { dish: 'Palak Paneer', ingredient: 'Spinach', quantity: '500g', price: 25, predictedPrice: 22, trend: 'down' },
    { dish: 'Palak Paneer', ingredient: 'Spices & Oil', quantity: '50g', price: 15, predictedPrice: 16, trend: 'up' },
    { dish: 'Paneer Tikka', ingredient: 'Paneer', quantity: '300g', price: 96, predictedPrice: 99, trend: 'up' },
    { dish: 'Paneer Tikka', ingredient: 'Yogurt', quantity: '100ml', price: 8, predictedPrice: 8, trend: 'neutral' },
    { dish: 'Paneer Tikka', ingredient: 'Spices', quantity: '30g', price: 12, predictedPrice: 13, trend: 'up' },
  ];

  const dishRecommendations = [
    { baseDish: 'Palak Paneer', recommendation: 'Paneer Tikka', category: 'Paneer Based', trending: false, costEstimate: 120, prepTime: '25 min' },
    { baseDish: 'Palak Paneer', recommendation: 'Shahi Paneer', category: 'Paneer Based', trending: false, costEstimate: 135, prepTime: '30 min' },
    { baseDish: 'Palak Paneer', recommendation: 'Chilli Paneer', category: 'Paneer Based', trending: false, costEstimate: 110, prepTime: '20 min' },
    { baseDish: 'Palak Paneer', recommendation: 'Paneer Tikka Tacos', category: 'Fusion', trending: true, costEstimate: 95, prepTime: '15 min' },
    { baseDish: 'Paneer Tikka', recommendation: 'Paneer Butter Masala', category: 'Paneer Based', trending: false, costEstimate: 140, prepTime: '35 min' },
    { baseDish: 'Paneer Tikka', recommendation: 'Paneer Pakoda', category: 'Paneer Based', trending: false, costEstimate: 85, prepTime: '18 min' },
  ];

  const metrics = [
    { label: t('dashboard.sales'), value: '₹12,450', change: '+15%', trend: 'up' },
    { label: t('dashboard.waste'), value: '8%', change: '-3%', trend: 'down' },
    { label: t('dashboard.topItem'), value: 'Paneer Roll', change: '234 sold', trend: 'neutral' },
    { label: t('dashboard.nextEvent'), value: 'Diwali', change: 'in 5 days', trend: 'neutral' },
  ];

  const quickActions = [
    {
      icon: Bot,
      title: 'Startup Mitra',
      desc: 'Business guidance & advice',
      color: 'from-purple-600 to-purple-800',
      route: '/startup-mitra',
    },
    {
      icon: Bot,
      title: 'ChefGuru',
      desc: 'Kitchen intelligence assistant',
      color: 'from-indigo-600 to-indigo-800',
      route: '/chef-guru',
    },
    {
      icon: Package,
      title: t('dashboard.inventory'),
      desc: t('dashboard.inventoryDesc'),
      color: 'from-blue-600 to-blue-800',
      route: '/inventory',
    },
    {
      icon: MessageSquare,
      title: t('dashboard.reviews'),
      desc: t('dashboard.reviewsDesc'),
      color: 'from-green-600 to-green-800',
      route: '/reviews',
    },
    {
      icon: Users,
      title: t('dashboard.community'),
      desc: t('dashboard.communityDesc'),
      color: 'from-orange-600 to-orange-800',
      route: '/community-hub',
    },
    {
      icon: Gift,
      title: t('dashboard.offers'),
      desc: t('dashboard.offersDesc'),
      color: 'from-pink-600 to-pink-800',
      route: '/offers',
    },
    {
      icon: MapPin,
      title: t('dashboard.tourism'),
      desc: t('dashboard.tourismDesc'),
      color: 'from-cyan-600 to-cyan-800',
      route: '/tourism',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-black border-b border-blue-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">{t('app.name')}</h1>
            <p className="text-sm text-blue-200">{t('app.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800"
              onClick={() => navigate('/')}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-blue-200">Here's what's happening with your business today</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🍛</span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🥗</span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🍕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-20">
                {index === 0 && <span className="text-2xl">💰</span>}
                {index === 1 && <span className="text-2xl">♻️</span>}
                {index === 2 && <span className="text-2xl">🍽️</span>}
                {index === 3 && <span className="text-2xl">🎉</span>}
              </div>
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-400">{metric.label}</p>
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'secondary' : 'outline'}
                  className={metric.trend === 'up' ? 'bg-green-600' : metric.trend === 'down' ? 'bg-red-600' : 'bg-blue-600'}
                >
                  {metric.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(action.route)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">{action.title}</h4>
                <p className="text-gray-300 text-sm">{action.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Trends Features Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">🌟 Trends Intelligence Hub</h3>
              <p className="text-gray-400">AI-powered insights for smarter cost management and menu innovation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-blue-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="border-blue-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Smart Suggestions Based on Data */}
          <Card className="bg-gradient-to-br from-blue-900/10 to-black border-blue-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-400 mr-3" />
                <h4 className="text-xl font-bold text-blue-400">Smart Recommendations</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-green-400 mr-2">📈</span>
                    <span className="text-sm font-semibold text-white">Stock Up Early</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Onions showing +5% increase trend - consider bulk purchase before prices rise further. Rice (+8%) and Oil (+3%) also trending upward.
                  </p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-2">💡</span>
                    <span className="text-sm font-semibold text-white">Menu Optimization</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Tomatoes down -12% - perfect time to feature tomato-based dishes. Paneer Tikka Tacos trending with 15min prep time and ₹95 cost.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTrendTab} onValueChange={setActiveTrendTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-blue-700">
              <TabsTrigger value="price-tracker" className="data-[state=active]:bg-blue-600">🥦 Price Tracker</TabsTrigger>
              <TabsTrigger value="recipe-breakdown" className="data-[state=active]:bg-blue-600">🍛 Recipe Breakdown</TabsTrigger>
              <TabsTrigger value="dish-recommendations" className="data-[state=active]:bg-blue-600">🍽️ Dish Recommendations</TabsTrigger>
            </TabsList>

            {/* Price Tracker Tab */}
            <TabsContent value="price-tracker" className="space-y-4">
              <Card className="bg-gray-900 border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">Ingredient Price Tracker</CardTitle>
                  <CardDescription className="text-gray-400">Real-time market prices and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Ingredient</th>
                          <th className="text-left py-3 px-4 text-gray-300">Unit</th>
                          <th className="text-right py-3 px-4 text-gray-300">Current Price</th>
                          <th className="text-right py-3 px-4 text-gray-300">Change</th>
                          <th className="text-right py-3 px-4 text-gray-300">Weekly Avg</th>
                          <th className="text-right py-3 px-4 text-gray-300">Monthly Avg</th>
                          <th className="text-center py-3 px-4 text-gray-300">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceTrackerData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{item.ingredient}</td>
                            <td className="py-3 px-4 text-gray-400">{item.unit}</td>
                            <td className="py-3 px-4 text-right text-white">₹{item.currentPrice}</td>
                            <td className={`py-3 px-4 text-right ${item.change.startsWith('+') ? 'text-green-400' : item.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                              {item.change}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-300">₹{item.weeklyAvg}</td>
                            <td className="py-3 px-4 text-right text-gray-300">₹{item.monthlyAvg}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trend === 'up' && <ArrowUp className="h-4 w-4 text-green-400 mx-auto" />}
                              {item.trend === 'down' && <ArrowDown className="h-4 w-4 text-red-400 mx-auto" />}
                              {item.trend === 'neutral' && <ArrowRight className="h-4 w-4 text-gray-400 mx-auto" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recipe Breakdown Tab */}
            <TabsContent value="recipe-breakdown" className="space-y-4">
              <Card className="bg-gray-900 border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">Recipe Ingredient Breakdown</CardTitle>
                  <CardDescription className="text-gray-400">Detailed cost analysis for your menu items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Dish</th>
                          <th className="text-left py-3 px-4 text-gray-300">Ingredient</th>
                          <th className="text-left py-3 px-4 text-gray-300">Quantity</th>
                          <th className="text-right py-3 px-4 text-gray-300">Current Price</th>
                          <th className="text-right py-3 px-4 text-gray-300">Predicted Price</th>
                          <th className="text-center py-3 px-4 text-gray-300">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipeBreakdownData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{item.dish}</td>
                            <td className="py-3 px-4 text-gray-300">{item.ingredient}</td>
                            <td className="py-3 px-4 text-gray-400">{item.quantity}</td>
                            <td className="py-3 px-4 text-right text-white">₹{item.price}</td>
                            <td className="py-3 px-4 text-right text-blue-400">₹{item.predictedPrice}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trend === 'up' && <ArrowUp className="h-4 w-4 text-green-400 mx-auto" />}
                              {item.trend === 'down' && <ArrowDown className="h-4 w-4 text-red-400 mx-auto" />}
                              {item.trend === 'neutral' && <ArrowRight className="h-4 w-4 text-gray-400 mx-auto" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dish Recommendations Tab */}
            <TabsContent value="dish-recommendations" className="space-y-4">
              <Card className="bg-gray-900 border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">Smart Dish Recommendations</CardTitle>
                  <CardDescription className="text-gray-400">AI-powered suggestions to expand your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Base Dish</th>
                          <th className="text-left py-3 px-4 text-gray-300">Recommendation</th>
                          <th className="text-left py-3 px-4 text-gray-300">Category</th>
                          <th className="text-right py-3 px-4 text-gray-300">Cost Estimate</th>
                          <th className="text-left py-3 px-4 text-gray-300">Prep Time</th>
                          <th className="text-center py-3 px-4 text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dishRecommendations.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{item.baseDish}</td>
                            <td className="py-3 px-4 text-blue-400 font-medium">{item.recommendation}</td>
                            <td className="py-3 px-4 text-gray-300">{item.category}</td>
                            <td className="py-3 px-4 text-right text-white">₹{item.costEstimate}</td>
                            <td className="py-3 px-4 text-gray-400">{item.prepTime}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trending ? (
                                <Badge className="bg-yellow-600 text-white">🔥 Trending</Badge>
                              ) : (
                                <Badge variant="outline" className="border-gray-600 text-gray-400">Regular</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-cyan-950/50 to-black/80 border-cyan-800/50 shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <h4 className="text-xl font-bold text-cyan-400">Today's Trends</h4>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>✨ Peak hours: 12PM-2PM & 7PM-9PM</li>
              <li>🔥 Hot item: Paneer Roll (+45% orders)</li>
              <li>📍 High footfall near Gateway of India</li>
              <li>🎉 Diwali prep: Stock up on sweets</li>
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-950/50 to-black/80 border-emerald-800/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h4 className="text-xl font-bold text-emerald-400">Smart Recommendations</h4>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>💡 Consider combo offers for slow items</li>
              <li>🎯 Reduce paneer quantity by 15%</li>
              <li>📢 Launch festival special menu</li>
              <li>🤝 Connect with 3 nearby suppliers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
