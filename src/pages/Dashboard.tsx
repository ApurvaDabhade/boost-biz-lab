import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-blue-200">Here's what's happening with your business today</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6">
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

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-cyan-900/30 to-black border-cyan-700 p-6">
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

          <Card className="bg-gradient-to-br from-emerald-900/30 to-black border-emerald-700 p-6">
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
