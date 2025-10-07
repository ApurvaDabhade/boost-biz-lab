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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('app.name')}</h1>
            <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
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
          <p className="text-muted-foreground">Here's what's happening with your business today</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'secondary' : 'outline'}
                >
                  {metric.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
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
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate(action.route)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{action.title}</h4>
                <p className="text-muted-foreground text-sm">{action.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/20 dark:to-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h4 className="text-xl font-bold text-cyan-700 dark:text-cyan-400">Today's Trends</h4>
            </div>
            <ul className="space-y-3 text-foreground/80">
              <li>✨ Peak hours: 12PM-2PM & 7PM-9PM</li>
              <li>🔥 Hot item: Paneer Roll (+45% orders)</li>
              <li>📍 High footfall near Gateway of India</li>
              <li>🎉 Diwali prep: Stock up on sweets</li>
            </ul>
          </Card>

          <Card className="p-6 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Smart Recommendations</h4>
            </div>
            <ul className="space-y-3 text-foreground/80">
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
