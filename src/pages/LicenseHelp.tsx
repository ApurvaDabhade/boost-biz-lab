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
    setTimeout(() => {
      setAadhaarUploaded(true);
      toast({ title: '✅ Aadhaar Uploaded!', description: 'Aadhaar uploaded successfully' });
      setStep(2);
    }, 1000);
  };

  const handleShopPhotoUpload = () => {
    setTimeout(() => {
      setShopPhotoUploaded(true);
      toast({ title: '✅ Photo Uploaded!', description: 'Shop photo uploaded successfully' });
      setStep(3);
    }, 1000);
  };

  const handleDownloadForm = () => {
    toast({ 
      title: '📄 Form Ready!', 
      description: 'FSSAI / PM SVANidhi form ready for download' 
    });
  };

  const steps = [
    { num: 1, title: 'Aadhaar Upload', done: aadhaarUploaded },
    { num: 2, title: 'Shop Photo', done: shopPhotoUploaded },
    { num: 3, title: 'Download Form', done: false },
  ];

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
              📄 License & Scheme Assistance
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8 max-w-md mx-auto">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all
                  ${s.done ? 'bg-accent text-accent-foreground' : step === s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border border-border'}
                `}>
                  {s.done ? <Check className="h-6 w-6" /> : s.num}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-1 ${s.done ? 'bg-accent' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Step 1: Aadhaar Upload */}
            {step === 1 && (
              <Card className="bg-card border-primary/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">🪪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-primary">Step 1</h2>
                  <p className="text-xl font-semibold mb-1 text-card-foreground">Upload Aadhaar Card</p>
                  <p className="text-muted-foreground mb-6 text-sm">Take a clear photo of your Aadhaar</p>
                  
                  <Button 
                    onClick={handleAadhaarUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Upload className="h-6 w-6 mr-3" />
                    Upload Aadhaar
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    Photo should be clear and readable
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shop Photo */}
            {step === 2 && (
              <Card className="bg-card border-secondary/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-secondary">Step 2</h2>
                  <p className="text-xl font-semibold mb-1 text-card-foreground">Upload Shop/Cart Photo</p>
                  <p className="text-muted-foreground mb-6 text-sm">Take a front photo of your shop or food cart</p>
                  
                  <Button 
                    onClick={handleShopPhotoUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    Take Photo
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    Take photo from the front
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Download Form */}
            {step === 3 && (
              <Card className="bg-card border-accent/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-accent">Step 3</h2>
                  <p className="text-xl font-semibold mb-1 text-card-foreground">Your Forms are Ready!</p>
                  <p className="text-muted-foreground mb-6 text-sm">Download your pre-filled application forms</p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleDownloadForm}
                      className="w-full h-16 text-xl font-bold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      FSSAI License Form
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadForm}
                      variant="outline"
                      className="w-full h-16 text-xl font-bold rounded-xl border-primary text-primary hover:bg-primary/10"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      PM SVANidhi Form
                    </Button>
                  </div>
                  
                  <p className="mt-6 text-sm text-accent">
                    🎉 Congratulations! Your form is pre-filled
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
                className="w-full mt-4 text-muted-foreground hover:text-foreground"
              >
                Start Over
              </Button>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LicenseHelp;
