import React, { useState } from 'react';
import { Truck, Sparkles, Route, AlertTriangle, Check, Zap, Thermometer } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface RouteStop {
  id: string;
  address: string;
  products: string[];
  temperature: 'ambient' | 'cold' | 'frozen';
  distance: number;
  duration: number;
}

interface OptimizationResult {
  originalDistance: number;
  optimizedDistance: number;
  fuelSavings: number;
  timeSavings: number;
  co2Reduction: number;
  efficiency: number;
  warnings: string[];
}

export const RouteOptimizer: React.FC = () => {
  const { t } = useLanguage();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const stops: RouteStop[] = [
    {
      id: '1',
      address: 'Restauracja "La Cucina", ul. Piękna 15, Warszawa',
      products: ['Pomidory', 'Bazylia', 'Mozzarella'],
      temperature: 'cold',
      distance: 5.2,
      duration: 15,
    },
    {
      id: '2',
      address: 'Bistro "Zielony Ogród", ul. Marszałkowska 45',
      products: ['Sałata', 'Ogórki', 'Rzodkiewka'],
      temperature: 'cold',
      distance: 3.8,
      duration: 12,
    },
    {
      id: '3',
      address: 'Cukiernia "Słodki Zakątek", Al. Jerozolimskie 120',
      products: ['Truskawki', 'Maliny', 'Jagody'],
      temperature: 'cold',
      distance: 8.5,
      duration: 20,
    },
  ];

  const result: OptimizationResult = {
    originalDistance: 25.8,
    optimizedDistance: 19.4,
    fuelSavings: 15,
    timeSavings: 22,
    co2Reduction: 3.2,
    efficiency: 92,
    warnings: [
      'Nie mieszaj jabłek z kwiatami (gaz etylenowy)',
      'Truskawki wymagają temperatury 2-4°C',
    ],
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimized(true);
    }, 2000);
  };

  const getTemperatureIcon = (temp: RouteStop['temperature']) => {
    return <Thermometer className={cn(
      'w-4 h-4',
      temp === 'frozen' && 'text-blue-600 dark:text-blue-400',
      temp === 'cold' && 'text-cyan-600 dark:text-cyan-400',
      temp === 'ambient' && 'text-orange-600 dark:text-orange-400'
    )} />;
  };

  const getTemperatureLabel = (temp: RouteStop['temperature']) => {
    switch (temp) {
      case 'frozen': return 'Mrożone';
      case 'cold': return 'Chłodnia';
      case 'ambient': return 'Pokojowa';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 dark:to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Route className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('aiRouteOptimizer')}
                <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
                  AI
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">{t('routeOptimizerDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route Stops */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{t('plannedStops')}</h3>
          <button
            onClick={handleOptimize}
            disabled={isOptimizing || optimized}
            className={cn(
              'px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md',
              optimized
                ? 'bg-green-600 text-white'
                : 'bg-primary text-primary-foreground hover:opacity-90'
            )}
          >
            {isOptimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('aiAnalyzing')}
              </>
            ) : optimized ? (
              <>
                <Check className="w-5 h-5" />
                {t('optimized')}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {t('optimizeRoute')}
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div
              key={stop.id}
              className={cn(
                'rounded-lg border p-4 transition-all',
                optimized
                  ? 'border-green-500/30 bg-green-50 dark:bg-green-950/20'
                  : 'border-border bg-background'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Stop Number */}
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0',
                  optimized
                    ? 'bg-green-600 text-white'
                    : 'bg-primary/10 text-primary'
                )}>
                  {index + 1}
                </div>

                {/* Stop Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{stop.address}</h4>
                  
                  {/* Products */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {stop.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-secondary text-foreground text-xs rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* Temperature & Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {getTemperatureIcon(stop.temperature)}
                      <span>{getTemperatureLabel(stop.temperature)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Route className="w-4 h-4" />
                      <span>{stop.distance} km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏱</span>
                      <span>{stop.duration} min</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                {optimized && (
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Results */}
      {optimized && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 p-4">
              <div className="text-sm text-muted-foreground mb-1">{t('fuelSavings')}</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.fuelSavings}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">-{result.co2Reduction} kg CO₂</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
              <div className="text-sm text-muted-foreground mb-1">{t('timeSavings')}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {result.timeSavings} min
              </div>
              <div className="text-xs text-muted-foreground mt-1">{t('fasterDelivery')}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 p-4">
              <div className="text-sm text-muted-foreground mb-1">{t('routeEfficiency')}</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {result.efficiency}%
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-muted-foreground">AI-Optimized</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-200 dark:border-orange-800 p-4">
              <div className="text-sm text-muted-foreground mb-1">{t('distance')}</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {result.optimizedDistance} km
              </div>
              <div className="text-xs text-muted-foreground mt-1 line-through">
                {result.originalDistance} km
              </div>
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                    {t('compatibilityCheck')}
                  </h4>
                  <ul className="space-y-1">
                    {result.warnings.map((warning, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-yellow-600 dark:text-yellow-400">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-green-600 dark:text-green-400">{t('optimizationComplete')}</h4>
                <p className="text-sm text-muted-foreground">{t('bestRouteFound')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">{t('fuelSavingsAmount')}</div>
                <div className="font-bold text-foreground">~{(result.fuelSavings * 0.8).toFixed(1)} L</div>
              </div>
              <div>
                <div className="text-muted-foreground">{t('costSavingsAmount')}</div>
                <div className="font-bold text-foreground">~{(result.fuelSavings * 5.2).toFixed(0)} zł</div>
              </div>
              <div>
                <div className="text-muted-foreground">{t('co2Saved')}</div>
                <div className="font-bold text-foreground">{result.co2Reduction} kg</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
