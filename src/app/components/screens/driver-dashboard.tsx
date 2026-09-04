import React, { useState, useMemo } from 'react';
import { MapPin, Navigation, Phone, TrendingUp, Wallet, Package, Clock, CheckCircle, GripVertical, Save, Edit3, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { useTheme } from '@/app/context/theme-context';
import { Button } from '../ui/button';
import { AreaChartWidget } from '../charts/AreaChartWidget';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';

interface DashboardWidget {
  id: string;
  type: 'stat-today-earnings' | 'stat-weekly-earnings' | 'stat-completed' | 'earnings-chart' | 'map' | 'active-route' | 'go-online';
  order: number;
}

export const DriverDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [hasActiveRoute, setHasActiveRoute] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

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
    storageKey: 'driver-dashboard-layout',
    defaultWidgets: [
      { id: 'stat-today-earnings', type: 'stat-today-earnings', order: 0 },
      { id: 'stat-weekly-earnings', type: 'stat-weekly-earnings', order: 1 },
      { id: 'stat-completed', type: 'stat-completed', order: 2 },
      { id: 'earnings-chart', type: 'earnings-chart', order: 3 },
      { id: 'map', type: 'map', order: 4 },
      { id: 'active-route', type: 'active-route', order: 5 },
      { id: 'go-online', type: 'go-online', order: 6 },
    ],
  });

  // Mock order request data
  const activeOrder = {
    id: '#DEL2024-0042',
    earnings: 45,
    distance: 12.5,
    farmAddress: 'Gospodarstwo "Zielona Dolina", ul. Polna 15, Konstancin-Jeziorna',
    restaurantAddress: 'Restauracja "Pod Orzełem", ul. Nowy Świat 42, Warszawa',
  };

  const stats = {
    todayEarnings: 245,
    weeklyEarnings: 1820,
    completedDeliveries: 8,
  };

  const handleGoOnline = () => {
    setIsOnline(true);
  };

  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeOrder.farmAddress)}`, '_blank');
  };

  const handleResetLayout = () => {
    const defaultLayout = [
      { id: 'stat-today-earnings', type: 'stat-today-earnings' as const, order: 0 },
      { id: 'stat-weekly-earnings', type: 'stat-weekly-earnings' as const, order: 1 },
      { id: 'stat-completed', type: 'stat-completed' as const, order: 2 },
      { id: 'earnings-chart', type: 'earnings-chart' as const, order: 3 },
      { id: 'map', type: 'map' as const, order: 4 },
      { id: 'active-route', type: 'active-route' as const, order: 5 },
      { id: 'go-online', type: 'go-online' as const, order: 6 },
    ];
    setWidgets(defaultLayout);
    localStorage.setItem('driver-dashboard-layout', JSON.stringify(defaultLayout));
  };

  const renderWidget = (widget: DashboardWidget) => {
    const wrapperClasses = `transition-all ${
      isEditMode
        ? 'cursor-move border-2 border-dashed border-primary/50 rounded-xl p-2 hover:border-primary'
        : ''
    } ${draggedId === widget.id ? 'opacity-50' : ''}`;

    const dragHandlers = isEditMode
      ? {
          draggable: true,
          onDragStart: (e: React.DragEvent) => handleDragStart(e, widget.id),
          onDragOver: handleDragOver,
          onDrop: (e: React.DragEvent) => handleDrop(e, widget.id),
        }
      : {};

    switch (widget.type) {
      case 'stat-today-earnings':
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('earningsToday')}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stats.todayEarnings} zł</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'stat-weekly-earnings':
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('earningsThisWeek')}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stats.weeklyEarnings} zł</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'stat-completed':
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('completedDeliveriesCount')}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stats.completedDeliveries}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'earnings-chart':
        const earningsData = [
          { day: 'Pn', earnings: 285, deliveries: 6 },
          { day: 'Wt', earnings: 320, deliveries: 7 },
          { day: 'Śr', earnings: 265, deliveries: 5 },
          { day: 'Cz', earnings: 295, deliveries: 6 },
          { day: 'Pt', earnings: 340, deliveries: 8 },
          { day: 'Sb', earnings: 225, deliveries: 4 },
          { day: 'Nd', earnings: 245, deliveries: 5 },
        ];
        const totalWeeklyEarnings = earningsData.reduce((sum, day) => sum + day.earnings, 0);
        
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  {t('earningsThisWeek')}
                </h3>
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{totalWeeklyEarnings} zł</p>
              <p className="text-sm text-muted-foreground mb-4">
                {t('last7Days') || 'Ostatnie 7 dni'}
              </p>
              <AreaChartWidget
                data={earningsData}
                dataKey="earnings"
                xAxisKey="day"
                gradientId="colorEarnings"
                tooltipFormatter={(value: number, name: string) => {
                  if (name === 'earnings') return [`${value} zł`, t('earnings')];
                  if (name === 'deliveries') return [value.toString(), t('deliveries')];
                  return [value.toString(), name];
                }}
                height={256}
              />
            </div>
          </div>
        );

      case 'map':
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(to right, #64748b 1px, transparent 1px),
                    linear-gradient(to bottom, #64748b 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}></div>

                {/* Animated Route Line (shown when active) */}
                {hasActiveRoute && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 100,400 Q 400,200 700,350"
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeWidth="4"
                      strokeDasharray="10 5"
                      className="animate-dash"
                    />
                  </svg>
                )}

                {/* Location Markers (shown when active) */}
                {hasActiveRoute && (
                  <>
                    {/* Pickup Marker */}
                    <div className="absolute top-2/3 left-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
                          {t('farmPickup')}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Marker */}
                    <div className="absolute top-1/3 right-32 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
                          {t('restaurantDelivery')}
                        </div>
                      </div>
                    </div>

                    {/* Current Location (Driver) */}
                    <div className="absolute bottom-1/2 left-32 z-10">
                      <div className="relative">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        {/* Pulsing Circle */}
                        <div className="absolute inset-0 w-8 h-8 bg-emerald-500/30 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </>
                )}

                {/* No Active Route Message */}
                {!hasActiveRoute && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="w-10 h-10 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{t('noActiveRoutes')}</h3>
                      <p className="text-slate-400 max-w-md">{t('startSearching')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'active-route':
        if (!hasActiveRoute) return null;
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t('activeRoute')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activeOrder.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">{activeOrder.earnings} zł</div>
                  <div className="text-sm text-muted-foreground">{activeOrder.distance} km</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('from')}</p>
                    <p className="text-sm text-foreground">{activeOrder.farmAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('to')}</p>
                    <p className="text-sm text-foreground">{activeOrder.restaurantAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleNavigate}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t('navigate')}
                </Button>
                <Button variant="outline" className="px-4">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'go-online':
        if (hasActiveRoute || isOnline) return null;
        return (
          <div key={widget.id} className={wrapperClasses} {...dragHandlers}>
            {isEditMode && (
              <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                <span>{t('dragToReorder')}</span>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('startShift')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('searchNewOrders')}</p>
              <Button 
                onClick={handleGoOnline}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {t('goOnline')}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Memoized filtered widgets to avoid recalculation on every render
  const statsWidgets = useMemo(
    () => widgets.filter(w => w.type.startsWith('stat-')).sort((a, b) => a.order - b.order),
    [widgets]
  );
  
  const otherWidgets = useMemo(
    () => widgets.filter(w => !w.type.startsWith('stat-')).sort((a, b) => a.order - b.order),
    [widgets]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('driverDashboard')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboardSubtitle')}</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsWidgets.map(widget => renderWidget(widget))}
      </div>

      {/* Other Widgets */}
      {otherWidgets.map(widget => renderWidget(widget))}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

DriverDashboard.displayName = 'DriverDashboard';