import React, { useState } from 'react';
import { Sparkles, Camera, TrendingUp, Route, ChefHat, Leaf, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useRole } from '../../context/role-context';
import { cn } from '../ui/utils';
import { QualityVision } from '../ai/quality-vision';
import { DynamicPricing } from '../ai/dynamic-pricing';
import { RecipeAssistant } from '../ai/recipe-assistant';
import { CarbonFootprint } from '../ai/carbon-footprint';
import { RouteOptimizer } from '../ai/route-optimizer';

type AIFeature = 'quality-vision' | 'dynamic-pricing' | 'recipe-assistant' | 'carbon-footprint' | 'route-optimizer' | null;

export const AIHub: React.FC = () => {
  const { t } = useLanguage();
  const { role } = useRole();
  const [activeFeature, setActiveFeature] = useState<AIFeature>(null);

  const features = [
    {
      id: 'quality-vision' as AIFeature,
      icon: Camera,
      title: t('aiQualityVision'),
      description: t('qualityVisionDesc'),
      gradient: 'from-blue-600 to-cyan-600',
      roles: ['farmer', 'logistics'],
      badge: 'Vision AI',
    },
    {
      id: 'dynamic-pricing' as AIFeature,
      icon: TrendingUp,
      title: t('aiDynamicPricing'),
      description: t('dynamicPricingDesc'),
      gradient: 'from-purple-600 to-pink-600',
      roles: ['farmer', 'restaurant'],
      badge: 'Smart Pricing',
    },
    {
      id: 'recipe-assistant' as AIFeature,
      icon: ChefHat,
      title: t('aiRecipeAssistant'),
      description: t('recipeAssistantDesc'),
      gradient: 'from-orange-600 to-red-600',
      roles: ['restaurant'],
      badge: 'Chef AI',
    },
    {
      id: 'carbon-footprint' as AIFeature,
      icon: Leaf,
      title: t('aiCarbonFootprint'),
      description: t('carbonFootprintDesc'),
      gradient: 'from-green-600 to-emerald-600',
      roles: ['restaurant', 'farmer', 'logistics'],
      badge: 'Eco AI',
    },
    {
      id: 'route-optimizer' as AIFeature,
      icon: Route,
      title: t('aiRouteOptimizer'),
      description: t('routeOptimizerDesc'),
      gradient: 'from-indigo-600 to-blue-600',
      roles: ['logistics'],
      badge: 'Route AI',
    },
  ];

  const availableFeatures = features.filter(f => f.roles.includes(role as string));

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'quality-vision':
        return <QualityVision onClose={() => setActiveFeature(null)} />;
      case 'dynamic-pricing':
        return <DynamicPricing />;
      case 'recipe-assistant':
        return <RecipeAssistant />;
      case 'carbon-footprint':
        return <CarbonFootprint />;
      case 'route-optimizer':
        return <RouteOptimizer />;
      default:
        return null;
    }
  };

  if (activeFeature) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setActiveFeature(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('backToAiHub')}</span>
        </button>

        {/* Feature Content */}
        {renderFeatureContent()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-primary/20 shadow-sm p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{t('aiHubTitle')}</h1>
              <p className="text-lg text-muted-foreground">
                {t('aiHubSubtitle')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border">
              <div className="text-2xl font-bold text-foreground mb-1">{availableFeatures.length}</div>
              <div className="text-sm text-muted-foreground">{t('availableAIFeatures')}</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">{t('aiConciergeOnline')}</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">99.2%</div>
              <div className="text-sm text-muted-foreground">{t('predictionAccuracy')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">{t('aiFeaturesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className="group bg-card rounded-2xl border border-border hover:border-primary/50 p-6 transition-all hover:shadow-xl hover:scale-[1.02] text-left"
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    'w-14 h-14 bg-gradient-to-r rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110',
                    feature.gradient
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('openFeature')}</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {t('aiBenefitsTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💰</span>
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">{t('costSavingsTitle')}</div>
              <div className="text-xs text-muted-foreground">{t('costSavingsDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">{t('efficiencyTitle')}</div>
              <div className="text-xs text-muted-foreground">{t('efficiencyDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🌱</span>
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">{t('ecologyTitle')}</div>
              <div className="text-xs text-muted-foreground">{t('ecologyDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">{t('analytics')}</div>
              <div className="text-xs text-muted-foreground">{t('analyticsDesc')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};