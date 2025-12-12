import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, PieChart, MessageSquare, MapPin, Languages } from 'lucide-react';
import heroImage from '@/assets/hero-food-vendor.jpg';
import festivalImage from '@/assets/festival-food.jpg';
import analyticsImage from '@/assets/analytics-dashboard.jpg';
import communityImage from '@/assets/community-hub.jpg';
import startupImage from '@/assets/startup-journey.jpg';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: t('landing.feature1.title'),
      description: t('landing.feature1.desc'),
      image: analyticsImage,
    },
    {
      icon: PieChart,
      title: t('landing.feature2.title'),
      description: t('landing.feature2.desc'),
      image: festivalImage,
    },
    {
      icon: MessageSquare,
      title: t('landing.feature3.title'),
      description: t('landing.feature3.desc'),
      image: communityImage,
    },
    {
      icon: MapPin,
      title: t('landing.feature4.title'),
      description: t('landing.feature4.desc'),
      image: startupImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header with Language Toggle */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('app.name')}</h1>
            <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/auth')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Login
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary text-primary-foreground animate-fade-in-up">
            🚀 Trusted by 1000+ Local Businesses
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {t('landing.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              onClick={() => navigate('/registration')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg animate-pulse-glow"
            >
              {t('landing.cta.start')} →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              {t('landing.cta.learn')}
            </Button>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse animation-delay-200"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in-up">
            {t('landing.features.title')}
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Intelligent tools to grow your food business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border p-6 card-hover animate-scale-in shadow-lg hover:shadow-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                </div>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Highlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            🎯 New Powerful Features
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Startup Mitra Card */}
            <Card
              className="bg-card border-accent/30 p-8 card-hover cursor-pointer animate-slide-in-right shadow-lg hover:shadow-accent/20"
              onClick={() => navigate('/startup-mitra')}
            >
              <Badge className="mb-4 bg-accent text-accent-foreground">✨ Smart Advisor</Badge>
              <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                {t('startup.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                Your 24x7 business mentor. Get expert guidance on menu planning, location selection, pricing strategies, and supplier connections. Perfect for new entrepreneurs!
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Launch Startup Mitra →
              </Button>
            </Card>

            {/* Community Hub Card */}
            <Card
              className="bg-card border-accent/30 p-8 card-hover cursor-pointer animate-slide-in-right animation-delay-200 shadow-lg hover:shadow-accent/20"
              onClick={() => navigate('/community-hub')}
            >
              <Badge className="mb-4 bg-accent text-accent-foreground">🤝 Community</Badge>
              <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                {t('community.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                Exchange ingredients, share supplies, and build connections with nearby vendors. Reduce waste, prevent stock-outs, and grow your business network!
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Join Community Hub →
              </Button>
            </Card>
          </div>

          {/* Second Row - Trend Insight Hub */}
          <div className="mt-8">
            <Card
              className="bg-card border-primary/30 p-8 card-hover cursor-pointer animate-slide-in-right animation-delay-400 shadow-lg hover:shadow-primary/20"
              onClick={() => navigate('/trend-insights')}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="mb-4 bg-primary text-primary-foreground">📊 Market Intelligence</Badge>
                  <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                    Trend Insight Hub
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get actionable, data-backed insights from real-time market trends. Identify missed opportunities, track competitor listings, and adapt your offerings to current demand.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Market Opportunities</div>
                      <div className="text-lg font-bold text-primary">12 Found</div>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Trending Categories</div>
                      <div className="text-lg font-bold text-accent">+23% Growth</div>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Competitor Analysis</div>
                      <div className="text-lg font-bold text-secondary">Live Updates</div>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Launch Trend Insights →
                  </Button>
                </div>
                <div className="ml-8 hidden lg:block">
                  <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-6xl">📈</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Join thousands of food vendors already growing with RasoiMitra
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/registration')}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-12 py-6 text-lg animate-pulse-glow"
          >
            Get Started Free →
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">
            <span className="text-primary font-bold">{t('app.name')}</span> - {t('app.subtitle')}
          </p>
          <p className="text-sm">© 2025 RasoiMitra. Empowering Small Businesses with Intelligence.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Help</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
