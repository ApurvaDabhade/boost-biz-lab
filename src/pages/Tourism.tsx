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
    { name: 'गेटवे ऑफ इंडिया', distance: '2.5 km', footfall: 'बहुत ज़्यादा', trend: '+35%' },
    { name: 'मरीन ड्राइव', distance: '3.1 km', footfall: 'बहुत ज़्यादा', trend: '+42%' },
    { name: 'कोलाबा मार्केट', distance: '1.8 km', footfall: 'मध्यम', trend: '+18%' },
  ];

  const upcomingEvents = [
    { name: 'गणेश चतुर्थी', date: '7-17 सितंबर', impact: 'बहुत ज़्यादा', preparation: '15 दिन' },
    { name: 'नवरात्रि', date: '3-12 अक्टूबर', impact: 'ज़्यादा', preparation: '20 दिन' },
    { name: 'दिवाली', date: '1 नवंबर', impact: 'बहुत ज़्यादा', preparation: '25 दिन' },
  ];

  const trendingItems = [
    { item: 'वड़ा पाव', demand: '↑ 45%', reason: 'टूरिस्ट फेवरेट' },
    { item: 'मसाला चाय', demand: '↑ 38%', reason: 'ठंड आ रही है' },
    { item: 'पाव भाजी', demand: '↑ 32%', reason: 'शाम को डिमांड' },
    { item: 'नारियल पानी', demand: '↑ 28%', reason: 'टूरिस्ट पसंद' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-foreground hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">🗺️ टूरिज़्म इनसाइट</h1>
              <p className="text-sm text-muted-foreground">विज़िटर ट्रैफिक और मौके</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Visitor Traffic Forecast */}
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
            <Users className="h-6 w-6 text-primary" />
            विज़िटर ट्रैफिक
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {touristHotspots.map((spot, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 card-hover shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{spot.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {spot.distance}
                    </p>
                  </div>
                  <Badge className={
                    spot.footfall === 'बहुत ज़्यादा' ? 'bg-accent' :
                    spot.footfall === 'ज़्यादा' ? 'bg-primary' :
                    'bg-secondary'
                  }>
                    {spot.footfall}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-accent font-bold">{spot.trend}</span>
                  <span className="text-muted-foreground text-sm">पिछले हफ्ते से</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
            <Calendar className="h-6 w-6 text-secondary" />
            आने वाले त्योहार
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 card-hover shadow-lg hover:shadow-secondary/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-5 w-5 text-secondary" />
                  <h3 className="text-lg font-bold text-foreground">{event.name}</h3>
                </div>
                <p className="text-muted-foreground mb-2">📅 {event.date}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">बिज़नेस इम्पैक्ट:</span>
                  <Badge className={
                    event.impact === 'बहुत ज़्यादा' ? 'bg-destructive' :
                    'bg-secondary'
                  }>
                    {event.impact}
                  </Badge>
                </div>
                <p className="text-sm text-primary">⏱️ {event.preparation} में तैयारी करें</p>
                <Button
                  className="w-full mt-4 bg-secondary hover:bg-secondary/90"
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  मेनू तैयार करें
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Items */}
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
            <TrendingUp className="h-6 w-6 text-accent" />
            टूरिस्ट क्या चाहते हैं
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingItems.map((item, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 card-hover shadow-lg hover:shadow-accent/10"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{item.item}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-accent">{item.demand}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.reason}</p>
                <Button
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  मेनू में जोड़ें
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Smart Recommendations */}
        <section className="animate-fade-in-up">
          <Card className="bg-card border-primary/30 p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-foreground">स्मार्ट सुझाव</h3>
                <p className="text-muted-foreground mb-4">
                  टूरिस्ट पसंद और आने वाले गणेश चतुर्थी के आधार पर, आपको ये बनाने चाहिए:
                  <strong className="text-primary"> मोदक, नारियल बर्फी, और फेस्टिव थाली</strong>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary">+60% डिमांड अपेक्षित</Badge>
                  <Badge className="bg-secondary">पीक: 7-10 सितंबर</Badge>
                  <Badge className="bg-accent">ज़्यादा मुनाफा</Badge>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    सुझाव अपनाएं
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-primary/10">
                    विवरण देखें
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