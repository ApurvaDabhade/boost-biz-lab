import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';
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
import foodStallBg from '@/assets/food-stall-bg.jpg';
import indianThali from '@/assets/indian-thali.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTrendTab, setActiveTrendTab] = useState('price-tracker');

  // Mock data for trends features - Updated with Masala Karela recipe data
  const priceTrackerData = [
    { ingredient: 'Amchur', price: 182.27, adjustedPrice: 182.27, trend: 'neutral' },
    { ingredient: 'Cumin Seeds', price: 170.61, adjustedPrice: 170.61, trend: 'neutral' },
    { ingredient: 'Sunflower Oil', price: 138.70, adjustedPrice: 138.70, trend: 'neutral' },
    { ingredient: 'Coriander Powder', price: 132.90, adjustedPrice: 132.90, trend: 'neutral' },
    { ingredient: 'Salt', price: 95.50, adjustedPrice: 95.50, trend: 'neutral' },
    { ingredient: 'Turmeric Powder', price: 87.79, adjustedPrice: 87.79, trend: 'neutral' },
    { ingredient: 'Red Chilli Powder', price: 71.80, adjustedPrice: 71.80, trend: 'neutral' },
    { ingredient: 'Karela', price: 20.18, adjustedPrice: 20.18, trend: 'neutral' },
    { ingredient: 'Gram Flour', price: 17.71, adjustedPrice: 17.71, trend: 'neutral' },
    { ingredient: 'Onion', price: 16.29, adjustedPrice: 16.29, trend: 'neutral' },
  ];

  const recipeBreakdownData = [
    { dish: 'Masala Karela', ingredient: 'Amchur', quantity: '10g', price: 18.23, predictedPrice: 18.23, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Cumin Seeds', quantity: '5g', price: 8.53, predictedPrice: 8.53, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Sunflower Oil', quantity: '30ml', price: 4.16, predictedPrice: 4.16, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Coriander Powder', quantity: '8g', price: 10.63, predictedPrice: 10.63, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Salt', quantity: '5g', price: 0.48, predictedPrice: 0.48, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Turmeric Powder', quantity: '3g', price: 2.63, predictedPrice: 2.63, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Red Chilli Powder', quantity: '5g', price: 3.59, predictedPrice: 3.59, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Karela', quantity: '500g', price: 10.09, predictedPrice: 10.09, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Gram Flour', quantity: '50g', price: 0.89, predictedPrice: 0.89, trend: 'neutral' },
    { dish: 'Masala Karela', ingredient: 'Onion', quantity: '100g', price: 1.63, predictedPrice: 1.63, trend: 'neutral' },
  ];

  const dishRecommendations = [
    { baseDish: 'Masala Karela', recommendation: 'Stuffed Karela', category: 'Vegetable Based', trending: false, costEstimate: 65, prepTime: '30 min' },
    { baseDish: 'Masala Karela', recommendation: 'Karela Chips', category: 'Snacks', trending: true, costEstimate: 45, prepTime: '20 min' },
    { baseDish: 'Masala Karela', recommendation: 'Karela Raita', category: 'Side Dish', trending: false, costEstimate: 35, prepTime: '15 min' },
    { baseDish: 'Masala Karela', recommendation: 'Karela Pickle', category: 'Preserved', trending: true, costEstimate: 55, prepTime: '45 min' },
    { baseDish: 'Masala Karela', recommendation: 'Karela Curry', category: 'Main Course', trending: false, costEstimate: 75, prepTime: '25 min' },
    { baseDish: 'Masala Karela', recommendation: 'Karela Paratha', category: 'Bread', trending: false, costEstimate: 40, prepTime: '35 min' },
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={foodStallBg} alt="Food stall background" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
          </div>
          
          <MobileSidebarTrigger />
          {/* Header */}
          <header className="sticky top-0 z-40 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('app.name')}</h1>
            <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={() => navigate('/')}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-muted-foreground">Here's what's happening with your business today</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden shadow-lg">
                <img src={indianThali} alt="Indian Thali" className="w-full h-full object-cover" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🥗</span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🍕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-card border-border p-6 relative overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
              <div className="absolute top-2 right-2 opacity-20">
                {index === 0 && <span className="text-2xl">💰</span>}
                {index === 1 && <span className="text-2xl">♻️</span>}
                {index === 2 && <span className="text-2xl">🍽️</span>}
                {index === 3 && <span className="text-2xl">🎉</span>}
              </div>
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'secondary' : 'outline'}
                  className={metric.trend === 'up' ? 'bg-accent text-accent-foreground' : metric.trend === 'down' ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}
                >
                  {metric.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{metric.value}</p>
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
                className="bg-card border-border p-6 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/20"
                onClick={() => navigate(action.route)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-card-foreground">{action.title}</h4>
                <p className="text-muted-foreground text-sm">{action.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Trends Features Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">🌟 Trends Intelligence Hub</h3>
              <p className="text-muted-foreground">AI-powered insights for smarter cost management and menu innovation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-border">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="border-border">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Smart Suggestions Based on Data */}
          <Card className="bg-card border-primary/30 mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                <h4 className="text-xl font-bold text-primary">Smart Recommendations</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                  <div className="flex items-center mb-2">
                    <span className="text-accent mr-2">📈</span>
                    <span className="text-sm font-semibold text-card-foreground">Price Stability</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    All Masala Karela ingredients showing stable pricing (0% change). Amchur (₹182.27) and Cumin Seeds (₹170.61) are premium spices - good time to stock up.
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                  <div className="flex items-center mb-2">
                    <span className="text-secondary mr-2">💡</span>
                    <span className="text-sm font-semibold text-card-foreground">Menu Innovation</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Karela Chips and Karela Pickle are trending! Low-cost ingredients (Karela ₹20.18/kg, Onion ₹16.29/kg) make these profitable additions to your menu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTrendTab} onValueChange={setActiveTrendTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted border-border">
              <TabsTrigger value="price-tracker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🥦 Price Tracker</TabsTrigger>
              <TabsTrigger value="recipe-breakdown" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🍛 Recipe Breakdown</TabsTrigger>
              <TabsTrigger value="dish-recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🍽️ Dish Recommendations</TabsTrigger>
            </TabsList>

            {/* Price Tracker Tab */}
            <TabsContent value="price-tracker" className="space-y-4">
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Ingredient Price Tracker</CardTitle>
                  <CardDescription className="text-muted-foreground">Real-time market prices and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-muted-foreground">Ingredient</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Price (INR)</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Adjusted Price (INR)</th>
                          <th className="text-center py-3 px-4 text-muted-foreground">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceTrackerData.map((item, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 text-card-foreground font-medium">{item.ingredient}</td>
                            <td className="py-3 px-4 text-right text-card-foreground">₹{item.price}</td>
                            <td className="py-3 px-4 text-right text-primary">₹{item.adjustedPrice}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trend === 'up' && <ArrowUp className="h-4 w-4 text-accent mx-auto" />}
                              {item.trend === 'down' && <ArrowDown className="h-4 w-4 text-destructive mx-auto" />}
                              {item.trend === 'neutral' && <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />}
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
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recipe Ingredient Breakdown</CardTitle>
                  <CardDescription className="text-muted-foreground">Detailed cost analysis for your menu items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-muted-foreground">Dish</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Ingredient</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Quantity</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Current Price</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Predicted Price</th>
                          <th className="text-center py-3 px-4 text-muted-foreground">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipeBreakdownData.map((item, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 text-card-foreground font-medium">{item.dish}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.ingredient}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.quantity}</td>
                            <td className="py-3 px-4 text-right text-card-foreground">₹{item.price}</td>
                            <td className="py-3 px-4 text-right text-primary">₹{item.predictedPrice}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trend === 'up' && <ArrowUp className="h-4 w-4 text-accent mx-auto" />}
                              {item.trend === 'down' && <ArrowDown className="h-4 w-4 text-destructive mx-auto" />}
                              {item.trend === 'neutral' && <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />}
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
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Smart Dish Recommendations</CardTitle>
                  <CardDescription className="text-muted-foreground">AI-powered suggestions to expand your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-muted-foreground">Base Dish</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Recommendation</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Category</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Cost Estimate</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Prep Time</th>
                          <th className="text-center py-3 px-4 text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dishRecommendations.map((item, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 text-card-foreground font-medium">{item.baseDish}</td>
                            <td className="py-3 px-4 text-primary font-medium">{item.recommendation}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                            <td className="py-3 px-4 text-right text-card-foreground">₹{item.costEstimate}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.prepTime}</td>
                            <td className="py-3 px-4 text-center">
                              {item.trending ? (
                                <Badge className="bg-secondary text-secondary-foreground">🔥 Trending</Badge>
                              ) : (
                                <Badge variant="outline" className="border-border text-muted-foreground">Regular</Badge>
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
          <Card className="bg-card border-primary/30 shadow-lg hover:shadow-primary/20 transition-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h4 className="text-xl font-bold text-primary">Today's Trends</h4>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>✨ Peak hours: 12PM-2PM & 7PM-9PM</li>
              <li>🔥 Hot item: Paneer Roll (+45% orders)</li>
              <li>📍 High footfall near Gateway of India</li>
              <li>🎉 Diwali prep: Stock up on sweets</li>
            </ul>
          </Card>

          <Card className="bg-card border-accent/30 shadow-lg hover:shadow-accent/20 transition-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-accent" />
              <h4 className="text-xl font-bold text-accent">Smart Recommendations</h4>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>💡 Consider combo offers for slow items</li>
              <li>🎯 Reduce paneer quantity by 15%</li>
              <li>📢 Launch festival special menu</li>
              <li>🤝 Connect with 3 nearby suppliers</li>
            </ul>
          </Card>
        </div>
      </div>
      </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
