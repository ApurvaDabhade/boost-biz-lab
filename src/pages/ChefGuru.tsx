import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Mic, TrendingUp, Calendar, Package, BarChart3, ChefHat, Star, Eye, Heart, MessageCircle } from 'lucide-react';
import aiAssistantImage from '@/assets/ai-assistant.jpg';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  buttons?: Array<{ label: string; value: string; icon?: string }>;
}

interface ChatFlowData {
  dishName?: string;
  date?: string;
  optionType?: 'topping' | 'addon';
  language?: 'english' | 'marathi';
  step: number;
}

const ChefGuru = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I can help you find the best toppings or add-ons for your dish 🍛',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatFlowData, setChatFlowData] = useState<ChatFlowData>({ step: 1 });

  // Popularity data state fetching from backend
  const [popularityData, setPopularityData] = useState<
    Array<{
      dish_name: string;
      views: number;
      likes: number;
      comments_count: number;
      popularity_score: number;
    }>
  >([]);

  useEffect(() => {
    if (activeTab === 'trends') {
      console.log('Fetching trend data...');
      fetch('http://localhost:5000/api/food-trends')
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
          }
          return res.json();
        })
        .then((json) => {
          if (json.status === 'success') {
            console.log('Trend data received:', json.data);
            // Map to exact keys expected in state and rendering
            const mappedData = json.data.map((item: any) => ({
              dish_name: item.dish_name,
              views: item.views,
              likes: item.likes,
              comments_count: item.comments_count,
              popularity_score: item.popularity_score,
            }));
            setPopularityData(mappedData);
          } else {
            console.error('Error fetching trend data:', json.message);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch trends:', err);
        });
    }
  }, [activeTab]);

  // Festival and seasonal add-ons with Marathi options
  const festivalAddOns = {
    diwali: ['Gulab Jamun', 'Rasgulla', 'Kaju Katli', 'Besan Ladoo', 'Anar Dana Chutney', 'Sweet Tamarind Chutney'],
    holi: ['Thandai', 'Gujiya', 'Bhang Pakora', 'Puran Poli', 'Mango Chutney', 'Mint Chutney'],
    eid: ['Sheer Khurma', 'Biryani', 'Kebabs', 'Phirni', 'Date Chutney', 'Yogurt Dip'],
    christmas: ['Plum Cake', 'Eggnog', 'Roasted Nuts', 'Cranberry Sauce', 'Honey Mustard', 'Garlic Aioli'],
    'naraka chaturdasi': ['आले-लसूण चटणी', 'तिखट हिरवी चटणी', 'बारीक चिरलेला कांदा', 'शेव', 'ताजी कोथिंबीर'],
    monsoon: ['Pakoras', 'Samosa', 'Tea', 'आले-लसूण चटणी', 'तिखट हिरवी चटणी', 'बारीक चिरलेला कांदा', 'शेव', 'ताजी कोथिंबीर'],
    summer: ['Lassi', 'Aam Panna', 'Cucumber Raita', 'Mint Chutney', 'Lemon Chutney', 'Coconut Chutney'],
    winter: ['Gajar Halwa', 'Hot Chocolate', 'Ginger Tea', 'Garlic Chutney', 'Red Chutney', 'Onion Chutney'],
  };

  // Toppings suggestions based on season and festival
  const toppingSuggestions = {
    monsoon: [
      'कांद्याच्या भजीचा कुरकुरीत चुरा',
      'तिखट पुदीना-कोथिंबीर चटणी आणि डाळिंबाचे दाणे',
      'आले-लसूण-मिरची तेल आणि भाजलेले शेंगदाणे',
      'धुरीदार पेपरिका दही आणि कुरकुरी कढीपत्ता',
    ],
    'naraka chaturdasi': [
      'कांद्याच्या भजीचा कुरकुरीत चुरा',
      'तिखट पुदीना-कोथिंबीर चटणी आणि डाळिंबाचे दाणे',
      'आले-लसूण-मिरची तेल आणि भाजलेले शेंगदाणे',
      'धुरीदार पेपरिका दही आणि कुरकुरी कढीपत्ता',
    ],
    default: ['Extra Cheese', 'Spicy Level', 'Extra Onions', 'Fresh Herbs', 'Crispy Toppings'],
  };

  const quickActions = [
    { icon: TrendingUp, label: 'Upselling Suggestions', color: 'from-green-600 to-green-800' },
    { icon: Calendar, label: 'Festival Mode', color: 'from-orange-600 to-orange-800' },
    { icon: Package, label: 'Stock Alerts', color: 'from-blue-600 to-blue-800' },
    { icon: BarChart3, label: 'Trend Analysis', color: 'from-purple-600 to-purple-800' },
  ];

  const handleChatFlow = (userInput: string, buttonValue?: string) => {
    const currentStep = chatFlowData.step;
    const input = buttonValue || userInput;

    switch (currentStep) {
      case 1: // Step 1 - Dish Name
        setChatFlowData((prev) => ({ ...prev, dishName: input, step: 2 }));
        return {
          content: 'Enter the date (YYYY-MM-DD).',
          buttons: undefined,
        };

      case 2: // Step 2 - Date Input
        setChatFlowData((prev) => ({ ...prev, date: input, step: 3 }));
        return {
          content: 'Choose option type:',
          buttons: [
            { label: 'Topping', value: 'topping', icon: '👨‍🍳' },
            { label: 'Add-on', value: 'addon', icon: '📦' },
          ],
        };

      case 3: // Step 3 - Choose Option Type
        setChatFlowData((prev) => ({ ...prev, optionType: input as 'topping' | 'addon', step: 4 }));
        return {
          content: 'Choose language:',
          buttons: [
            { label: 'GB English', value: 'english' },
            { label: 'IN Marathi', value: 'marathi' },
          ],
        };

      case 4: // Step 4 - Choose Language
        setChatFlowData((prev) => ({ ...prev, language: input as 'english' | 'marathi', step: 5 }));
        return {
          content: 'Ready to predict!',
          buttons: [{ label: 'Predict', value: 'predict', icon: '🌐' }],
        };

      case 5: // Step 5 - Predict
        if (input === 'predict') {
          setChatFlowData((prev) => ({ ...prev, step: 6 }));
          return {
            content: generatePrediction(),
            buttons: undefined,
          };
        }
        break;

      default:
        return {
          content: 'Hello! I can help you find the best toppings or add-ons for your dish 🍛\n\nPlease enter the name of your dish.',
          buttons: undefined,
        };
    }
  };

  const generatePrediction = () => {
    const { dishName, date, optionType, language } = chatFlowData;

    // Mock prediction based on the data
    const season = 'Monsoon';
    const festival = 'Naraka Chaturdasi';

    let suggestions: string[] = [];

    if (optionType === 'topping') {
      suggestions =
        language === 'marathi'
          ? [
              'कांद्याच्या भजीचा कुरकुरीत चुरा',
              'तिखट पुदीना-कोथिंबीर चटणी आणि डाळिंबाचे दाणे',
              'आले-लसूण-मिरची तेल आणि भाजलेले शेंगदाणे',
              'धुरीदार पेपरिका दही आणि कुरकुरी कढीपत्ता',
            ]
          : [
              'Crispy onion fritter crumbs',
              'Spicy mint-coriander chutney and pomegranate seeds',
              'Ginger-garlic-chilli oil and roasted peanuts',
              'Smoky paprika yogurt and crispy curry leaves',
            ];
    } else {
      suggestions =
        language === 'marathi'
          ? ['आले-लसूण चटणी', 'तिखट हिरवी चटणी', 'बारीक चिरलेला कांदा', 'शेव', 'ताजी कोथिंबीर']
          : ['Ginger-Garlic Chutney', 'Spicy Green Chutney', 'Finely chopped onion', 'Crispy Sev', 'Fresh coriander'];
    }

    return `🍽️ **Prediction Results for ${dishName}**\n\n📅 **Date:** ${date}\n🌧️ **Season:** ${season}\n🎉 **Festival:** ${festival}\n\n🎯 **Predicted ${
      optionType === 'topping' ? 'toppings' : 'add-ons'
    }:**\n${suggestions.map((item) => `• ${item}`).join('\n')}\n\n💡 *Based on seasonal trends and festival preferences*`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    setTimeout(() => {
      const response = handleChatFlow(currentInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        buttons: response.buttons,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleButtonClick = (buttonValue: string) => {
    console.log('Button clicked:', buttonValue);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: buttonValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = handleChatFlow('', buttonValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        buttons: response.buttons,
      };
      setMessages((prev) => [...prev, botResponse]);
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
        <img src={aiAssistantImage} alt="ChefGuru Assistant" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">💡 Smart Kitchen Intelligence</h2>
            <p className="text-gray-300">Real-time insights for your business growth</p>
          </div>
        </div>
      </div>

      {/* Food Images Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative h-32 bg-gradient-to-br from-orange-900/20 to-black border border-orange-700 rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">🍛</div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-medium text-white bg-black/50 rounded px-2 py-1 text-center">Pav Bhaji</div>
            </div>
          </div>

          <div className="relative h-32 bg-gradient-to-br from-green-900/20 to-black border border-green-700 rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">🥗</div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-medium text-white bg-black/50 rounded px-2 py-1 text-center">Paneer Tikka</div>
            </div>
          </div>

          <div className="relative h-32 bg-gradient-to-br from-red-900/20 to-black border border-red-700 rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">🍕</div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-medium text-white bg-black/50 rounded px-2 py-1 text-center">Chicken Curry</div>
            </div>
          </div>

          <div className="relative h-32 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-700 rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">🍜</div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-medium text-white bg-black/50 rounded px-2 py-1 text-center">Masala Dosa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="container mx-auto px-4 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-purple-700">
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
              💬 Chat Assistant
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">
              📊 Trend Analysis
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            {/* Chat Area */}
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <Card
                      className={`max-w-[80%] p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-800 border-purple-700'
                          : 'bg-gradient-to-br from-gray-900 to-black border-purple-700'
                      }`}
                    >
                      <p className="text-white whitespace-pre-line">{message.content}</p>
                      {message.buttons && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.buttons.map((button, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="border-purple-600 text-purple-400 hover:bg-purple-800 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleButtonClick(button.value);
                              }}
                            >
                              {button.icon && <span className="mr-1">{button.icon}</span>}
                              {button.label}
                            </Button>
                          ))}
                        </div>
                      )}
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
            <div className="border-t border-purple-800 pt-4">
              <p className="text-sm text-gray-400 mb-2">Start the flow by typing a dish name:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-600 text-purple-400 text-xs"
                  onClick={() => handleQuickAction('Masala Puri')}
                >
                  Masala Puri
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-600 text-purple-400 text-xs"
                  onClick={() => handleQuickAction('Pav Bhaji')}
                >
                  Pav Bhaji
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-600 text-purple-400 text-xs"
                  onClick={() => handleQuickAction('Paneer Tikka')}
                >
                  Paneer Tikka
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-600 text-purple-400 text-xs"
                  onClick={() => handleQuickAction('Masala Dosa')}
                >
                  Masala Dosa
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Trend Analysis Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Dishes */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-700">
                <CardHeader>
                  <CardTitle className="text-white">🏆 Top Performing Dishes</CardTitle>
                  <CardDescription className="text-gray-400">Based on popularity data analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularityData.slice(0, 15).map((dish, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{dish.dish_name}</div>
                            <div className="text-xs text-gray-400">Score: {dish.popularity_score}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{dish.views.toLocaleString()} views</div>
                          <div className="text-xs text-gray-400">{dish.likes.toLocaleString()} likes</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Analysis */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-700">
                <CardHeader>
                  <CardTitle className="text-white">📈 Engagement Analysis</CardTitle>
                  <CardDescription className="text-gray-400">Views, likes, and comments breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Circular Chart for Top 4 Dishes */}
                    <div className="grid grid-cols-2 gap-4">
                      {popularityData.slice(0, 10).map((dish, index) => {
                        const totalEngagement = dish.views + dish.likes + dish.comments_count;
                        const maxEngagement = Math.max(
                          ...popularityData.map((d) => d.views + d.likes + d.comments_count)
                        );
                        const percentage = maxEngagement ? (totalEngagement / maxEngagement) * 100 : 0;
                        const radius = 30;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDasharray = circumference;
                        const strokeDashoffset = circumference - (percentage / 100) * circumference;

                        return (
                          <div key={index} className="flex flex-col items-center p-3 bg-gray-800/30 rounded-lg">
                            <div className="relative w-20 h-20 mb-2">
                              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                <circle
                                  cx="40"
                                  cy="40"
                                  r={radius}
                                  stroke="currentColor"
                                  strokeWidth="6"
                                  fill="none"
                                  className="text-gray-700"
                                />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r={radius}
                                  stroke="currentColor"
                                  strokeWidth="6"
                                  fill="none"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="text-purple-500 transition-all duration-1000 ease-in-out"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-white truncate max-w-20">{dish.dish_name}</div>
                              <div className="text-xs text-gray-400">{dish.popularity_score}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bar Chart for Engagement Metrics */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Engagement Metrics Comparison</h4>
                      <div className="space-y-3">
                        {popularityData.slice(0, 15).map((dish, index) => {
                          const maxViews = popularityData.length ? Math.max(...popularityData.map((d) => d.views)) : 1;
                          const maxLikes = popularityData.length ? Math.max(...popularityData.map((d) => d.likes)) : 1;
                          const maxComments = popularityData.length ? Math.max(...popularityData.map((d) => d.comments_count)) : 1;

                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-white">{dish.dish_name}</span>
                                <span className="text-xs text-gray-400">{dish.popularity_score} score</span>
                              </div>
                              <div className="space-y-1">
                                {/* Views Bar */}
                                <div className="flex items-center">
                                  <Eye className="h-3 w-3 text-blue-400 mr-2" />
                                  <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-full transition-all duration-1000 ease-out"
                                      style={{ width: `${(dish.views / maxViews) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-400 ml-2 w-12 text-right">{Math.round(dish.views / 1000000)}M</span>
                                </div>
                                {/* Likes Bar */}
                                <div className="flex items-center">
                                  <Heart className="h-3 w-3 text-red-400 mr-2" />
                                  <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-red-500 to-red-400 h-full transition-all duration-1000 ease-out"
                                      style={{ width: `${(dish.likes / maxLikes) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-400 ml-2 w-12 text-right">{Math.round(dish.likes / 1000)}K</span>
                                </div>
                                {/* Comments Bar */}
                                <div className="flex items-center">
                                  <MessageCircle className="h-3 w-3 text-green-400 mr-2" />
                                  <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all duration-1000 ease-out"
                                      style={{ width: `${(dish.comments_count / maxComments) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-400 ml-2 w-12 text-right">{dish.comments_count}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Engagement Ratio Pie Chart */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-white mb-3">Overall Engagement Distribution</h4>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                            {/* Total Views */}
                            <circle
                              cx="60"
                              cy="60"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${
                                (popularityData.reduce((sum, d) => sum + d.views, 0) /
                                  (popularityData.reduce((sum, d) => sum + d.views, 0) +
                                    popularityData.reduce((sum, d) => sum + d.likes, 0) +
                                    popularityData.reduce((sum, d) => sum + d.comments_count, 0))) *
                                251.2
                              } 251.2`}
                              className="text-blue-500"
                            />
                            {/* Total Likes */}
                            <circle
                              cx="60"
                              cy="60"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${
                                (popularityData.reduce((sum, d) => sum + d.likes, 0) /
                                  (popularityData.reduce((sum, d) => sum + d.views, 0) +
                                    popularityData.reduce((sum, d) => sum + d.likes, 0) +
                                    popularityData.reduce((sum, d) => sum + d.comments_count, 0))) *
                                251.2
                              } 251.2`}
                              strokeDashoffset={`-${
                                (popularityData.reduce((sum, d) => sum + d.views, 0) /
                                  (popularityData.reduce((sum, d) => sum + d.views, 0) +
                                    popularityData.reduce((sum, d) => sum + d.likes, 0) +
                                    popularityData.reduce((sum, d) => sum + d.comments_count, 0))) *
                                251.2
                              }`}
                              className="text-red-500"
                            />
                            {/* Total Comments */}
                            <circle
                              cx="60"
                              cy="60"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${
                                (popularityData.reduce((sum, d) => sum + d.comments_count, 0) /
                                  (popularityData.reduce((sum, d) => sum + d.views, 0) +
                                    popularityData.reduce((sum, d) => sum + d.likes, 0) +
                                    popularityData.reduce((sum, d) => sum + d.comments_count, 0))) *
                                251.2
                              } 251.2`}
                              strokeDashoffset={`-${
                                ((popularityData.reduce((sum, d) => sum + d.views, 0) +
                                  popularityData.reduce((sum, d) => sum + d.likes, 0)) /
                                  (popularityData.reduce((sum, d) => sum + d.views, 0) +
                                    popularityData.reduce((sum, d) => sum + d.likes, 0) +
                                    popularityData.reduce((sum, d) => sum + d.comments_count, 0))) *
                                251.2
                              }`}
                              className="text-green-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-lg font-bold text-white">Engagement</div>
                              <div className="text-xs text-gray-400">Distribution</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-6 mt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-400">Views</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-400">Likes</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-400">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gap Analysis */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-700">
              <CardHeader>
                <CardTitle className="text-white">🎯 Gap Analysis & Recommendations</CardTitle>
                <CardDescription className="text-gray-400">Opportunities to improve your menu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">📊 Performance Gaps</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                        <div className="text-yellow-400 font-medium">Low Engagement Items</div>
                        <div className="text-sm text-gray-300">Masala Dosa: High views but low engagement ratio</div>
                      </div>
                      <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                        <div className="text-green-400 font-medium">High Potential</div>
                        <div className="text-sm text-gray-300">Paneer Tikka: Strong performance, consider expanding</div>
                      </div>
                      <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                        <div className="text-blue-400 font-medium">Seasonal Opportunity</div>
                        <div className="text-sm text-gray-300">Winter items showing increased demand</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">💡 Action Items</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-white font-medium">1. Menu Optimization</div>
                        <div className="text-sm text-gray-400">Focus on top 5 performing dishes</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-white font-medium">2. Add Seasonal Items</div>
                        <div className="text-sm text-gray-400">Introduce winter specials and festival items</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-white font-medium">3. Engagement Boost</div>
                        <div className="text-sm text-gray-400">Improve presentation of low-engagement items</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
          <Button size="icon" className="bg-purple-600 hover:bg-purple-700" onClick={handleSendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChefGuru;
