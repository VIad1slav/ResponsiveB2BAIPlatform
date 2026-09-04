import React, { useState } from 'react';
import { X, Sparkles, MapPin, Zap, Check } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { motion, AnimatePresence } from 'motion/react';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  categories: string[];
  specialFilters: string[];
}

const categories = [
  { 
    id: 'vegetables-fruits',
    pl: 'Warzywa i Owoce',
    ua: 'Овочі та фрукти',
    ru: 'Овощи и Фрукты',
    en: 'Vegetables & Fruits',
    icon: '🥕'
  },
  {
    id: 'meat-fish',
    pl: 'Mięso i Ryby',
    ua: 'М\'ясо та риба',
    ru: 'Мясо и Рыба',
    en: 'Meat & Fish',
    icon: '🥩'
  },
  {
    id: 'dairy-eggs',
    pl: 'Nabiał i Jajka',
    ua: 'Молочні продукти та яйця',
    ru: 'Молочка и Яйца',
    en: 'Dairy & Eggs',
    icon: '🥛'
  },
  {
    id: 'bakery',
    pl: 'Pieczywo',
    ua: 'Хлібобулочні вироби',
    ru: 'Выпечка',
    en: 'Bakery',
    icon: '🍞'
  },
  {
    id: 'dry-goods',
    pl: 'Produkty suche',
    ua: 'Бакалія',
    ru: 'Бакалея',
    en: 'Dry Goods',
    icon: '🌾'
  },
  {
    id: 'beverages',
    pl: 'Napoje',
    ua: 'Напої',
    ru: 'Напитки',
    en: 'Beverages',
    icon: '🥤'
  },
  {
    id: 'herbs-spices',
    pl: 'Zioła i Przyprawy',
    ua: 'Трави та спеції',
    ru: 'Травы и Специи',
    en: 'Herbs & Spices',
    icon: '🌿'
  },
  {
    id: 'oils-fats',
    pl: 'Oleje i Tłuszcze',
    ua: 'Олії та жири',
    ru: 'Масла и Жиры',
    en: 'Oils & Fats',
    icon: '🫒'
  },
  {
    id: 'sauces-condiments',
    pl: 'Sosy i Dodatki',
    ua: 'Соуси та приправи',
    ru: 'Соусы и Приправы',
    en: 'Sauces & Condiments',
    icon: '🧂'
  },
  {
    id: 'frozen',
    pl: 'Produkty mrożone',
    ua: 'Заморожені продукти',
    ru: 'Замороженные продукты',
    en: 'Frozen Products',
    icon: '🧊'
  },
  {
    id: 'seafood',
    pl: 'Owoce morza',
    ua: 'Морепродукти',
    ru: 'Морепродукты',
    en: 'Seafood',
    icon: '🦐'
  },
  {
    id: 'cheese',
    pl: 'Sery',
    ua: 'Сири',
    ru: 'Сыры',
    en: 'Cheeses',
    icon: '🧀'
  },
  {
    id: 'pasta-grains',
    pl: 'Makarony i Kasze',
    ua: 'Макаронні вироби та крупи',
    ru: 'Макароны и Крупы',
    en: 'Pasta & Grains',
    icon: '🍝'
  },
  {
    id: 'canned',
    pl: 'Przetwory i Konserwy',
    ua: 'Консервовані продукти',
    ru: 'Консервы',
    en: 'Canned Goods',
    icon: '🥫'
  },
  {
    id: 'snacks',
    pl: 'Przekąski',
    ua: 'Закуски',
    ru: 'Закуски',
    en: 'Snacks',
    icon: '🥨'
  },
  {
    id: 'desserts',
    pl: 'Desery',
    ua: 'Десерти',
    ru: 'Десерты',
    en: 'Desserts',
    icon: '🍰'
  },
  {
    id: 'alcohol',
    pl: 'Alkohol',
    ua: 'Алкаголь',
    ru: 'Алкаголь',
    en: 'Alcohol',
    icon: '🍷'
  },
  {
    id: 'organic',
    pl: 'Produkty BIO',
    ua: 'Органічні продукти',
    ru: 'Органические продукты',
    en: 'Organic Products',
    icon: '🌱'
  },
];

const specialFilters = [
  {
    id: 'ai-recommended',
    pl: 'Rekomendowane przez AI',
    ru: 'Рекомендовано AI',
    en: 'AI-Recommended for you',
    icon: Sparkles,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'local-farmers',
    pl: 'Lokalni Rolnicy (Polska)',
    ru: 'Местные Фермеры (Польша)',
    en: 'Local Farmers (Poland)',
    icon: MapPin,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 'fast-delivery',
    pl: 'Szybka Dostawa (<2h)',
    ru: 'Быстрая Доставка (<2ч)',
    en: 'Fast Delivery (<2h)',
    icon: Zap,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10'
  },
];

export const FilterOverlay: React.FC<FilterOverlayProps> = ({ 
  isOpen, 
  onClose, 
  onApply,
  currentFilters 
}) => {
  const { language } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentFilters.categories);
  const [selectedSpecialFilters, setSelectedSpecialFilters] = useState<string[]>(currentFilters.specialFilters);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSpecialFilter = (filterId: string) => {
    setSelectedSpecialFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      specialFilters: selectedSpecialFilters,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedSpecialFilters([]);
  };

  const getLabel = (item: any) => {
    return language === 'PL' ? item.pl : language === 'RU' ? item.ru : language === 'UA' ? item.ua : item.en;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Overlay - Desktop: Dropdown, Mobile: Drawer */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card rounded-2xl shadow-2xl z-50 border border-border mx-4 max-h-[80vh] overflow-hidden hidden lg:flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {language === 'PL' ? 'Filtry' : language === 'RU' ? 'Фильтры' : 'Filters'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {language === 'PL' ? 'Kategorie' : language === 'RU' ? 'Категории' : 'Categories'}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map(category => {
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card hover:border-muted-foreground/30'
                        }`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className={`flex-1 text-left font-medium ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {getLabel(category)}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {language === 'PL' ? 'Filtry Specjalne' : language === 'RU' ? 'Специальные Фильтры' : 'Special Filters'}
                </h3>
                <div className="space-y-3">
                  {specialFilters.map(filter => {
                    const Icon = filter.icon;
                    const isSelected = selectedSpecialFilters.includes(filter.id);
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleSpecialFilter(filter.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card hover:border-muted-foreground/30'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${filter.bgColor}`}>
                          <Icon className={`w-5 h-5 ${filter.color}`} />
                        </div>
                        <span className={`flex-1 text-left font-medium ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {getLabel(filter)}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 p-6 border-t border-border bg-secondary">
              <button
                onClick={handleClear}
                className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"
              >
                {language === 'PL' ? 'Wyczyść' : language === 'RU' ? 'Сбросить' : 'Clear'}
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium shadow-lg"
              >
                {language === 'PL' ? 'Zastosuj' : language === 'RU' ? 'Применить' : 'Apply'}
                {(selectedCategories.length + selectedSpecialFilters.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-foreground/20 rounded-full text-sm">
                    {selectedCategories.length + selectedSpecialFilters.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Mobile Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-2xl z-50 border-t border-border max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">
                {language === 'PL' ? 'Filtry' : language === 'RU' ? 'Фильтры' : 'Filters'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {language === 'PL' ? 'Kategorie' : language === 'RU' ? 'Категории' : 'Categories'}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => {
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card'
                        }`}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className={`flex-1 text-left text-sm font-medium ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {getLabel(category)}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {language === 'PL' ? 'Filtry Specjalne' : language === 'RU' ? 'Специальные' : 'Special'}
                </h3>
                <div className="space-y-2">
                  {specialFilters.map(filter => {
                    const Icon = filter.icon;
                    const isSelected = selectedSpecialFilters.includes(filter.id);
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleSpecialFilter(filter.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${filter.bgColor}`}>
                          <Icon className={`w-4 h-4 ${filter.color}`} />
                        </div>
                        <span className={`flex-1 text-left text-sm font-medium ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {getLabel(filter)}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 p-4 border-t border-border bg-secondary">
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium text-sm"
              >
                {language === 'PL' ? 'Wyczyść' : language === 'RU' ? 'Сбросить' : 'Clear'}
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium shadow-lg text-sm"
              >
                {language === 'PL' ? 'Zastosuj' : language === 'RU' ? 'Применить' : 'Apply'}
                {(selectedCategories.length + selectedSpecialFilters.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs">
                    {selectedCategories.length + selectedSpecialFilters.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};