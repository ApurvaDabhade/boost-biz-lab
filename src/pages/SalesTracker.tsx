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
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'border-border hover:bg-muted'
                }`}
              >
                {tab.emoji} {tab.label}
              </Button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <Card className="bg-card border-primary/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center text-card-foreground">
                    📈 Enter Today's Sales
                  </h2>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl bg-muted border-border"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSalesSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    Add Sales
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Expense Tab */}
            {activeTab === 'expense' && (
              <Card className="bg-card border-secondary/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center text-card-foreground">
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
                            ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        <span className="mr-2 text-lg">{cat.emoji}</span>
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="relative mb-6">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 text-secondary" />
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="h-16 text-2xl pl-14 text-center font-bold rounded-xl bg-muted border-border"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleExpenseSubmit}
                    className="w-full h-14 text-xl font-bold rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Check className="h-6 w-6 mr-2" />
                    Add Expense
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Profit Tab */}
            {activeTab === 'profit' && (
              <Card className="bg-card border-accent/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-bold mb-6 text-card-foreground">
                    💵 Today's Summary
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-accent/10 rounded-xl border border-accent/30">
                      <span className="text-lg text-muted-foreground">📈 Sales</span>
                      <span className="text-2xl font-bold text-accent">₹{todaySales}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-xl border border-secondary/30">
                      <span className="text-lg text-muted-foreground">📉 Expense</span>
                      <span className="text-2xl font-bold text-secondary">₹{todayExpense}</span>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${profit >= 0 ? 'bg-accent/10 border border-accent/50' : 'bg-destructive/10 border border-destructive/50'}`}>
                    <p className="text-lg mb-2 text-muted-foreground">Today's Profit</p>
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
