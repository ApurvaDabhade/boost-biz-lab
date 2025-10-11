import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Star, TrendingUp, TrendingDown, MessageSquare, ThumbsUp, ThumbsDown, Filter, Download, QrCode, Smartphone } from 'lucide-react';

const Reviews = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [showQRCode, setShowQRCode] = useState(false);

  // Mock data for sentiment analysis
  const sentimentData = {
    overall: {
      positive: 78,
      neutral: 15,
      negative: 7,
      total: 1247,
      averageRating: 4.2
    },
    trends: {
      positive: +12,
      neutral: -3,
      negative: -9
    },
    categories: [
      { name: 'Food Quality', positive: 85, neutral: 10, negative: 5, trend: +8 },
      { name: 'Service Speed', positive: 72, neutral: 18, negative: 10, trend: +15 },
      { name: 'Cleanliness', positive: 90, neutral: 8, negative: 2, trend: +5 },
      { name: 'Value for Money', positive: 68, neutral: 20, negative: 12, trend: -2 },
      { name: 'Staff Behavior', positive: 82, neutral: 12, negative: 6, trend: +10 }
    ],
    recentReviews: [
      {
        id: 1,
        customer: 'Rajesh Kumar',
        rating: 5,
        date: '2 hours ago',
        comment: 'Amazing food! The paneer tikka was perfectly cooked and the service was super fast. Will definitely come back!',
        sentiment: 'positive',
        category: 'Food Quality'
      },
      {
        id: 2,
        customer: 'Priya Sharma',
        rating: 4,
        date: '5 hours ago',
        comment: 'Good food but a bit expensive. The taste was great but portion size could be better.',
        sentiment: 'neutral',
        category: 'Value for Money'
      },
      {
        id: 3,
        customer: 'Amit Singh',
        rating: 2,
        date: '1 day ago',
        comment: 'Very slow service today. Had to wait 45 minutes for my order. Food was cold when it arrived.',
        sentiment: 'negative',
        category: 'Service Speed'
      },
      {
        id: 4,
        customer: 'Sneha Patel',
        rating: 5,
        date: '1 day ago',
        comment: 'Excellent hygiene and cleanliness. The staff was very polite and helpful. Food was delicious!',
        sentiment: 'positive',
        category: 'Staff Behavior'
      },
      {
        id: 5,
        customer: 'Vikram Joshi',
        rating: 3,
        date: '2 days ago',
        comment: 'Average experience. Nothing special but nothing bad either. Decent food for the price.',
        sentiment: 'neutral',
        category: 'Food Quality'
      }
    ]
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-600';
      case 'negative': return 'bg-red-600';
      default: return 'bg-yellow-600';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <div className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-black border-b border-blue-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold">Customer Reviews & Feedback</h1>
              <p className="text-xs text-blue-200">Sentiment Analysis Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-blue-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-blue-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-900/20 to-black border-emerald-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Positive Reviews</p>
                  <p className="text-2xl font-bold text-emerald-400">{sentimentData.overall.positive}%</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(sentimentData.trends.positive)}
                    <span className="text-xs text-emerald-400 ml-1">+{sentimentData.trends.positive}%</span>
                  </div>
                </div>
                <ThumbsUp className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-black border-amber-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Neutral Reviews</p>
                  <p className="text-2xl font-bold text-amber-400">{sentimentData.overall.neutral}%</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(sentimentData.trends.neutral)}
                    <span className="text-xs text-amber-400 ml-1">{sentimentData.trends.neutral}%</span>
                  </div>
                </div>
                <MessageSquare className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-900/20 to-black border-rose-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Negative Reviews</p>
                  <p className="text-2xl font-bold text-rose-400">{sentimentData.overall.negative}%</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(sentimentData.trends.negative)}
                    <span className="text-xs text-rose-400 ml-1">{sentimentData.trends.negative}%</span>
                  </div>
                </div>
                <ThumbsDown className="h-8 w-8 text-rose-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/20 to-black border-indigo-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Average Rating</p>
                  <p className="text-2xl font-bold text-indigo-400">{sentimentData.overall.averageRating}/5</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-400 ml-1">{sentimentData.overall.total} reviews</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Feedback Collection Section */}
        <Card className="bg-gradient-to-br from-purple-900/15 to-black border-purple-700 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <QrCode className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Quick Feedback Collection</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Generate QR codes for easy customer feedback collection. Customers can scan and leave reviews instantly!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">QR Codes Generated</div>
                    <div className="text-lg font-bold text-purple-400">24</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Scans This Week</div>
                    <div className="text-lg font-bold text-green-400">156</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Response Rate</div>
                    <div className="text-lg font-bold text-blue-400">68%</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {showQRCode ? 'Hide QR Code' : 'Generate QR Code'}
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900">
                    <Smartphone className="h-4 w-4 mr-2" />
                    View Mobile Link
                  </Button>
                </div>
              </div>
              <div className="ml-8 hidden lg:block">
                {showQRCode ? (
                  <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-40 h-40 bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-white text-xs text-center">
                        <div className="mb-2">QR CODE</div>
                        <div className="text-xs">Scan to leave feedback</div>
                        <div className="text-xs mt-1">rasoimitra.com/feedback</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-6xl text-gray-600">📱</div>
                  </div>
                )}
                <p className="text-center text-sm text-gray-400 mt-2">
                  {showQRCode ? 'Click QR Code to Copy Link' : 'Generate QR Code to Display'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="sentiment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-blue-700">
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-blue-600">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600">Category Breakdown</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-600">Recent Reviews</TabsTrigger>
          </TabsList>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Distribution Chart */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Overall customer sentiment breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Positive</span>
                        <span className="text-sm text-green-400">{sentimentData.overall.positive}%</span>
                      </div>
                      <Progress value={sentimentData.overall.positive} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Neutral</span>
                        <span className="text-sm text-yellow-400">{sentimentData.overall.neutral}%</span>
                      </div>
                      <Progress value={sentimentData.overall.neutral} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Negative</span>
                        <span className="text-sm text-red-400">{sentimentData.overall.negative}%</span>
                      </div>
                      <Progress value={sentimentData.overall.negative} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trend Analysis */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">Trend Analysis</CardTitle>
                  <CardDescription className="text-gray-400">7-day sentiment trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-white">Positive Trend</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-green-400">+{sentimentData.trends.positive}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-white">Neutral Trend</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingDown className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-yellow-400">{sentimentData.trends.neutral}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-white">Negative Trend</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingDown className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-red-400">{sentimentData.trends.negative}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Category Breakdown Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {sentimentData.categories.map((category, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900/80 to-black border-blue-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <div className="flex items-center">
                        {getTrendIcon(category.trend)}
                        <span className={`ml-2 text-sm ${category.trend > 0 ? 'text-green-400' : category.trend < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                          {category.trend > 0 ? '+' : ''}{category.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Positive</span>
                          <span className="text-sm text-green-400">{category.positive}%</span>
                        </div>
                        <Progress value={category.positive} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Neutral</span>
                          <span className="text-sm text-yellow-400">{category.neutral}%</span>
                        </div>
                        <Progress value={category.neutral} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Negative</span>
                          <span className="text-sm text-red-400">{category.negative}%</span>
                        </div>
                        <Progress value={category.negative} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {sentimentData.recentReviews.map((review) => (
                <Card key={review.id} className="bg-gradient-to-br from-gray-900/80 to-black border-blue-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">
                            {review.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{review.customer}</h4>
                          <p className="text-sm text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge className={`${getSentimentBg(review.sentiment)} text-white`}>
                          {review.sentiment}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-400">({review.rating}/5)</span>
                      </div>
                      <Badge variant="outline" className="border-blue-600 text-blue-400">
                        {review.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reviews;