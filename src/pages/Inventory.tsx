import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Package, AlertTriangle, Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, MobileSidebarTrigger } from '@/components/AppSidebar';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'good' | 'low' | 'critical';
  expiryDays: number;
  recommendation?: string;
}

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', name: 'Paneer', quantity: 5, unit: 'kg', status: 'low', expiryDays: 2, recommendation: 'Use in Paneer Tikka' },
    { id: '2', name: 'Tomato', quantity: 15, unit: 'kg', status: 'good', expiryDays: 4 },
    { id: '3', name: 'Onion', quantity: 2, unit: 'kg', status: 'critical', expiryDays: 7 },
    { id: '4', name: 'Rice', quantity: 20, unit: 'kg', status: 'good', expiryDays: 30 },
    { id: '5', name: 'Oil', quantity: 3, unit: 'L', status: 'low', expiryDays: 60 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', expiryDays: '' });

  const handleAddItem = () => {
    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      status: parseFloat(newItem.quantity) > 10 ? 'good' : parseFloat(newItem.quantity) > 5 ? 'low' : 'critical',
      expiryDays: parseInt(newItem.expiryDays),
    };
    setItems([...items, item]);
    setNewItem({ name: '', quantity: '', unit: '', expiryDays: '' });
    setIsAddModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-accent';
      case 'low': return 'bg-secondary';
      case 'critical': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Sufficient';
      case 'low': return 'Low';
      case 'critical': return 'Very Low';
      default: return status;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <MobileSidebarTrigger />
          
          {/* Header */}
          <header className="sticky top-0 z-40 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between pt-10 md:pt-0">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-foreground hover:bg-primary/10">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-primary">📦 Inventory Management</h1>
                    <p className="text-sm text-muted-foreground">Track stock levels and reduce waste</p>
                  </div>
                </div>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card text-foreground border-border">
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Item Name</Label>
                        <Input
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          className="bg-background border-border"
                          placeholder="e.g. Paneer"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                            className="bg-background border-border"
                            placeholder="10"
                          />
                        </div>
                        <div>
                          <Label>Unit</Label>
                          <Input
                            value={newItem.unit}
                            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                            className="bg-background border-border"
                            placeholder="kg"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Expiry (days)</Label>
                        <Input
                          type="number"
                          value={newItem.expiryDays}
                          onChange={(e) => setNewItem({ ...newItem, expiryDays: e.target.value })}
                          className="bg-background border-border"
                          placeholder="7"
                        />
                      </div>
                      <Button onClick={handleAddItem} className="w-full bg-primary hover:bg-primary/90">
                        Add Item
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-3xl font-bold text-foreground">{items.length}</p>
                  </div>
                  <Package className="h-10 w-10 text-primary" />
                </div>
              </Card>
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                    <p className="text-3xl font-bold text-secondary">
                      {items.filter(i => i.status === 'low').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-10 w-10 text-secondary" />
                </div>
              </Card>
              <Card className="bg-card border-border p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-3xl font-bold text-destructive">
                      {items.filter(i => i.status === 'critical').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>
              </Card>
            </div>

            {/* Smart Recommendations */}
            <Card className="bg-card border-primary/30 p-6 mb-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Smart Suggestions</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {items.filter(i => i.recommendation).map(item => (
                  <li key={item.id}>💡 {item.name}: {item.recommendation}</li>
                ))}
                <li>🎯 Expiring Soon: Use Paneer within 2 days</li>
                <li>📦 Restock: Onion is very low</li>
              </ul>
            </Card>

            {/* Inventory List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="bg-card border-border p-6 shadow-lg hover:shadow-primary/10 transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} text-white`}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>⏰ Expires in {item.expiryDays} days</p>
                    {item.recommendation && (
                      <p className="text-primary">💡 {item.recommendation}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-border text-foreground hover:bg-primary/10">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;
