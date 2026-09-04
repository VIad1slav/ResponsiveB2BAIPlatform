import React from 'react';
import { ChefHat, Sparkles, TrendingDown, Lightbulb, Plus } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface RecipeSuggestion {
  id: string;
  ingredient: string;
  surplus: string;
  discount: number;
  dishIdea: string;
  estimatedCost: number;
  potentialRevenue: number;
  savings: number;
  icon: string;
}

export const RecipeAssistant: React.FC = () => {
  const { t } = useLanguage();

  const suggestions: RecipeSuggestion[] = [
    {
      id: '1',
      ingredient: 'Szparagi',
      surplus: '150 kg',
      discount: 30,
      dishIdea: 'Krem ze szparagów z grzankami',
      estimatedCost: 12.50,
      potentialRevenue: 38.00,
      savings: 5.40,
      icon: '🌱',
    },
    {
      id: '2',
      ingredient: 'Truskawki',
      surplus: '80 kg',
      discount: 25,
      dishIdea: 'Deser truskawkowy z białą czekoladą',
      estimatedCost: 9.20,
      potentialRevenue: 32.00,
      savings: 3.10,
      icon: '🍓',
    },
    {
      id: '3',
      ingredient: 'Buraki',
      surplus: '120 kg',
      discount: 35,
      dishIdea: 'Carpaccio z buraka z kozim serem',
      estimatedCost: 8.80,
      potentialRevenue: 28.00,
      savings: 4.80,
      icon: '🥗',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-2xl border border-purple-500/20 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 dark:to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('aiRecipeAssistant')}
                <span className="px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full border border-orange-500/20">
                  AI Chef
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">{t('recipeAssistantDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {t('seasonalSuggestions')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('surplusFound').replace('{count}', suggestions.length.toString())}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.id}
            className="bg-card rounded-xl border border-border hover:border-primary/50 transition-all p-6 hover:shadow-lg group"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950/30 dark:to-red-950/30 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {suggestion.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{suggestion.ingredient}</h3>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full">
                        -{suggestion.discount}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      {t('surplusIngredients')}: {suggestion.surplus}
                    </p>
                  </div>
                </div>

                {/* Recipe Idea */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-4 mb-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase">
                      {t('recipeIdeas')}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{suggestion.dishIdea}</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">{t('costSavings')}</div>
                      <div className="font-semibold text-foreground">{suggestion.estimatedCost.toFixed(2)} zł</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">{t('revenue')}</div>
                      <div className="font-semibold text-green-600 dark:text-green-400">
                        {suggestion.potentialRevenue.toFixed(2)} zł
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">{t('savingsAmount')}</div>
                      <div className="font-semibold text-primary">
                        +{suggestion.savings.toFixed(2)} zł
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    {t('addToMenu')}
                  </button>
                  <button className="px-4 py-2.5 bg-secondary text-foreground rounded-lg font-semibold hover:bg-accent transition-all">
                    {t('view')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 p-4">
          <div className="text-sm text-muted-foreground mb-1">{t('costSavings')}</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{suggestions.reduce((sum, s) => sum + s.savings, 0).toFixed(2)} zł
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t('onSurplusDishes')}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-200 dark:border-orange-800 p-4">
          <div className="text-sm text-muted-foreground mb-1">{t('surplusIngredients')}</div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {suggestions.length} {t('options')}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t('localFarmers')}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
          <div className="text-sm text-muted-foreground mb-1">{t('averageDiscount')}</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(suggestions.reduce((sum, s) => sum + s.discount, 0) / suggestions.length)}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t('onSeasonalIngredients')}</div>
        </div>
      </div>
    </div>
  );
};
