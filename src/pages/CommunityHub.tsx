import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, Search, MessageCircle, ThumbsUp, Send, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Vendor {
  id: string;
  name: string;
  stallName: string;
  specialty: string;
  distance: number;
  phone: string;
  isVerified: boolean;
}

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  type: 'update' | 'question' | 'help';
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  category: 'license' | 'platform' | 'business' | 'general';
}

const CommunityHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Mock nearby vendors
  const nearbyVendors: Vendor[] = [
    { id: '1', name: 'Ramesh Kumar', stallName: 'Sharma Tea Stall', specialty: 'Tea, Snacks', distance: 0.5, phone: '+91 98765 43210', isVerified: true },
    { id: '2', name: 'Priya Patel', stallName: 'Priya Chaat Corner', specialty: 'Chaat, Pani Puri', distance: 0.8, phone: '+91 87654 32109', isVerified: true },
    { id: '3', name: 'Amit Verma', stallName: 'Verma Sweets', specialty: 'Sweets, Namkeen', distance: 1.2, phone: '+91 76543 21098', isVerified: false },
    { id: '4', name: 'Meena Devi', stallName: 'Devi Breakfast Point', specialty: 'Poha, Upma, Idli', distance: 1.5, phone: '+91 65432 10987', isVerified: true },
    { id: '5', name: 'Suresh Yadav', stallName: 'Yadav Vada Pav', specialty: 'Vada Pav, Samosa', distance: 2.0, phone: '+91 54321 09876', isVerified: true },
  ];

  // Mock community posts
  const [posts] = useState<Post[]>([
    { id: '1', author: 'Ramesh Kumar', content: 'Tomatoes are cheap today at Sabzi Mandi - ₹30/kg! Go buy now.', timestamp: new Date(Date.now() - 3600000), likes: 12, replies: 5, type: 'update' },
    { id: '2', author: 'Priya Patel', content: 'Just got my FSSAI license! If anyone needs help, ask me.', timestamp: new Date(Date.now() - 7200000), likes: 25, replies: 8, type: 'update' },
    { id: '3', author: 'Amit Verma', content: 'Anyone know a good oil supplier? My current one is expensive.', timestamp: new Date(Date.now() - 10800000), likes: 8, replies: 12, type: 'question' },
    { id: '4', author: 'Meena Devi', content: 'Festival rush coming! Need extra help at my stall this Diwali.', timestamp: new Date(Date.now() - 14400000), likes: 15, replies: 6, type: 'help' },
  ]);

  // Mock discussions
  const discussions: Discussion[] = [
    { id: '1', title: 'How to apply for FSSAI license?', author: 'New Vendor', replies: 15, category: 'license' },
    { id: '2', title: 'Zomato registration - is it worth it?', author: 'Tea Shop Owner', replies: 23, category: 'platform' },
    { id: '3', title: 'Best time to sell during festivals?', author: 'Chaat Vendor', replies: 18, category: 'business' },
    { id: '4', title: 'WhatsApp Business tips for vendors', author: 'Sweet Shop', replies: 10, category: 'general' },
  ];

  const filteredVendors = nearbyVendors.filter(v => 
    v.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (vendor: Vendor) => {
    toast({ 
      title: '📞 Calling...', 
      description: `Calling ${vendor.name}: ${vendor.phone}` 
    });
  };

  const handleShare = (vendor: Vendor) => {
    toast({ 
      title: '📤 Sharing...', 
      description: `Sharing ${vendor.stallName} details` 
    });
  };

  const handleLike = (postId: string) => {
    toast({ title: '👍 Liked!', description: 'You liked this post' });
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) {
      toast({ title: '⚠️ Empty Post', description: 'Please write something', variant: 'destructive' });
      return;
    }
    toast({ title: '✅ Posted!', description: 'Your post is now visible to the community' });
    setNewPostContent('');
  };

  const handleJoinWhatsApp = () => {
    toast({ title: '📱 Opening WhatsApp', description: 'Joining the vendor community group' });
  };

  const getCategoryColor = (category: Discussion['category']) => {
    switch(category) {
      case 'license': return 'bg-blue-500';
      case 'platform': return 'bg-orange-500';
      case 'business': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <div className="sticky top-0 z-40 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-4 pt-10 md:pt-0">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-full hover:bg-muted"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    🤝 Community Hub
                  </h1>
                  <p className="text-sm text-muted-foreground">Connect with nearby vendors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            {/* Quick Intro */}
            <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/30 mb-6 shadow-lg">
              <CardContent className="p-4">
                <p className="text-lg text-foreground">
                  <strong>Community Hub</strong> = Nearby vendors helping each other to grow 🌟
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Find vendors, share tips, ask questions, and join our WhatsApp group!
                </p>
              </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="vendors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  📍 Vendors
                </TabsTrigger>
                <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  💬 Posts
                </TabsTrigger>
                <TabsTrigger value="discuss" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  🗣️ Discuss
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  📲 Group
                </TabsTrigger>
              </TabsList>

              {/* NEARBY VENDORS TAB */}
              <TabsContent value="vendors" className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by stall name or food type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg rounded-xl bg-muted border-border"
                  />
                </div>

                {/* Vendor List */}
                <div className="space-y-3">
                  {filteredVendors.map((vendor) => (
                    <Card key={vendor.id} className="bg-card border-border shadow-lg hover:shadow-primary/10 transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-foreground">{vendor.stallName}</h3>
                              {vendor.isVerified && (
                                <Badge className="bg-accent text-accent-foreground text-xs">✓ Verified</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              🍽️ {vendor.specialty}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {vendor.distance} km away
                              </span>
                              <span>👤 {vendor.name}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              onClick={() => handleCall(vendor)}
                              className="h-12 w-12 rounded-xl border-accent text-accent hover:bg-accent/10"
                            >
                              <Phone className="h-5 w-5" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              onClick={() => handleShare(vendor)}
                              className="h-12 w-12 rounded-xl border-primary text-primary hover:bg-primary/10"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredVendors.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No vendors found</p>
                    <p className="text-sm text-muted-foreground">Try a different search term</p>
                  </div>
                )}
              </TabsContent>

              {/* COMMUNITY POSTS TAB */}
              <TabsContent value="posts" className="space-y-4">
                {/* New Post */}
                <Card className="bg-card border-primary/30 shadow-lg">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">📝 Share with Community</h3>
                    <Textarea
                      placeholder="Share a tip, ask a question, or help others..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="mb-3 bg-muted border-border min-h-[80px]"
                    />
                    <Button 
                      onClick={handleSubmitPost}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post to Community
                    </Button>
                  </CardContent>
                </Card>

                {/* Posts List */}
                <div className="space-y-3">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-card border-border shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-lg">
                              👤
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{post.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {post.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            className={
                              post.type === 'update' ? 'bg-blue-500' : 
                              post.type === 'question' ? 'bg-orange-500' : 
                              'bg-green-500'
                            }
                          >
                            {post.type === 'update' ? '📢' : post.type === 'question' ? '❓' : '🆘'}
                          </Badge>
                        </div>
                        
                        <p className="text-foreground mb-4">{post.content}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="text-muted-foreground hover:text-accent"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.replies} replies
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* DISCUSSIONS TAB */}
              <TabsContent value="discuss" className="space-y-4">
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">🗣️ Popular Discussions</CardTitle>
                    <CardDescription>Ask questions, get answers from vendors like you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {discussions.map((discussion) => (
                      <div 
                        key={discussion.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/80 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={getCategoryColor(discussion.category)}>
                            {discussion.category === 'license' ? '📄' : 
                             discussion.category === 'platform' ? '📱' :
                             discussion.category === 'business' ? '💼' : '💬'}
                          </Badge>
                          <div>
                            <p className="font-semibold text-foreground">{discussion.title}</p>
                            <p className="text-xs text-muted-foreground">
                              by {discussion.author} • {discussion.replies} replies
                            </p>
                          </div>
                        </div>
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button className="w-full h-14 text-lg" variant="outline">
                  ➕ Start New Discussion
                </Button>
              </TabsContent>

              {/* WHATSAPP GROUP TAB */}
              <TabsContent value="whatsapp" className="space-y-4">
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl">📲</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Join Vendor WhatsApp Group
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Get quick updates, share tips, and connect with 500+ vendors in your area!
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <p className="text-2xl font-bold text-primary">500+</p>
                        <p className="text-sm text-muted-foreground">Vendors</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <p className="text-2xl font-bold text-accent">Daily</p>
                        <p className="text-sm text-muted-foreground">Updates</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <p className="text-2xl font-bold text-secondary">Free</p>
                        <p className="text-sm text-muted-foreground">To Join</p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleJoinWhatsApp}
                      className="w-full h-16 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    >
                      <span className="text-2xl mr-3">📱</span>
                      Join WhatsApp Group
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4">
                      You'll be added to our community group instantly
                    </p>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle>✅ What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <span className="text-2xl">📢</span>
                      <p className="text-foreground">Daily price updates for vegetables & ingredients</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <span className="text-2xl">🆘</span>
                      <p className="text-foreground">Quick help from other vendors when you need it</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <span className="text-2xl">💡</span>
                      <p className="text-foreground">Business tips and festival sale ideas</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <span className="text-2xl">🤝</span>
                      <p className="text-foreground">Share and borrow ingredients from nearby vendors</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CommunityHub;
