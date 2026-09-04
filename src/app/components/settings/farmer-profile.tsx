import React from 'react';
import { Tractor, Award, MapPin, Upload, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { DeliveryMap } from '../delivery-map';

interface FarmerProfileProps {
  formData: {
    farmType: string | string[]; // Support both single and array
    regon: string;
    warehouseLat: number;
    warehouseLng: number;
    certificateFile: File | null;
    certificateStatus: 'verified' | 'pending' | 'rejected';
  };
  setFormData: (data: any) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({ formData, setFormData }) => {
  const { t } = useLanguage();

  const farmTypes = [
    { value: 'vegetables', label: 'farmTypeVegetables', icon: '🥬' },
    { value: 'fruits', label: 'farmTypeFruits', icon: '🍎' },
    { value: 'dairy', label: 'farmTypeDairy', icon: '🥛' },
    { value: 'meat', label: 'farmTypeMeat', icon: '🥩' },
    { value: 'mixed', label: 'farmTypeMixed', icon: '🌾' },
    { value: 'organic', label: 'farmTypeOrganic', icon: '🌱' },
  ];

  // Normalize farmType to array
  const selectedFarmTypes = Array.isArray(formData.farmType) 
    ? formData.farmType 
    : [formData.farmType];

  const toggleFarmType = (value: string) => {
    const isArray = Array.isArray(formData.farmType);
    if (!isArray) {
      // Convert to array with both old and new value
      setFormData({ ...formData, farmType: [formData.farmType as string, value] });
      return;
    }
    
    const currentTypes = formData.farmType as string[];
    const isSelected = currentTypes.includes(value);
    
    if (isSelected) {
      // Remove the type
      const newTypes = currentTypes.filter(t => t !== value);
      // Ensure at least one type is selected
      if (newTypes.length > 0) {
        setFormData({ ...formData, farmType: newTypes });
      }
    } else {
      // Add the type
      setFormData({ ...formData, farmType: [...currentTypes, value] });
    }
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, certificateFile: file, certificateStatus: 'pending' });
    }
  };

  const getCertificateStatusColor = () => {
    switch (formData.certificateStatus) {
      case 'verified':
        return 'text-green-600 dark:text-green-400 bg-green-500/10';
      case 'pending':
        return 'text-orange-600 dark:text-orange-400 bg-orange-500/10';
      case 'rejected':
        return 'text-red-600 dark:text-red-400 bg-red-500/10';
      default:
        return 'text-muted-foreground bg-secondary';
    }
  };

  const getCertificateStatusIcon = () => {
    switch (formData.certificateStatus) {
      case 'verified':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Farmer Business Profile */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <Tractor className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('businessProfile')}</h2>
        </div>

        <div className="space-y-4">
          {/* Farm Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('farmType')}
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              {t('selectMultipleFarmTypes')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {farmTypes.map((type) => {
                const isSelected = selectedFarmTypes.includes(type.value);
                return (
                  <button
                    key={type.value}
                    onClick={() => toggleFarmType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 relative ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium text-foreground text-center">
                      {t(type.label)}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Selected Categories Display */}
            {selectedFarmTypes.length > 0 && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">
                  ✓ {t('selectedCategories')}: {selectedFarmTypes.length}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedFarmTypes.map((typeValue) => {
                    const typeData = farmTypes.find(t => t.value === typeValue);
                    return (
                      <span
                        key={typeValue}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full text-xs font-medium text-primary"
                      >
                        <span>{typeData?.icon}</span>
                        <span>{t(typeData?.label || typeValue)}</span>
                      </span>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t('filterByCategory')}
                </p>
              </div>
            )}
          </div>

          {/* REGON */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('regon')}
            </label>
            <input
              type="text"
              value={formData.regon}
              onChange={(e) => setFormData({ ...formData, regon: e.target.value })}
              placeholder="123456789"
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t('regon')} - 9 cyfr
            </p>
          </div>
        </div>
      </div>

      {/* Warehouse Location */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('warehouseLocation')}</h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('setOnMap')} - {t('warehouseLocation').toLowerCase()}
          </p>
          
          <DeliveryMap
            onLocationSelect={(lat, lng) => {
              setFormData({ ...formData, warehouseLat: lat, warehouseLng: lng });
            }}
            initialPosition={[formData.warehouseLat, formData.warehouseLng]}
          />
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground">Latitude</p>
              <p className="font-mono font-semibold text-foreground mt-1">
                {formData.warehouseLat.toFixed(6)}
              </p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground">Longitude</p>
              <p className="font-mono font-semibold text-foreground mt-1">
                {formData.warehouseLng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('certifications')}</h2>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
            <input
              type="file"
              id="certificate-upload"
              accept="image/*,.pdf"
              onChange={handleCertificateUpload}
              className="hidden"
            />
            <label
              htmlFor="certificate-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t('ekoBioCertificate')}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('uploadCertificate')} (JPG, PNG, PDF)
                </p>
              </div>
              {formData.certificateFile && (
                <div className="text-sm text-primary font-medium">
                  ✓ {formData.certificateFile.name}
                </div>
              )}
            </label>
          </div>

          {/* Certificate Status */}
          {formData.certificateFile && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${getCertificateStatusColor()}`}
            >
              {getCertificateStatusIcon()}
              <div className="flex-1">
                <p className="font-semibold">
                  {formData.certificateStatus === 'verified' && t('certificateVerified')}
                  {formData.certificateStatus === 'pending' && t('certificatePending')}
                  {formData.certificateStatus === 'rejected' && t('certificateRejected')}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  {formData.certificateStatus === 'verified' &&
                    'Twój certyfikat został zweryfikowany'}
                  {formData.certificateStatus === 'pending' &&
                    'Certyfikat oczekuje na weryfikację administratora'}
                  {formData.certificateStatus === 'rejected' &&
                    'Certyfikat został odrzucony. Skontaktuj się z administracją.'}
                </p>
              </div>
            </div>
          )}

          {/* Benefits */}
          {formData.certificateStatus === 'verified' && (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                ✓ Korzyści certyfikacji Eko/Bio
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Zielona odznaka na Twoich produktach</li>
                <li>• Wyższe ceny sprzedaży (średnio +20%)</li>
                <li>• Priorytet w wynikach wyszukiwania</li>
                <li>• Większe zaufanie restauracji</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

FarmerProfile.displayName = 'FarmerProfile';