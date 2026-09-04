import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Package, Edit3, Save, X, GripVertical } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../context/theme-context';
import { useRole } from '../../context/role-context';

interface Widget {
  id: string;
  type: 'kpi' | 'chart' | 'table';
  title: string;
  order: number;
}

export const Analytics: React.FC = () => {
  const { t, language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const { role } = useRole();
  const isDark = resolvedTheme === 'dark';

  // Generate unique IDs for chart elements
  const chartId1 = React.useId();
  const chartId2 = React.useId();

  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Widget layout state
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'kpi-1', type: 'kpi', title: 'revenue', order: 0 },
    { id: 'kpi-2', type: 'kpi', title: 'orders', order: 1 },
    { id: 'kpi-3', type: 'kpi', title: 'average', order: 2 },
    { id: 'kpi-4', type: 'kpi', title: 'products', order: 3 },
    { id: 'chart-1', type: 'chart', title: 'salesOverview', order: 4 },
    { id: 'chart-2', type: 'chart', title: 'topProducts', order: 5 },
    { id: 'table-1', type: 'table', title: 'monthlyData', order: 6 },
  ]);

  // Load saved layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('analytics-layout');
    if (savedLayout) {
      try {
        setWidgets(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to load saved layout', e);
      }
    }
  }, []);

  const salesData = [
    { month: 'Sty', revenue: 185000, orders: 42 },
    { month: 'Lut', revenue: 220000, orders: 51 },
    { month: 'Mar', revenue: 198000, orders: 48 },
    { month: 'Kwi', revenue: 245000, orders: 58 },
    { month: 'Maj', revenue: 268000, orders: 63 },
    { month: 'Cze', revenue: 290000, orders: 69 },
  ];

  const topProducts = [
    { name: 'Nawozy NPK', value: 45000 },
    { name: 'Nasiona pszenicy', value: 38000 },
    { name: 'Środki ochrony', value: 32000 },
    { name: 'Nasiona kukurydzy', value: 28000 },
    { name: 'Herbicydy', value: 22000 },
  ];

  const handleEditToggle = () => {
    if (isEditMode) {
      // Save layout
      localStorage.setItem('analytics-layout', JSON.stringify(widgets));
    }
    setIsEditMode(!isEditMode);
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
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

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const renderKPIWidget = (widget: Widget) => {
    const kpiData = {
      'kpi-1': {
        label: 'Całkowity przychód',
        value: '1,406,000 zł',
        change: '+12.5%',
        icon: DollarSign,
        color: 'primary',
      },
      'kpi-2': {
        label: 'Zamówienia',
        value: '331',
        change: '+8.2%',
        icon: ShoppingCart,
        color: 'blue',
      },
      'kpi-3': {
        label: 'Średnie zamówienie',
        value: '4,247 zł',
        change: '+3.8%',
        icon: Package,
        color: 'purple',
      },
      'kpi-4': {
        label: 'Produkty aktywne',
        value: '856',
        change: 'Bez zmian',
        icon: Package,
        color: 'orange',
      },
    };

    const data = kpiData[widget.id as keyof typeof kpiData];
    if (!data) return null;

    const Icon = data.icon;
    const colorClasses = {
      primary: 'bg-primary/10 text-primary',
      blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    };

    return (
      <div
        key={widget.id}
        draggable={isEditMode}
        onDragStart={(e) => handleDragStart(e, widget.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, widget.id)}
        onDragEnd={handleDragEnd}
        className={`bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all relative group ${
          isEditMode ? 'jiggle cursor-move' : ''
        } ${draggedId === widget.id ? 'opacity-50' : ''}`}
      >
        {/* Edit Mode Controls */}
        {isEditMode && (
          <>
            <button
              onClick={() => handleDeleteWidget(widget.id)}
              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
              title={t('deleteWidget')}
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
              title={t('dragHandle')}
            >
              <GripVertical className="w-4 h-4" />
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{data.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{data.value}</p>
            <div className={`flex items-center gap-1 mt-2 ${data.change.includes('+') ? 'text-primary' : 'text-muted-foreground'} text-sm`}>
              {data.change.includes('+') && <TrendingUp className="w-4 h-4" />}
              <span>{data.change}</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[data.color as keyof typeof colorClasses]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const renderChartWidget = (widget: Widget) => {
    return (
      <div
        key={widget.id}
        draggable={isEditMode}
        onDragStart={(e) => handleDragStart(e, widget.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, widget.id)}
        onDragEnd={handleDragEnd}
        className={`bg-card p-6 rounded-xl shadow-sm border border-border relative group ${
          isEditMode ? 'jiggle cursor-move' : ''
        } ${draggedId === widget.id ? 'opacity-50' : ''}`}
      >
        {/* Edit Mode Controls */}
        {isEditMode && (
          <>
            <button
              onClick={() => handleDeleteWidget(widget.id)}
              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
              title={t('deleteWidget')}
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
              title={t('dragHandle')}
            >
              <GripVertical className="w-4 h-4" />
            </div>
          </>
        )}

        <h2 className="text-lg font-bold text-foreground mb-6">{t(widget.title)}</h2>
        <div className="h-80">
          {widget.id === 'chart-1' ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid key={`grid-${chartId1}`} strokeDasharray="3 3" stroke={isDark ? '#334155' : '#f0f0f0'} />
                <XAxis key={`xaxis-${chartId1}`} dataKey="month" stroke={isDark ? '#94A3B8' : '#6b7280'} />
                <YAxis key={`yaxis-${chartId1}`} stroke={isDark ? '#94A3B8' : '#6b7280'} />
                <Tooltip
                  key={`tooltip-${chartId1}`}
                  contentStyle={{
                    backgroundColor: isDark ? '#1E293B' : '#fff',
                    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#F9FAFB' : '#1F2937',
                  }}
                />
                <Legend key={`legend-${chartId1}`} />
                <Line
                  key={`line-${chartId1}`}
                  type="monotone"
                  dataKey="revenue"
                  stroke={isDark ? '#10B981' : '#00875A'}
                  strokeWidth={2}
                  name={t('revenueInCurrency')}
                  dot={{ fill: isDark ? '#10B981' : '#00875A', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid key={`grid-${chartId2}`} strokeDasharray="3 3" stroke={isDark ? '#334155' : '#f0f0f0'} />
                <XAxis key={`xaxis-${chartId2}`} type="number" stroke={isDark ? '#94A3B8' : '#6b7280'} />
                <YAxis key={`yaxis-${chartId2}`} dataKey="name" type="category" width={120} stroke={isDark ? '#94A3B8' : '#6b7280'} />
                <Tooltip
                  key={`tooltip-${chartId2}`}
                  contentStyle={{
                    backgroundColor: isDark ? '#1E293B' : '#fff',
                    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#F9FAFB' : '#1F2937',
                  }}
                />
                <Bar key={`bar-${chartId2}`} dataKey="value" fill={isDark ? '#8B5CF6' : '#0066CC'} name={t('salesInCurrency')} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  };

  const renderTableWidget = (widget: Widget) => {
    return (
      <div
        key={widget.id}
        draggable={isEditMode}
        onDragStart={(e) => handleDragStart(e, widget.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, widget.id)}
        onDragEnd={handleDragEnd}
        className={`bg-card rounded-xl shadow-sm border border-border overflow-hidden relative group hidden lg:block ${
          isEditMode ? 'jiggle cursor-move' : ''
        } ${draggedId === widget.id ? 'opacity-50' : ''}`}
      >
        {/* Edit Mode Controls */}
        {isEditMode && (
          <>
            <button
              onClick={() => handleDeleteWidget(widget.id)}
              className="absolute top-4 left-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
              title={t('deleteWidget')}
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="absolute top-4 right-4 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
              title={t('dragHandle')}
            >
              <GripVertical className="w-4 h-4" />
            </div>
          </>
        )}

        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{t('monthlyData')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('month')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('revenue')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('orders')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('averageOrderValue')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('change')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {salesData.map((data, index) => (
                <tr key={data.month}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
                    {data.month} 2026
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">
                    {data.revenue.toLocaleString()} zł
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">{data.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">
                    {Math.round(data.revenue / data.orders).toLocaleString()} zł
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index > 0 ? (
                      <span className="text-primary flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +{(((data.revenue - salesData[index - 1].revenue) / salesData[index - 1].revenue) * 100).toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const kpiWidgets = widgets.filter(w => w.type === 'kpi').sort((a, b) => a.order - b.order);
  const chartWidgets = widgets.filter(w => w.type === 'chart').sort((a, b) => a.order - b.order);
  const tableWidgets = widgets.filter(w => w.type === 'table').sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header with Edit Mode Button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('analyticsTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('analyticsSubtitle')}</p>
        </div>
        <button
          onClick={handleEditToggle}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium shadow-lg"
        >
          {isEditMode ? (
            <>
              <Save className="w-5 h-5" />
              <span className="hidden sm:inline">{t('saveLayout')}</span>
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5" />
              <span className="hidden sm:inline">{t('editMode')}</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiWidgets.map(renderKPIWidget)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartWidgets.map(renderChartWidget)}
      </div>

      {/* Data Table */}
      {tableWidgets.map(renderTableWidget)}

      {/* CSS for jiggle animation */}
      <style>{`
        @keyframes jiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-1deg);
          }
          75% {
            transform: rotate(1deg);
          }
        }

        .jiggle {
          animation: jiggle 0.3s ease-in-out infinite;
        }

        .jiggle:hover {
          animation: none;
          transform: scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};