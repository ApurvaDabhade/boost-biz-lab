import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, Image as ImageIcon, Share2, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const templateCategories = [
  { id: 'festival', label: 'Festival', emoji: '🎉' },
  { id: 'offers', label: 'Offers', emoji: '💸' },
  { id: 'food', label: 'Food Items', emoji: '🍽️' },
  { id: 'menu', label: 'Menu', emoji: '📋' },
  { id: 'special', label: 'Special of the Day', emoji: '⭐' },
];

const colorThemes = [
  { id: 'orange', color: 'hsl(30, 90%, 50%)', label: 'Orange' },
  { id: 'red', color: 'hsl(0, 70%, 50%)', label: 'Red' },
  { id: 'green', color: 'hsl(140, 50%, 40%)', label: 'Green' },
  { id: 'white', color: 'hsl(0, 0%, 95%)', label: 'White' },
  { id: 'black', color: 'hsl(0, 0%, 15%)', label: 'Black' },
];

const autoCaptions = [
  "🔥 Fresh & Delicious! Order now! 🍛 #FoodLovers #LocalVendor #TastyFood",
  "✨ Today's Special - Don't Miss Out! 🎉 #DailySpecial #FreshFood #OrderNow",
  "🌟 Made with Love, Served with Care! ❤️ #HomemadeFood #LocalBusiness #Yummy",
];

const PosterMaker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState('festival');
  const [selectedTheme, setSelectedTheme] = useState('orange');
  const [businessName, setBusinessName] = useState('');
  const [offerText, setOfferText] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [tagline, setTagline] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  const handleImageUpload = () => {
    setTimeout(() => {
      setImageUploaded(true);
      toast({ title: '✅ Photo Uploaded!', description: 'Your dish photo is ready' });
    }, 500);
  };

  const handleGeneratePoster = () => {
    if (!businessName || !price) {
      toast({ title: '⚠️ Required Fields', description: 'Please enter business name and price' });
      return;
    }
    setPosterReady(true);
    toast({ title: '🎨 Poster Ready!', description: 'Your poster is ready to download' });
  };

  const handleDownload = () => {
    toast({ title: '📥 Downloading...', description: 'Your poster is being downloaded' });
  };

  const handleShare = (platform: string) => {
    toast({ title: `📤 Sharing to ${platform}`, description: 'Opening share dialog...' });
  };

  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({ title: '📋 Copied!', description: 'Caption copied to clipboard' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-12 md:pt-0">
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
                🎨 Poster Maker
              </h1>
              <p className="text-sm text-muted-foreground">Create posters, attract more customers!</p>
            </div>
          </div>

          {!posterReady ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Template Categories */}
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-3 text-card-foreground">📂 Select Template</h3>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-3">
                      {templateCategories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex-shrink-0 h-16 px-6 rounded-xl ${
                            selectedCategory === cat.id 
                              ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                              : 'border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          <span className="text-2xl mr-2">{cat.emoji}</span>
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Form */}
                <Card className="bg-card border-primary/30 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">✏️ Customize Your Poster</h3>
                    
                    {/* Image Upload */}
                    <Button 
                      onClick={handleImageUpload}
                      variant={imageUploaded ? 'secondary' : 'outline'}
                      className={`w-full h-20 rounded-xl border-2 border-dashed ${
                        imageUploaded 
                          ? 'bg-accent/10 border-accent' 
                          : 'border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {imageUploaded ? (
                        <div className="flex items-center text-accent">
                          <span className="text-2xl mr-3">✅</span>
                          <span>Photo Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-muted-foreground">
                          <ImageIcon className="h-6 w-6 mr-3" />
                          <span>Upload Food Photo</span>
                        </div>
                      )}
                    </Button>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        🏪 Business Name *
                      </label>
                      <Input
                        placeholder="e.g. Sharma's Kitchen"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="h-12 rounded-xl bg-muted border-border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        🎁 Offer Text
                      </label>
                      <Input
                        placeholder="e.g. 20% OFF Today!"
                        value={offerText}
                        onChange={(e) => setOfferText(e.target.value)}
                        className="h-12 rounded-xl bg-muted border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        💰 Price *
                      </label>
                      <Input
                        type="number"
                        placeholder="₹ 99"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="h-12 rounded-xl bg-muted border-border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        📍 Address
                      </label>
                      <Input
                        placeholder="e.g. Near Railway Station"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-12 rounded-xl bg-muted border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        ✨ Tagline
                      </label>
                      <Input
                        placeholder="e.g. Taste the tradition!"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="h-12 rounded-xl bg-muted border-border"
                      />
                    </div>

                    {/* Color Themes */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        🎨 Color Theme
                      </label>
                      <div className="flex gap-2">
                        {colorThemes.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              selectedTheme === theme.id ? 'border-primary scale-110' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: theme.color }}
                            title={theme.label}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right: Preview */}
                <Card className="bg-card border-secondary/30 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-card-foreground">👁️ Live Preview</h3>
                    
                    <div className="border-4 border-primary/30 rounded-2xl overflow-hidden shadow-xl">
                      <div 
                        className="p-6 text-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${colorThemes.find(t => t.id === selectedTheme)?.color || 'hsl(30, 90%, 50%)'}, hsl(45, 85%, 55%))` 
                        }}
                      >
                        {/* Preview Content */}
                        <div className="bg-card/90 backdrop-blur rounded-xl p-4">
                          <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center border border-border">
                            {imageUploaded ? (
                              <span className="text-5xl">🍛</span>
                            ) : (
                              <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold text-card-foreground">
                            {businessName || 'Your Business Name'}
                          </h4>
                          
                          {offerText && (
                            <Badge className="mt-2 bg-destructive text-destructive-foreground">
                              {offerText}
                            </Badge>
                          )}
                          
                          <p className="text-3xl font-bold text-primary mt-2">
                            ₹{price || '99'}
                          </p>
                          
                          {tagline && (
                            <p className="text-sm text-muted-foreground mt-1 italic">
                              "{tagline}"
                            </p>
                          )}
                          
                          {address && (
                            <p className="text-xs text-muted-foreground mt-2">
                              📍 {address}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleGeneratePoster}
                      className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Poster
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Poster Ready View */
            <div className="max-w-md mx-auto space-y-6">
              <Card className="border-4 border-primary overflow-hidden shadow-2xl">
                <div 
                  className="p-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${colorThemes.find(t => t.id === selectedTheme)?.color || 'hsl(30, 90%, 50%)'}, hsl(45, 85%, 55%))` 
                  }}
                >
                  <div className="bg-card rounded-xl p-6">
                    <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-4 flex items-center justify-center border border-border">
                      <span className="text-6xl">🍛</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-card-foreground mb-2">
                      {businessName}
                    </h3>
                    
                    {offerText && (
                      <div className="text-center mb-2">
                        <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-1">
                          {offerText}
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-4xl font-bold text-center text-primary mb-2">
                      ₹{price}
                    </p>
                    
                    {tagline && (
                      <p className="text-center text-muted-foreground italic mb-2">
                        "{tagline}"
                      </p>
                    )}
                    
                    {address && (
                      <p className="text-center text-muted-foreground text-sm">
                        📍 {address}
                      </p>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-border text-center">
                      <p className="text-xs text-muted-foreground">Made with RasoiMitra 🍛</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleDownload}
                  className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Poster
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleShare('WhatsApp')}
                    variant="outline"
                    className="h-12 rounded-xl border-accent text-accent hover:bg-accent/10"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={() => handleShare('Instagram')}
                    variant="outline"
                    className="h-12 rounded-xl border-secondary text-secondary hover:bg-secondary/10"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>

              {/* Auto Captions */}
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-3 text-card-foreground">📝 Ready-to-Use Captions</h3>
                  <div className="space-y-3">
                    {autoCaptions.map((caption, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start justify-between gap-3 p-3 bg-muted rounded-xl"
                      >
                        <p className="text-sm text-muted-foreground flex-1">{caption}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyCaption(caption)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="outline"
                onClick={() => setPosterReady(false)}
                className="w-full h-12 rounded-xl border-border text-muted-foreground hover:bg-muted"
              >
                ✏️ Edit Poster
              </Button>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PosterMaker;
