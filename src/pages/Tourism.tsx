import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Users, TrendingUp, Bell, ChefHat } from 'lucide-react';

const Tourism = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const touristHotspots = [
    { name: 'Gateway of India', distance: '2.5 km', footfall: 'High', trend: '+35%' },
    { name: 'Marine Drive', distance: '3.1 km', footfall: 'Very High', trend: '+42%' },
    { name: 'Colaba Market', distance: '1.8 km', footfall: 'Medium', trend: '+18%' },
  ];

  const upcomingEvents = [
    { name: 'Ganesh Chaturthi', date: 'Sep 7-17', impact: 'Very High', preparation: '15 days' },
    { name: 'Navratri Festival', date: 'Oct 3-12', impact: 'High', preparation: '20 days' },
    { name: 'Diwali', date: 'Nov 1', impact: 'Very High', preparation: '25 days' },
  ];

  const trendingItems = [
    { item: 'Vada Pav', demand: '↑ 45%', reason: 'Tourist favorite' },
    { item: 'Masala Chai', demand: '↑ 38%', reason: 'Cold weather approaching' },
    { item: 'Pav Bhaji', demand: '↑ 32%', reason: 'Evening demand spike' },
    { item: 'Fresh Coconut Water', demand: '↑ 28%', reason: 'Tourist preference' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-blue-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-400">🗺️ {t('dashboard.tourism')}</h1>
              <p className="text-sm text-blue-200">{t('dashboard.tourismDesc')}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Visitor Traffic Forecast */}
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" />
            Visitor Traffic Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {touristHotspots.map((spot, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-900/30 to-black border-blue-700 p-6 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{spot.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {spot.distance}
                    </p>
                  </div>
                  <Badge className={
                    spot.footfall === 'Very High' ? 'bg-green-600 text-white' :
                    spot.footfall === 'High' ? 'bg-blue-600 text-white' :
                    'bg-yellow-600 text-white'
                  }>
                    {spot.footfall}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-bold">{spot.trend}</span>
                  <span className="text-gray-400 text-sm">vs last week</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="animate-fade-in-up animation-delay-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-400" />
            Upcoming Events & Festivals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700 p-6 card-hover"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">{event.name}</h3>
                </div>
                <p className="text-gray-400 mb-2">📅 {event.date}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Business Impact:</span>
                  <Badge className={
                    event.impact === 'Very High' ? 'bg-red-600 text-white' :
                    'bg-orange-600 text-white'
                  }>
                    {event.impact}
                  </Badge>
                </div>
                <p className="text-sm text-blue-400">⏱️ Prepare in {event.preparation}</p>
                <Button
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {}}
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Prepare Menu
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Items */}
        <section className="animate-fade-in-up animation-delay-400">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            What Tourists are Craving
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingItems.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-green-900/30 to-black border-green-700 p-6 card-hover"
              >
                <h3 className="text-lg font-bold text-white mb-2">{item.item}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-green-400">{item.demand}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{item.reason}</p>
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {}}
                >
                  Add to Menu
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Smart Recommendations */}
        <section className="animate-fade-in-up animation-delay-600">
          <Card className="bg-gradient-to-br from-cyan-900/30 to-black border-cyan-700 p-8">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">Smart Recommendation</h3>
                <p className="text-gray-300 mb-4">
                  Based on tourist preferences and upcoming Ganesh Chaturthi, consider offering:
                  <strong className="text-cyan-400"> Modak, Coconut Barfi, and Festive Thalis</strong>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-cyan-600 text-white">+60% Demand Expected</Badge>
                  <Badge className="bg-purple-600 text-white">Peak: Sep 7-10</Badge>
                  <Badge className="bg-green-600 text-white">High Profit Margin</Badge>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Apply Recommendation
                  </Button>
                  <Button variant="outline" className="border-cyan-600 text-cyan-400 hover:bg-cyan-900/50">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Tourism;
