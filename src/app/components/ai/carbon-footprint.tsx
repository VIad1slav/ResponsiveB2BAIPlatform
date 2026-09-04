import React from 'react';
import { Leaf, Award, TrendingDown, Sparkles, MapPin, TreePine } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface EcoMetrics {
  co2Saved: number;
  localPercentage: number;
  treesEquivalent: number;
  sustainabilityScore: number;
  distance: number;
  comparedToImport: number;
}

export const CarbonFootprint: React.FC = () => {
  const { t } = useLanguage();

  const metrics: EcoMetrics = {
    co2Saved: 248.5,
    localPercentage: 87,
    treesEquivalent: 12,
    sustainabilityScore: 94,
    distance: 42,
    comparedToImport: 1850,
  };

  const recentPurchases = [
    {
      id: '1',
      product: 'Pomidory malinowe',
      distance: 18,
      co2Saved: 12.4,
      supplier: 'Gospodarstwo Kowalski',
      badge: 'local',
    },
    {
      id: '2',
      product: 'Sałata masłowa',
      distance: 25,
      co2Saved: 8.2,
      supplier: 'EkoOgrody Sp. z o.o.',
      badge: 'organic',
    },
    {
      id: '3',
      product: 'Marchew młoda',
      distance: 35,
      co2Saved: 15.8,
      supplier: 'Farma Bio Warszawa',
      badge: 'seasonal',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 dark:to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('aiCarbonFootprint')}
                <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                  Eco AI
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">{t('carbonFootprintDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CO2 Saved */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800 p-6 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-600/20 dark:bg-green-600/30 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{t('carbonSaved')}</span>
              </div>
              <span className="px-2 py-1 bg-green-600/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-full">
                {t('thisMonth')}
              </span>
            </div>
            <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
              {metrics.co2Saved}
              <span className="text-2xl ml-1">kg</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('vsInternationalImport').replace('{km}', metrics.comparedToImport.toString())}
            </p>
          </div>
        </div>

        {/* Sustainability Score */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600/20 dark:bg-blue-600/30 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{t('sustainabilityScore')}</span>
              </div>
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-end gap-3 mb-4">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                {metrics.sustainabilityScore}
              </div>
              <div className="text-2xl font-bold text-muted-foreground mb-1">/100</div>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-900/30 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${metrics.sustainabilityScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Local Sourcing */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{metrics.localPercentage}%</div>
              <div className="text-xs text-muted-foreground">{t('localSourcing')}</div>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.localPercentage}%` }}
            />
          </div>
        </div>

        {/* Trees Equivalent */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
              <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{metrics.treesEquivalent}</div>
              <div className="text-xs text-muted-foreground">{t('treesEquivalent')}</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('treesPlanted').replace('{count}', metrics.treesEquivalent.toString())}
          </p>
        </div>

        {/* Average Distance */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-600/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{metrics.distance} km</div>
              <div className="text-xs text-muted-foreground">{t('averageDistance')}</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('vsImport').replace('{km}', metrics.comparedToImport.toString())}
          </p>
        </div>
      </div>

      {/* Recent Eco-Friendly Purchases */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
          {t('recentEcoPurchases')}
        </h3>
        <div className="space-y-3">
          {recentPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{purchase.product}</h4>
                    <p className="text-sm text-muted-foreground">{purchase.supplier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className={cn(
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      purchase.badge === 'local' && 'bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
                      purchase.badge === 'organic' && 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400',
                      purchase.badge === 'seasonal' && 'bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
                    )}>
                      {purchase.badge === 'local' && t('localSourcing')}
                      {purchase.badge === 'organic' && 'Organic'}
                      {purchase.badge === 'seasonal' && 'Seasonal'}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{purchase.distance} km</div>
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    -{purchase.co2Saved} kg CO₂
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EU Grant Badge */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6 relative overflow-hidden">
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-950/50 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1 flex items-center gap-2">
                {t('greenCertificate')}
                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold rounded-full">
                  EU
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('euGrantEligible')} • Twój poziom zrównoważoności: {metrics.sustainabilityScore}/100
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-all shadow-lg">
            {t('view')}
          </button>
        </div>
      </div>
    </div>
  );
};
