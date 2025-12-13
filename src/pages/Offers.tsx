import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Gift, Plus, TrendingUp, Clock, MapPin, Share2 } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';

interface Offer {
  id: string;
  title: string;
  discount: string;
  description: string;
  type: 'time' | 'location' | 'combo';
  status: 'active' | 'pending';
  validUntil: string;
}

const Offers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([
    { id: '1', title: 'Lunch Time Special', discount: '20% OFF', description: '12-2 PM on all items', type: 'time', status: 'active', validUntil: 'Today' },
    { id: '2', title: 'Tourist Area Discount', discount: '₹50 OFF', description: 'Near Gateway of India', type: 'location', status: 'active', validUntil: 'This Week' },
    { id: '3', title: 'Combo Deal', discount: 'Buy 1 Get 1 Free', description: 'Paneer Roll + Samosa', type: 'combo', status: 'pending', validUntil: 'Festival' },
    { id: '4', title: 'Weekend Special', discount: '30% OFF', description: 'Saturday-Sunday', type: 'time', status: 'pending', validUntil: 'This Weekend' },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', description: '' });

  const handleCreateOffer = () => {
    const offer: Offer = {
      id: Date.now().toString(),
      title: newOffer.title,
      discount: newOffer.discount,
      description: newOffer.description,
      type: 'combo',
      status: 'pending',
      validUntil: '7 days',
    };
    setOffers([...offers, offer]);
    setNewOffer({ title: '', discount: '', description: '' });
    setIsCreateModalOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'time': return <Clock className="h-4 w-4" />;
      case 'location': return <MapPin className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const shareToWhatsApp = (offer: Offer) => {
    const message = `🎉 ${offer.title}\n${offer.discount}\n${offer.description}\n\nValid Until: ${offer.validUntil}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <header className="sticky top-0 z-40 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between pt-10 md:pt-0">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-foreground hover:bg-primary/10">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-primary">🎁 Offers & Promotions</h1>
                    <p className="text-sm text-muted-foreground">Boost sales with smart promotions</p>
                  </div>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Offer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card text-foreground border-border">
                    <DialogHeader>
                      <DialogTitle>Create New Offer</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Offer Name</Label>
                        <Input
                          value={newOffer.title}
                          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                          className="bg-background border-border"
                          placeholder="e.g. Weekend Special"
                        />
                      </div>
                      <div>
                        <Label>Discount</Label>
                        <Input
                          value={newOffer.discount}
                          onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                          className="bg-background border-border"
                          placeholder="e.g. 30% OFF"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={newOffer.description}
                          onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                          className="bg-background border-border"
                          placeholder="e.g. On all items"
                        />
                      </div>
                      <Button onClick={handleCreateOffer} className="w-full bg-primary hover:bg-primary/90">
                        Create Offer
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Offers</p>
                    <p className="text-3xl font-bold text-foreground">
                      {offers.filter(o => o.status === 'active').length}
                    </p>
                  </div>
                  <Gift className="h-10 w-10 text-primary" />
                </div>
              </Card>
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold text-secondary">
                      {offers.filter(o => o.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-secondary" />
                </div>
              </Card>
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sales Increased</p>
                    <p className="text-3xl font-bold text-accent">+25%</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-accent" />
                </div>
              </Card>
            </div>

            {/* Smart Recommendations */}
            <Card className="bg-card border-primary/30 p-6 mb-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Smart Opportunities</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>🎯 Lunch time has more crowd - Launch time-based offer</li>
                <li>📍 Tourist area nearby - Create location-based discount</li>
                <li>🎉 Diwali in 5 days - Festival combo offer suggested</li>
                <li>💡 Slow-moving items - Create bundle deals</li>
              </ul>
            </Card>

            {/* Offers List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Your Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map((offer) => (
                  <Card key={offer.id} className="bg-card border-border p-6 shadow-lg hover:shadow-primary/10 transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(offer.type)}
                        <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                      </div>
                      <Badge className={offer.status === 'active' ? 'bg-accent' : 'bg-secondary'}>
                        {offer.status === 'active' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-primary mb-2">{offer.discount}</p>
                      <p className="text-muted-foreground">{offer.description}</p>
                      <p className="text-sm text-muted-foreground mt-2">⏰ Valid Until: {offer.validUntil}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-border text-foreground hover:bg-primary/10"
                        onClick={() => shareToWhatsApp(offer)}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      {offer.status === 'pending' && (
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          Activate
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Offers;
