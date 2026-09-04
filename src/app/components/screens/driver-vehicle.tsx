import React, { useState } from 'react';
import { Truck, Package, Snowflake, Wind, CheckCircle, Edit, AlertTriangle, Upload, FileText, Clock } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

type VerificationStatus = 'awaiting' | 'verified' | 'rejected';

export const DriverVehicle: React.FC = () => {
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [verificationStatus] = useState<VerificationStatus>('awaiting');
  
  // Vehicle data
  const [vehicleData, setVehicleData] = useState({
    licensePlate: 'WA 12345',
    vehicleType: 'refrigerated',
    cargoCapacity: '1500',
    brand: 'Mercedes',
    model: 'Sprinter',
    year: '2021',
    // New fields
    length: '4.3',
    width: '2.0',
    height: '2.3',
    hasSanitaryBooklet: true,
    driverLicense: 'C',
  });

  const [editedData, setEditedData] = useState(vehicleData);

  const handleSave = () => {
    setVehicleData(editedData);
    setIsEditing(false);
    toast.success(t('changesSaved'));
  };

  const handleCancel = () => {
    setEditedData(vehicleData);
    setIsEditing(false);
  };

  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case 'refrigerated':
        return <Snowflake className="w-6 h-6 text-blue-500" />;
      case 'covered':
        return <Wind className="w-6 h-6 text-green-500" />;
      default:
        return <Package className="w-6 h-6 text-purple-500" />;
    }
  };

  const getVehicleTypeName = (type: string) => {
    switch (type) {
      case 'refrigerated':
        return t('refrigerated');
      case 'covered':
        return t('covered');
      default:
        return t('standard');
    }
  };

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {t('verified')}
            </span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              {t('rejected')}
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              {t('awaitingVerification')}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('myVehicle')}</h1>
          <p className="text-muted-foreground mt-1">{t('vehicleSettings')}</p>
        </div>
        <div className="flex items-center gap-3">
          {getVerificationBadge()}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              {t('edit')}
            </Button>
          )}
        </div>
      </div>

      {/* Verification Alert */}
      {verificationStatus === 'awaiting' && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">
                {t('verificationRequired')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('acceptOrdersBlocked')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Card */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-2">{t('licensePlate')}</p>
            <p className="text-4xl font-bold tracking-wider">{vehicleData.licensePlate}</p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Truck className="w-10 h-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">{t('vehicleType')}</p>
            <p className="text-lg font-semibold">{getVehicleTypeName(vehicleData.vehicleType)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">{t('cargoCapacity')}</p>
            <p className="text-lg font-semibold">{vehicleData.cargoCapacity} kg</p>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">{t('vehicleInfo')}</h2>

        {isEditing ? (
          /* Edit Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">{t('licensePlate')}</Label>
                <Input
                  id="licensePlate"
                  value={editedData.licensePlate}
                  onChange={(e) => setEditedData({ ...editedData, licensePlate: e.target.value })}
                  placeholder="WA 12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driverLicense">{t('driverLicense')}</Label>
                <Select
                  value={editedData.driverLicense}
                  onValueChange={(value) => setEditedData({ ...editedData, driverLicense: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B">{t('driverLicenseB')}</SelectItem>
                    <SelectItem value="C">{t('driverLicenseC')}</SelectItem>
                    <SelectItem value="CE">{t('driverLicenseCE')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">{t('vehicleType')}</Label>
                <Select
                  value={editedData.vehicleType}
                  onValueChange={(value) => setEditedData({ ...editedData, vehicleType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refrigerated">{t('refrigerated')}</SelectItem>
                    <SelectItem value="covered">{t('covered')}</SelectItem>
                    <SelectItem value="standard">{t('standard')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">{t('cargoCapacity')} (kg)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={editedData.cargoCapacity}
                  onChange={(e) => setEditedData({ ...editedData, cargoCapacity: e.target.value })}
                  placeholder="1500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">{t('companyName')}</Label>
                <Input
                  id="brand"
                  value={editedData.brand}
                  onChange={(e) => setEditedData({ ...editedData, brand: e.target.value })}
                  placeholder="Mercedes"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={editedData.model}
                  onChange={(e) => setEditedData({ ...editedData, model: e.target.value })}
                  placeholder="Sprinter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">{t('thisYear')}</Label>
                <Input
                  id="year"
                  value={editedData.year}
                  onChange={(e) => setEditedData({ ...editedData, year: e.target.value })}
                  placeholder="2021"
                />
              </div>
            </div>

            {/* Cargo Dimensions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('cargoDimensions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">{t('length')} (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={editedData.length}
                    onChange={(e) => setEditedData({ ...editedData, length: e.target.value })}
                    placeholder="4.3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">{t('width')} (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={editedData.width}
                    onChange={(e) => setEditedData({ ...editedData, width: e.target.value })}
                    placeholder="2.0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">{t('height')} (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={editedData.height}
                    onChange={(e) => setEditedData({ ...editedData, height: e.target.value })}
                    placeholder="2.3"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('saveChanges')}
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                {t('cancel')}
              </Button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('licensePlate')}</p>
                <p className="text-lg font-semibold text-foreground">{vehicleData.licensePlate}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('driverLicense')}</p>
                <p className="text-lg font-semibold text-foreground">
                  {t(`driverLicense${vehicleData.driverLicense}` as any)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('vehicleType')}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    {getVehicleTypeIcon(vehicleData.vehicleType)}
                  </div>
                  <p className="text-lg font-semibold text-foreground">{getVehicleTypeName(vehicleData.vehicleType)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('companyName')}</p>
                <p className="text-lg font-semibold text-foreground">{vehicleData.brand}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Model</p>
                <p className="text-lg font-semibold text-foreground">{vehicleData.model}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('thisYear')}</p>
                <p className="text-lg font-semibold text-foreground">{vehicleData.year}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('cargoCapacity')}</p>
                <p className="text-lg font-semibold text-foreground">{vehicleData.cargoCapacity} kg</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('cargoDimensions')}</p>
                <p className="text-lg font-semibold text-foreground">
                  {vehicleData.length} × {vehicleData.width} × {vehicleData.height} m
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('verificationStatus')}</p>
                <div className="mt-1">{getVerificationBadge()}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('uploadDocuments')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vehicle Photos */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t('vehiclePhotos')}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                PNG, JPG до 10MB
              </p>
              <Button variant="outline" size="sm">
                {t('uploadDocuments')}
              </Button>
            </div>
          </div>

          {/* Sanitary Booklet */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t('sanitaryBooklet')}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t('sanitaryBookletRequired')}
              </p>
              <Button variant="outline" size="sm">
                {t('uploadDocuments')}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                {t('verificationRequired')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('acceptOrdersBlocked')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Features */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">{t('productSpecs')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-blue-500" />
              </div>
              <p className="font-semibold text-foreground">{t('refrigerated')}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {vehicleData.vehicleType === 'refrigerated' ? 'Dostępne' : 'Niedostępne'}
            </p>
          </div>

          <div className="bg-accent/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-500" />
              </div>
              <p className="font-semibold text-foreground">{t('cargoCapacity')}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Max {vehicleData.cargoCapacity} kg
            </p>
          </div>

          <div className="bg-accent/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                vehicleData.hasSanitaryBooklet ? 'bg-green-500/10' : 'bg-gray-500/10'
              }`}>
                <FileText className={`w-5 h-5 ${
                  vehicleData.hasSanitaryBooklet ? 'text-green-500' : 'text-gray-500'
                }`} />
              </div>
              <p className="font-semibold text-foreground">{t('sanitaryBooklet')}</p>
            </div>
            <p className={`text-xs font-semibold ${
              vehicleData.hasSanitaryBooklet ? 'text-green-500' : 'text-gray-500'
            }`}>
              {vehicleData.hasSanitaryBooklet ? 'Dostępna' : 'Niedostępna'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

DriverVehicle.displayName = 'DriverVehicle';
