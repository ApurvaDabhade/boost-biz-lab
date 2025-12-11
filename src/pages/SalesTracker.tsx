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
  { id: 'sabzi', label: 'सब्जी / Vegetables', emoji: '🥬' },
  { id: 'masala', label: 'मसाला / Spices', emoji: '🌶️' },
  { id: 'tel', label: 'तेल / Oil', emoji: '🫒' },
  { id: 'gas', label: 'गैस / Gas', emoji: '🔥' },
  { id: 'anya', label: 'अन्य / Other', emoji: '📦' },
];

const SalesTracker = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'sales');
  const [salesAmount, setSalesAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Simple local storage for demo
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
      toast({ title: '⚠️ सही राशि डालें', description: 'Please enter valid amount' });
      return;
    }
    const newSales = todaySales + amount;
    setTodaySales(newSales);
    saveToday(newSales, todayExpense);
    setSalesAmount('');
    toast({ title: '✅ बिक्री जोड़ी गई!', description: `₹${amount} added to sales` });
    setActiveTab('profit');
  };

  const handleExpenseSubmit = () => {
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0 || !selectedCategory) {
      toast({ title: '⚠️ राशि और श्रेणी चुनें', description: 'Select category and enter amount' });
      return;
    }
    const newExpense = todayExpense + amount;
    setTodayExpense(newExpense);
    saveToday(todaySales, newExpense);
    setExpenseAmount('');
    setSelectedCategory('');
    toast({ title: '✅ खर्च जोड़ा गया!', description: `₹${amount} added to expense` });
    setActiveTab('profit');
  };

  const profit = todaySales - todayExpense;

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
              💰 बिक्री / खर्च
            </h1>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6 max-w-md mx-auto">
            {[
              { id: 'sales', label: 'बिक्री', emoji: '📈' },
              { id: 'expense', label: 'खर्च', emoji: '📉' },
              { id: 'profit', label: 'नफ़ा', emoji: '💵' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`flex-1 h-14 text-lg font-bold rounded-xl ${
                  activeTab === tab.id ? 'bg-primary' : ''
                }`}
              >
                {tab.emoji} {tab.label}
              </Button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    📈 आज की बिक्री डालें
                  </h2>
                  <p className="text-center text-muted-foreground mb-6 text-sm">
                    Enter Today's Sales
                  </p>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
                    <Input
                      type="number"
                      placeholder="राशि डालें..."
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSalesSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-primary"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    जोड़ें / Add
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Expense Tab */}
            {activeTab === 'expense' && (
              <Card className="border-2 border-secondary/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    📉 आज का खर्च डालें
                  </h2>
                  <p className="text-center text-muted-foreground mb-4 text-sm">
                    Enter Today's Expense
                  </p>
                  
                  {/* Category Selection */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {expenseCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`h-14 text-sm font-semibold rounded-xl ${
                          selectedCategory === cat.id ? 'bg-secondary text-secondary-foreground' : ''
                        }`}
                      >
                        <span className="mr-2 text-lg">{cat.emoji}</span>
                        {cat.label.split(' / ')[0]}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-secondary" />
                    <Input
                      type="number"
                      placeholder="राशि डालें..."
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleExpenseSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-secondary text-secondary-foreground"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    जोड़ें / Add
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Profit Tab */}
            {activeTab === 'profit' && (
              <Card className="border-2 border-accent/30">
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-bold mb-6">
                    💵 आज का हिसाब
                  </h2>
                  <p className="text-muted-foreground mb-6 text-sm">Today's Summary</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
                      <span className="text-lg">📈 बिक्री / Sales</span>
                      <span className="text-2xl font-bold text-primary">₹{todaySales}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-xl">
                      <span className="text-lg">📉 खर्च / Expense</span>
                      <span className="text-2xl font-bold text-secondary-foreground">₹{todayExpense}</span>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${profit >= 0 ? 'bg-accent/20' : 'bg-destructive/20'}`}>
                    <p className="text-lg mb-2">आज का मुनाफ़ा</p>
                    <p className="text-xs text-muted-foreground mb-4">Today's Profit</p>
                    <p className={`text-5xl font-bold ${profit >= 0 ? 'text-accent' : 'text-destructive'}`}>
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
