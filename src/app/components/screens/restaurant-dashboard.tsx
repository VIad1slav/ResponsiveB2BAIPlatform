import React, { useState, useMemo } from 'react';
import { Package, TrendingUp, GripVertical, Sparkles, Truck, Save, Edit3, ShoppingCart, Clock, MapPin, FileText, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { InvoiceView } from './invoice-view';
import { useTheme } from '../../context/theme-context';
import { AreaChartWidget } from '../charts/AreaChartWidget';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';
import { useVenue } from '../../context/venue-context';

interface DashboardWidget {
  id: string;
  type: 'stat-active-orders' | 'stat-spending' | 'stat-deliveries' | 'stat-suppliers' | 'order-tracker' | 'ai-suggestions' | 'chart-spending' | 'live-map';
  order: number;
}

export const RestaurantDashboard: React.FC<{ onMakeOrder: () => void }> = ({ onMakeOrder }) => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { venues, activeVenue, showAllVenues } = useVenue();

  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [orderTab, setOrderTab] = useState<'active' | 'history'>('active');

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
    storageKey: 'restaurant-dashboard-layout',
    defaultWidgets: [
      { id: 'stat-active-orders', type: 'stat-active-orders', order: 0 },
      { id: 'stat-spending', type: 'stat-spending', order: 1 },
      { id: 'stat-deliveries', type: 'stat-deliveries', order: 2 },
      { id: 'stat-suppliers', type: 'stat-suppliers', order: 3 },
      { id: 'order-tracker', type: 'order-tracker', order: 4 },
      { id: 'ai-suggestions', type: 'ai-suggestions', order: 5 },
      { id: 'chart-spending', type: 'chart-spending', order: 6 },
      { id: 'live-map', type: 'live-map', order: 7 },
    ],
  });

  // Mock data
  const monthlySpendingData = [
    { month: 'Sty', amount: 12500 },
    { month: 'Lut', amount: 15200 },
    { month: 'Mar', amount: 14800 },
    { month: 'Kwi', amount: 16300 },
    { month: 'Maj', amount: 18500 },
    { month: 'Cze', amount: 19200 },
  ];

  const activeOrders = [
    { id: '12453', status: 'preparing', items: 12, eta: '45 min', supplier: 'Farma Bio Warszawa' },
    { id: '12454', status: 'inTransit', items: 8, eta: '1.5 godz', supplier: 'Gospodarstwo Kowalski' },
    { id: '12455', status: 'delivered', items: 15, eta: 'Dostarczone', supplier: 'EkoOgrody Sp. z o.o.' },
  ];

  const orderHistory = [
    { 
      id: 'PLN-2025-0521', 
      supplier: 'Chemia Agro', 
      deliveryDate: '28.12.2025', 
      items: 5, 
      total: 45200,
      status: 'delivered' 
    },
    { 
      id: 'PLN-2025-0518', 
      supplier: 'AgroSupply Sp. z o.o.', 
      deliveryDate: '25.12.2025', 
      items: 4, 
      total: 32100,
      status: 'delivered' 
    },
  ];

  const aiSuggestions = [
    { name: t('tomatoesRaspberry'), stock: `12 ${t('kg')}`, reason: t('lowStock'), price: `8.50 ${t('currency')}/${t('kg')}` },
    { name: t('carrotsYoung'), stock: `8 ${t('kg')}`, reason: t('highDemand'), price: `4.20 ${t('currency')}/${t('kg')}` },
    { name: t('lettuceButter'), stock: `5 ${t('pcs')}`, reason: t('orderSoon'), price: `3.80 ${t('currency')}/${t('pcs')}` },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
      case 'inTransit':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'delivered':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return t('orderPreparing');
      case 'inTransit':
        return t('orderInTransit');
      case 'delivered':
        return t('orderDelivered');
      default:
        return status;
    }
  };

  // Memoized filtered widgets to avoid recalculation on every render
  const statsWidgets = useMemo(
    () => widgets.filter(widget => widget.type.startsWith('stat-')).sort((a, b) => a.order - b.order),
    [widgets]
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {t('restaurantDashboard')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('welcomeBack')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleEditToggle}
            className={`px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
              isEditMode
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {isEditMode ? (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">{t('saveLayout')}</span>
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5" />
                <span className="hidden sm:inline">{t('editLayout')}</span>
              </>
            )}
          </button>
          <button
            onClick={onMakeOrder}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">{t('makeNewOrder')}</span>
          </button>
        </div>
      </div>

      {/* Venue Indicator - Shows which venue data is displayed */}
      {!showAllVenues && activeVenue && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{t('viewingDataFor')}: {activeVenue.name}</p>
            <p className="text-xs text-muted-foreground">{activeVenue.address}</p>
          </div>
        </div>
      )}

      {showAllVenues && venues.length > 1 && (
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{t('viewingAllVenues')}</p>
            <p className="text-xs text-muted-foreground">{t('combinedDataFrom')} {venues.length} {t('locations')}</p>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsWidgets.map(widget => (
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
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {widget.type === 'stat-active-orders' ? t('activeOrders') :
                    widget.type === 'stat-spending' ? t('spendingThisMonth') :
                    widget.type === 'stat-deliveries' ? t('activeDeliveries') :
                    widget.type === 'stat-suppliers' ? t('suppliers') : ''}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    {widget.type === 'stat-active-orders' ? '3' :
                    widget.type === 'stat-spending' ? '19,200 zł' :
                    widget.type === 'stat-deliveries' ? '1' :
                    widget.type === 'stat-suppliers' ? '12' : ''}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  {widget.type === 'stat-active-orders' ? <Package className="w-6 h-6 text-primary" /> :
                  widget.type === 'stat-spending' ? <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" /> :
                  widget.type === 'stat-deliveries' ? <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" /> :
                  widget.type === 'stat-suppliers' ? <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" /> : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Tracker */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'order-tracker')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'order-tracker')}
          className={`lg:col-span-2 transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'order-tracker' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {t('orderStatusTracker')}
            </h2>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b border-border">
              <button
                onClick={() => setOrderTab('active')}
                className={`px-4 py-2 text-sm font-medium transition-all relative ${
                  orderTab === 'active'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('activeOrders')} ({activeOrders.length})
                {orderTab === 'active' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
              <button
                onClick={() => setOrderTab('history')}
                className={`px-4 py-2 text-sm font-medium transition-all relative ${
                  orderTab === 'history'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('orderHistory')} ({orderHistory.length})
                {orderTab === 'history' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            </div>

            {/* Active Orders Content */}
            {orderTab === 'active' && (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-bold text-foreground">
                            #{order.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{order.supplier}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items} {t('items')}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                          <Clock className="w-4 h-4" />
                          {order.eta}
                        </div>
                        <button
                          onClick={() => setSelectedInvoice(order.id)}
                          className="flex items-center gap-1 text-xs text-primary hover:underline transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {t('viewInvoice') || 'Faktura'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order History Content */}
            {orderTab === 'history' && (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">{t('orderNumber')}</p>
                            <p className="font-bold text-foreground">{order.id}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-muted-foreground">{t('deliveryDate')}</p>
                            <p className="text-sm font-medium text-foreground">{order.deliveryDate}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-muted-foreground">{t('total')}</p>
                            <p className="text-lg font-bold text-foreground">{order.total.toLocaleString()} {t('currency')}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{order.supplier}</p>
                            <p className="text-xs text-muted-foreground mt-1">{order.items} {t('items')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {t('delivered')}
                            </span>
                            <button
                              onClick={() => setSelectedInvoice(order.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              {t('viewInvoice')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Shopping List */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'ai-suggestions')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'ai-suggestions')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'ai-suggestions' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl border border-purple-500/20 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              {t('aiShoppingList')}
            </h2>
            <p className="text-xs text-muted-foreground mb-4 relative z-10">
              {t('basedOnInventory')}
            </p>
            <div className="space-y-3 relative z-10">
              {aiSuggestions.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-card rounded-lg border border-border hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full whitespace-nowrap">
                      {item.reason}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t('stockLabel')}: {item.stock}</span>
                    <span className="font-bold text-foreground">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Chart */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'chart-spending')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'chart-spending')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'chart-spending' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t('monthlySpending')}
            </h2>
            <AreaChartWidget
              data={monthlySpendingData}
              dataKey="amount"
              xAxisKey="month"
              gradientId="colorSpending"
              tooltipFormatter={(value: number) => [`${value.toLocaleString()} zł`, t('monthlySpending')]}
              height={256}
            />
          </div>
        </div>

        {/* Live Delivery Map */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'live-map')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'live-map')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'live-map' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              {t('liveDeliveryMap')}
            </h2>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Zamówienie #12454</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Odległość: 5.2 km • ETA: 1.5 godz
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  {t('inTransit')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceView orderId={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};