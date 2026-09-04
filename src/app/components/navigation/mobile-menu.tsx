import React from 'react';
import { X, Truck, Users, BarChart3, Settings, Globe, LogOut, MapPin, DollarSign, Package, TrendingUp, Warehouse, History, Car, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useAuth } from '../../context/auth-context';
import { useRole } from '../../context/role-context';
import { cn } from '../ui/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeScreen, onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const { logout } = useAuth();
  const { role } = useRole();

  // Menu items change based on role (items not in bottom nav)
  const getMenuItems = () => {
    if (role === 'farmer') {
      return [
        { id: 'logistics', icon: MapPin, key: 'pickups' }, // "Odbiory"
        { id: 'suppliers', icon: Warehouse, key: 'warehouse' }, // "Склад"
        { id: 'analytics', icon: DollarSign, key: 'finance' }, // "Finanse"
        { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
        { id: 'settings', icon: Settings, key: 'settings' },
      ];
    } else if (role === 'logistics') {
      return [
        { id: 'delivery-history', icon: History, key: 'deliveryHistory' }, // "Historia"
        { id: 'vehicle', icon: Package, key: 'myVehicle' }, // "Mój pojazd"
        { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
        { id: 'settings', icon: Settings, key: 'settings' },
      ];
    } else {
      // Restaurant
      return [
        { id: 'logistics', icon: Truck, key: 'logistics' },
        { id: 'suppliers', icon: Users, key: 'suppliers' },
        { id: 'analytics', icon: BarChart3, key: 'analytics' },
        { id: 'ai-hub', icon: Sparkles, key: 'aiHub', special: true }, // AI Hub
        { id: 'settings', icon: Settings, key: 'settings' },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleNavigate = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card z-50 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold text-primary">Plon</h2>
            <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4 space-y-2 px-4">
            {menuItems.map((item: any) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              const isSpecial = item.special;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive && !isSpecial && 'bg-primary text-primary-foreground',
                    isActive && isSpecial && 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20',
                    !isActive && isSpecial && 'bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary hover:from-primary/20 hover:to-purple-500/20 border border-primary/20',
                    !isActive && !isSpecial && 'text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className={cn(
                    'w-5 h-5',
                    isSpecial && !isActive && 'animate-pulse'
                  )} />
                  <span className="font-medium flex-1 text-left">{t(item.key)}</span>
                  {isSpecial && !isActive && (
                    <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Language</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['PL', 'UA', 'RU', 'EN'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`[Plon] Switching language from ${language} to ${lang}`);
                    setLanguage(lang);
                  }}
                  className={cn(
                    'py-2 px-3 rounded-lg text-sm font-medium transition-colors',
                    language === lang 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground hover:bg-accent'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={logout}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                'text-foreground hover:bg-accent'
              )}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t('logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

MobileMenu.displayName = 'MobileMenu';