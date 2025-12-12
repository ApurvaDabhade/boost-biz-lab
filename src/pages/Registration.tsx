import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Upload, Mic, CheckCircle } from 'lucide-react';

type RegistrationStep = 'account' | 'business' | 'menu' | 'inventory';

interface MenuItem {
  name: string;
  price: string;
  ingredients: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('account');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    businessName: '',
    location: '',
    operatingHours: '',
    menuItems: [] as MenuItem[],
    initialStock: '',
  });

  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>({
    name: '',
    price: '',
    ingredients: '',
  });

  const businessTypes = [
    'स्ट्रीट फूड वेंडर',
    'छोटा रेस्टोरेंट',
    'फूड स्टॉल',
    'बुटीक',
    'हैंडीक्राफ्ट',
    'टूरिज़्म',
    'कैफे',
  ];

  const steps: RegistrationStep[] = ['account', 'business', 'menu', 'inventory'];
  const stepIndex = steps.indexOf(currentStep);
  const stepLabels = ['खाता बनाएं', 'बिज़नेस जानकारी', 'मेनू', 'स्टॉक'];

  const handleNext = () => {
    if (currentStep === 'account') {
      if (!formData.name || !formData.phone) {
        toast({
          title: 'जानकारी अधूरी',
          description: 'कृपया नाम और फ़ोन नंबर भरें',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep === 'business' && (!formData.businessType || !formData.businessName)) {
      toast({
        title: 'जानकारी अधूरी',
        description: 'कृपया बिज़नेस जानकारी भरें',
        variant: 'destructive',
      });
      return;
    }

    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex]);
    }
  };

  const handleBack = () => {
    const prevStepIndex = stepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex]);
    }
  };

  const handleAddMenuItem = () => {
    if (!currentMenuItem.name || !currentMenuItem.price) {
      toast({
        title: 'आइटम अधूरा',
        description: 'कृपया नाम और कीमत भरें',
        variant: 'destructive',
      });
      return;
    }

    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, currentMenuItem],
    });

    setCurrentMenuItem({ name: '', price: '', ingredients: '' });
    
    toast({
      title: 'मेनू आइटम जोड़ा!',
      description: `${currentMenuItem.name} मेनू में जोड़ा गया`,
    });
  };

  const handleSubmit = () => {
    toast({
      title: 'रजिस्ट्रेशन पूरा!',
      description: 'RasoiMitra में आपका स्वागत है। डैशबोर्ड पर जा रहे हैं...',
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleVoiceInput = () => {
    toast({
      title: 'वॉइस रिकॉर्डिंग',
      description: 'अब अपने मेनू आइटम बोलें...',
    });
  };

  const handleCSVUpload = () => {
    toast({
      title: 'CSV अपलोड',
      description: 'अपनी मेनू CSV फाइल चुनें',
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'account':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">खाता बनाएं</h2>
              <p className="text-muted-foreground">अपना बिज़नेस सफर शुरू करें</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">पूरा नाम *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="अपना पूरा नाम लिखें"
                  className="bg-card border-border text-lg py-6"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-muted-foreground">फ़ोन नंबर *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="bg-card border-border text-lg py-6"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-muted-foreground">ईमेल (वैकल्पिक)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="bg-card border-border"
                />
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">बिज़नेस जानकारी</h2>
              <p className="text-muted-foreground">अपने बिज़नेस के बारे में बताएं</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessType" className="text-muted-foreground">बिज़नेस टाइप *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger className="bg-card border-border text-lg py-6">
                    <SelectValue placeholder="अपना बिज़नेस टाइप चुनें" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-foreground text-lg py-3">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessName" className="text-muted-foreground">दुकान/स्टॉल का नाम *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="जैसे: मुंबई चाट कॉर्नर"
                  className="bg-card border-border text-lg py-6"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-muted-foreground">जगह</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="पता लिखें या GPS से"
                    className="bg-card border-border"
                  />
                  <Button variant="outline" className="border-border text-foreground px-6">
                    📍 GPS
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="operatingHours" className="text-muted-foreground">काम के घंटे</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  placeholder="जैसे: सुबह 10 - रात 10"
                  className="bg-card border-border"
                />
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">मेनू / प्रोडक्ट</h2>
              <p className="text-muted-foreground">अपने आइटम जोड़ें</p>
            </div>

            {/* Input Methods */}
            <div className="flex gap-2">
              <Button
                onClick={handleVoiceInput}
                variant="outline"
                className="flex-1 border-border text-foreground py-6"
              >
                <Mic className="h-5 w-5 mr-2" />
                बोलकर जोड़ें
              </Button>
              <Button
                onClick={handleCSVUpload}
                variant="outline"
                className="flex-1 border-border text-foreground py-6"
              >
                <Upload className="h-5 w-5 mr-2" />
                फाइल अपलोड
              </Button>
            </div>

            {/* Manual Entry Form */}
            <Card className="bg-card border-border p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="itemName" className="text-muted-foreground">आइटम का नाम *</Label>
                  <Input
                    id="itemName"
                    value={currentMenuItem.name}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, name: e.target.value })}
                    placeholder="जैसे: पनीर रोल"
                    className="bg-background border-border text-lg py-6"
                  />
                </div>

                <div>
                  <Label htmlFor="itemPrice" className="text-muted-foreground">कीमत (₹) *</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    value={currentMenuItem.price}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, price: e.target.value })}
                    placeholder="50"
                    className="bg-background border-border text-lg py-6"
                  />
                </div>

                <Button
                  onClick={handleAddMenuItem}
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                >
                  मेनू में जोड़ें
                </Button>
              </div>
            </Card>

            {/* Menu Items List */}
            {formData.menuItems.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground">आपका मेनू ({formData.menuItems.length} आइटम)</h3>
                <div className="space-y-2">
                  {formData.menuItems.map((item, index) => (
                    <Card key={index} className="bg-card border-border p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-foreground">{item.name}</h4>
                          <p className="text-sm text-accent">₹{item.price}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-accent" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">शुरुआती स्टॉक</h2>
              <p className="text-muted-foreground">अपना शुरुआती स्टॉक सेट करें (वैकल्पिक)</p>
            </div>

            <Card className="bg-card border-border p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialStock" className="text-muted-foreground">स्टॉक विवरण</Label>
                  <Textarea
                    id="initialStock"
                    value={formData.initialStock}
                    onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                    placeholder="उदाहरण:&#10;पनीर - 10 kg&#10;टमाटर - 20 kg&#10;प्याज़ - 15 kg"
                    rows={6}
                    className="bg-background border-border"
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  💡 टिप: आप इसे बाद में डैशबोर्ड से भी जोड़ सकते हैं।
                </p>

                <Button
                  onClick={() => {
                    setFormData({ ...formData, initialStock: '' });
                    toast({
                      title: 'स्किप किया',
                      description: 'बाद में डैशबोर्ड से जोड़ सकते हैं',
                    });
                  }}
                  variant="outline"
                  className="w-full border-border text-foreground"
                >
                  बाद में करें
                </Button>
              </div>
            </Card>

            {/* Summary */}
            <Card className="bg-accent/10 border-accent/30 p-4">
              <h3 className="text-xl font-bold mb-3 text-foreground">🎉 आपकी जानकारी</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>नाम:</strong> {formData.name}</p>
                <p><strong>बिज़नेस:</strong> {formData.businessName}</p>
                <p><strong>टाइप:</strong> {formData.businessType}</p>
                <p><strong>मेनू आइटम:</strong> {formData.menuItems.length}</p>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => stepIndex > 0 ? handleBack() : navigate('/')}
              className="text-foreground hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-primary">रजिस्ट्रेशन</h1>
              <p className="text-sm text-muted-foreground">स्टेप {stepIndex + 1}/4 - {stepLabels[stepIndex]}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted h-2">
        <div
          className="bg-primary h-2 transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= stepIndex ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  index < stepIndex
                    ? 'bg-primary text-primary-foreground'
                    : index === stepIndex
                    ? 'bg-primary/20 border-2 border-primary text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < stepIndex ? '✓' : index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 pb-32">
        {renderStepContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container mx-auto max-w-4xl flex gap-4">
          {stepIndex > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-border text-foreground py-6 text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              पीछे
            </Button>
          )}
          <Button
            onClick={stepIndex === steps.length - 1 ? handleSubmit : handleNext}
            className="flex-1 bg-primary hover:bg-primary/90 py-6 text-lg"
          >
            {stepIndex === steps.length - 1 ? 'पूरा करें' : 'आगे'}
            {stepIndex < steps.length - 1 && <ArrowRight className="h-5 w-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;