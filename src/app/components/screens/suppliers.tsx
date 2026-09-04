import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, CheckCircle, ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { QuantityController } from '../product/quantity-controller';

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  verified: boolean;
  location: string;
  phone: string;
  email: string;
  products: number;
  avatar: string;
}

interface SupplierProduct {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  category: string;
}

export const Suppliers: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierCart, setSupplierCart] = useState<{ productId: string; quantity: number }[]>([]);

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'AgroSupply Sp. z o.o.',
      category: 'Nasiona, Nawozy',
      rating: 4.8,
      verified: true,
      location: 'Warszawa, Polska',
      phone: '+48 22 123 4567',
      email: 'kontakt@agrosupply.pl',
      products: 245,
      avatar: '🌾',
    },
    {
      id: '2',
      name: 'Nasiona Polska',
      category: 'Nasiona',
      rating: 4.9,
      verified: true,
      location: 'Poznań, Polska',
      phone: '+48 61 234 5678',
      email: 'biuro@nasionapolska.pl',
      products: 156,
      avatar: '🌱',
    },
    {
      id: '3',
      name: 'Chemia Agro',
      category: 'Środki ochrony roślin',
      rating: 4.7,
      verified: true,
      location: 'Kraków, Polska',
      phone: '+48 12 345 6789',
      email: 'info@chemiaagro.pl',
      products: 189,
      avatar: '🧪',
    },
    {
      id: '4',
      name: 'EkoNawozy Sp. j.',
      category: 'Nawozy ekologiczne',
      rating: 4.6,
      verified: true,
      location: 'Wrocław, Polska',
      phone: '+48 71 456 7890',
      email: 'eco@ekonawozy.pl',
      products: 98,
      avatar: '♻️',
    },
    {
      id: '5',
      name: 'Technika Rolnicza SA',
      category: 'Sprzęt i narzędzia',
      rating: 4.5,
      verified: false,
      location: 'Gdańsk, Polska',
      phone: '+48 58 567 8901',
      email: 'sprzedaz@technikarolnicza.pl',
      products: 312,
      avatar: '🚜',
    },
    {
      id: '6',
      name: 'BioOchrona',
      category: 'Biologiczne środki ochrony',
      rating: 4.8,
      verified: true,
      location: 'Lublin, Polska',
      phone: '+48 81 678 9012',
      email: 'kontakt@bioochrona.pl',
      products: 124,
      avatar: '🐞',
    },
  ];

  // Mock products for each supplier
  const getSupplierProducts = (supplierId: string): SupplierProduct[] => {
    const productsBySupplier: Record<string, SupplierProduct[]> = {
      '1': [
        { id: 'p1-1', name: 'Nasiona pomidora malinowego', price: 45.00, unit: 'opakowanie', stock: 150, image: '🍅', category: 'Nasiona' },
        { id: 'p1-2', name: 'Nasiona ogórka szklarniowego', price: 38.50, unit: 'opakowanie', stock: 200, image: '🥒', category: 'Nasiona' },
        { id: 'p1-3', name: 'Nawóz uniwersalny NPK', price: 120.00, unit: '25 kg', stock: 80, image: '🌾', category: 'Nawozy' },
        { id: 'p1-4', name: 'Nawóz azotowy', price: 95.00, unit: '20 kg', stock: 120, image: '🌾', category: 'Nawozy' },
        { id: 'p1-5', name: 'Nasiona sałaty lodowej', price: 28.00, unit: 'opakowanie', stock: 180, image: '🥬', category: 'Nasiona' },
      ],
      '2': [
        { id: 'p2-1', name: 'Nasiona papryki kalifornijskiej', price: 52.00, unit: 'opakowanie', stock: 90, image: '🫑', category: 'Nasiona' },
        { id: 'p2-2', name: 'Nasiona marchwi', price: 32.00, unit: 'opakowanie', stock: 140, image: '🥕', category: 'Nasiona' },
        { id: 'p2-3', name: 'Nasiona pietruszki', price: 25.00, unit: 'opakowanie', stock: 160, image: '🌿', category: 'Nasiona' },
        { id: 'p2-4', name: 'Nasiona rzodkiewki', price: 18.00, unit: 'opakowanie', stock: 200, image: '🌱', category: 'Nasiona' },
      ],
      '3': [
        { id: 'p3-1', name: 'Fungicyd do pomidorów', price: 85.00, unit: '1L', stock: 45, image: '🧪', category: 'Ochrona' },
        { id: 'p3-2', name: 'Insektycyd uniwersalny', price: 95.00, unit: '1L', stock: 60, image: '🧪', category: 'Ochrona' },
        { id: 'p3-3', name: 'Herbicyd selektywny', price: 110.00, unit: '1L', stock: 38, image: '🧪', category: 'Ochrona' },
      ],
      '4': [
        { id: 'p4-1', name: 'Kompost ekologiczny', price: 65.00, unit: '50L', stock: 100, image: '♻️', category: 'Nawozy eko' },
        { id: 'p4-2', name: 'Nawóz organiczny', price: 75.00, unit: '25 kg', stock: 85, image: '♻️', category: 'Nawozy eko' },
        { id: 'p4-3', name: 'Humus dżdżownic', price: 55.00, unit: '20L', stock: 70, image: '♻️', category: 'Nawozy eko' },
      ],
      '5': [
        { id: 'p5-1', name: 'Motyka ręczna', price: 45.00, unit: 'szt', stock: 50, image: '🔧', category: 'Narzędzia' },
        { id: 'p5-2', name: 'Grabie ogrodowe', price: 38.00, unit: 'szt', stock: 60, image: '🔧', category: 'Narzędzia' },
        { id: 'p5-3', name: 'Sekator profesjonalny', price: 85.00, unit: 'szt', stock: 40, image: '✂️', category: 'Narzędzia' },
        { id: 'p5-4', name: 'Konewka 10L', price: 32.00, unit: 'szt', stock: 75, image: '🚿', category: 'Narzędzia' },
      ],
      '6': [
        { id: 'p6-1', name: 'Biedronki siedmiopunktowe', price: 120.00, unit: 'opakowanie', stock: 25, image: '🐞', category: 'Bio ochrona' },
        { id: 'p6-2', name: 'Pasożyty mszycy', price: 95.00, unit: 'opakowanie', stock: 35, image: '🦟', category: 'Bio ochrona' },
        { id: 'p6-3', name: 'Drożdże antagonistyczne', price: 110.00, unit: '500g', stock: 45, image: '🧫', category: 'Bio ochrona' },
      ],
    };

    return productsBySupplier[supplierId] || [];
  };

  const handleViewCatalog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleBackToSuppliers = () => {
    setSelectedSupplier(null);
  };

  // Local cart functions for supplier products
  const getCartQuantity = (productId: string) => {
    const item = supplierCart.find(c => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (productId: string) => {
    setSupplierCart(prev => {
      const existing = prev.find(c => c.productId === productId);
      if (existing) {
        return prev.map(c =>
          c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSupplierCart(prev => prev.filter(c => c.productId !== productId));
    } else {
      setSupplierCart(prev =>
        prev.map(c => (c.productId === productId ? { ...c, quantity } : c))
      );
    }
  };

  // If a supplier is selected, show their catalog
  if (selectedSupplier) {
    const supplierProducts = getSupplierProducts(selectedSupplier.id);

    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header with Back Button */}
        <div>
          <button
            onClick={handleBackToSuppliers}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToSuppliers') || 'Powrót do dostawców'}
          </button>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {selectedSupplier.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {selectedSupplier.name}
                </h1>
                {selectedSupplier.verified && (
                  <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>{t('verifiedSupplier')}</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">{selectedSupplier.category}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{selectedSupplier.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{selectedSupplier.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplierProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all p-4"
            >
              {/* Product Image */}
              <div className="w-full h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-5xl">{product.image}</span>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.category}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-lg font-bold text-primary">{product.price.toFixed(2)} zł</p>
                    <p className="text-xs text-muted-foreground">{t('pricePerUnit') || 'za'} {product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t('inStock') || 'Dostępne'}</p>
                    <p className="text-sm font-semibold text-foreground">{product.stock} {product.unit}</p>
                  </div>
                </div>

                {/* Add to Cart / Quantity Controller */}
                <div className="flex items-center justify-center mt-3">
                  {getCartQuantity(product.id) > 0 ? (
                    /* Quantity Controller */
                    <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                      <button
                        onClick={() => handleUpdateCartQuantity(product.id, getCartQuantity(product.id) - 1)}
                        className="w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold text-foreground">
                        {getCartQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => handleUpdateCartQuantity(product.id, getCartQuantity(product.id) + 1)}
                        className="w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center font-semibold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    /* Add Button */
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t('addToCart')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('suppliersTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('suppliersSubtitle')}</p>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {supplier.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{supplier.name}</h3>
                      {supplier.verified && (
                        <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          <span>{t('verifiedSupplier')}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{supplier.category}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{supplier.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">• {supplier.products} produktów</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{supplier.email}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all text-sm font-medium">
                    {t('contactSupplier')}
                  </button>
                  <button
                    className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                    onClick={() => handleViewCatalog(supplier)}
                  >
                    {t('catalog')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};