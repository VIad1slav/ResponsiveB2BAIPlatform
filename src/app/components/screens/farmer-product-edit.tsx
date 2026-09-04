import React, { useState } from 'react';
import { ArrowLeft, Save, Package, TrendingUp, DollarSign, Archive, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { Switch } from '../ui/switch';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  supplier: string;
  stock: number;
  badge?: string;
}

interface FarmerProductEditProps {
  product: Product;
  onBack: () => void;
}

export const FarmerProductEdit: React.FC<FarmerProductEditProps> = ({ product, onBack }) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    price: product.price,
    stock: product.stock,
    isAvailable: product.stock > 0,
    minOrder: 5,
    maxOrder: 100,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving product:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t('backToCatalog')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {/* Product Image & Basic Info */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-8xl">{product.image}</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            {/* Sales Statistics */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t('salesHistory')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm text-muted-foreground">{t('thisMonth')}</span>
                  <span className="text-lg font-bold text-foreground">156 {product.unit}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm text-muted-foreground">{t('lastMonth')}</span>
                  <span className="text-lg font-bold text-foreground">142 {product.unit}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">{t('totalRevenue')}</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {(formData.price * 298).toFixed(2)} zł
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="space-y-6">
            {/* Availability Toggle */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    {formData.isAvailable ? (
                      <Eye className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    )}
                    {t('available')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.isAvailable ? 'Produkt widoczny w katalogu' : 'Produkt ukryty w katalogu'}
                  </p>
                </div>
                <Switch
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
            </div>

            {/* Price Edit */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {t('editPrice')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t('pricePerUnitLabel')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      step="0.10"
                      min="0"
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                    <span className="text-muted-foreground font-medium">zł / {product.unit}</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    💡 Średnia cena rynkowa: {(product.price * 0.95).toFixed(2)} - {(product.price * 1.05).toFixed(2)} zł
                  </p>
                </div>
              </div>
            </div>

            {/* Stock Management */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Archive className="w-5 h-5 text-primary" />
                {t('stockLevel')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t('currentStock')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                      min="0"
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                    <span className="text-muted-foreground font-medium">{product.unit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Min. zamówienie
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.minOrder}
                        onChange={(e) => setFormData({ ...formData, minOrder: parseInt(e.target.value) })}
                        min="1"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Max. zamówienie
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.maxOrder}
                        onChange={(e) => setFormData({ ...formData, maxOrder: parseInt(e.target.value) })}
                        min="1"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {formData.stock < 50 && (
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      ⚠️ Niski stan magazynowy. Rozważ uzupełnienie zapasów.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saved ? t('changesSaved') : t('saveChanges')}
            </button>

            {saved && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center font-semibold">
                  ✓ {t('changesSaved')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FarmerProductEdit.displayName = 'FarmerProductEdit';
