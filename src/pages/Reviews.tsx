import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Star, TrendingUp, MessageSquare, QrCode, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  dish: string;
  date: string;
}

const Reviews = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [reviews] = useState<Review[]>([
    { id: '1', customer: 'Rahul S.', rating: 5, comment: 'Amazing paneer roll! Best in the area.', sentiment: 'positive', dish: 'Paneer Roll', date: '2 hours ago' },
    { id: '2', customer: 'Priya M.', rating: 4, comment: 'Good taste but took time to prepare.', sentiment: 'neutral', dish: 'Veg Biryani', date: '5 hours ago' },
    { id: '3', customer: 'Amit K.', rating: 5, comment: 'Excellent service and fresh ingredients!', sentiment: 'positive', dish: 'Dosa', date: '1 day ago' },
    { id: '4', customer: 'Sneha P.', rating: 3, comment: 'Taste was okay, could be better.', sentiment: 'neutral', dish: 'Samosa', date: '1 day ago' },
    { id: '5', customer: 'Vikram R.', rating: 5, comment: 'Worth every rupee! Will come again.', sentiment: 'positive', dish: 'Paneer Roll', date: '2 days ago' },
  ]);

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
  const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-green-400" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-red-400" />;
      default: return <MessageSquare className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-green-900 to-black border-b border-green-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-green-400">⭐ Customer Reviews & Feedback</h1>
                <p className="text-sm text-green-200">Track customer satisfaction & insights</p>
              </div>
            </div>
            <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-green-700">
                <DialogHeader>
                  <DialogTitle>QR Code for Feedback</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center py-6">
                  <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-48 w-48 text-black" />
                  </div>
                  <p className="text-center text-gray-300 mb-4">
                    Place this QR code at your stall for instant customer feedback
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Download QR Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-400">{avgRating} ⭐</p>
              </div>
              <Star className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Reviews</p>
                <p className="text-3xl font-bold text-white">{reviews.length}</p>
              </div>
              <MessageSquare className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Positive</p>
                <p className="text-3xl font-bold text-green-400">{positiveCount}</p>
              </div>
              <ThumbsUp className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Neutral</p>
                <p className="text-3xl font-bold text-yellow-400">{neutralCount}</p>
              </div>
              <MessageSquare className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
        </div>

        {/* Sentiment Analysis */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <h3 className="text-xl font-bold">Sentiment Insights</h3>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>📊 {((positiveCount / reviews.length) * 100).toFixed(0)}% customers are satisfied</p>
            <p>🔥 Top-rated dish: Paneer Roll (5.0 stars)</p>
            <p>💡 Improvement area: Faster service during peak hours</p>
            <p>📈 Rating improved by 0.3 stars this week</p>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">Recent Reviews</h3>
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">{review.customer}</h4>
                  <p className="text-sm text-gray-400">{review.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(review.sentiment)}
                  <Badge className="bg-yellow-600 text-white">
                    {review.rating} ⭐
                  </Badge>
                </div>
              </div>
              
              <p className="text-blue-400 text-sm mb-2">📍 {review.dish}</p>
              <p className="text-gray-300">{review.comment}</p>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                  Reply
                </Button>
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                  Thank Customer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
