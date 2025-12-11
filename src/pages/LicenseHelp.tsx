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
      <div className="min-h-screen flex w-full bg-black text-white">
        <AppSidebar />
        
        <main className="flex-1 p-4 md:p-8">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-12 md:pt-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full text-white hover:bg-blue-800"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-blue-400">
              📄 License & Scheme Assistance
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8 max-w-md mx-auto">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all
                  ${s.done ? 'bg-green-600 text-white' : step === s.num ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700'}
                `}>
                  {s.done ? <Check className="h-6 w-6" /> : s.num}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-1 ${s.done ? 'bg-green-600' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Step 1: Aadhaar Upload */}
            {step === 1 && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <span className="text-4xl">🪪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-blue-400">Step 1</h2>
                  <p className="text-xl font-semibold mb-1 text-white">Upload Aadhaar Card</p>
                  <p className="text-gray-400 mb-6 text-sm">Take a clear photo of your Aadhaar</p>
                  
                  <Button 
                    onClick={handleAadhaarUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-6 w-6 mr-3" />
                    Upload Aadhaar
                  </Button>
                  
                  <p className="mt-4 text-xs text-gray-500">
                    Photo should be clear and readable
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shop Photo */}
            {step === 2 && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-700">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-purple-400">Step 2</h2>
                  <p className="text-xl font-semibold mb-1 text-white">Upload Shop/Cart Photo</p>
                  <p className="text-gray-400 mb-6 text-sm">Take a front photo of your shop or food cart</p>
                  
                  <Button 
                    onClick={handleShopPhotoUpload}
                    className="w-full h-16 text-xl font-bold rounded-xl bg-purple-600 hover:bg-purple-700"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    Take Photo
                  </Button>
                  
                  <p className="mt-4 text-xs text-gray-500">
                    Take photo from the front
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Download Form */}
            {step === 3 && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-900/50 flex items-center justify-center">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-green-400">Step 3</h2>
                  <p className="text-xl font-semibold mb-1 text-white">Your Forms are Ready!</p>
                  <p className="text-gray-400 mb-6 text-sm">Download your pre-filled application forms</p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleDownloadForm}
                      className="w-full h-16 text-xl font-bold rounded-xl bg-green-600 hover:bg-green-700"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      FSSAI License Form
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadForm}
                      variant="outline"
                      className="w-full h-16 text-xl font-bold rounded-xl border-cyan-700 text-cyan-400 hover:bg-cyan-900"
                    >
                      <FileDown className="h-6 w-6 mr-3" />
                      PM SVANidhi Form
                    </Button>
                  </div>
                  
                  <p className="mt-6 text-sm text-green-400">
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
                className="w-full mt-4 text-gray-400 hover:text-white"
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
