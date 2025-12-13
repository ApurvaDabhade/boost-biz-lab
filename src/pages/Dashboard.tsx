import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';
import { 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Users, 
  Gift,
  MapPin,
  Bot,
  Bell,
  Settings,
  LogOut,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight
} from 'lucide-react';
import foodStallBg from '@/assets/food-stall-bg.jpg';
import indianThali from '@/assets/indian-thali.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDish, setSelectedDish] = useState<string | null>(null);

  // Stock market style price tracker data
  const priceTrackerData = [
    { ingredient: 'Sunflower Oil', unit: '1L', price: 138.70, change: 2.5, trend: 'up' },
    { ingredient: 'Onion', unit: '1kg', price: 32.00, change: -5.0, trend: 'down' },
    { ingredient: 'Tomato', unit: '1kg', price: 45.00, change: 0, trend: 'neutral' },
    { ingredient: 'Potato', unit: '1kg', price: 28.00, change: -2.0, trend: 'down' },
    { ingredient: 'Ginger', unit: '250g', price: 35.00, change: 3.0, trend: 'up' },
    { ingredient: 'Garlic', unit: '250g', price: 40.00, change: 0, trend: 'neutral' },
    { ingredient: 'Green Chilli', unit: '100g', price: 15.00, change: -1.0, trend: 'down' },
    { ingredient: 'Coriander', unit: '100g', price: 12.00, change: 0, trend: 'neutral' },
    { ingredient: 'Cumin Seeds', unit: '100g', price: 45.00, change: 1.5, trend: 'up' },
    { ingredient: 'Turmeric Powder', unit: '100g', price: 25.00, change: 0, trend: 'neutral' },
  ];

  // Recipe breakdown data - cost per plate
  const recipeData = [
    { 
      dish: 'Poha', 
      emoji: '🍚',
      totalCost: 18,
      ingredients: [
        { name: 'Poha', qty: '100g', cost: 8 },
        { name: 'Onion', qty: '50g', cost: 2 },
        { name: 'Potato', qty: '50g', cost: 1 },
        { name: 'Oil', qty: '15ml', cost: 2 },
        { name: 'Spices', qty: 'mix', cost: 3 },
        { name: 'Peanuts', qty: '20g', cost: 2 },
      ]
    },
    { 
      dish: 'Upma', 
      emoji: '🥣',
      totalCost: 15,
      ingredients: [
        { name: 'Suji', qty: '100g', cost: 6 },
        { name: 'Onion', qty: '30g', cost: 1 },
        { name: 'Vegetables', qty: '50g', cost: 3 },
        { name: 'Oil', qty: '10ml', cost: 1 },
        { name: 'Spices', qty: 'mix', cost: 4 },
      ]
    },
    { 
      dish: 'Vada Pav', 
      emoji: '🥔',
      totalCost: 12,
      ingredients: [
        { name: 'Pav', qty: '1 pc', cost: 3 },
        { name: 'Potato', qty: '80g', cost: 2 },
        { name: 'Besan', qty: '30g', cost: 2 },
        { name: 'Chutney', qty: 'mix', cost: 2 },
        { name: 'Oil', qty: '20ml', cost: 3 },
      ]
    },
    { 
      dish: 'Tea', 
      emoji: '☕',
      totalCost: 8,
      ingredients: [
        { name: 'Tea Leaves', qty: '5g', cost: 2 },
        { name: 'Milk', qty: '100ml', cost: 4 },
        { name: 'Sugar', qty: '10g', cost: 1 },
        { name: 'Ginger', qty: '2g', cost: 1 },
      ]
    },
  ];

  // Dish recommendations based on existing menu
  const dishRecommendations = [
    { baseDish: 'Poha', recommended: 'Upma', reason: 'Same equipment, similar ingredients', emoji: '🥣' },
    { baseDish: 'Tea', recommended: 'Bun Maska', reason: 'Perfect combo, easy to add', emoji: '🥐' },
    { baseDish: 'Vada Pav', recommended: 'Samosa', reason: 'Uses same frying setup', emoji: '🥟' },
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

  const selectedRecipe = recipeData.find(r => r.dish === selectedDish);

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

        {/* 📊 INGREDIENT PRICE TRACKER - Stock Market Style */}
        <div className="mb-8">
          <Card className="bg-card border-border shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    Ingredient Price Tracker
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Today's market prices • Updated just now
                  </CardDescription>
                </div>
                <Badge className="bg-primary/20 text-primary text-lg px-4 py-2">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Stock ticker style header */}
              <div className="grid grid-cols-4 bg-muted/50 px-6 py-3 border-b border-border text-sm font-semibold text-muted-foreground">
                <span>Ingredient</span>
                <span className="text-center">Unit</span>
                <span className="text-right">Price (₹)</span>
                <span className="text-center">Trend</span>
              </div>
              
              {/* Price rows */}
              <div className="divide-y divide-border">
                {priceTrackerData.map((item, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-4 px-6 py-4 hover:bg-muted/30 transition-colors items-center"
                  >
                    <span className="font-semibold text-lg text-foreground">{item.ingredient}</span>
                    <span className="text-center text-muted-foreground">{item.unit}</span>
                    <span className="text-right text-xl font-bold text-foreground">₹{item.price.toFixed(0)}</span>
                    <div className="flex items-center justify-center gap-2">
                      {item.trend === 'up' && (
                        <>
                          <ArrowUp className="h-6 w-6 text-red-500" />
                          <span className="text-red-500 font-semibold">+{item.change}%</span>
                        </>
                      )}
                      {item.trend === 'down' && (
                        <>
                          <ArrowDown className="h-6 w-6 text-green-500" />
                          <span className="text-green-500 font-semibold">{item.change}%</span>
                        </>
                      )}
                      {item.trend === 'neutral' && (
                        <>
                          <Minus className="h-6 w-6 text-muted-foreground" />
                          <span className="text-muted-foreground">No change</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick insight */}
              <div className="bg-accent/10 border-t border-accent/20 px-6 py-4">
                <p className="text-accent font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  💡 Tip: Onion & Potato prices are down today - good time to stock up!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🍛 RECIPE BREAKDOWN */}
        <div className="mb-8">
          <Card className="bg-card border-border shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-border">
              <CardTitle className="text-2xl flex items-center gap-3">
                <span className="text-3xl">🍛</span>
                Recipe Cost Breakdown
              </CardTitle>
              <CardDescription className="text-base">
                Tap a dish to see ingredient cost per plate
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Dish selector - big tap targets */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {recipeData.map((recipe) => (
                  <Button
                    key={recipe.dish}
                    onClick={() => setSelectedDish(selectedDish === recipe.dish ? null : recipe.dish)}
                    variant={selectedDish === recipe.dish ? 'default' : 'outline'}
                    className={`h-24 flex flex-col items-center justify-center gap-2 text-lg ${
                      selectedDish === recipe.dish 
                        ? 'bg-primary text-primary-foreground' 
                        : 'border-2 hover:border-primary'
                    }`}
                  >
                    <span className="text-3xl">{recipe.emoji}</span>
                    <span className="font-semibold">{recipe.dish}</span>
                    <span className="text-sm opacity-80">₹{recipe.totalCost}/plate</span>
                  </Button>
                ))}
              </div>
              
              {/* Selected recipe breakdown */}
              {selectedRecipe && (
                <div className="bg-muted/50 rounded-xl p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <span className="text-2xl">{selectedRecipe.emoji}</span>
                      {selectedRecipe.dish} - Ingredients
                    </h4>
                    <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                      Total: ₹{selectedRecipe.totalCost}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-foreground">{ing.name}</p>
                          <p className="text-sm text-muted-foreground">{ing.qty}</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₹{ing.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 🍽️ DISH RECOMMENDATIONS */}
        <div className="mb-8">
          <Card className="bg-card border-border shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-secondary/10 border-b border-border">
              <CardTitle className="text-2xl flex items-center gap-3">
                <span className="text-3xl">🍽️</span>
                Easy Dish Recommendations
              </CardTitle>
              <CardDescription className="text-base">
                Add these to your menu - no new equipment needed!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dishRecommendations.map((rec, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between bg-muted/50 rounded-xl p-4 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{rec.emoji}</span>
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          Add <span className="text-primary">{rec.recommended}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You sell {rec.baseDish} → {rec.reason}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
      </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
