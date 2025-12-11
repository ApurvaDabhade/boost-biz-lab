import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, IndianRupee, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';

const expenseCategories = [
  { id: 'sabzi', label: 'Vegetables', emoji: '🥬' },
  { id: 'masala', label: 'Spices', emoji: '🌶️' },
  { id: 'tel', label: 'Oil', emoji: '🫒' },
  { id: 'gas', label: 'Gas', emoji: '🔥' },
  { id: 'anya', label: 'Other', emoji: '📦' },
];

const SalesTracker = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'sales');
  const [salesAmount, setSalesAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [todaySales, setTodaySales] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('rasoimitra_today');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.date === today) {
        setTodaySales(data.sales || 0);
        setTodayExpense(data.expense || 0);
      }
    }
  }, []);

  const saveToday = (sales: number, expense: number) => {
    localStorage.setItem('rasoimitra_today', JSON.stringify({
      date: new Date().toDateString(),
      sales,
      expense,
    }));
  };

  const handleSalesSubmit = () => {
    const amount = parseFloat(salesAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: '⚠️ Enter valid amount', description: 'Please enter a valid amount' });
      return;
    }
    const newSales = todaySales + amount;
    setTodaySales(newSales);
    saveToday(newSales, todayExpense);
    setSalesAmount('');
    toast({ title: '✅ Sales Added!', description: `₹${amount} added to sales` });
    setActiveTab('profit');
  };

  const handleExpenseSubmit = () => {
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0 || !selectedCategory) {
      toast({ title: '⚠️ Select category and amount', description: 'Please select category and enter amount' });
      return;
    }
    const newExpense = todayExpense + amount;
    setTodayExpense(newExpense);
    saveToday(todaySales, newExpense);
    setExpenseAmount('');
    setSelectedCategory('');
    toast({ title: '✅ Expense Added!', description: `₹${amount} added to expense` });
    setActiveTab('profit');
  };

  const profit = todaySales - todayExpense;

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
              💰 Sales & Expense Tracker
            </h1>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6 max-w-md mx-auto">
            {[
              { id: 'sales', label: 'Sales', emoji: '📈' },
              { id: 'expense', label: 'Expense', emoji: '📉' },
              { id: 'profit', label: 'Profit', emoji: '💵' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`flex-1 h-14 text-lg font-bold rounded-xl ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'border-blue-700 text-white hover:bg-blue-900'
                }`}
              >
                {tab.emoji} {tab.label}
              </Button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center text-white">
                    📈 Enter Today's Sales
                  </h2>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-400" />
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl bg-gray-800 border-blue-700 text-white"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSalesSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    Add Sales
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Expense Tab */}
            {activeTab === 'expense' && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-700">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center text-white">
                    📉 Enter Today's Expense
                  </h2>
                  
                  {/* Category Selection */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {expenseCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`h-14 text-sm font-semibold rounded-xl ${
                          selectedCategory === cat.id 
                            ? 'bg-orange-600 hover:bg-orange-700' 
                            : 'border-orange-700 text-white hover:bg-orange-900'
                        }`}
                      >
                        <span className="mr-2 text-lg">{cat.emoji}</span>
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-orange-400" />
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl bg-gray-800 border-orange-700 text-white"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleExpenseSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-orange-600 hover:bg-orange-700"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    Add Expense
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Profit Tab */}
            {activeTab === 'profit' && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-emerald-700">
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-bold mb-6 text-white">
                    💵 Today's Summary
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-green-900/30 rounded-xl border border-green-700">
                      <span className="text-lg text-gray-300">📈 Sales</span>
                      <span className="text-2xl font-bold text-green-400">₹{todaySales}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-900/30 rounded-xl border border-orange-700">
                      <span className="text-lg text-gray-300">📉 Expense</span>
                      <span className="text-2xl font-bold text-orange-400">₹{todayExpense}</span>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${profit >= 0 ? 'bg-emerald-900/30 border border-emerald-600' : 'bg-red-900/30 border border-red-600'}`}>
                    <p className="text-lg mb-2 text-gray-300">Today's Profit</p>
                    <p className={`text-5xl font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      ₹{profit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SalesTracker;
