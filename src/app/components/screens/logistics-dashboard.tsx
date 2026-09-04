import React, { useState, useEffect } from 'react';
import { MapPin, Package, TrendingUp, Truck, Clock, CheckCircle, Navigation, GripVertical, Edit3, Save } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useTheme } from '../../context/theme-context';

interface DashboardWidget {
  id: string;
  type: 'stat-today-earnings' | 'stat-weekly-earnings' | 'stat-pickups' | 'stat-deliveries' | 'route-map' | 'next-stop' | 'pickup-schedule' | 'delivery-schedule';
  order: number;
}

export const LogisticsDashboard: React.FC<{ onStartShift: () => void }> = ({ onStartShift }) => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Widget layout state
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    { id: 'stat-today-earnings', type: 'stat-today-earnings', order: 0 },
    { id: 'stat-weekly-earnings', type: 'stat-weekly-earnings', order: 1 },
    { id: 'stat-pickups', type: 'stat-pickups', order: 2 },
    { id: 'stat-deliveries', type: 'stat-deliveries', order: 3 },
    { id: 'route-map', type: 'route-map', order: 4 },
    { id: 'next-stop', type: 'next-stop', order: 5 },
    { id: 'pickup-schedule', type: 'pickup-schedule', order: 6 },
    { id: 'delivery-schedule', type: 'delivery-schedule', order: 7 },
  ]);

  // Load saved layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('logistics-dashboard-layout');
    if (savedLayout) {
      try {
        setWidgets(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to load saved layout', e);
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditMode) {
      // Save layout
      localStorage.setItem('logistics-dashboard-layout', JSON.stringify(widgets));
    }
    setIsEditMode(!isEditMode);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = widgets.findIndex(w => w.id === draggedId);
    const targetIndex = widgets.findIndex(w => w.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, removed);

    // Update order
    const reorderedWidgets = newWidgets.map((widget, index) => ({
      ...widget,
      order: index,
    }));

    setWidgets(reorderedWidgets);
    setDraggedId(null);
  };

  // Mock data
  const routeStops = [
    {
      id: 1,
      type: 'pickup',
      location: 'Farma Bio Warszawa',
      address: 'ul. Polna 12, Warszawa',
      time: '09:00',
      status: 'completed',
    },
    {
      id: 2,
      type: 'pickup',
      location: 'Gospodarstwo Kowalski',
      address: 'ul. Łąkowa 45, Pruszków',
      time: '09:45',
      status: 'current',
    },
    {
      id: 3,
      type: 'delivery',
      location: 'Restauracja "Pod Różą"',
      address: 'ul. Nowy Świat 23, Warszawa',
      time: '11:00',
      status: 'pending',
    },
    {
      id: 4,
      type: 'delivery',
      location: 'Bar Mleczny Centrum',
      address: 'Al. Jerozolimskie 65, Warszawa',
      time: '11:30',
      status: 'pending',
    },
  ];

  const pickupSchedule = [
    { id: '12456', farm: 'Farma Bio Warszawa', items: '12 boxes', time: '09:00', status: 'completed' },
    { id: '12457', farm: 'Gospodarstwo Kowalski', items: '8 boxes', time: '09:45', status: 'current' },
    { id: '12458', farm: 'EkoOgrody Sp. z o.o.', items: '15 boxes', time: '10:30', status: 'pending' },
  ];

  const deliverySchedule = [
    { id: '12459', restaurant: 'Restauracja "Pod Różą"', items: '8 boxes', time: '11:00', status: 'pending' },
    { id: '12460', restaurant: 'Bar Mleczny Centrum', items: '12 boxes', time: '11:30', status: 'pending' },
    { id: '12461', restaurant: 'Bistro Vegano', items: '5 boxes', time: '12:15', status: 'pending' },
  ];

  const getStopStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'current':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-secondary text-muted-foreground border-border';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'current':
        return <Navigation className="w-4 h-4 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {t('logisticsDashboard')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('welcomeBack')}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={onStartShift}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Truck className="w-5 h-5" />
            {t('startShift')}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets
          .filter(widget => widget.type.startsWith('stat-'))
          .sort((a, b) => a.order - b.order)
          .map(widget => (
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
                      {widget.type === 'stat-today-earnings' ? t('todayEarnings') :
                      widget.type === 'stat-weekly-earnings' ? t('weeklyEarnings') :
                      widget.type === 'stat-pickups' ? t('pickups') :
                      widget.type === 'stat-deliveries' ? t('deliveries') : ''}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {widget.type === 'stat-today-earnings' ? '320 zł' :
                      widget.type === 'stat-weekly-earnings' ? '1,850 zł' :
                      widget.type === 'stat-pickups' ? '3' :
                      widget.type === 'stat-deliveries' ? '3' : ''}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {widget.type === 'stat-today-earnings' ? <TrendingUp className="w-6 h-6 text-primary" /> :
                    widget.type === 'stat-weekly-earnings' ? <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" /> :
                    widget.type === 'stat-pickups' ? <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" /> :
                    widget.type === 'stat-deliveries' ? <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" /> : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optimized Route Map */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'route-map')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'route-map')}
          className={`lg:col-span-2 transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'route-map' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t('optimizedRoute')}
            </h2>

            {/* Route Visualization */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border border-border p-6 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
              <div className="relative z-10 flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Trasa zoptymalizowana</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Całkowita odległość: 32.5 km • Czas: ~4.5 godz
                  </p>
                </div>
              </div>
            </div>

            {/* Route Stops */}
            <div className="space-y-3">
              {routeStops.map((stop, index) => (
                <div key={stop.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getStopStatusColor(
                        stop.status
                      )}`}
                    >
                      {stop.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : stop.status === 'current' ? (
                        <Navigation className="w-5 h-5 animate-pulse" />
                      ) : stop.type === 'pickup' ? (
                        <Package className="w-5 h-5" />
                      ) : (
                        <Truck className="w-5 h-5" />
                      )}
                    </div>
                    {index < routeStops.length - 1 && (
                      <div className="w-0.5 h-12 bg-border my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm text-foreground">{stop.location}</p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              stop.type === 'pickup'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                            }`}
                          >
                            {stop.type === 'pickup' ? t('pickup') : t('delivery')}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{stop.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono font-bold text-foreground">{stop.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Stop Info */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'next-stop')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'next-stop')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'next-stop' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2 relative z-10">
              <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {t('nextStop')}
            </h2>
            <p className="text-xs text-muted-foreground mb-4 relative z-10">
              {t('stopNumber')} 2/6
            </p>

            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground">Gospodarstwo Kowalski</p>
                    <p className="text-xs text-muted-foreground">{t('pickup')}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('eta')}</span>
                    <span className="font-bold text-foreground">15 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Odległość</span>
                    <span className="font-bold text-foreground">5.2 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Produkty</span>
                    <span className="font-bold text-foreground">8 boxes</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Rozpocznij nawigację
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pickup Schedule */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'pickup-schedule')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'pickup-schedule')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'pickup-schedule' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {t('pickupSchedule')}
            </h2>
            <div className="space-y-3">
              {pickupSchedule.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">#{item.id}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-primary/10 text-primary'
                            : item.status === 'current'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {getStatusIcon(item.status)}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{item.farm}</p>
                  <p className="text-xs text-muted-foreground">{item.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Schedule */}
        <div
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, 'delivery-schedule')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'delivery-schedule')}
          className={`transition-all ${
            isEditMode
              ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
              : ''
          } ${draggedId === 'delivery-schedule' ? 'opacity-50' : ''}`}
        >
          {isEditMode && (
            <div className="flex items-center justify-center mb-2 text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>
          )}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              {t('deliverySchedule')}
            </h2>
            <div className="space-y-3">
              {deliverySchedule.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">#{item.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        <Clock className="w-3 h-3 inline" />
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{item.restaurant}</p>
                  <p className="text-xs text-muted-foreground">{item.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};