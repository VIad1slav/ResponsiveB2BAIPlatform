import React, { useState, useMemo } from 'react';
import { Package, Plus, Edit2, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { Switch } from '../ui/switch';

interface WarehouseProduct {
  id: number;
  nameKey: string; // Translation key instead of translated name
  categoryKey: string; // Translation key
  price: number;
  unitKey: string; // Translation key
  stock: number;
  image: string;
  available: boolean;
}

export const Warehouse: React.FC<{ onAddProduct: () => void; onProductClick: (product: any) => void }> = ({ onAddProduct, onProductClick }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  // Use 'ALL' constant for default selection to match the button highlight
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Sorting state
  type SortField = 'name' | 'category' | 'price' | 'stock' | 'available';
  type SortDirection = 'asc' | 'desc' | null;
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Mock warehouse data - farmer's products (store keys, not translations)
  const [products, setProducts] = useState<WarehouseProduct[]>([
    // Vegetables
    {
      id: 1,
      nameKey: 'tomatoesRaspberry',
      categoryKey: 'vegetables',
      price: 12.50,
      unitKey: 'kg',
      stock: 450,
      image: '🍅',
      available: true,
    },
    {
      id: 2,
      nameKey: 'lettuceIceberg',
      categoryKey: 'vegetables',
      price: 8.00,
      unitKey: 'pcs',
      stock: 320,
      image: '🥬',
      available: true,
    },
    {
      id: 3,
      nameKey: 'carrots',
      categoryKey: 'vegetables',
      price: 6.50,
      unitKey: 'kg',
      stock: 580,
      image: '🥕',
      available: true,
    },
    {
      id: 4,
      nameKey: 'cucumbersGreenhouse',
      categoryKey: 'vegetables',
      price: 9.00,
      unitKey: 'kg',
      stock: 0,
      image: '🥒',
      available: false,
    },
    {
      id: 5,
      nameKey: 'potatoes',
      categoryKey: 'vegetables',
      price: 4.50,
      unitKey: 'kg',
      stock: 1200,
      image: '🥔',
      available: true,
    },
    {
      id: 6,
      nameKey: 'onion',
      categoryKey: 'vegetables',
      price: 5.00,
      unitKey: 'kg',
      stock: 780,
      image: '🧅',
      available: true,
    },
    {
      id: 7,
      nameKey: 'cabbage',
      categoryKey: 'vegetables',
      price: 5.50,
      unitKey: 'kg',
      stock: 420,
      image: '🥬',
      available: true,
    },
    {
      id: 8,
      nameKey: 'eggplant',
      categoryKey: 'vegetables',
      price: 11.00,
      unitKey: 'kg',
      stock: 245,
      image: '🍆',
      available: true,
    },
    {
      id: 9,
      nameKey: 'bellPepper',
      categoryKey: 'vegetables',
      price: 13.50,
      unitKey: 'kg',
      stock: 380,
      image: '🫑',
      available: true,
    },
    {
      id: 10,
      nameKey: 'zucchini',
      categoryKey: 'vegetables',
      price: 8.50,
      unitKey: 'kg',
      stock: 290,
      image: '🥒',
      available: true,
    },
    {
      id: 11,
      nameKey: 'pumpkin',
      categoryKey: 'vegetables',
      price: 6.00,
      unitKey: 'kg',
      stock: 650,
      image: '🎃',
      available: true,
    },
    {
      id: 12,
      nameKey: 'beets',
      categoryKey: 'vegetables',
      price: 5.50,
      unitKey: 'kg',
      stock: 480,
      image: '🥕',
      available: true,
    },
    {
      id: 13,
      nameKey: 'radish',
      categoryKey: 'vegetables',
      price: 7.00,
      unitKey: 'bunch',
      stock: 150,
      image: '🥕',
      available: true,
    },
    {
      id: 14,
      nameKey: 'broccoli',
      categoryKey: 'vegetables',
      price: 10.50,
      unitKey: 'kg',
      stock: 175,
      image: '🥦',
      available: true,
    },
    {
      id: 15,
      nameKey: 'cauliflower',
      categoryKey: 'vegetables',
      price: 9.50,
      unitKey: 'pcs',
      stock: 160,
      image: '🥦',
      available: true,
    },
    {
      id: 16,
      nameKey: 'garlic',
      categoryKey: 'vegetables',
      price: 18.00,
      unitKey: 'kg',
      stock: 95,
      image: '🧄',
      available: true,
    },
    
    // Fruits
    {
      id: 17,
      nameKey: 'applesGala',
      categoryKey: 'fruits',
      price: 7.50,
      unitKey: 'kg',
      stock: 890,
      image: '🍎',
      available: true,
    },
    {
      id: 18,
      nameKey: 'strawberries',
      categoryKey: 'fruits',
      price: 18.00,
      unitKey: 'kg',
      stock: 120,
      image: '🍓',
      available: true,
    },
    {
      id: 19,
      nameKey: 'pears',
      categoryKey: 'fruits',
      price: 8.50,
      unitKey: 'kg',
      stock: 520,
      image: '🍐',
      available: true,
    },
    {
      id: 20,
      nameKey: 'plums',
      categoryKey: 'fruits',
      price: 9.00,
      unitKey: 'kg',
      stock: 340,
      image: '🍑',
      available: true,
    },
    {
      id: 21,
      nameKey: 'blueberries',
      categoryKey: 'fruits',
      price: 22.00,
      unitKey: 'kg',
      stock: 80,
      image: '🫐',
      available: true,
    },
    {
      id: 22,
      nameKey: 'raspberries',
      categoryKey: 'fruits',
      price: 20.00,
      unitKey: 'kg',
      stock: 65,
      image: '🍒',
      available: true,
    },
    {
      id: 23,
      nameKey: 'cherries',
      categoryKey: 'fruits',
      price: 16.50,
      unitKey: 'kg',
      stock: 185,
      image: '🍒',
      available: true,
    },
    
    // Herbs
    {
      id: 24,
      nameKey: 'parsley',
      categoryKey: 'herbs',
      price: 4.50,
      unitKey: 'bunch',
      stock: 240,
      image: '🌿',
      available: true,
    },
    {
      id: 25,
      nameKey: 'dill',
      categoryKey: 'herbs',
      price: 4.00,
      unitKey: 'bunch',
      stock: 220,
      image: '🌿',
      available: true,
    },
    {
      id: 26,
      nameKey: 'basil',
      categoryKey: 'herbs',
      price: 6.00,
      unitKey: 'bunch',
      stock: 180,
      image: '🌿',
      available: true,
    },
    {
      id: 27,
      nameKey: 'arugula',
      categoryKey: 'herbs',
      price: 8.50,
      unitKey: 'kg',
      stock: 140,
      image: '🥬',
      available: true,
    },
    {
      id: 28,
      nameKey: 'spinach',
      categoryKey: 'herbs',
      price: 7.50,
      unitKey: 'kg',
      stock: 210,
      image: '🥬',
      available: true,
    },
    
    // Mushrooms
    {
      id: 29,
      nameKey: 'mushrooms',
      categoryKey: 'mushroomsCategory',
      price: 15.00,
      unitKey: 'kg',
      stock: 125,
      image: '🍄',
      available: true,
    },
    {
      id: 30,
      nameKey: 'oysterMushrooms',
      categoryKey: 'mushroomsCategory',
      price: 16.50,
      unitKey: 'kg',
      stock: 95,
      image: '🍄',
      available: true,
    },
  ]);

  // Translate products dynamically when language changes
  const translatedProducts = useMemo(() => {
    return products.map(p => ({
      ...p,
      name: t(p.nameKey),
      category: t(p.categoryKey),
      unit: t(p.unitKey),
      // Keep unitKey for logic that needs to check the unit type
      originalUnitKey: p.unitKey,
    }));
  }, [products, t]);

  const categories = [t('all'), t('vegetables'), t('fruits'), t('herbs'), t('mushroomsCategory')];

  const handleToggleAvailability = (productId: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, available: !p.available } : p
      )
    );
  };

  const handleProductEdit = (product: WarehouseProduct) => {
    onProductClick(product);
  };

  const filteredProducts = translatedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    // Handle string values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    // Handle number values
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // Handle boolean values
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      const aNum = aValue ? 1 : 0;
      const bNum = bValue ? 1 : 0;
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
    }
    
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('warehouse')}</h1>
          <p className="text-muted-foreground mt-1">{t('warehouseSubtitle')}</p>
        </div>
        <button
          onClick={onAddProduct}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">{t('addNewProduct')}</span>
          <span className="sm:hidden">{t('add')}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => {
            // Check if this is the "All" category button
            const isAllCategory = category === t('all');
            // Button is active if: it's "All" and selectedCategory is 'ALL', or it matches the selected category
            const isActive = (isAllCategory && selectedCategory === 'ALL') || selectedCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(isAllCategory ? 'ALL' : category)}
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:bg-accent'
                }`}
              >
                {isAllCategory ? t('allCategories') : category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl border border-emerald-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('totalProducts')}</p>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('availableProducts')}</p>
              <p className="text-2xl font-bold text-foreground">
                {products.filter(p => p.available).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl border border-orange-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('lowStock')}</p>
              <p className="text-2xl font-bold text-foreground">
                {products.filter(p => {
                  // Different thresholds for different units
                  const threshold = p.unitKey === 'bunch' ? 100 : p.unitKey === 'pcs' ? 150 : 200;
                  return p.stock < threshold && p.stock > 0;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    {t('product')}
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    {t('category')}
                    {getSortIcon('category')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    {t('price')}
                    {getSortIcon('price')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center gap-2">
                    {t('stock')}
                    {getSortIcon('stock')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSort('available')}
                >
                  <div className="flex items-center gap-2">
                    {t('availability')}
                    {getSortIcon('available')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-accent transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {product.image}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{product.price.toFixed(2)} zł</p>
                    <p className="text-xs text-muted-foreground">{t('pricePerUnit')} {product.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        product.stock === 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : (() => {
                              const threshold = product.originalUnitKey === 'bunch' ? 100 : product.originalUnitKey === 'pcs' ? 150 : 200;
                              return product.stock < threshold ? 'text-orange-600 dark:text-orange-400' : 'text-foreground';
                            })()
                      }`}>
                        {product.stock} {product.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Switch
                      checked={product.available}
                      onCheckedChange={() => handleToggleAvailability(product.id)}
                      disabled={product.stock === 0}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleProductEdit(product)}
                        className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
                        title={t('edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-accent rounded-lg transition-colors text-red-600 dark:text-red-400"
                        title={t('delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">{t('noProductsFound')}</p>
          </div>
        )}
      </div>

      {/* Products Grid - Mobile & Tablet */}
      <div className="lg:hidden space-y-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <div className="flex items-start gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{product.category}</p>
                  </div>
                  <Switch
                    checked={product.available}
                    onCheckedChange={() => handleToggleAvailability(product.id)}
                    disabled={product.stock === 0}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-lg font-bold text-foreground">{product.price.toFixed(2)} zł</p>
                    <p className="text-xs text-muted-foreground">{t('pricePerUnit')} {product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      product.stock === 0 
                        ? 'text-red-600 dark:text-red-400' 
                        : (() => {
                            const threshold = product.originalUnitKey === 'bunch' ? 100 : product.originalUnitKey === 'pcs' ? 150 : 200;
                            return product.stock < threshold ? 'text-orange-600 dark:text-orange-400' : 'text-foreground';
                          })()
                    }`}>
                      {product.stock} {product.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">{t('stock')}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleProductEdit(product)}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {t('edit')}
                  </button>
                  <button
                    className="px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-all flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State - Mobile */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">{t('noProductsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

Warehouse.displayName = 'Warehouse';