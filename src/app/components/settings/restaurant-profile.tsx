import React from 'react';
import { UtensilsCrossed, Clock, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

interface RestaurantProfileProps {
  formData: {
    cuisineType: string;
    deliveryWindowFrom: string;
    deliveryWindowTo: string;
    averagePurchaseVolume: string;
  };
  setFormData: (data: any) => void;
}

export const RestaurantProfile: React.FC<RestaurantProfileProps> = ({ formData, setFormData }) => {
  const { t } = useLanguage();

  const cuisineTypes = [
    { value: 'italian', label: 'cuisineItalian', icon: '🍝' },
    { value: 'polish', label: 'cuisinePolish', icon: '🥟' },
    { value: 'asian', label: 'cuisineAsian', icon: '🍜' },
    { value: 'vegan', label: 'cuisineVegan', icon: '🥗' },
    { value: 'burger', label: 'cuisineBurger', icon: '🍔' },
    { value: 'fusion', label: 'cuisineFusion', icon: '🍽️' },
    { value: 'mediterranean', label: 'cuisineMediterranean', icon: '🐟' },
  ];

  const volumeOptions = [
    { value: 'small', label: 'volumeSmall', range: 'do 5000 zł' },
    { value: 'medium', label: 'volumeMedium', range: '5000-15000 zł' },
    { value: 'large', label: 'volumeLarge', range: 'powyżej 15000 zł' },
  ];

  return (
    <>
      {/* Restaurant Business Profile */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('businessProfile')}</h2>
        </div>

        <div className="space-y-4">
          {/* Cuisine Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('cuisineType')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cuisineTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, cuisineType: type.value })}
                  className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.cuisineType === type.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium text-foreground text-center">
                    {t(type.label)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Window */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('deliveryWindow')}</h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('deliveryWindowExample')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('deliveryWindowFrom')}
              </label>
              <input
                type="time"
                value={formData.deliveryWindowFrom}
                onChange={(e) => setFormData({ ...formData, deliveryWindowFrom: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('deliveryWindowTo')}
              </label>
              <input
                type="time"
                value={formData.deliveryWindowTo}
                onChange={(e) => setFormData({ ...formData, deliveryWindowTo: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold text-primary">
              ⏰ Okno przyjęcia: {formData.deliveryWindowFrom} - {formData.deliveryWindowTo}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Kierowcy zobaczą ten przedział czasowy przy wyborze trasy
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('invoiceDetails')}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('fullCompanyName')}
            </label>
            <input
              type="text"
              placeholder="np. Restauracja 'Smak Polski' Sp. z o.o."
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('invoiceAddress')}
            </label>
            <input
              type="text"
              placeholder="ul. Główna 123, 00-000 Warszawa"
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground">
              ℹ️ Te dane będą automatycznie wypełniane na wszystkich fakturach KSeF
            </p>
          </div>
        </div>
      </div>

      {/* Average Purchase Volume */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('averagePurchaseVolume')}</h2>
        </div>

        <div className="space-y-3">
          {volumeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({ ...formData, averagePurchaseVolume: option.value })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                formData.averagePurchaseVolume === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{t(option.label)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.range} miesięcznie
                  </p>
                </div>
                {formData.averagePurchaseVolume === option.value && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}

          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              💡 Dlaczego pytamy?
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• AI będzie lepiej dobierać dostawców</li>
              <li>• Farmerzy zarezerwują dla Ciebie towary</li>
              <li>• Możliwe rabaty przy większych wolumenach</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

RestaurantProfile.displayName = 'RestaurantProfile';
