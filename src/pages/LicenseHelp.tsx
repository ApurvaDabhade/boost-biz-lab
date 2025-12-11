import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check, FileDown, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';

const LicenseHelp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [shopPhotoUploaded, setShopPhotoUploaded] = useState(false);

  const handleAadhaarUpload = () => {
    // Simulate upload
    setTimeout(() => {
      setAadhaarUploaded(true);
      toast({ title: '✅ आधार अपलोड हो गया!', description: 'Aadhaar uploaded successfully' });
      setStep(2);
    }, 1000);
  };

  const handleShopPhotoUpload = () => {
    // Simulate upload
    setTimeout(() => {
      setShopPhotoUploaded(true);
      toast({ title: '✅ फोटो अपलोड हो गई!', description: 'Shop photo uploaded successfully' });
      setStep(3);
    }, 1000);
  };

  const handleDownloadForm = () => {
    toast({ 
      title: '📄 फॉर्म तैयार है!', 
      description: 'FSSAI / PM SVANidhi form ready for download' 
    });
  };

  const steps = [
    { num: 1, title: 'आधार अपलोड', subtitle: 'Aadhaar Upload', done: aadhaarUploaded },
    { num: 2, title: 'दुकान फोटो', subtitle: 'Shop Photo', done: shopPhotoUploaded },
    { num: 3, title: 'फॉर्म डाउनलोड', subtitle: 'Download Form', done: false },
  ];

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
              📄 लाइसेंस सहायता
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8 max-w-md mx-auto">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                  ${s.done ? 'bg-accent text-accent-foreground' : step === s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {s.done ? <Check className="h-6 w-6" /> : s.num}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-1 ${s.done ? 'bg-accent' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Step 1: Aadhaar Upload */}
            {step === 1 && (
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-4xl">🪪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Step 1</h2>
                  <p className="text-xl font-semibold mb-1">आधार कार्ड अपलोड करें</p>
                  <p className="text-muted-foreground mb-6 text-sm">Upload Aadhaar Card</p>
                  
                  <Button 
                    onClick={handleAadhaarUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-primary"
                  >
                    <Upload className="h-6 w-6 mr-3" />
                    अपलोड करें / Upload
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    फोटो साफ होनी चाहिए • Photo should be clear
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shop Photo */}
            {step === 2 && (
              <Card className="border-2 border-secondary/30">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Step 2</h2>
                  <p className="text-xl font-semibold mb-1">दुकान / ठेला की फोटो</p>
                  <p className="text-muted-foreground mb-6 text-sm">Upload Shop/Cart Photo</p>
                  
                  <Button 
                    onClick={handleShopPhotoUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-secondary text-secondary-foreground"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    फोटो लें / Take Photo
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    सामने से फोटो लें • Take photo from front
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Download Form */}
            {step === 3 && (
              <Card className="border-2 border-accent/30">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Step 3</h2>
                  <p className="text-xl font-semibold mb-1">फॉर्म तैयार है!</p>
                  <p className="text-muted-foreground mb-6 text-sm">Your Form is Ready!</p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleDownloadForm}
                      className="w-full h-16 text-xl font-bold rounded-xl bg-accent"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      FSSAI फॉर्म
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadForm}
                      variant="outline"
                      className="w-full h-16 text-xl font-bold rounded-xl"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      PM SVANidhi फॉर्म
                    </Button>
                  </div>
                  
                  <p className="mt-6 text-sm text-muted-foreground">
                    🎉 बधाई हो! आपका फॉर्म भरा हुआ है
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Congratulations! Your form is pre-filled
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Reset Button */}
            {step > 1 && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setStep(1);
                  setAadhaarUploaded(false);
                  setShopPhotoUploaded(false);
                }}
                className="w-full mt-4"
              >
                फिर से शुरू करें / Start Over
              </Button>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LicenseHelp;
