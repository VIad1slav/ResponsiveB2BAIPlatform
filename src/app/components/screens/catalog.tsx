import React, { useState } from 'react';
import { Search, Filter, Plus, Sparkles, MapPin, Zap, Edit2, ShoppingCart, X, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useRole } from '../../context/role-context';
import { useCart } from '../../context/cart-context';
import { FilterOverlay, FilterState } from '../catalog/filter-overlay';
import { QuantityController } from '../product/quantity-controller';
import { restaurantProducts } from '../../data/products';
import { motion } from 'motion/react';

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

interface CatalogProps {
  onProductClick?: (product: Product) => void;
}

interface CartItem {
  product: typeof restaurantProducts[0];
  quantity: number;
}

export const Catalog: React.FC<CatalogProps> = ({ onProductClick }) => {
  const { language, t } = useLanguage();
  const { role } = useRole();
  const { cart, addToCart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    specialFilters: [],
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleQuickAdd = (productId: string) => {
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    alert(t('orderSuccess') || 'Zamówienie złożone!');
  };

  const cartTotal = getCartTotal();

  // Filter products based on search and filters
  const filteredProducts = restaurantProducts.filter(product => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      product.namePL.toLowerCase().includes(searchLower) ||
      product.nameUA.toLowerCase().includes(searchLower) ||
      product.nameRU.toLowerCase().includes(searchLower) ||
      product.nameEN.toLowerCase().includes(searchLower) ||
      product.supplier.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Special filters
    if (filters.specialFilters.includes('ai-recommended') && !product.isAIRecommended) {
      return false;
    }
    if (filters.specialFilters.includes('local-farmers') && !product.isLocalFarmer) {
      return false;
    }
    if (filters.specialFilters.includes('fast-delivery') && !product.isFastDelivery) {
      return false;
    }

    return true;
  });

  const getProductName = (product: typeof restaurantProducts[0]) => {
    if (language === 'PL') return product.namePL;
    if (language === 'UA') return product.nameUA;
    if (language === 'RU') return product.nameRU;
    return product.nameEN;
  };

  const activeFilterCount = filters.categories.length + filters.specialFilters.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {language === 'PL' ? 'Katalog Produktów' : language === 'RU' ? 'Каталог Продуктов' : 'Product Catalog'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'PL' 
              ? 'Przeglądaj i zamawiaj produkty dla restauracji' 
              : language === 'RU' 
              ? 'Просматривайте и заказывайт�� продукты для ресторана' 
              : 'Browse and order restaurant essentials'}
          </p>
        </div>

        {/* Cart Button - Only for Restaurant */}
        {role === 'restaurant' && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:inline">
              {t('cart') || (language === 'PL' ? 'Koszyk' : language === 'RU' ? 'Корзина' : 'Cart')}
            </span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={
              language === 'PL' 
                ? 'Szukaj produktów...' 
                : language === 'RU' 
                ? 'Поиск продуктов...' 
                : 'Search products...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
          />
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="relative flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-foreground whitespace-nowrap"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">
            {language === 'PL' ? 'Filtry' : language === 'RU' ? 'Фильтры' : 'Filters'}
          </span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.specialFilters.map(filterId => {
            let label = '';
            let Icon = Sparkles;
            if (filterId === 'ai-recommended') {
              label = language === 'PL' ? 'AI Rekomendowane' : language === 'RU' ? 'AI Рекомендовано' : 'AI Recommended';
              Icon = Sparkles;
            } else if (filterId === 'local-farmers') {
              label = language === 'PL' ? 'Lokalni Rolnicy' : language === 'RU' ? 'Местные Фермеры' : 'Local Farmers';
              Icon = MapPin;
            } else if (filterId === 'fast-delivery') {
              label = language === 'PL' ? 'Szybka Dostawa' : language === 'RU' ? 'Быстрая Доставка' : 'Fast Delivery';
              Icon = Zap;
            }
            return (
              <div key={filterId} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {language === 'PL' 
          ? `Znaleziono ${filteredProducts.length} produktów` 
          : language === 'RU' 
          ? `Найдено ${filteredProducts.length} продуктов` 
          : `Found ${filteredProducts.length} products`}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          const isAdded = cart.find(item => item.product.id === product.id) !== undefined;
          
          // Convert product data to the Product interface format
          const productData: Product = {
            id: product.id,
            name: getProductName(product),
            category: product.category,
            price: product.price,
            unit: product.unit,
            image: product.image,
            supplier: product.supplier,
            stock: product.stock,
            badge: product.isAIRecommended ? 'trending' : product.stock < 50 ? 'low-stock' : undefined,
          };

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onProductClick?.(productData)}
            >
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <span className="text-6xl">{product.image}</span>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isAIRecommended && (
                    <div className="px-2 py-1 bg-purple-500/90 backdrop-blur-sm text-white rounded-md text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </div>
                  )}
                  {product.isLocalFarmer && (
                    <div className="px-2 py-1 bg-primary/90 backdrop-blur-sm text-white rounded-md text-xs font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {language === 'PL' ? 'PL' : language === 'RU' ? 'ПЛ' : 'PL'}
                    </div>
                  )}
                  {product.isFastDelivery && (
                    <div className="px-2 py-1 bg-orange-500/90 backdrop-blur-sm text-white rounded-md text-xs font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      2h
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-foreground line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
                    {getProductName(product)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {product.supplier}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className={product.stock < 50 ? 'text-orange-600 dark:text-orange-400' : ''}>
                    {product.stock} {product.unit} {language === 'PL' ? 'w magazynie' : language === 'RU' ? 'на складе' : 'in stock'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'PL' ? 'Cena za' : language === 'RU' ? 'Цена за' : 'Price per'} {product.unit}
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {product.price.toFixed(2)} zł
                    </p>
                  </div>
                  
                  {/* Different button for Farmer vs Restaurant */}
                  {role === 'farmer' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <QuantityController productId={product.id} size="md" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {language === 'PL' ? 'Nie znaleziono produktów' : language === 'RU' ? 'Продукты не найдены' : 'No products found'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'PL' 
              ? 'Spróbuj zmienić filtry lub wyszukiwanie' 
              : language === 'RU' 
              ? 'Попробуйте изменить фильтры или поиск' 
              : 'Try changing your filters or search'}
          </p>
        </div>
      )}

      {/* Filter Overlay */}
      <FilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Cart Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{t('cart')}</h2>
                  <p className="text-sm text-muted-foreground">
                    {cart.length} {language === 'PL' ? 'produktów' : language === 'RU' ? 'продуктов' : 'products'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('emptyCart')}</h3>
                  <p className="text-muted-foreground">{t('addProductsToCart')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const productName = 
                      language === 'PL' ? item.product.namePL :
                      language === 'UA' ? item.product.nameUA :
                      language === 'RU' ? item.product.nameRU :
                      item.product.nameEN;

                    return (
                      <div
                        key={item.product.id}
                        className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-3xl">{item.product.image}</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{productName}</h3>
                          <p className="text-sm text-muted-foreground truncate">{item.product.supplier}</p>
                          <p className="text-sm font-medium text-primary mt-1">
                            {item.product.price.toFixed(2)} zł / {item.product.unit}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent transition-colors flex items-center justify-center text-foreground font-semibold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent transition-colors flex items-center justify-center text-foreground font-semibold"
                          >
                            +
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right w-24">
                          <p className="text-lg font-bold text-foreground">
                            {(item.product.price * item.quantity).toFixed(2)} zł
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">{t('subtotal')}</span>
                  <span className="text-2xl font-bold text-primary">{cartTotal.toFixed(2)} zł</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-lg"
                >
                  {t('checkout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};