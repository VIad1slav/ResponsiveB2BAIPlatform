import React, { useState } from 'react';
import { Package, MapPin, Calendar, Clock, DollarSign, CheckCircle, X, FileText, Download, Printer } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { InvoiceView } from './invoice-view';
import { useTheme } from '../../context/theme-context';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Delivery {
  id: string;
  date: string;
  pickupName: string;
  pickupAddress: string;
  deliveryName: string;
  deliveryAddress: string;
  earnings: number;
  distance: number;
  status: 'completed' | 'cancelled';
  cargo: string;
}

export const DriverDeliveryHistory: React.FC = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedDelivery) {
        setSelectedDelivery(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedDelivery]);

  // Mock delivery history
  const deliveries: Delivery[] = [
    {
      id: '#DEL2024-0042',
      date: '2024-02-13 14:30',
      pickupName: 'Gospodarstwo "Zielona Dolina"',
      pickupAddress: 'ul. Polna 15, Konstancin-Jeziorna',
      deliveryName: 'Restauracja "Pod Orzełem"',
      deliveryAddress: 'ul. Nowy Świat 42, Warszawa',
      earnings: 52.00,
      distance: 15.3,
      status: 'completed',
      cargo: 'Warzywa świeże (25kg)',
    },
    {
      id: '#DEL2024-0041',
      date: '2024-02-13 12:15',
      pickupName: 'Farma Ekologiczna "Bio"',
      pickupAddress: 'ul. Ogrodowa 8, Piaseczno',
      deliveryName: 'Restauracja "Verde"',
      deliveryAddress: 'ul. Marszałkowska 115, Warszawa',
      earnings: 38.00,
      distance: 9.8,
      status: 'completed',
      cargo: 'Owoce sezonowe (18kg)',
    },
    {
      id: '#DEL2024-0040',
      date: '2024-02-12 16:20',
      pickupName: 'Gospodarstwo "Słoneczna Farma"',
      pickupAddress: 'ul. Rzeczna 3, Nadarzyn',
      deliveryName: 'Restauracja "Atelier Amaro"',
      deliveryAddress: 'ul. Foksal 18, Warszawa',
      earnings: 65.00,
      distance: 22.5,
      status: 'completed',
      cargo: 'Produkty premium (32kg)',
    },
    {
      id: '#DEL2024-0039',
      date: '2024-02-12 14:10',
      pickupName: 'Sad Rodzinny "Owocowy Raj"',
      pickupAddress: 'ul. Łąkowa 22, Lesznowola',
      deliveryName: 'Bistro "Fresh Kitchen"',
      deliveryAddress: 'ul. Krucza 51, Warszawa',
      earnings: 42.00,
      distance: 11.2,
      status: 'completed',
      cargo: 'Owoce i zioła (15kg)',
    },
    {
      id: '#DEL2024-0038',
      date: '2024-02-12 11:30',
      pickupName: 'Farma "Natura"',
      pickupAddress: 'ul. Wiejska 5, Raszyn',
      deliveryName: 'Restauracja "Garden"',
      deliveryAddress: 'ul. Poznańska 12, Warszawa',
      earnings: 48.00,
      distance: 13.7,
      status: 'completed',
      cargo: 'Warzywa korzeniowe (22kg)',
    },
    {
      id: '#DEL2024-0037',
      date: '2024-02-11 17:45',
      pickupName: 'Gospodarstwo "Zielona Dolina"',
      pickupAddress: 'ul. Polna 15, Konstancin-Jeziorna',
      deliveryName: 'Restauracja "Pod Orzełem"',
      deliveryAddress: 'ul. Nowy Świat 42, Warszawa',
      earnings: 0.00,
      distance: 0,
      status: 'cancelled',
      cargo: 'Anulowane przez restaurację',
    },
  ];

  const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;
  const totalEarnings = deliveries
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.earnings, 0);
  const totalDistance = deliveries
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.distance, 0);

  const handleViewInvoice = (deliveryId: string) => {
    setSelectedDelivery(deliveryId);
  };

  const handleCloseInvoice = () => {
    setSelectedDelivery(null);
  };

  const handleDownloadInvoice = (deliveryId: string) => {
    // In real app, download PDF invoice
    alert(`${t('downloadInvoice')}: ${deliveryId}`);
  };

  const selectedDeliveryData = deliveries.find(d => d.id === selectedDelivery);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('deliveryHistory')}</h1>
        <p className="text-muted-foreground mt-1">{t('completedDeliveries')}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('completedDeliveriesCount')}</p>
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{completedDeliveries}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('earnings')}</p>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalEarnings.toFixed(2)} zł</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('distance')}</p>
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalDistance.toFixed(1)} km</p>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className={`bg-card border rounded-xl p-6 transition-all ${
              delivery.status === 'cancelled'
                ? 'border-red-500/30 opacity-60'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-foreground">{delivery.id}</span>
                  {delivery.status === 'completed' ? (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('deliveryCompleted')}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      {t('cancelled')}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{delivery.date}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  delivery.status === 'completed' ? 'text-green-500' : 'text-muted-foreground'
                }`}>
                  {delivery.status === 'completed' ? `${delivery.earnings.toFixed(2)} zł` : '—'}
                </div>
                {delivery.status === 'completed' && (
                  <div className="text-xs text-muted-foreground mt-1">{delivery.distance} km</div>
                )}
              </div>
            </div>

            {/* Cargo Info */}
            <div className="bg-accent/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-muted-foreground">{delivery.cargo}</p>
            </div>

            {/* Route Details */}
            <div className="space-y-3 mb-4">
              {/* Pickup */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-blue-500">{t('pickup')}</span>
                  <p className="text-sm font-medium text-foreground">{delivery.pickupName}</p>
                  <p className="text-xs text-muted-foreground">{delivery.pickupAddress}</p>
                </div>
              </div>

              {/* Connection Line */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-0.5 h-6 bg-border"></div>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-purple-500">{t('delivery')}</span>
                  <p className="text-sm font-medium text-foreground">{delivery.deliveryName}</p>
                  <p className="text-xs text-muted-foreground">{delivery.deliveryAddress}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {delivery.status === 'completed' && (
              <Button
                onClick={() => handleViewInvoice(delivery.id)}
                variant="outline"
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t('viewInvoice')}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {deliveries.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t('deliveryHistory')}</h3>
          <p className="text-sm text-muted-foreground">{t('noActiveRoutes')}</p>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedDelivery && selectedDeliveryData && (
        <InvoiceView 
          orderId={selectedDeliveryData.id} 
          onClose={handleCloseInvoice}
          deliveryMode={true}
          deliveryData={{
            driverName: 'Jan Kowalski',
            driverId: 'DR-2024-0012',
            pickupName: selectedDeliveryData.pickupName,
            pickupAddress: selectedDeliveryData.pickupAddress,
            deliveryName: selectedDeliveryData.deliveryName,
            deliveryAddress: selectedDeliveryData.deliveryAddress,
            cargo: selectedDeliveryData.cargo,
            distance: selectedDeliveryData.distance,
            baseFare: 20.00,
            distanceRate: 2.10,
            totalEarnings: selectedDeliveryData.earnings,
            completedDate: selectedDeliveryData.date
          }}
        />
      )}
    </div>
  );
};

DriverDeliveryHistory.displayName = 'DriverDeliveryHistory';