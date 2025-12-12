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
      toast({ title: '✅ Photo Uploaded!', description: 'Dish photo uploaded' });
    }, 500);
  };

  const handleGeneratePoster = () => {
    if (!dishName || !price) {
      toast({ title: '⚠️ Enter dish name and price', description: 'These fields are required' });
      return;
    }
    setPosterReady(true);
    toast({ title: '🎨 Poster Ready!', description: 'Your poster is ready to download' });
  };

  const handleDownload = () => {
    toast({ title: '📥 Downloading...', description: 'Downloading your poster...' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 p-4 md:p-8">
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
            <h1 className="text-2xl font-bold text-primary">
              🎨 Poster Maker
            </h1>
          </div>

          <div className="max-w-md mx-auto">
            {!posterReady ? (
              <Card className="bg-card border-primary/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-center text-card-foreground">
                    Create Your Poster
                  </h2>
                  <p className="text-center text-muted-foreground mb-6 text-sm">
                    Simple & beautiful promotional poster
                  </p>

                  {/* Image Upload */}
                  <div className="mb-6">
                    <Button 
                      onClick={handleImageUpload}
                      variant={imageUploaded ? 'secondary' : 'outline'}
                      className={`w-full h-24 rounded-xl border-2 border-dashed ${
                        imageUploaded 
                          ? 'bg-accent/10 border-accent' 
                          : 'border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {imageUploaded ? (
                        <div className="flex items-center text-accent">
                          <span className="text-3xl mr-3">✅</span>
                          <span>Photo Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <ImageIcon className="h-8 w-8 mb-2" />
                          <span>Upload Dish Photo</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        🍛 Dish Name *
                      </label>
                      <Input
                        placeholder="e.g. Pav Bhaji, Vada Pav..."
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="h-14 text-lg rounded-xl bg-muted border-border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        💰 Price *
                      </label>
                      <Input
                        type="number"
                        placeholder="₹ 50"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="h-14 text-lg rounded-xl bg-muted border-border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        📍 Location (optional)
                      </label>
                      <Input
                        placeholder="e.g. Near Railway Station..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-14 text-lg rounded-xl bg-muted border-border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                        ⏰ Timing (optional)
                      </label>
                      <Input
                        placeholder="e.g. 8 AM - 10 PM"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className="h-14 text-lg rounded-xl bg-muted border-border"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleGeneratePoster}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                  >
                    🎨 Create Poster
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Poster Preview */
              <div>
                <Card className="border-4 border-secondary overflow-hidden mb-6 shadow-lg">
                  <div className="bg-gradient-to-br from-primary via-secondary to-primary p-1">
                    {/* Poster Preview */}
                    <div className="bg-card rounded-xl p-6">
                      <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-4 flex items-center justify-center border border-border">
                        <span className="text-6xl">🍛</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-center text-card-foreground mb-2">
                        {dishName || 'Delicious Dish'}
                      </h3>
                      
                      <p className="text-4xl font-bold text-center text-secondary mb-4">
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
                        <p className="text-sm text-muted-foreground">🍛 Made with RasoiMitra</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button 
                    onClick={handleDownload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Download className="h-6 w-6 mr-3" />
                    Download Poster
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setPosterReady(false)}
                    className="w-full h-14 rounded-xl border-border text-muted-foreground hover:bg-muted"
                  >
                    ✏️ Edit Poster
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
