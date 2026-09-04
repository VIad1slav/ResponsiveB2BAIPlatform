import React, { useState } from 'react';
import { MapPin, TrendingUp, Clock, Navigation, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { useTheme } from '@/app/context/theme-context';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Route {
  id: string;
  earnings: number;
  distance: number;
  estimatedTime: number;
  pickupAddress: string;
  deliveryAddress: string;
  pickupName: string;
  deliveryName: string;
  urgency: 'normal' | 'urgent';
  cargo: string;
}

export const DriverAvailableRoutes: React.FC = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Mock available routes
  const [availableRoutes] = useState<Route[]>([
    {
      id: '#DEL2024-0043',
      earnings: 52,
      distance: 15.3,
      estimatedTime: 35,
      pickupAddress: 'ul. Polna 15, Konstancin-Jeziorna',
      deliveryAddress: 'ul. Nowy Świat 42, Warszawa',
      pickupName: 'Gospodarstwo "Zielona Dolina"',
      deliveryName: 'Restauracja "Pod Orzełem"',
      urgency: 'urgent',
      cargo: 'Warzywa świeże (25kg)',
    },
    {
      id: '#DEL2024-0044',
      earnings: 38,
      distance: 9.8,
      estimatedTime: 22,
      pickupAddress: 'ul. Ogrodowa 8, Piaseczno',
      deliveryAddress: 'ul. Marszałkowska 115, Warszawa',
      pickupName: 'Farma Ekologiczna "Bio"',
      deliveryName: 'Restauracja "Verde"',
      urgency: 'normal',
      cargo: 'Owoce sezonowe (18kg)',
    },
    {
      id: '#DEL2024-0045',
      earnings: 65,
      distance: 22.5,
      estimatedTime: 48,
      pickupAddress: 'ul. Rzeczna 3, Nadarzyn',
      deliveryAddress: 'ul. Foksal 18, Warszawa',
      pickupName: 'Gospodarstwo "Słoneczna Farma"',
      deliveryName: 'Restauracja "Atelier Amaro"',
      urgency: 'normal',
      cargo: 'Produkty premium (32kg)',
    },
    {
      id: '#DEL2024-0046',
      earnings: 42,
      distance: 11.2,
      estimatedTime: 26,
      pickupAddress: 'ul. Łąkowa 22, Lesznowola',
      deliveryAddress: 'ul. Krucza 51, Warszawa',
      pickupName: 'Sad Rodzinny "Owocowy Raj"',
      deliveryName: 'Bistro "Fresh Kitchen"',
      urgency: 'normal',
      cargo: 'Owoce i zioła (15kg)',
    },
    {
      id: '#DEL2024-0047',
      earnings: 48,
      distance: 13.7,
      estimatedTime: 31,
      pickupAddress: 'ul. Wiejska 5, Raszyn',
      deliveryAddress: 'ul. Poznańska 12, Warszawa',
      pickupName: 'Farma "Natura"',
      deliveryName: 'Restauracja "Garden"',
      urgency: 'urgent',
      cargo: 'Warzywa korzeniowe (22kg)',
    },
  ]);

  const [acceptedRoute, setAcceptedRoute] = useState<string | null>(null);

  const handleAccept = (routeId: string) => {
    setAcceptedRoute(routeId);
    setTimeout(() => {
      // In real app, navigate to dashboard or active route screen
      alert(`${t('requestAccepted')} - ${routeId}`);
      setAcceptedRoute(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('availableRoutes')}</h1>
        <p className="text-muted-foreground mt-1">{t('searchNewOrders')}</p>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{t('availableRoutes')}</p>
            <p className="text-3xl font-bold mt-1">{availableRoutes.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">{t('earningsToday')}</p>
            <p className="text-2xl font-bold mt-1">245 zł</p>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {availableRoutes.map((route) => (
          <div
            key={route.id}
            className={`bg-card border-2 rounded-xl p-6 transition-all ${
              acceptedRoute === route.id
                ? 'border-green-500 shadow-lg shadow-green-500/20'
                : route.urgency === 'urgent'
                ? 'border-orange-500/50 shadow-lg'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Header with Earnings */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-muted-foreground">{route.id}</span>
                  {route.urgency === 'urgent' && (
                    <Badge className="bg-orange-500 text-white">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{route.cargo}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-500">{route.earnings} zł</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>~{route.estimatedTime} min</span>
                  <span>•</span>
                  <span>{route.distance} km</span>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="space-y-3 mb-4">
              {/* Pickup */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-500">{t('pickup')}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{route.pickupName}</p>
                  <p className="text-xs text-muted-foreground">{route.pickupAddress}</p>
                </div>
              </div>

              {/* Connection Line */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-0.5 h-8 bg-border"></div>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-500">{t('delivery')}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{route.deliveryName}</p>
                  <p className="text-xs text-muted-foreground">{route.deliveryAddress}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => handleAccept(route.id)}
              disabled={acceptedRoute === route.id}
              className={`w-full ${
                acceptedRoute === route.id
                  ? 'bg-green-500 hover:bg-green-600'
                  : route.urgency === 'urgent'
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-primary hover:bg-primary/90'
              } text-white font-semibold`}
            >
              {acceptedRoute === route.id ? (
                <>
                  <TrendingUp className="w-4 h-4 mr-2 animate-pulse" />
                  {t('requestAccepted')}
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  {t('acceptOrder')} • {route.earnings} zł
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Empty State (if no routes) */}
      {availableRoutes.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t('noActiveRoutes')}</h3>
          <p className="text-sm text-muted-foreground">{t('startSearching')}</p>
        </div>
      )}
    </div>
  );
};

DriverAvailableRoutes.displayName = 'DriverAvailableRoutes';
