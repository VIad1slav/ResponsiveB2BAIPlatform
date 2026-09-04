import React, { useState } from 'react';
import { Building2, Mail, Phone, Lock, User, ChefHat, Tractor, Truck, Loader2, Globe } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useAuth } from '../../context/auth-context';
import { useRole } from '../../context/role-context';
import { cn } from '../ui/utils';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const { t, language, setLanguage } = useLanguage();
  const { signup } = useAuth();
  const { setRole } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    nip: '',
    email: '',
    phone: '',
    password: '',
    role: 'restaurant' as 'restaurant' | 'farmer' | 'logistics',
    agreeToTerms: false,
    // Driver-specific fields
    driverLicenseCategory: 'B' as 'B' | 'C' | 'CE',
    vehicleTypeSelected: 'van' as 'car' | 'van' | 'truck35' | 'refrigerator',
    // Farmer-specific fields - now array for multiple selection
    farmType: ['vegetables'] as string[],
    // Restaurant-specific fields - First venue
    firstVenueName: '',
    firstVenueAddress: '',
    cuisineType: 'italian' as string,
    deliveryWindowFrom: '06:00',
    deliveryWindowTo: '10:00',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!formData.agreeToTerms) {
      setErrors({ terms: t('termsRequired') });
      return;
    }

    setIsLoading(true);
    
    try {
      // Show loading for 0.5 seconds before signup
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Set the role in the role context
      setRole(formData.role);
      await signup(formData);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-foreground font-medium">{t('loading')}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/20">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('welcomeToPlon')}</h1>
          <p className="text-muted-foreground">{t('signupSubtitle')}</p>
        </div>

        {/* Signup Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Language Selector - Inside Form */}
          <div className="mb-6 pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Language</span>
              </div>
              <div className="flex gap-2">
                {(['PL', 'UA', 'RU', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLanguage(lang);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      language === lang 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'bg-secondary text-foreground hover:bg-accent'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {t('businessDetails')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('companyName')}
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                    placeholder="Twoja Firma Sp. z o.o."
                    required
                  />
                </div>

                {/* NIP */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('nip')}
                  </label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                    placeholder="1234567890"
                    required
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t('accountInfo')}
              </h2>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('workEmail')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                      placeholder="kontakt@firma.pl"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('phoneNumber')}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        placeholder="+48 123 456 789"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {t('roleSelection')}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Restaurant/Chef */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'restaurant' })}
                  className={cn(
                    'p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02]',
                    formData.role === 'restaurant'
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300',
                      formData.role === 'restaurant' ? 'bg-primary/20' : 'bg-secondary'
                    )}>
                      <ChefHat className={cn(
                        'w-6 h-6 transition-all duration-300',
                        formData.role === 'restaurant' ? 'text-primary' : 'text-muted-foreground'
                      )} />
                    </div>
                    {formData.role === 'restaurant' && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className={cn(
                    'font-semibold mb-1 transition-all duration-300',
                    formData.role === 'restaurant' ? 'text-primary' : 'text-foreground'
                  )}>
                    {t('restaurantChef')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('restaurantDesc')}
                  </p>
                </button>

                {/* Supplier/Farmer */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'farmer' })}
                  className={cn(
                    'p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02]',
                    formData.role === 'farmer'
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300',
                      formData.role === 'farmer' ? 'bg-primary/20' : 'bg-secondary'
                    )}>
                      <Tractor className={cn(
                        'w-6 h-6 transition-all duration-300',
                        formData.role === 'farmer' ? 'text-primary' : 'text-muted-foreground'
                      )} />
                    </div>
                    {formData.role === 'farmer' && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className={cn(
                    'font-semibold mb-1 transition-all duration-300',
                    formData.role === 'farmer' ? 'text-primary' : 'text-foreground'
                  )}>
                    {t('supplierFarmer')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('farmerDesc')}
                  </p>
                </button>

                {/* Logistics */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'logistics' })}
                  className={cn(
                    'p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02]',
                    formData.role === 'logistics'
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300',
                      formData.role === 'logistics' ? 'bg-primary/20' : 'bg-secondary'
                    )}>
                      <Truck className={cn(
                        'w-6 h-6 transition-all duration-300',
                        formData.role === 'logistics' ? 'text-primary' : 'text-muted-foreground'
                      )} />
                    </div>
                    {formData.role === 'logistics' && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className={cn(
                    'font-semibold mb-1 transition-all duration-300',
                    formData.role === 'logistics' ? 'text-primary' : 'text-foreground'
                  )}>
                    {t('logisticsDelivery')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('logisticsDesc')}
                  </p>
                </button>
              </div>
            </div>

            {/* Farmer-Specific Fields - Only shown when farmer role is selected */}
            {formData.role === 'farmer' && (
              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Tractor className="w-5 h-5 text-primary" />
                    {t('farmType')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('selectMultipleFarmTypes')} - {t('businessProfileRegistration')}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: 'vegetables', label: 'farmTypeVegetables', icon: '🥬' },
                      { value: 'fruits', label: 'farmTypeFruits', icon: '🍎' },
                      { value: 'dairy', label: 'farmTypeDairy', icon: '🥛' },
                      { value: 'meat', label: 'farmTypeMeat', icon: '🥩' },
                      { value: 'mixed', label: 'farmTypeMixed', icon: '🌾' },
                      { value: 'organic', label: 'farmTypeOrganic', icon: '🌱' },
                    ].map((type) => {
                      const isSelected = formData.farmType.includes(type.value);
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            const newFarmTypes = isSelected
                              ? formData.farmType.filter(t => t !== type.value)
                              : [...formData.farmType, type.value];
                            // Ensure at least one type is selected
                            if (newFarmTypes.length > 0) {
                              setFormData({ ...formData, farmType: newFarmTypes });
                            }
                          }}
                          className={cn(
                            'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 relative',
                            isSelected
                              ? 'border-primary bg-primary/10 shadow-md'
                              : 'border-border bg-background hover:border-primary/50'
                          )}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200 shadow-lg">
                              <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <span className="text-2xl">{type.icon}</span>
                          <span className={cn(
                            'text-xs font-medium text-center',
                            isSelected ? 'text-primary' : 'text-foreground'
                          )}>
                            {t(type.label)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Selected Categories Preview */}
                  {formData.farmType.length > 0 && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm font-semibold text-primary mb-2">
                        ✓ {t('selectedCategories')}: {formData.farmType.length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.farmType.map((type) => {
                          const typeData = [
                            { value: 'vegetables', label: 'farmTypeVegetables', icon: '🥬' },
                            { value: 'fruits', label: 'farmTypeFruits', icon: '🍎' },
                            { value: 'dairy', label: 'farmTypeDairy', icon: '🥛' },
                            { value: 'meat', label: 'farmTypeMeat', icon: '🥩' },
                            { value: 'mixed', label: 'farmTypeMixed', icon: '🌾' },
                            { value: 'organic', label: 'farmTypeOrganic', icon: '🌱' },
                          ].find(t => t.value === type);
                          return (
                            <span
                              key={type}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full text-xs font-medium text-primary"
                            >
                              <span>{typeData?.icon}</span>
                              <span>{t(typeData?.label || type)}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      💡 {t('whyAsk')}
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {t('aiWillMatchProducts')}</li>
                      <li>• {t('restaurantsWillFindYou')}</li>
                      <li>• {t('betterInvoicing')}</li>
                      <li>• {t('filterByCategory')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Restaurant-Specific Fields - Only shown when restaurant role is selected */}
            {formData.role === 'restaurant' && (
              <div className="space-y-6 border-t border-border pt-6">
                {/* Add First Venue Section */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    {t('addFirstVenue')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t('addFirstVenueSubtitle')}
                  </p>

                  <div className="space-y-4">
                    {/* Venue Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('venueName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstVenueName}
                        onChange={(e) => setFormData({ ...formData, firstVenueName: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        placeholder={t('venueNamePlaceholder')}
                        required
                      />
                    </div>

                    {/* Venue Address */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('venueAddress')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstVenueAddress}
                        onChange={(e) => setFormData({ ...formData, firstVenueAddress: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                        placeholder={t('venueAddressPlaceholder')}
                        required
                      />
                    </div>

                    {/* Cuisine Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('cuisineType')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { value: 'italian', label: 'cuisineItalian', icon: '🍝' },
                          { value: 'polish', label: 'cuisinePolish', icon: '🥟' },
                          { value: 'asian', label: 'cuisineAsian', icon: '🍜' },
                          { value: 'vegan', label: 'cuisineVegan', icon: '🥗' },
                          { value: 'burger', label: 'cuisineBurger', icon: '🍔' },
                          { value: 'fusion', label: 'cuisineFusion', icon: '🍽️' },
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, cuisineType: type.value })}
                            className={cn(
                              'p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 relative',
                              formData.cuisineType === type.value
                                ? 'border-primary bg-primary/10 shadow-md'
                                : 'border-border bg-background hover:border-primary/50'
                            )}
                          >
                            {formData.cuisineType === type.value && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200 shadow-lg">
                                <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                            <span className="text-xl sm:text-2xl">{type.icon}</span>
                            <span className={cn(
                              'text-xs font-medium text-center',
                              formData.cuisineType === type.value ? 'text-primary' : 'text-foreground'
                            )}>
                              {t(type.label)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Window */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('deliveryWindow')} <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">
                        {t('deliveryWindowExample')}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            {t('deliveryWindowFrom')}
                          </label>
                          <input
                            type="time"
                            value={formData.deliveryWindowFrom}
                            onChange={(e) => setFormData({ ...formData, deliveryWindowFrom: e.target.value })}
                            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            {t('deliveryWindowTo')}
                          </label>
                          <input
                            type="time"
                            value={formData.deliveryWindowTo}
                            onChange={(e) => setFormData({ ...formData, deliveryWindowTo: e.target.value })}
                            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            required
                          />
                        </div>
                      </div>
                      {/* Preview */}
                      <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-xs font-semibold text-primary flex items-center gap-2">
                          ⏰ {formData.deliveryWindowFrom} - {formData.deliveryWindowTo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    💡 {t('whyAsk')}
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• {t('aiWillBetterMatch')}</li>
                    <li>• {t('farmersWillReserve')}</li>
                    <li>• {t('canAddMoreVenues')}</li>
                    <li>• {t('switchBetweenVenues')}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Driver-Specific Fields - Only shown when logistics role is selected */}
            {formData.role === 'logistics' && (
              <div className="space-y-6 border-t border-border pt-6">
                {/* Driver License Category */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    {t('driverLicense')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(['B', 'C', 'CE'] as const).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setFormData({ ...formData, driverLicenseCategory: category })}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all duration-200 text-center',
                          formData.driverLicenseCategory === category
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border bg-background hover:border-primary/50'
                        )}
                      >
                        <p className={cn(
                          'font-semibold text-sm',
                          formData.driverLicenseCategory === category ? 'text-primary' : 'text-foreground'
                        )}>
                          {t(`driverLicense${category}` as any)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t('vehicleTypeSelection')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(['car', 'van', 'truck35', 'refrigerator'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, vehicleTypeSelected: type })}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                          formData.vehicleTypeSelected === type
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border bg-background hover:border-primary/50'
                        )}
                      >
                        <p className={cn(
                          'font-semibold text-sm',
                          formData.vehicleTypeSelected === type ? 'text-primary' : 'text-foreground'
                        )}>
                          {t(`${type}Type` as any)}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {t('verificationRequired')}
                  </p>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 w-5 h-5 text-primary rounded border-input focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {t('agreeToTerms')}{' '}
                  <button type="button" className="text-primary hover:underline font-medium">
                    {t('andPrivacyPolicy')}
                  </button>
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                t('createAccount')
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('haveAccount')}{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-semibold"
              >
                {t('login')}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Plon. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </div>
  );
};

Signup.displayName = 'Signup';