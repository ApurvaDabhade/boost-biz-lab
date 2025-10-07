import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Mic, TrendingUp, Calendar, Package, BarChart3, ChefHat } from 'lucide-react';
import aiAssistantImage from '@/assets/ai-assistant.jpg';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChefGuru = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m ChefGuru, your intelligent kitchen assistant. I can help you with upselling strategies, festival menu planning, inventory alerts, and sales trend analysis. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickActions = [
    { icon: TrendingUp, label: 'Upselling Suggestions', color: 'from-green-600 to-green-800' },
    { icon: Calendar, label: 'Festival Mode', color: 'from-orange-600 to-orange-800' },
    { icon: Package, label: 'Stock Alerts', color: 'from-blue-600 to-blue-800' },
    { icon: BarChart3, label: 'Trend Analysis', color: 'from-purple-600 to-purple-800' },
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('upsell') || lowerMessage.includes('sell more')) {
      return '💡 Upselling Tips:\n\n1. Combo Offers: Pair Paneer Roll + Cold Drink for ₹120 (save ₹30)\n2. Size Upgrade: "Would you like large size for just ₹20 more?"\n3. Add-ons: Suggest extra cheese or spicy level\n4. Festival Specials: Highlight limited-time items\n\n📈 This can increase sales by 25-40%!';
    }
    
    if (lowerMessage.includes('festival') || lowerMessage.includes('diwali')) {
      return '🎉 Festival Menu Recommendations:\n\n🪔 Diwali Special Items:\n• Sweet Paneer Roll\n• Festival Thali\n• Gulab Jamun Combo\n• Diwali Discount Packages\n\n💰 Pricing Strategy: Premium pricing (+15%) but with combo offers\n📣 Marketing: Social media posts + WhatsApp broadcast';
    }
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
      return '📦 Current Stock Alerts:\n\n🔴 Critical:\n• Onions - Only 2kg left\n\n🟡 Low:\n• Paneer - 5kg remaining\n• Oil - 3L remaining\n\n💡 Suggestion: Order Onions today, Paneer by tomorrow\n\n🎯 Smart tip: Stock up on sweets for Diwali rush!';
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('analysis') || lowerMessage.includes('sales')) {
      return '📊 Sales Trend Analysis:\n\n📈 This Week:\n• Sales up 15%\n• Peak hours: 12PM-2PM, 7PM-9PM\n• Top seller: Paneer Roll (45% increase)\n\n🔥 Insights:\n• Tourist area sales doubled\n• Weekend demand higher\n• Combo offers working well\n\n💡 Recommendation: Increase Paneer Roll production by 30%';
    }
    
    return 'I can help you with:\n\n🎯 Upselling strategies to boost revenue\n🎉 Festival menu planning and pricing\n📦 Inventory management and alerts\n📊 Sales trends and customer patterns\n\nWhat would you like to explore?';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('Tell me about sales trends');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-black border-b border-purple-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <ChefHat className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold text-purple-400">ChefGuru</h1>
                <p className="text-sm text-purple-200">Your Intelligent Kitchen Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={aiAssistantImage}
          alt="ChefGuru Assistant"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">💡 Smart Kitchen Intelligence</h2>
            <p className="text-gray-300">Real-time insights for your business growth</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border-purple-700 p-4 cursor-pointer hover:scale-105 transition-all"
              onClick={() => handleQuickAction(action.label)}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-medium text-white">{action.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 container mx-auto px-4 pb-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 border-purple-700'
                    : 'bg-gradient-to-br from-gray-900 to-black border-purple-700'
                }`}
              >
                <p className="text-white whitespace-pre-line">{message.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Example Questions */}
      <div className="container mx-auto px-4 py-4 border-t border-purple-800">
        <p className="text-sm text-gray-400 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-purple-600 text-purple-400 text-xs"
            onClick={() => handleQuickAction('How can I upsell more?')}
          >
            How can I upsell more?
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-purple-600 text-purple-400 text-xs"
            onClick={() => handleQuickAction('Festival menu ideas')}
          >
            Festival menu ideas
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-purple-600 text-purple-400 text-xs"
            onClick={() => handleQuickAction('Check my inventory')}
          >
            Check my inventory
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-purple-600 text-purple-400 text-xs"
            onClick={() => handleQuickAction('Sales trends today')}
          >
            Sales trends today
          </Button>
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black to-transparent border-t border-purple-800 p-4">
        <div className="container mx-auto max-w-4xl flex gap-3">
          <Button
            size="icon"
            variant="outline"
            className={`border-purple-600 ${isRecording ? 'bg-red-600' : 'text-purple-400'}`}
            onClick={handleVoiceInput}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask ChefGuru anything..."
            className="flex-1 bg-gray-900 border-purple-700 text-white"
          />
          <Button
            size="icon"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChefGuru;
