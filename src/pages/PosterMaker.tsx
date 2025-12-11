import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';

const PosterMaker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [timing, setTiming] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  const handleImageUpload = () => {
    setTimeout(() => {
      setImageUploaded(true);
      toast({ title: '✅ फोटो अपलोड हो गई!', description: 'Dish photo uploaded' });
    }, 500);
  };

  const handleGeneratePoster = () => {
    if (!dishName || !price) {
      toast({ title: '⚠️ नाम और दाम डालें', description: 'Enter dish name and price' });
      return;
    }
    setPosterReady(true);
    toast({ title: '🎨 पोस्टर तैयार!', description: 'Your poster is ready' });
  };

  const handleDownload = () => {
    toast({ title: '📥 डाउनलोड हो रहा है...', description: 'Downloading poster...' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 p-4 md:p-8">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-12 md:pt-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              🎨 पोस्टर बनाएं
            </h1>
          </div>

          <div className="max-w-md mx-auto">
            {!posterReady ? (
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-center">
                    अपना पोस्टर बनाएं
                  </h2>
                  <p className="text-center text-muted-foreground mb-6 text-sm">
                    Create Your Poster
                  </p>

                  {/* Image Upload */}
                  <div className="mb-6">
                    <Button 
                      onClick={handleImageUpload}
                      variant={imageUploaded ? 'secondary' : 'outline'}
                      className="w-full h-24 rounded-xl border-2 border-dashed"
                    >
                      {imageUploaded ? (
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">✅</span>
                          <span>फोटो अपलोड हो गई</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="h-8 w-8 mb-2" />
                          <span>डिश की फोटो अपलोड करें</span>
                          <span className="text-xs text-muted-foreground">Upload Dish Photo</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        🍛 डिश का नाम / Dish Name
                      </label>
                      <Input
                        placeholder="जैसे: पाव भाजी, वड़ा पाव..."
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        💰 दाम / Price
                      </label>
                      <Input
                        type="number"
                        placeholder="₹ 50"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        📍 जगह / Location (optional)
                      </label>
                      <Input
                        placeholder="जैसे: स्टेशन के पास..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        ⏰ समय / Timing (optional)
                      </label>
                      <Input
                        placeholder="जैसे: सुबह 8 - रात 10"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleGeneratePoster}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-primary mt-6"
                  >
                    🎨 पोस्टर बनाएं / Create Poster
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Poster Preview */
              <div>
                <Card className="border-4 border-primary overflow-hidden mb-6">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6">
                    {/* Poster Preview */}
                    <div className="bg-card rounded-2xl p-6 shadow-xl">
                      <div className="w-full h-40 bg-muted rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-6xl">🍛</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-center text-foreground mb-2">
                        {dishName || 'स्वादिष्ट डिश'}
                      </h3>
                      
                      <p className="text-4xl font-bold text-center text-primary mb-4">
                        ₹{price || '50'}
                      </p>
                      
                      {location && (
                        <p className="text-center text-muted-foreground mb-2">
                          📍 {location}
                        </p>
                      )}
                      
                      {timing && (
                        <p className="text-center text-muted-foreground">
                          ⏰ {timing}
                        </p>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-border text-center">
                        <p className="text-sm text-muted-foreground">🍛 रसोई मित्र</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button 
                    onClick={handleDownload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-accent"
                  >
                    <Download className="h-6 w-6 mr-3" />
                    डाउनलोड करें / Download
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setPosterReady(false)}
                    className="w-full h-14 rounded-xl"
                  >
                    ✏️ बदलाव करें / Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PosterMaker;
