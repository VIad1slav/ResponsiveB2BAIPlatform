import React, { useState, useMemo, useEffect } from 'react';
import { 
  Tractor, Package, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, 
  Sparkles, ChevronRight, MapPin, Edit, Edit2, Edit3, Save, GripVertical, 
  Truck, Phone, FileText, Archive 
} from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { useTheme } from '@/app/context/theme-context';
import { AreaChartWidget } from '../charts/AreaChartWidget';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';
import { cn } from '../../lib/utils';
import { Switch } from '../ui/switch';
import { InvoiceView } from './invoice-view';

interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'orders' | 'products';
  order: number;
}

export const FarmerDashboard: React.FC<{ onAddProduct: () => void; onOrderClick?: (orderId: string) => void }> = ({ onAddProduct, onOrderClick }) => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Use custom dashboard layout hook
  const {
    widgets,
    isEditMode,
    draggedId,
    handleEditToggle,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useDashboardLayout({
    storageKey: 'farmer-dashboard-layout',
    defaultWidgets: [
      { id: 'stats', type: 'stats', order: 0 },
      { id: 'chart', type: 'chart', order: 1 },
      { id: 'orders', type: 'orders', order: 2 },
      { id: 'products', type: 'products', order: 3 },
    ],
  });

  // State for product availability toggles
  const [productAvailability, setProductAvailability] = useState({
    tomatoes: true,
    lettuce: true,
    carrots: true,
    cucumbers: false,
  });

  // Mock data - Revenue data for last 6 months
  const revenueData = [
    { month: t('monthJan'), revenue: 12500 },
    { month: t('monthFeb'), revenue: 14200 },
    { month: t('monthMar'), revenue: 18800 },
    { month: t('monthApr'), revenue: 21300 },
    { month: t('monthMay'), revenue: 24500 },
    { month: t('monthJun'), revenue: 28800 },
  ];

  // Incoming Orders / Active Sales
  const incomingOrders = [
    { 
      id: '12456', 
      restaurant: 'Restauracja "Pod Różą"', 
      items: 8, 
      status: 'toPack',
      totalValue: '1,245 zł' 
    },
    { 
      id: '12457', 
      restaurant: 'Bar Mleczny Centrum', 
      items: 12, 
      status: 'waitingForDriver',
      totalValue: '2,180 zł' 
    },
    { 
      id: '12458', 
      restaurant: 'Bistro Vegano', 
      items: 5, 
      status: 'shipped',
      totalValue: '890 zł' 
    },
  ];

  // My Crops / Inventory
  const myCrops = [
    { 
      id: 'tomatoes',
      name: t('tomatoesRaspberry'), 
      stock: 450, 
      unit: t('kg'), 
      price: '8.50',
      available: true,
      image: '🍅' 
    },
    { 
      id: 'lettuce',
      name: t('lettuceButter'), 
      stock: 120, 
      unit: t('pcs'), 
      price: '4.20',
      available: true,
      image: '🥬' 
    },
    { 
      id: 'carrots',
      name: t('carrotsYoung'), 
      stock: 780, 
      unit: t('kg'), 
      price: '5.80',
      available: true,
      image: '🥕' 
    },
    { 
      id: 'cucumbers',
      name: t('cucumbersGreenhouse'), 
      stock: 0, 
      unit: t('kg'), 
      price: '7.20',
      available: false,
      image: '🥒' 
    },
  ];

  // Logistics/Driver Tracking
  const assignedDriver = {
    name: 'Jan Kowalski',
    phone: '+48 600 123 456',
    truckPlate: 'WA 12345',
    proximity: 8.5,
    status: 'enRoute'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'toPack':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'waitingForDriver':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'shipped':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'toPack':
        return t('toPack');
      case 'waitingForDriver':
        return t('waitingForDriver');
      case 'shipped':
        return t('shipped');
      default:
        return status;
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    console.log('Accepting order:', orderId);
    // Implementation for accepting order
  };

  const handlePrintWaybill = (orderId: string) => {
    console.log('Printing waybill for order:', orderId);
    // Implementation for printing waybill
  };

  // Render widget based on type
  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 rounded-xl border border-emerald-500/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalRevenue')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">28,800 zł</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +17.5% vs {t('lastMonth')}
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalOrders')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">47</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('thisMonth')}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('averageOrderValue')}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">612 zł</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('thisMonth')}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Revenue Chart */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                {t('salesRevenue')} (PLN)
              </h2>
              <AreaChartWidget
                data={revenueData}
                dataKey="revenue"
                xAxisKey="month"
                gradientId="colorRevenue"
                tooltipFormatter={(value: number) => [`${value.toLocaleString()} zł`, t('revenue')]}
                yAxisFormatter={(value) => `${value / 1000}k`}
                height={256}
              />
            </div>

            {/* My Crops / Inventory Management */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Archive className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {t('myProducts')}
                </h2>
              </div>
              <div className="space-y-3">
                {myCrops.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-secondary rounded-lg border border-border hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.stock > 0 ? `${item.stock} ${item.unit}` : t('outOfStock')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.stock > 0 && item.available}
                          disabled={item.stock === 0}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {item.price} zł / {item.unit}
                        </span>
                        {/* AI Suggested Price */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 rounded-md">
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            {t('aiSuggestedPrice')}: {(parseFloat(item.price) * 1.1).toFixed(2)} zł
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => console.log('Edit price for', item.id)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 hover:bg-blue-500/10 px-2 py-1 rounded transition-all"
                      >
                        <Edit2 className="w-3 h-3" />
                        {t('editPrice')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Sales / Incoming Orders - Takes 2 columns */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {t('incomingOrders')}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {incomingOrders.length} {t('activeOrders')}
                </span>
              </div>
              <div className="space-y-4">
                {incomingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-secondary rounded-lg border border-border hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-bold text-foreground">
                            #{order.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">{order.restaurant}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items} {t('items')} • {order.totalValue}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => onOrderClick?.(order.id)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        {t('viewDetails')}
                      </button>
                      <button
                        onClick={() => setSelectedInvoice(order.id)}
                        className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-semibold hover:bg-accent transition-all flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        {t('viewInvoice')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Tracking */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {t('logisticsTracking')}
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{assignedDriver.name}</p>
                      <p className="text-xs text-muted-foreground">{assignedDriver.truckPlate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('proximity')}</span>
                      <span className="font-bold text-foreground">{assignedDriver.proximity} {t('kmAway')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('status')}</span>
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded text-xs font-semibold">
                        {t('inTransit')}
                      </span>
                    </div>
                  </div>

                  {/* Mini Map Placeholder */}
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg mb-3 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/50">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">{t('viewOnMap')}</p>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('contactDriver')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'products':
        return null; // We're combining this with chart

      default:
        return null;
    }
  };

  // Sort widgets by order
  const sortedWidgets = [...widgets].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {t('farmerDashboard')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('welcomeBack')}
          </p>
        </div>
        <button
          onClick={handleEditToggle}
          className={`px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 ${
            isEditMode
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          {isEditMode ? (
            <>
              <Save className="w-5 h-5" />
              {t('saveLayout')}
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5" />
              {t('editLayout')}
            </>
          )}
        </button>
      </div>

      {/* Widgets */}
      <div className="space-y-6">
        {sortedWidgets.map((widget) => (
          <div
            key={widget.id}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, widget.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, widget.id)}
            className={`transition-all ${
              isEditMode
                ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
                : ''
            } ${draggedId === widget.id ? 'opacity-50' : ''}`}
          >
            {isEditMode && (
              <div className="flex items-center justify-center mb-2 text-muted-foreground">
                <GripVertical className="w-5 h-5" />
              </div>
            )}
            {renderWidget(widget)}
          </div>
        ))}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceView orderId={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};

FarmerDashboard.displayName = 'FarmerDashboard';