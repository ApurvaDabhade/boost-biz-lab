import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Home, 
  IndianRupee, 
  FileText, 
  Image as ImageIcon,
  Menu
} from 'lucide-react';

const menuItems = [
  { 
    title: 'होम', 
    titleEn: 'Home',
    url: '/dashboard', 
    icon: Home 
  },
  { 
    title: 'बिक्री / खर्च', 
    titleEn: 'Sales/Expense',
    url: '/sales-tracker', 
    icon: IndianRupee 
  },
  { 
    title: 'लाइसेंस सहायता', 
    titleEn: 'License Help',
    url: '/license-help', 
    icon: FileText 
  },
  { 
    title: 'पोस्टर बनाएं', 
    titleEn: 'Make Poster',
    url: '/poster-maker', 
    icon: ImageIcon 
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl">🍛</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">रसोई मित्र</h1>
            <p className="text-xs text-sidebar-foreground/70">RasoiMitra</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    className="h-14 text-lg gap-4"
                  >
                    <item.icon className="h-6 w-6" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-xs opacity-70">{item.titleEn}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function MobileSidebarTrigger() {
  return (
    <SidebarTrigger className="md:hidden fixed top-4 left-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
      <Menu className="h-6 w-6" />
    </SidebarTrigger>
  );
}
