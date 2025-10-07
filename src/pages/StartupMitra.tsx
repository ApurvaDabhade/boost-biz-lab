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
      content: 'Namaste! I\'m Startup Mitra, your AI business advisor. I can help you with menu suggestions, location advice, supplier connections, and business basics. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickActions = [
    { icon: Lightbulb, label: t('startup.menuSuggestions'), color: 'text-yellow-400' },
    { icon: MapPin, label: t('startup.locationAdvice'), color: 'text-green-400' },
    { icon: Users, label: t('startup.supplierConnections'), color: 'text-blue-400' },
    { icon: BookOpen, label: t('startup.businessBasics'), color: 'text-purple-400' },
  ];

  const exampleQuestions = [
    t('startup.example1'),
    t('startup.example2'),
    t('startup.example3'),
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

    // Simulate AI response
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

    if (lowerQuestion.includes('menu') || lowerQuestion.includes('dish') || lowerQuestion.includes('food')) {
      return 'Based on your location near tourist areas, I recommend:\n\n1. **Pani Puri** - High demand, low cost (₹5-10 per plate)\n2. **Masala Dosa** - Popular breakfast item (₹40-60)\n3. **Cold Coffee/Lassi** - Great for summer months (₹30-50)\n\nThese items have 80% profit margins and are trending in your area!';
    }

    if (lowerQuestion.includes('location') || lowerQuestion.includes('stall') || lowerQuestion.includes('where')) {
      return 'Based on tourist flow analysis:\n\n**Top 3 Locations:**\n1. Near Gateway of India - 5000+ daily footfall\n2. Colaba Market Area - High tourist traffic in evenings\n3. Marine Drive - Weekend hotspot\n\n💡 Tip: Set up between 5 PM - 10 PM for maximum sales!';
    }

    if (lowerQuestion.includes('price') || lowerQuestion.includes('pricing') || lowerQuestion.includes('cost')) {
      return 'Smart Pricing Strategy:\n\n1. **Cost-Plus Method:** Calculate ingredient cost + 200-300% markup\n2. **Competitive Pricing:** Check nearby vendors (I found 3 similar stalls charging ₹40-60)\n3. **Value Pricing:** Bundle items (Pani Puri + Sev Puri = ₹80)\n\nRecommendation: Start at ₹50 per plate and adjust based on demand!';
    }

    if (lowerQuestion.includes('supplier') || lowerQuestion.includes('ingredient') || lowerQuestion.includes('vendor')) {
      return 'Local Supplier Connections:\n\n**Vegetables:**\n- Mumbai Vegetable Market - 2.5 km away\n- Daily delivery available\n\n**Spices & Masala:**\n- Spice Bazaar - 1.8 km away\n- Bulk discounts available\n\n**Dairy (Paneer, Milk):**\n- Fresh Dairy Co. - 3 km away\n- Next-day delivery\n\nWould you like me to connect you with any of these suppliers?';
    }

    return 'That\'s a great question! As your AI advisor, I can help with:\n\n📋 Menu Planning & Item Suggestions\n📍 Best Locations for Setup\n💰 Pricing Strategies\n🤝 Supplier & Vendor Connections\n📊 Inventory Management Tips\n🎯 Marketing & Branding Basics\n\nWhat specific area would you like to explore?';
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    toast({
      title: 'Quick action selected',
      description: 'Click send to get personalized advice',
    });
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'Voice recording stopped' : 'Voice recording started',
      description: isRecording ? 'Processing your question...' : 'Speak your question now',
    });

    if (!isRecording) {
      setTimeout(() => {
        setInputValue('What dishes should I sell in this area?');
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-black border-b border-blue-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t('startup.title')}</h1>
              <p className="text-sm text-blue-200">{t('startup.subtitle')}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={startupImage}
          alt="Startup Journey"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h2 className="text-3xl font-bold mb-2 animate-fade-in-up">Your 24x7 Business Mentor</h2>
            <p className="text-blue-200 animate-fade-in-up">Get expert guidance on starting and growing your food business</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-xl font-bold mb-4">Quick Help</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-4 cursor-pointer hover:border-blue-500 transition-all card-hover"
              onClick={() => handleQuickAction(action.label)}
            >
              <action.icon className={`h-8 w-8 ${action.color} mb-2`} />
              <p className="text-sm text-white">{action.label}</p>
            </Card>
          ))}
        </div>

        {/* AI Image Section */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <img
            src={aiAssistantImage}
            alt="AI Assistant"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Chat Area */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 mb-20">
          <ScrollArea className="h-[400px] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                } animate-fade-in-up`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-white border border-blue-700'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
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
          <h4 className="text-sm text-blue-200 mb-3">Example Questions:</h4>
          <div className="space-y-2">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start border-blue-700 text-white hover:bg-blue-900"
                onClick={() => setInputValue(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4 border-t border-blue-800">
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
            placeholder={t('startup.askQuestion')}
            className="bg-gray-900 border-blue-700 text-white placeholder:text-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupMitra;
