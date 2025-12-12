import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Lightbulb, MapPin, Users, BookOpen, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import startupImage from '@/assets/startup-journey.jpg';
import aiAssistantImage from '@/assets/ai-assistant.jpg';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const StartupMitra = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं Startup Mitra हूँ, आपका AI बिज़नेस सलाहकार। मैं आपको मेनू सुझाव, स्थान सलाह, सप्लायर कनेक्शन और बिज़नेस बेसिक्स में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickActions = [
    { icon: Lightbulb, label: 'मेनू सुझाव', color: 'text-primary' },
    { icon: MapPin, label: 'स्थान सलाह', color: 'text-accent' },
    { icon: Users, label: 'सप्लायर कनेक्शन', color: 'text-secondary' },
    { icon: BookOpen, label: 'बिज़नेस बेसिक्स', color: 'text-primary' },
  ];

  const exampleQuestions = [
    'मेरे क्षेत्र में कौन से व्यंजन बेचूं?',
    'स्टॉल लगाने के लिए सबसे अच्छी जगह?',
    'पनीर रोल की कीमत क्या रखूं?',
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = generateAIResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('menu') || lowerQuestion.includes('dish') || lowerQuestion.includes('food') || lowerQuestion.includes('मेनू') || lowerQuestion.includes('व्यंजन')) {
      return '📍 आपके क्षेत्र के आधार पर सुझाव:\n\n1. **पानी पूरी** - कम खर्च में बढ़िया मुनाफा (₹5-10 प्रति प्लेट)\n2. **मसाला डोसा** - सुबह का लोकप्रिय आइटम (₹40-60)\n3. **कोल्ड कॉफी/लस्सी** - गर्मियों के लिए बढ़िया (₹30-50)\n\n💡 इन आइटम्स में 80% मुनाफा है!';
    }

    if (lowerQuestion.includes('location') || lowerQuestion.includes('stall') || lowerQuestion.includes('where') || lowerQuestion.includes('स्थान') || lowerQuestion.includes('जगह')) {
      return '📍 टूरिस्ट ट्रैफिक के आधार पर:\n\n**टॉप 3 जगहें:**\n1. गेटवे ऑफ इंडिया के पास - 5000+ दैनिक भीड़\n2. कोलाबा मार्केट - शाम को ज़्यादा ग्राहक\n3. मरीन ड्राइव - वीकेंड हॉटस्पॉट\n\n💡 टिप: शाम 5 से 10 बजे के बीच सेटअप करें!';
    }

    if (lowerQuestion.includes('price') || lowerQuestion.includes('pricing') || lowerQuestion.includes('cost') || lowerQuestion.includes('कीमत')) {
      return '💰 स्मार्ट प्राइसिंग:\n\n1. **लागत + मुनाफा:** सामग्री की लागत + 200-300% मार्कअप\n2. **प्रतियोगी मूल्य:** पास के विक्रेता ₹40-60 ले रहे हैं\n3. **कॉम्बो डील:** पानी पूरी + सेव पूरी = ₹80\n\n✅ सुझाव: ₹50 प्रति प्लेट से शुरू करें!';
    }

    return '🙏 बढ़िया सवाल! मैं इनमें मदद कर सकता हूँ:\n\n📋 मेनू प्लानिंग\n📍 सबसे अच्छी जगह\n💰 प्राइसिंग\n🤝 सप्लायर कनेक्शन\n📊 इन्वेंटरी टिप्स\n🎯 मार्केटिंग बेसिक्स\n\nआप क्या जानना चाहेंगे?';
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    toast({
      title: 'क्विक एक्शन चुना गया',
      description: 'सलाह पाने के लिए भेजें दबाएं',
    });
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'रिकॉर्डिंग बंद' : 'रिकॉर्डिंग शुरू',
      description: isRecording ? 'आपका सवाल प्रोसेस हो रहा है...' : 'अभी अपना सवाल बोलें',
    });

    if (!isRecording) {
      setTimeout(() => {
        setInputValue('इस क्षेत्र में कौन से व्यंजन बेचूं?');
        setIsRecording(false);
      }, 2000);
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
              onClick={() => navigate('/dashboard')}
              className="text-foreground hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">🚀 Startup Mitra</h1>
              <p className="text-sm text-muted-foreground">आपका बिज़नेस सलाहकार</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={startupImage}
          alt="Startup Journey"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-4">
            <h2 className="text-2xl font-bold mb-1 animate-fade-in-up">24x7 बिज़नेस गाइड</h2>
            <p className="text-muted-foreground animate-fade-in-up text-sm">फ़ूड बिज़नेस शुरू करने में एक्सपर्ट सलाह</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-xl font-bold mb-4 text-foreground">जल्दी मदद</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="bg-card border-border p-4 cursor-pointer hover:border-primary/50 transition-all card-hover"
              onClick={() => handleQuickAction(action.label)}
            >
              <action.icon className={`h-8 w-8 ${action.color} mb-2`} />
              <p className="text-sm text-card-foreground font-medium">{action.label}</p>
            </Card>
          ))}
        </div>

        {/* AI Image Section */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <img
            src={aiAssistantImage}
            alt="AI Assistant"
            className="w-full h-32 object-cover"
          />
        </div>

        {/* Chat Area */}
        <Card className="bg-card border-border mb-20">
          <ScrollArea className="h-[300px] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                } animate-fade-in-up`}
              >
                <div
                  className={`inline-block max-w-[85%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-card-foreground border border-border'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>

        {/* Example Questions */}
        <div className="mb-20">
          <h4 className="text-sm text-muted-foreground mb-3">उदाहरण सवाल:</h4>
          <div className="space-y-2">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start bg-card border-border text-card-foreground hover:bg-primary/10 hover:border-primary/50 transition-all"
                onClick={() => setInputValue(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent p-4 border-t border-border">
        <div className="container mx-auto max-w-4xl flex gap-2">
          <Button
            size="icon"
            variant={isRecording ? 'destructive' : 'outline'}
            onClick={handleVoiceInput}
            className={`flex-shrink-0 ${isRecording ? 'animate-pulse' : ''}`}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="अपना सवाल यहाँ लिखें..."
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupMitra;