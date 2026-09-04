import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Package,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  Warehouse,
  Wallet,
  History,
  Map as MapIcon,
  ChevronDown,
  Check,
  Building2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useAuth } from '../../context/auth-context';
import { useRole } from '../../context/role-context';
import { useVenue } from '../../context/venue-context';
import { cn } from '../ui/utils';

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Navigation items for Restaurant role
const restaurantNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { id: 'catalog', icon: ShoppingBag, key: 'catalog' },
  { id: 'orders', icon: ShoppingCart, key: 'orders' },
  { id: 'logistics', icon: Truck, key: 'logistics' },
  { id: 'suppliers', icon: Users, key: 'suppliers' },
  { id: 'analytics', icon: BarChart3, key: 'analytics' },
  { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
  { id: 'settings', icon: Settings, key: 'settings' },
];

// Navigation items for Farmer/Supplier role
const farmerNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { id: 'catalog', icon: Package, key: 'myProducts' }, // "Moje produkty"
  { id: 'orders', icon: TrendingUp, key: 'sales' }, // "Sprzedaż"
  { id: 'logistics', icon: MapPin, key: 'pickups' }, // "Odbiory"
  { id: 'suppliers', icon: Warehouse, key: 'warehouse' }, // "Склад"
  { id: 'analytics', icon: BarChart3, key: 'analytics' }, // "Аналитика"
  { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
  { id: 'settings', icon: Settings, key: 'settings' },
];

// Navigation items for Logistics/Driver role
const logisticsNavItems = [
  { id: 'dashboard', icon: MapIcon, key: 'dashboard' }, // Dashboard с картой
  { id: 'available-routes', icon: Truck, key: 'availableRoutes' }, // Dostępne trasy
  { id: 'wallet', icon: Wallet, key: 'wallet' }, // Portfel
  { id: 'delivery-history', icon: History, key: 'deliveryHistory' }, // Historia
  { id: 'vehicle', icon: Package, key: 'myVehicle' }, // Mój pojazd
  { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
  { id: 'settings', icon: Settings, key: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate, collapsed, onToggleCollapse }) => {
  const { role } = useRole();
  const { t } = useLanguage();
  const { logout } = useAuth();
  const { venues, activeVenue, setActiveVenue, showAllVenues, setShowAllVenues } = useVenue();
  const [venueDropdownOpen, setVenueDropdownOpen] = React.useState(false);

  // Select navigation items based on role
  const navItems = 
    role === 'farmer' ? farmerNavItems :
    role === 'logistics' ? logisticsNavItems :
    restaurantNavItems;

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && <h1 className="text-xl font-bold text-primary">Plon</h1>}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Venue Selector - Only for Restaurant role */}
      {role === 'restaurant' && !collapsed && (
        <div className="px-3 py-4 border-b border-border">
          <div className="relative">
            <button
              onClick={() => setVenueDropdownOpen(!venueDropdownOpen)}
              className="w-full px-3 py-3 bg-secondary rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs text-muted-foreground">{t('switchVenue')}</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {showAllVenues ? t('allVenues') : activeVenue?.name || t('selectVenue')}
                </p>
              </div>
              <ChevronDown className={cn(
                'w-4 h-4 text-muted-foreground transition-transform flex-shrink-0',
                venueDropdownOpen && 'rotate-180'
              )} />
            </button>

            {/* Dropdown Menu */}
            {venueDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-xl border border-border z-50 max-h-64 overflow-y-auto">
                {/* All Venues Option */}
                <button
                  onClick={() => {
                    setShowAllVenues(true);
                    setVenueDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 hover:bg-accent transition-colors flex items-center gap-3 border-b border-border"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t('allVenues')}</p>
                    <p className="text-xs text-muted-foreground">{t('viewAllData')}</p>
                  </div>
                  {showAllVenues && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </button>

                {/* Individual Venues */}
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => {
                      setActiveVenue(venue);
                      setShowAllVenues(false);
                      setVenueDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-accent transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {venue.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{venue.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{venue.address}</p>
                    </div>
                    {!showAllVenues && activeVenue?.id === venue.id && (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collapsed Venue Icon - Only for Restaurant role */}
      {role === 'restaurant' && collapsed && (
        <div className="px-3 py-4 border-b border-border">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item: any) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          const isSpecial = item.special;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
                isActive && !isSpecial && 'bg-primary text-primary-foreground shadow-lg',
                isActive && isSpecial && 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20',
                !isActive && isSpecial && 'bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary hover:from-primary/20 hover:to-purple-500/20 border border-primary/20',
                !isActive && !isSpecial && 'text-foreground hover:bg-accent',
                collapsed && 'justify-center'
              )}
            >
              <Icon className={cn(
                'w-5 h-5 flex-shrink-0',
                isSpecial && !isActive && 'animate-pulse'
              )} />
              {!collapsed && <span className="text-sm font-medium">{t(item.key)}</span>}
              {!collapsed && isSpecial && !isActive && (
                <span className="ml-auto px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-2">
        <button
          onClick={logout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
            'text-foreground hover:bg-accent',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">{t('logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';