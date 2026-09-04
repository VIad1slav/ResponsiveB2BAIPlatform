import React, { useState } from 'react';
import { Building2, Globe, Bell, Shield, Save, Moon, Sun, Monitor, MapPin, Plus, Award, Upload, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useTheme } from '../../context/theme-context';
import { useRole } from '../../context/role-context';
import { DeliveryMap } from '../delivery-map';
import { FarmerProfile } from '../settings/farmer-profile';
import { RestaurantProfile } from '../settings/restaurant-profile';

export const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { role } = useRole();
  const [formData, setFormData] = useState({
    companyName: 'Gospodarstwo Rolne "Zielone Pola"',
    nip: '1234567890',
    legalAddress: 'ul. Polna 15, 62-020 Swarzędz',
    email: 'kontakt@zielonepola.pl',
    phone: '+48 61 234 5678',
    ksefEnabled: true,
    // Delivery address fields
    sameAsLegal: false,
    deliveryStreet: '',
    deliveryPostcodeCity: '',
    deliveryInstructions: '',
    deliveryLat: 52.2297,
    deliveryLng: 21.0122,
    // Farmer-specific fields
    farmType: ['vegetables', 'fruits'] as string[], // Changed to array with multiple selection
    regon: '123456789',
    warehouseLat: 52.2297,
    warehouseLng: 21.0122,
    certificateFile: null as File | null,
    certificateStatus: 'verified' as 'verified' | 'pending' | 'rejected',
    // Restaurant-specific fields
    cuisineType: 'italian',
    deliveryWindowFrom: '06:00',
    deliveryWindowTo: '10:00',
    averagePurchaseVolume: 'medium',
  });

  const handleSave = () => {
    // Simulate save
    alert(t('settingsSaved'));
  };

  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: 'lightTheme' },
    { value: 'dark' as const, icon: Moon, label: 'darkTheme' },
    { value: 'system' as const, icon: Monitor, label: 'systemTheme' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('settingsTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('settingsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('companyInfo')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('companyName')}
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('nip')}
                  </label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('legalAddress')}
                </label>
                <input
                  type="text"
                  value={formData.legalAddress}
                  onChange={(e) => setFormData({ ...formData, legalAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('deliveryAddress')}</h2>
            </div>

            <div className="space-y-4">
              {/* Same as legal address checkbox */}
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-lg hover:bg-accent transition-colors">
                <input
                  type="checkbox"
                  checked={formData.sameAsLegal}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData({
                      ...formData,
                      sameAsLegal: checked,
                      deliveryStreet: checked ? formData.legalAddress : '',
                      deliveryPostcodeCity: checked ? '' : formData.deliveryPostcodeCity,
                    });
                  }}
                  className="w-5 h-5 text-primary rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{t('sameAsLegal')}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'PL' && 'Użyj adresu rejestrowego jako adresu dostawy'}
                    {language === 'UA' && 'Використати юридичну адресу як адресу доставки'}
                    {language === 'RU' && 'Использовать юридический адрес как адрес доставки'}
                    {language === 'EN' && 'Use legal address as delivery address'}
                  </p>
                </div>
              </label>

              {/* Delivery address fields - shown when not same as legal */}
              {!formData.sameAsLegal && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('streetAndNumber')}
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryStreet}
                      onChange={(e) => setFormData({ ...formData, deliveryStreet: e.target.value })}
                      placeholder={
                        language === 'PL' ? 'np. ul. Główna 15' :
                        language === 'UA' ? 'напр. вул. Головна 15' :
                        language === 'RU' ? 'напр. ул. Главная 15' :
                        'e.g. 15 Main Street'
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('postcodeAndCity')}
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryPostcodeCity}
                      onChange={(e) => setFormData({ ...formData, deliveryPostcodeCity: e.target.value })}
                      placeholder={
                        language === 'PL' ? '00-000 Warszawa' :
                        language === 'UA' ? '00000 Київ' :
                        language === 'RU' ? '000000 Москва' :
                        '00-000 Warsaw'
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('deliveryInstructions')}
                    </label>
                    <textarea
                      value={formData.deliveryInstructions}
                      onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                      placeholder={t('deliveryInstructionsPlaceholder')}
                      rows={3}
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  {/* Interactive Map */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('selectLocationOnMap')}
                    </label>
                    <DeliveryMap
                      onLocationSelect={(lat, lng) => {
                        setFormData({ ...formData, deliveryLat: lat, deliveryLng: lng });
                      }}
                      initialPosition={[formData.deliveryLat, formData.deliveryLng]}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {language === 'PL' && 'Kliknij na mapie aby wybrać dokładną lokalizację dostawy'}
                      {language === 'UA' && 'Натисніть на карту, щоб вибрати точне місце доставки'}
                      {language === 'RU' && 'Нажмите на карту, чтобы выбрать точное местоположение доставки'}
                      {language === 'EN' && 'Click on the map to select precise delivery location'}
                    </p>
                  </div>

                  {/* Add New Address Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium shadow-lg">
                    <Plus className="w-5 h-5" />
                    {t('addNewAddress')}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Role-Specific Business Profile */}
          {role === 'farmer' && (
            <FarmerProfile formData={formData} setFormData={setFormData} />
          )}
          {role === 'restaurant' && (
            <RestaurantProfile formData={formData} setFormData={setFormData} />
          )}

          {/* KSeF Integration */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('ksefIntegration')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{t('ksefStatus')}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('ksefDescription')}</p>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, ksefEnabled: !formData.ksefEnabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.ksefEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.ksefEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {formData.ksefEnabled && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary dark:text-primary">
                    ✓ {t('ksefActive')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('themeSettings')}</h2>
            </div>

            <div className="space-y-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-secondary text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div>{t(option.label)}</div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('languageSettings')}</h2>
            </div>

            <div className="space-y-2">
              {(['PL', 'UA', 'RU', 'EN'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`[Plon] Switching language from ${language} to ${lang}`);
                    setLanguage(lang);
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                    language === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-accent'
                  }`}
                >
                  {lang === 'PL' && '🇵🇱 Polski'}
                  {lang === 'UA' && '🇺🇦 Українська'}
                  {lang === 'RU' && '🇷🇺 Русский'}
                  {lang === 'EN' && '🇬🇧 English'}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t('notifications')}</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded" />
                <span className="text-sm text-foreground">{t('emailNotificationsOrders')}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded" />
                <span className="text-sm text-foreground">{t('smsNotifications')}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                <span className="text-sm text-foreground">{t('aiInsights')}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium shadow-lg"
        >
          <Save className="w-5 h-5" />
          {t('saveChanges')}
        </button>
      </div>
    </div>
  );
};