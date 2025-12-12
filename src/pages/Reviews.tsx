import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, TrendingUp, TrendingDown, MessageSquare, ThumbsUp, ThumbsDown, Filter, Download, QrCode, Smartphone } from 'lucide-react';

const Reviews = () => {
  const navigate = useNavigate();

  const [showQRCode, setShowQRCode] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showMobileLink, setShowMobileLink] = useState(false);
  const [sentimentData, setSentimentData] = useState<{
    overall: {
      positive: number,
      neutral: number,
      negative: number,
      total: number,
      averageRating: number | null,
    },
    trends: {
      positive: number,
      neutral: number,
      negative: number,
    },
    categories: Array<{
      name: string,
      positive: number,
      neutral: number,
      negative: number,
      trend: number,
    }>,
    citywideData: Array<{
      city?: string,
      positive: number,
      neutral: number,
      negative: number,
      total: number,
    }>,
  } | null>(null);

  // Mock recent reviews
  const recentReviews = [
    {
      id: 1,
      customer: 'राजेश कुमार',
      rating: 5,
      date: '2 घंटे पहले',
      comment: 'बहुत बढ़िया खाना! पनीर टिक्का परफेक्ट था और सर्विस बहुत तेज़। फिर आऊंगा!',
      sentiment: 'positive',
      category: 'खाने की क्वालिटी'
    },
    {
      id: 2,
      customer: 'प्रिया शर्मा',
      rating: 4,
      date: '5 घंटे पहले',
      comment: 'अच्छा खाना पर थोड़ा महंगा है। स्वाद बढ़िया था पर पोर्शन थोड़ा और हो सकता था।',
      sentiment: 'neutral',
      category: 'पैसा वसूल'
    },
    {
      id: 3,
      customer: 'अमित सिंह',
      rating: 2,
      date: '1 दिन पहले',
      comment: 'आज सर्विस बहुत धीमी थी। 45 मिनट इंतज़ार करना पड़ा। खाना ठंडा था।',
      sentiment: 'negative',
      category: 'सर्विस स्पीड'
    },
    {
      id: 4,
      customer: 'स्नेहा पटेल',
      rating: 5,
      date: '1 दिन पहले',
      comment: 'साफ-सफाई बहुत अच्छी। स्टाफ बहुत पोलाइट था। खाना स्वादिष्ट!',
      sentiment: 'positive',
      category: 'स्टाफ व्यवहार'
    },
  ];

  useEffect(() => {
    // Mock data for sentiment analysis since backend may not be running
    const mockData = {
      overall: {
        positive: 68,
        neutral: 22,
        negative: 10,
        total: 156,
        averageRating: 4.2,
      },
      trends: {
        positive: 5,
        neutral: -2,
        negative: -3,
      },
      categories: [
        { name: 'खाने की क्वालिटी', positive: 75, neutral: 18, negative: 7, trend: 8 },
        { name: 'सर्विस स्पीड', positive: 55, neutral: 25, negative: 20, trend: -5 },
        { name: 'स्टाफ व्यवहार', positive: 80, neutral: 15, negative: 5, trend: 12 },
        { name: 'साफ-सफाई', positive: 72, neutral: 20, negative: 8, trend: 3 },
      ],
      citywideData: [],
    };
    
    setSentimentData(mockData);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-accent';
      case 'negative': return 'text-destructive';
      default: return 'text-secondary';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-accent';
      case 'negative': return 'bg-destructive';
      default: return 'bg-secondary';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-accent" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="h-4 w-4" />;
  };

  const handleFilter = () => setShowFilter(!showFilter);

  const handleExport = () => {
    if (!sentimentData) return;

    const csvData = [
      ['Category', 'Positive %', 'Neutral %', 'Negative %', 'Trend'],
      ...sentimentData.categories.map(cat => [
        cat.name,
        cat.positive,
        cat.neutral,
        cat.negative,
        cat.trend
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleMobileLink = () => setShowMobileLink(!showMobileLink);

  if (sentimentData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p>डेटा लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-foreground hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-primary">⭐ ग्राहक रिव्यू</h1>
              <p className="text-xs text-muted-foreground">सेंटीमेंट एनालिसिस</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border text-foreground hover:bg-primary/10"
                onClick={handleFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                फ़िल्टर
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border text-foreground hover:bg-primary/10"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                एक्सपोर्ट
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-accent/30 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">पॉज़िटिव रिव्यू</p>
                <p className="text-2xl font-bold text-accent">{sentimentData.overall.positive}%</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(sentimentData.trends.positive)}
                  <span className="text-xs text-accent ml-1">+{sentimentData.trends.positive}%</span>
                </div>
              </div>
              <ThumbsUp className="h-8 w-8 text-accent" />
            </CardContent>
          </Card>

          <Card className="bg-card border-secondary/30 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">न्यूट्रल रिव्यू</p>
                <p className="text-2xl font-bold text-secondary">{sentimentData.overall.neutral}%</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(sentimentData.trends.neutral)}
                  <span className="text-xs text-secondary ml-1">{sentimentData.trends.neutral}%</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-secondary" />
            </CardContent>
          </Card>

          <Card className="bg-card border-destructive/30 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">नेगेटिव रिव्यू</p>
                <p className="text-2xl font-bold text-destructive">{sentimentData.overall.negative}%</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(sentimentData.trends.negative)}
                  <span className="text-xs text-destructive ml-1">{sentimentData.trends.negative}%</span>
                </div>
              </div>
              <ThumbsDown className="h-8 w-8 text-destructive" />
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/30 shadow-lg">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">औसत रेटिंग</p>
                <p className="text-2xl font-bold text-primary">
                  {sentimentData.overall.averageRating !== null ? sentimentData.overall.averageRating : '-'} / 5
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-secondary fill-current" />
                  <span className="text-xs text-muted-foreground ml-1">{sentimentData.overall.total} रिव्यू</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </CardContent>
          </Card>
        </div>

        {/* QR Code Feedback Collection Section */}
        <Card className="bg-card border-primary/30 mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <QrCode className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">क्विक फीडबैक</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  QR कोड से आसान फीडबैक। ग्राहक स्कैन करके तुरंत रिव्यू दे सकते हैं!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">QR कोड बनाए</div>
                    <div className="text-lg font-bold text-primary">24</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">इस हफ्ते स्कैन</div>
                    <div className="text-lg font-bold text-accent">156</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">रिस्पॉन्स रेट</div>
                    <div className="text-lg font-bold text-secondary">68%</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {showQRCode ? 'छुपाएं' : 'QR बनाएं'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-border text-foreground hover:bg-primary/10"
                    onClick={handleMobileLink}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    मोबाइल लिंक
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Panel */}
        {showFilter && (
          <Card className="bg-card border-border mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">फ़िल्टर ऑप्शन</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setShowFilter(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">समय अवधि</label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                    <option value="7d">पिछले 7 दिन</option>
                    <option value="30d">पिछले 30 दिन</option>
                    <option value="90d">पिछले 90 दिन</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">सेंटीमेंट</label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                    <option value="all">सभी</option>
                    <option value="positive">पॉज़िटिव</option>
                    <option value="neutral">न्यूट्रल</option>
                    <option value="negative">नेगेटिव</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">कैटेगरी</label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                    <option value="all">सभी</option>
                    <option value="food">खाने की क्वालिटी</option>
                    <option value="service">सर्विस स्पीड</option>
                    <option value="cleanliness">साफ-सफाई</option>
                    <option value="staff">स्टाफ व्यवहार</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-primary hover:bg-primary/90">
                  फ़िल्टर लगाएं
                </Button>
                <Button variant="outline" className="border-border text-foreground">
                  रीसेट
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs Content */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              📝 हाल के रिव्यू
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              📊 कैटेगरी एनालिसिस
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-4">
            {recentReviews.map((review) => (
              <Card key={review.id} className="bg-card border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-foreground">{review.customer}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-secondary fill-current' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      <Badge className={getSentimentBg(review.sentiment)}>
                        {review.sentiment === 'positive' ? 'पॉज़िटिव' : review.sentiment === 'negative' ? 'नेगेटिव' : 'न्यूट्रल'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.comment}</p>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {review.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">कैटेगरी वाइज़ एनालिसिस</CardTitle>
                <CardDescription className="text-muted-foreground">हर कैटेगरी में ग्राहकों की राय</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sentimentData.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{category.name}</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(category.trend)}
                          <span className={category.trend >= 0 ? 'text-accent' : 'text-destructive'}>
                            {category.trend >= 0 ? '+' : ''}{category.trend}%
                          </span>
                        </div>
                      </div>
                      <div className="flex h-4 rounded-full overflow-hidden bg-muted">
                        <div 
                          className="bg-accent" 
                          style={{ width: `${category.positive}%` }}
                        />
                        <div 
                          className="bg-secondary" 
                          style={{ width: `${category.neutral}%` }}
                        />
                        <div 
                          className="bg-destructive" 
                          style={{ width: `${category.negative}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>पॉज़िटिव: {category.positive}%</span>
                        <span>न्यूट्रल: {category.neutral}%</span>
                        <span>नेगेटिव: {category.negative}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reviews;