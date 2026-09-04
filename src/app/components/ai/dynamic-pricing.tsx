import React from 'react';
import { TrendingDown, TrendingUp, Sparkles, Cloud, Calendar, Zap } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  reason: 'weather' | 'expiry' | 'demand' | 'surplus';
  expiryDays?: number;
  trend: 'up' | 'down';
  savings: number;
}

export const DynamicPricing: React.FC = () => {
  const { t } = useLanguage();

  const products: Product[] = [
    {
      id: '1',
      name: 'Pomidory malinowe',
      currentPrice: 6.50,
      originalPrice: 8.50,
      discount: 23,
      reason: 'expiry',
      expiryDays: 2,
      trend: 'down',
      savings: 2.00,
    },
    {
      id: '2',
      name: 'Truskawki',
      currentPrice: 14.90,
      originalPrice: 12.50,
      discount: -19,
      reason: 'weather',
      trend: 'up',
      savings: -2.40,
    },
    {
      id: '3',
      name: 'Sałata lodowa',
      currentPrice: 3.20,
      originalPrice: 4.50,
      discount: 29,
      reason: 'surplus',
      trend: 'down',
      savings: 1.30,
    },
    {
      id: '4',
      name: 'Ogórki szklarniowe',
      currentPrice: 7.80,
      originalPrice: 6.50,
      discount: -20,
      reason: 'demand',
      trend: 'up',
      savings: -1.30,
    },
  ];

  const getReasonIcon = (reason: Product['reason']) => {
    switch (reason) {
      case 'weather':
        return <Cloud className="w-4 h-4" />;
      case 'expiry':
        return <Calendar className="w-4 h-4" />;
      case 'demand':
        return <TrendingUp className="w-4 h-4" />;
      case 'surplus':
        return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getReasonText = (reason: Product['reason'], expiryDays?: number) => {
    switch (reason) {
      case 'weather':
        return t('weatherImpact');
      case 'expiry':
        return `${t('expiryDate')}: ${expiryDays} dni`;
      case 'demand':
        return t('marketDemand');
      case 'surplus':
        return t('surplusIngredients');
    }
  };

  const getReasonColor = (reason: Product['reason']) => {
    switch (reason) {
      case 'weather':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/30';
      case 'expiry':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/30';
      case 'demand':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/30';
      case 'surplus':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('aiDynamicPricing')}
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  AI
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">{t('dynamicPricingDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Changes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              'bg-card rounded-xl border-2 p-5 transition-all hover:scale-[1.02] hover:shadow-lg',
              product.trend === 'down'
                ? 'border-green-500/30 hover:border-green-500/50'
                : 'border-orange-500/30 hover:border-orange-500/50'
            )}
          >
            {/* Product Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
                <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium', getReasonColor(product.reason))}>
                  {getReasonIcon(product.reason)}
                  {getReasonText(product.reason, product.expiryDays)}
                </div>
              </div>
              {product.discount > 0 && (
                <div className="bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
              {product.discount < 0 && (
                <div className="bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-bold">
                  +{Math.abs(product.discount)}%
                </div>
              )}
            </div>

            {/* Price Comparison */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)} zł
                  </span>
                  {product.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  )}
                </div>
                <div className={cn(
                  'text-3xl font-bold',
                  product.trend === 'down'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-orange-600 dark:text-orange-400'
                )}>
                  {product.currentPrice.toFixed(2)} zł
                </div>
                <div className="text-xs text-muted-foreground">{t('perKg')}</div>
              </div>

              {product.trend === 'down' && (
                <div className="text-right">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400 inline-block mb-1" />
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {t('urgentSale')}
                  </div>
                </div>
              )}
            </div>

            {/* Savings/Additional Cost */}
            <div className={cn(
              'p-3 rounded-lg',
              product.savings > 0
                ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                : 'bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800'
            )}>
              <div className="flex items-center justify-between text-sm">
                <span className={cn(
                  'font-medium',
                  product.savings > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-orange-600 dark:text-orange-400'
                )}>
                  {product.savings > 0 ? t('costSavings') : t('marketDemand')}
                </span>
                <span className={cn(
                  'font-bold',
                  product.savings > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-orange-600 dark:text-orange-400'
                )}>
                  {product.savings > 0 ? '+' : ''}{product.savings.toFixed(2)} zł
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button className={cn(
              'w-full mt-4 px-4 py-2.5 rounded-lg font-semibold transition-all shadow-md',
              product.trend === 'down'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            )}>
              {product.trend === 'down' ? t('addToOrder') : t('view')}
            </button>
          </div>
        ))}
      </div>

      {/* AI Explanation */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {t('smartPricing')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('dynamicPricingDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
