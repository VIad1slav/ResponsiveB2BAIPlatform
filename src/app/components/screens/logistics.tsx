import React from 'react';
import { MapPin, Phone, Clock, TruckIcon, Package } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

interface Shipment {
  id: string;
  orderNumber: string;
  driverName: string;
  driverPhone: string;
  currentLocation: string;
  destination: string;
  eta: string;
  status: string;
  progress: number;
}

export const Logistics: React.FC = () => {
  const { t, language } = useLanguage();

  const shipments: Shipment[] = [
    {
      id: '1',
      orderNumber: 'PLN-2026-0142',
      driverName: 'Jan Kowalski',
      driverPhone: '+48 123 456 789',
      currentLocation: 'Warszawa, ul. Marszałkowska',
      destination: 'Poznań, ul. Polna 15',
      eta: '14:30',
      status: 'W drodze',
      progress: 65,
    },
    {
      id: '2',
      orderNumber: 'PLN-2026-0138',
      driverName: 'Anna Nowak',
      driverPhone: '+48 987 654 321',
      currentLocation: 'Magazyn - przygotowanie',
      destination: 'Kraków, ul. Ogrodowa 8',
      eta: '16:00',
      status: 'Pakowanie',
      progress: 25,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('logisticsTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('logisticsSubtitle')}</p>
      </div>

      {/* Interactive Map Placeholder - Dark theme optimized for night-shift */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-foreground font-medium">{t('liveTracking')}</p>
              <p className="text-sm text-muted-foreground mt-2">
                GPS tracking - 2 {t('activeOrders').toLowerCase()}
              </p>
            </div>
          </div>
          {/* Simulated markers with glow effect */}
          <div 
            className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary rounded-full animate-pulse shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }}
          />
          <div 
            className="absolute top-2/3 right-1/3 w-6 h-6 bg-blue-500 rounded-full animate-pulse shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
          />
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">{t('activeOrders')}</h2>
        
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-card rounded-xl shadow-sm border border-border p-6"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Zamówienie</p>
                    <p className="font-bold text-foreground text-lg">{shipment.orderNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {shipment.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Postęp dostawy</span>
                    <span className="font-medium text-foreground">{shipment.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <TruckIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aktualna lokalizacja</p>
                      <p className="font-medium text-foreground">{shipment.currentLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cel dostawy</p>
                      <p className="font-medium text-foreground">{shipment.destination}</p>
                    </div>
                  </div>
                </div>

                {/* ETA */}
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('eta')}</p>
                    <p className="font-semibold text-foreground">{t('today')} {shipment.eta}</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Driver Info */}
              <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                <p className="text-sm text-muted-foreground mb-3">Kierowca</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-foreground">
                        {shipment.driverName.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{shipment.driverName}</p>
                      <p className="text-sm text-muted-foreground">{shipment.driverPhone}</p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{t('callDriver')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};