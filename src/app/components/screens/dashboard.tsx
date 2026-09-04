import React from 'react';
import { TrendingUp, AlertTriangle, Sparkles, Package } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

export const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();

  const predictions = [
    {
      id: '1',
      icon: AlertTriangle,
      titlePL: 'Nasiona pszenicy ozimej',
      titleRU: 'Семена озимой пшеницы',
      titleEN: 'Winter Wheat Seeds',
      description: t('lowStock'),
      status: t('orderSoon'),
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
      quantity: '15 ton',
      price: '12,500 zł',
    },
    {
      id: '2',
      icon: TrendingUp,
      titlePL: 'Nawozy NPK',
      titleRU: 'Удобрения NPK',
      titleEN: 'NPK Fertilizers',
      description: t('trending'),
      status: t('highDemand'),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      quantity: '8 ton',
      price: '18,900 zł',
    },
    {
      id: '3',
      icon: Sparkles,
      titlePL: 'Środki ochrony roślin',
      titleRU: 'Средства защиты растений',
      titleEN: 'Plant Protection Products',
      description: t('aiRecommendation'),
      status: t('optimalPrice'),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      quantity: '120 L',
      price: '4,250 zł',
    },
  ];

  const getTitle = (item: typeof predictions[0]) => {
    return language === 'PL' ? item.titlePL : language === 'RU' ? item.titleRU : item.titleEN;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('welcomeBack')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboardSubtitle')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('activeOrdersLabel')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('monthlySpendingLabel')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">248,500 zł</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('suppliersLabel')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('inStockLabel')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">156 SKU</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{t('predictions')}</h2>
          <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary dark:text-primary text-xs font-semibold rounded-full border border-primary/20">
            AI-Powered
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {predictions.map((prediction) => {
            const Icon = prediction.icon;
            return (
              <div
                key={prediction.id}
                className={`border ${prediction.borderColor} rounded-lg p-4 hover:shadow-lg transition-all bg-card hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${prediction.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${prediction.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{getTitle(prediction)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{prediction.description}</p>
                    <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${prediction.bgColor} ${prediction.color}`}>
                      <Sparkles className="w-3 h-3" />
                      {prediction.status}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{prediction.quantity}</span>
                      <span className="font-semibold text-foreground">{prediction.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};