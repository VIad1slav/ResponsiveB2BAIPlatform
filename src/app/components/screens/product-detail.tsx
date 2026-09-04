import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, MapPin, Package, TrendingUp, Sparkles, Calendar, Thermometer, Globe } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useTheme } from '../../context/theme-context';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  supplier: string;
  stock: number;
  badge?: string;
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Generate unique ID for chart elements
  const chartId = React.useId();
  
  const [quantity, setQuantity] = useState(1);

  // Mock price trend data (last 30 days)
  const priceTrendData = [
    { day: 1, price: product.price * 0.92 },
    { day: 5, price: product.price * 0.95 },
    { day: 10, price: product.price * 0.93 },
    { day: 15, price: product.price * 0.97 },
    { day: 20, price: product.price * 0.98 },
    { day: 25, price: product.price * 0.96 },
    { day: 30, price: product.price },
  ];

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToOrder = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} ${product.unit} of ${product.name} to order`);
  };

  // Determine demand badge
  const getDemandBadge = () => {
    if (product.badge === 'trending') return t('highDemand');
    if (product.badge === 'low-stock') return t('mediumDemand');
    return t('lowDemand');
  };

  // Mock supplier data
  const supplierData = {
    name: product.supplier,
    location: 'Warszawa, Polska',
    stockLevel: product.stock,
  };

  // Mock product specifications
  const specifications = {
    weight: product.unit === 'kg' ? '1 kg' : '500 g',
    shelfLife: '14 ' + t('days'),
    storageTemp: '2-8°C',
    origin: 'Polska',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t('backToCatalog')}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Desktop: Split Screen Layout | Mobile: Vertical Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side: Hero Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* AI Status Badge */}
              <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm bg-opacity-90">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">{getDemandBadge()}</span>
              </div>
            </div>

            {/* Price Trend Chart */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t('priceTrend')}
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceTrendData}>
                    <XAxis
                      key={`xaxis-${chartId}`}
                      dataKey="day"
                      stroke={isDark ? '#94A3B8' : '#6b7280'}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      key={`yaxis-${chartId}`}
                      stroke={isDark ? '#94A3B8' : '#6b7280'}
                      tick={{ fontSize: 12 }}
                      domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip
                      key={`tooltip-${chartId}`}
                      contentStyle={{
                        backgroundColor: isDark ? '#1E293B' : '#fff',
                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#F9FAFB' : '#1F2937',
                      }}
                      formatter={(value: number) => [`${value.toFixed(2)} zł`, 'Cena']}
                      labelFormatter={(label) => `Dzień ${label}`}
                    />
                    <Line
                      key={`line-${chartId}`}
                      type="monotone"
                      dataKey="price"
                      stroke={isDark ? '#10B981' : '#00875A'}
                      strokeWidth={3}
                      dot={{ fill: isDark ? '#10B981' : '#00875A', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg">{product.category}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toFixed(2)} zł
                </span>
                <span className="text-lg text-muted-foreground">
                  {t('pricePerUnit')} {product.unit}
                </span>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {t('supplierInfo')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('supplierName')}</span>
                  <span className="font-medium text-foreground">{supplierData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('location')}
                  </span>
                  <span className="font-medium text-foreground">{supplierData.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('stockLevel')}</span>
                  <span className="font-medium text-primary flex items-center gap-2">
                    {supplierData.stockLevel} {product.unit}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {t('inStock')}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">{t('productSpecs')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {t('weight')}
                  </span>
                  <span className="font-medium text-foreground">{specifications.weight}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('shelfLife')}
                  </span>
                  <span className="font-medium text-foreground">{specifications.shelfLife}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    {t('storageTemp')}
                  </span>
                  <span className="font-medium text-foreground">{specifications.storageTemp}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t('origin')}
                  </span>
                  <span className="font-medium text-foreground">{specifications.origin}</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 rounded-xl border border-purple-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2 relative z-10">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                {t('aiInsights')}
              </h3>
              <p className="text-foreground/90 leading-relaxed relative z-10">
                {t('aiSuggestion')}
              </p>
            </div>

            {/* Quantity Selector & Add to Order */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-bold text-foreground">{t('quantity')}</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrease}
                    className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-foreground min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                <span>{t('total')}</span>
                <span className="text-2xl font-bold text-foreground">
                  {(product.price * quantity).toFixed(2)} zł
                </span>
              </div>

              <button
                onClick={handleAddToOrder}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                {t('addToOrder')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};