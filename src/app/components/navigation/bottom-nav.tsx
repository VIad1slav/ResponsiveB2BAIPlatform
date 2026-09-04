import React from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Menu, Package, TrendingUp, MapPin, Truck, Wallet, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useRole } from '../../context/role-context';
import { cn } from '../ui/utils';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onMenuOpen: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate, onMenuOpen }) => {
  const { t } = useLanguage();
  const { role } = useRole();

  // Different nav items based on role (first 3 items + menu)
  const getNavItems = () => {
    if (role === 'farmer') {
      return [
        { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
        { id: 'catalog', icon: Package, label: t('myProducts') },
        { id: 'orders', icon: TrendingUp, label: t('sales') },
        { id: 'menu', icon: Menu, label: t('menu') },
      ];
    } else if (role === 'logistics') {
      return [
        { id: 'dashboard', icon: MapIcon, label: t('dashboard') },
        { id: 'available-routes', icon: Truck, label: t('availableRoutes') },
        { id: 'wallet', icon: Wallet, label: t('wallet') },
        { id: 'menu', icon: Menu, label: t('menu') },
      ];
    } else {
      // Restaurant
      return [
        { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
        { id: 'catalog', icon: ShoppingBag, label: t('catalog') },
        { id: 'orders', icon: ShoppingCart, label: t('orders') },
        { id: 'menu', icon: Menu, label: t('menu') },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 shadow-lg">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => item.id === 'menu' ? onMenuOpen() : onNavigate(item.id)}
              className={cn(
                'flex flex-col items-center justify-center py-3 gap-1 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

BottomNav.displayName = 'BottomNav';