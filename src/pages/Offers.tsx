import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Gift, Plus, TrendingUp, Clock, MapPin, Share2 } from 'lucide-react';

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
  const { t } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([
    { id: '1', title: 'लंच टाइम स्पेशल', discount: '20% छूट', description: '12-2 बजे सब पर', type: 'time', status: 'active', validUntil: 'आज' },
    { id: '2', title: 'टूरिस्ट एरिया डिस्काउंट', discount: '₹50 छूट', description: 'गेटवे ऑफ इंडिया के पास', type: 'location', status: 'active', validUntil: 'इस हफ्ते' },
    { id: '3', title: 'कॉम्बो डील', discount: '2 पर 1 फ्री', description: 'पनीर रोल + समोसा', type: 'combo', status: 'pending', validUntil: 'त्योहार तक' },
    { id: '4', title: 'वीकेंड स्पेशल', discount: '30% छूट', description: 'शनिवार-रविवार', type: 'time', status: 'pending', validUntil: 'इस वीकेंड' },
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
      validUntil: '7 दिन',
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
    const message = `🎉 ${offer.title}\n${offer.discount}\n${offer.description}\n\nकब तक: ${offer.validUntil}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-foreground hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">🎁 ऑफर और प्रमोशन</h1>
                <p className="text-sm text-muted-foreground">स्मार्ट प्रमोशन से बिक्री बढ़ाएं</p>
              </div>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  नया ऑफर
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card text-foreground border-border">
                <DialogHeader>
                  <DialogTitle>नया ऑफर बनाएं</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>ऑफर का नाम</Label>
                    <Input
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                      className="bg-background border-border"
                      placeholder="जैसे: वीकेंड स्पेशल"
                    />
                  </div>
                  <div>
                    <Label>छूट</Label>
                    <Input
                      value={newOffer.discount}
                      onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                      className="bg-background border-border"
                      placeholder="जैसे: 30% छूट"
                    />
                  </div>
                  <div>
                    <Label>विवरण</Label>
                    <Input
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                      className="bg-background border-border"
                      placeholder="जैसे: सब आइटम पर"
                    />
                  </div>
                  <Button onClick={handleCreateOffer} className="w-full bg-primary hover:bg-primary/90">
                    ऑफर बनाएं
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
                <p className="text-sm text-muted-foreground">सक्रिय ऑफर</p>
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
                <p className="text-sm text-muted-foreground">लंबित</p>
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
                <p className="text-sm text-muted-foreground">बिक्री बढ़ी</p>
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
            <h3 className="text-xl font-bold text-foreground">स्मार्ट मौके</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>🎯 लंच टाइम में भीड़ ज़्यादा है - टाइम-बेस्ड ऑफर लॉन्च करें</li>
            <li>📍 पास में टूरिस्ट एरिया है - लोकेशन-बेस्ड छूट बनाएं</li>
            <li>🎉 5 दिन में दिवाली - त्योहार कॉम्बो ऑफर सुझाया</li>
            <li>💡 धीमी बिकने वाली चीज़ें - बंडल डील बनाएं</li>
          </ul>
        </Card>

        {/* Offers List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4 text-foreground">आपके ऑफर</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="bg-card border-border p-6 shadow-lg hover:shadow-primary/10 transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(offer.type)}
                    <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                  </div>
                  <Badge className={offer.status === 'active' ? 'bg-accent' : 'bg-secondary'}>
                    {offer.status === 'active' ? 'सक्रिय' : 'लंबित'}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-3xl font-bold text-primary mb-2">{offer.discount}</p>
                  <p className="text-muted-foreground">{offer.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">⏰ कब तक: {offer.validUntil}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-border text-foreground hover:bg-primary/10"
                    onClick={() => shareToWhatsApp(offer)}
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    शेयर
                  </Button>
                  {offer.status === 'pending' && (
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      सक्रिय करें
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;