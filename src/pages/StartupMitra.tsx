import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Lightbulb, MapPin, Users, BookOpen, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';
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
      content: 'Hello! I am Startup Mitra, your AI business advisor. I can help you with menu suggestions, location advice, supplier connections, and business basics. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickActions = [
    { icon: Lightbulb, label: 'Menu Suggestions', color: 'text-primary' },
    { icon: MapPin, label: 'Location Advice', color: 'text-accent' },
    { icon: Users, label: 'Supplier Connection', color: 'text-secondary' },
    { icon: BookOpen, label: 'Business Basics', color: 'text-primary' },
  ];

  const exampleQuestions = [
    'Which dishes should I sell in my area?',
    'Best location to set up my stall?',
    'What price should I set for paneer roll?',
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

    if (lowerQuestion.includes('menu') || lowerQuestion.includes('dish') || lowerQuestion.includes('food')) {
      return '📍 Suggestions based on your area:\n\n1. **Pani Puri** - Low cost, great profit (₹5-10 per plate)\n2. **Masala Dosa** - Popular breakfast item (₹40-60)\n3. **Cold Coffee/Lassi** - Great for summers (₹30-50)\n\n💡 These items have 80% profit margin!';
    }

    if (lowerQuestion.includes('location') || lowerQuestion.includes('stall') || lowerQuestion.includes('where')) {
      return '📍 Based on tourist traffic:\n\n**Top 3 Locations:**\n1. Near Gateway of India - 5000+ daily footfall\n2. Colaba Market - More customers in evening\n3. Marine Drive - Weekend hotspot\n\n💡 Tip: Set up between 5-10 PM for best sales!';
    }

    if (lowerQuestion.includes('price') || lowerQuestion.includes('pricing') || lowerQuestion.includes('cost')) {
      return '💰 Smart Pricing:\n\n1. **Cost + Profit:** Ingredient cost + 200-300% markup\n2. **Competitor Pricing:** Nearby vendors charge ₹40-60\n3. **Combo Deal:** Pani Puri + Sev Puri = ₹80\n\n✅ Suggestion: Start at ₹50 per plate!';
    }

    return '🙏 Great question! I can help you with:\n\n📋 Menu Planning\n📍 Best Locations\n💰 Pricing Strategy\n🤝 Supplier Connections\n📊 Inventory Tips\n🎯 Marketing Basics\n\nWhat would you like to know?';
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    toast({
      title: 'Quick action selected',
      description: 'Press send to get advice',
    });
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'Recording stopped' : 'Recording started',
      description: isRecording ? 'Processing your question...' : 'Speak your question now',
    });

    if (!isRecording) {
      setTimeout(() => {
        setInputValue('Which dishes should I sell in this area?');
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto pb-24">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <div className="sticky top-0 z-40 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between pt-10 md:pt-0">
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
                  <p className="text-sm text-muted-foreground">Your Business Advisor</p>
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
                <h2 className="text-2xl font-bold mb-1 animate-fade-in-up">24x7 Business Guide</h2>
                <p className="text-muted-foreground animate-fade-in-up text-sm">Expert advice to start your food business</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="container mx-auto px-4 py-6">
            <h3 className="text-xl font-bold mb-4 text-foreground">Quick Help</h3>
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
            <Card className="bg-card border-border mb-6">
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
            <div className="mb-6">
              <h4 className="text-sm text-muted-foreground mb-3">Example questions:</h4>
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
                placeholder="Type your question here..."
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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StartupMitra;
