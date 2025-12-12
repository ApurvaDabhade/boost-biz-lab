import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import communityImage from '@/assets/community-hub.jpg';

interface CommunityPost {
  id: string;
  type: 'request' | 'offer' | 'festival-help';
  userName: string;
  item: string;
  quantity: string;
  urgency: 'normal' | 'urgent';
  distance: number;
  isVerified: boolean;
  phone: string;
  timestamp: Date;
  description: string;
  isFestivalHelp?: boolean;
  totalOrders?: number;
  profitShare?: string;
}

const CommunityHub = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'requests' | 'offers' | 'festival-help'>('requests');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<'request' | 'offer'>('request');
  
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    description: '',
    urgency: 'normal' as 'normal' | 'urgent',
    totalOrders: '',
    profitShare: '50',
  });

  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      type: 'request',
      userName: 'राजेश कुमार',
      item: 'पनीर',
      quantity: '20 kg',
      urgency: 'urgent',
      distance: 1.2,
      isVerified: true,
      phone: '+91 98765 43210',
      timestamp: new Date(Date.now() - 3600000),
      description: 'नवरात्रि ऑर्डर के लिए चाहिए। जरूरी!',
    },
    {
      id: '2',
      type: 'offer',
      userName: 'प्रिया शर्मा',
      item: 'टमाटर',
      quantity: '15 kg',
      urgency: 'normal',
      distance: 0.8,
      isVerified: true,
      phone: '+91 98765 43211',
      timestamp: new Date(Date.now() - 7200000),
      description: 'ताज़े टमाटर, थोड़ा ज़्यादा है। अच्छी कीमत मिलेगी।',
    },
    {
      id: '3',
      type: 'request',
      userName: 'अमित पटेल',
      item: 'खाना पकाने का तेल',
      quantity: '10 लीटर',
      urgency: 'normal',
      distance: 2.5,
      isVerified: false,
      phone: '+91 98765 43212',
      timestamp: new Date(Date.now() - 10800000),
      description: 'त्योहार की रसोई के लिए रिफाइंड तेल चाहिए',
    },
    {
      id: '4',
      type: 'offer',
      userName: 'मीना देवी',
      item: 'ताज़ा धनिया',
      quantity: '5 kg',
      urgency: 'urgent',
      distance: 1.5,
      isVerified: true,
      phone: '+91 98765 43213',
      timestamp: new Date(Date.now() - 14400000),
      description: 'ज़्यादा स्टॉक है, आज बेचना है। बढ़िया कीमत!',
    },
    {
      id: '5',
      type: 'festival-help',
      userName: 'रमेश वेंडर्स',
      item: 'दिवाली स्पेशल ऑर्डर',
      quantity: '50 ऑर्डर',
      urgency: 'urgent',
      distance: 0.5,
      isVerified: true,
      phone: '+91 98765 43215',
      timestamp: new Date(Date.now() - 1800000),
      description: 'दिवाली में बहुत डिमांड! पास की दुकानों से मदद चाहिए। अच्छा मुनाफा!',
      isFestivalHelp: true,
      totalOrders: 50,
      profitShare: 'कमाई का 40%',
    },
  ]);

  const handleSubmitPost = () => {
    if (!formData.item || !formData.quantity) {
      toast({
        title: 'जानकारी अधूरी',
        description: 'कृपया सभी जरूरी फील्ड भरें',
        variant: 'destructive',
      });
      return;
    }

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      type: postType,
      userName: 'आप',
      item: formData.item,
      quantity: formData.quantity,
      urgency: formData.urgency,
      distance: 0,
      isVerified: true,
      phone: '+91 98765 43214',
      timestamp: new Date(),
      description: formData.description,
    };

    setPosts([newPost, ...posts]);
    setIsPostModalOpen(false);
    setFormData({ item: '', quantity: '', description: '', urgency: 'normal', totalOrders: '', profitShare: '50' });

    toast({
      title: postType === 'request' ? 'मांग पोस्ट हुई!' : 'ऑफर पोस्ट हुआ!',
      description: 'आपकी पोस्ट अब कम्युनिटी को दिख रही है',
    });
  };

  const handleContact = (post: CommunityPost) => {
    toast({
      title: 'संपर्क जानकारी',
      description: `${post.userName} को कॉल करें: ${post.phone}`,
    });
  };

  const handleAcceptHelp = (post: CommunityPost) => {
    toast({
      title: 'मदद स्वीकार!',
      description: `आपने ${post.totalOrders} ऑर्डर में मदद स्वीकार की। मुनाफा: ${post.profitShare}`,
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'requests') return post.type === 'request';
    if (activeTab === 'offers') return post.type === 'offer';
    if (activeTab === 'festival-help') return post.type === 'festival-help';
    return false;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
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
              <h1 className="text-2xl font-bold text-primary">🤝 कम्युनिटी हब</h1>
              <p className="text-sm text-muted-foreground">वेंडर नेटवर्क से जुड़ें</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={communityImage}
          alt="Community Hub"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-4">
            <h2 className="text-2xl font-bold mb-1 animate-fade-in-up">अपना वेंडर नेटवर्क बनाएं</h2>
            <p className="text-muted-foreground animate-fade-in-up text-sm">सामान का आदान-प्रदान करें, साथ बढ़ें</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 ${
              activeTab === 'requests'
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            मांग ({posts.filter((p) => p.type === 'request').length})
          </Button>
          <Button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 ${
              activeTab === 'offers'
                ? 'bg-accent hover:bg-accent/90'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            ऑफर ({posts.filter((p) => p.type === 'offer').length})
          </Button>
          <Button
            onClick={() => setActiveTab('festival-help')}
            className={`flex-1 ${
              activeTab === 'festival-help'
                ? 'bg-secondary hover:bg-secondary/90'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            🎉 त्योहार ({posts.filter((p) => p.type === 'festival-help').length})
          </Button>
        </div>

        {/* Post Buttons */}
        <div className="flex gap-2 mb-6">
          <Dialog open={isPostModalOpen && postType === 'request'} onOpenChange={(open) => {
            setIsPostModalOpen(open);
            setPostType('request');
          }}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                <Plus className="h-5 w-5 mr-2" />
                मांग पोस्ट करें
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-foreground border-border">
              <DialogHeader>
                <DialogTitle>सामान की मांग पोस्ट करें</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">आइटम का नाम *</label>
                  <Input
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    placeholder="जैसे: पनीर, टमाटर"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">मात्रा *</label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="जैसे: 20 kg"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">विवरण</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="अतिरिक्त जानकारी..."
                    className="bg-background border-border"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.urgency === 'urgent'}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.checked ? 'urgent' : 'normal' })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">जरूरी है</label>
                </div>
                <Button onClick={handleSubmitPost} className="w-full bg-primary hover:bg-primary/90">
                  मांग पोस्ट करें
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isPostModalOpen && postType === 'offer'} onOpenChange={(open) => {
            setIsPostModalOpen(open);
            setPostType('offer');
          }}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-accent hover:bg-accent/90">
                <Plus className="h-5 w-5 mr-2" />
                ऑफर पोस्ट करें
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-foreground border-border">
              <DialogHeader>
                <DialogTitle>सामान का ऑफर पोस्ट करें</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">आइटम का नाम *</label>
                  <Input
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    placeholder="जैसे: पनीर, टमाटर"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">मात्रा *</label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="जैसे: 20 kg"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">विवरण</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="अतिरिक्त जानकारी..."
                    className="bg-background border-border"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.urgency === 'urgent'}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.checked ? 'urgent' : 'normal' })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">जल्दी बेचना है</label>
                </div>
                <Button onClick={handleSubmitPost} className="w-full bg-primary hover:bg-primary/90">
                  ऑफर पोस्ट करें
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className={`bg-card border-border p-4 animate-fade-in-up card-hover shadow-lg ${
                post.urgency === 'urgent' ? 'border-secondary animate-pulse-glow' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{post.item}</h3>
                  <p className="text-sm text-muted-foreground">मात्रा: {post.quantity}</p>
                </div>
                <div className="flex gap-2">
                  {post.urgency === 'urgent' && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      जरूरी
                    </Badge>
                  )}
                  {post.isVerified && (
                    <Badge className="bg-accent text-accent-foreground">
                      वेरिफाइड
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-3">{post.description}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {post.distance} km दूर
                  </span>
                  <span>{post.timestamp.toLocaleDateString()}</span>
                </div>
                <span className="font-medium text-foreground">{post.userName}</span>
              </div>

              {post.isFestivalHelp && (
                <div className="mb-3 p-3 bg-secondary/20 border border-secondary/30 rounded">
                  <p className="text-sm text-foreground mb-1">
                    <strong>कुल ऑर्डर:</strong> {post.totalOrders}
                  </p>
                  <p className="text-sm text-foreground">
                    <strong>मुनाफा:</strong> {post.profitShare}
                  </p>
                </div>
              )}

              {post.isFestivalHelp ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAcceptHelp(post)}
                    className="flex-1 bg-secondary hover:bg-secondary/90"
                  >
                    मदद करें
                  </Button>
                  <Button
                    onClick={() => handleContact(post)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    संपर्क
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleContact(post)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  संपर्क करें
                </Button>
              )}
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="bg-card border-border p-8 text-center shadow-lg">
            <p className="text-muted-foreground">
              कोई {activeTab === 'requests' ? 'मांग' : activeTab === 'offers' ? 'ऑफर' : 'त्योहार मदद'} नहीं मिली। पहले पोस्ट करें!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;