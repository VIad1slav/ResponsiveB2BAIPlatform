import React, { useState } from 'react';
import { ArrowLeft, Save, Package, DollarSign, Archive, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

interface FarmerProductAddProps {
  onBack: () => void;
}

export const FarmerProductAdd: React.FC<FarmerProductAddProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Warzywa i owoce',
    price: '',
    unit: 'kg',
    stock: '',
    minOrder: '5',
    maxOrder: '100',
    emoji: '🥕',
    isAvailable: true,
  });

  const [saved, setSaved] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const maxImages = 6;

  // Product categories
  const categories = [
    { id: 'vegetables', label: t('vegetablesFruits') },
    { id: 'meat', label: t('meatPoultry') },
    { id: 'dairy', label: t('dairy') },
    { id: 'bakery', label: t('bakery') },
    { id: 'beverages', label: t('beverages') },
  ];

  // Units
  const units = ['kg', 'szt', 'l', 'opak'];

  // Emoji options for products
  const emojiOptions = [
    '🥕', '🥬', '🥒', '🍅', '🥔', '🧅', '🧄', '🌽',
    '🥦', '🫑', '🍄', '🥗', '🍎', '🍊', '🍋', '🍌',
    '🍇', '🍓', '🍑', '🍐', '🥩', '🍗', '🥓', '🍖',
    '🥛', '🧀', '🥚', '🍞', '🥖', '🥐', '🥯', '🍯',
  ];

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert(language === 'PL' ? 'Wypełnij wszystkie wymagane pola' : 
            language === 'RU' ? 'Заполните все обязательные поля' : 
            language === 'UA' ? 'Заповніть всі обов\'язкові поля' : 
            'Fill in all required fields');
      return;
    }

    console.log('Adding new product:', formData, 'Images:', uploadedImages);
    setSaved(true);
    
    // Simulate save and go back
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to array
    const filesArray = Array.from(files);
    
    // Check if adding these files would exceed the limit
    if (uploadedImages.length + filesArray.length > maxImages) {
      alert(language === 'PL' ? `Możesz dodać maksymalnie ${maxImages} zdjęć` :
            language === 'RU' ? `Вы можете добавить максимум ${maxImages} фото` :
            language === 'UA' ? `Ви можете додати максимум ${maxImages} фото` :
            `You can add maximum ${maxImages} photos`);
      return;
    }

    filesArray.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(language === 'PL' ? 'Proszę wybrać tylko pliki obrazów' :
              language === 'RU' ? 'Пожалуйста, выбирайте только файлы изображений' :
              language === 'UA' ? 'Будь ласка, вибирайте тільки файли зображень' :
              'Please select only image files');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'PL' ? 'Jeden z plików jest za duży. Maksymalny rozmiar to 5MB' :
              language === 'RU' ? 'Один из файлов слишком большой. Максимальный размер 5MB' :
              language === 'UA' ? 'Один з файлів занадто великий. Максимальний розмір 5MB' :
              'One of the files is too large. Maximum size is 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
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
            <span className="font-medium">
              {language === 'PL' ? 'Powrót' : 
               language === 'RU' ? 'Назад' : 
               language === 'UA' ? 'Назад' : 
               'Back'}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('addNewProduct')}</h1>
          <p className="text-muted-foreground">
            {language === 'PL' ? 'Dodaj nowy produkt do swojego katalogu' :
             language === 'RU' ? 'Добавьте новый продукт в свой каталог' :
             language === 'UA' ? 'Додайте новий продукт до свого каталогу' :
             'Add a new product to your catalog'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Product Icon Selection */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              {language === 'PL' ? 'Ikona produktu' :
               language === 'RU' ? 'Иконка продукта' :
               language === 'UA' ? 'Іконка продукту' :
               'Product Icon'}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                <span className="text-6xl">{formData.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'PL' ? 'Wybierz emoji dla produktu' :
                   language === 'RU' ? 'Выберите эмодзи для продукта' :
                   language === 'UA' ? 'Виберіть емодзі для продукту' :
                   'Choose an emoji for your product'}
                </p>
                <div className="grid grid-cols-8 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({ ...formData, emoji })}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl transition-all ${
                        formData.emoji === emoji
                          ? 'bg-primary/20 ring-2 ring-primary'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Photo Upload */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              {language === 'PL' ? 'Zdjęcia produktu' :
               language === 'RU' ? 'Фото продукта' :
               language === 'UA' ? 'Фото продукту' :
               'Product Photos'}
              <span className="text-sm text-muted-foreground font-normal ml-auto">
                {uploadedImages.length}/{maxImages}
              </span>
            </h3>
            
            <div>
              {/* Upload zone or first image */}
              {uploadedImages.length === 0 ? (
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center py-6">
                    <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      {language === 'PL' ? 'Kliknij, aby dodać zdjęcia' :
                       language === 'RU' ? 'Нажмите, чтобы добавить фото' :
                       language === 'UA' ? 'Натисніть, щоб додати фото' :
                       'Click to upload photos'}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      PNG, JPG, WEBP {language === 'PL' ? 'do' : language === 'RU' ? 'до' : language === 'UA' ? 'до' : 'up to'} 5MB
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'PL' ? 'Możesz dodać do' : language === 'RU' ? 'Можно добавить до' : language === 'UA' ? 'Можна додати до' : 'You can add up to'} {maxImages} {language === 'PL' ? 'zdjęć' : language === 'RU' ? 'фото' : language === 'UA' ? 'фото' : 'photos'}
                    </p>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div>
                  {/* Main large image */}
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-secondary mb-3">
                    <img
                      src={uploadedImages[0]}
                      alt="Main product preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground rounded-lg text-xs font-semibold">
                      {language === 'PL' ? 'Główne' : language === 'RU' ? 'Главное' : language === 'UA' ? 'Головне' : 'Main'}
                    </div>
                    <button
                      onClick={() => handleRemoveImage(0)}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Thumbnail grid for additional images */}
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedImages.slice(1).map((image, index) => (
                      <div key={index + 1} className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
                        <img
                          src={image}
                          alt={`Product preview ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index + 1)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add more button if under limit */}
                    {uploadedImages.length < maxImages && (
                      <label
                        htmlFor="photo-add-more"
                        className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-1" />
                        <span className="text-xs text-muted-foreground group-hover:text-primary">
                          {language === 'PL' ? 'Dodaj' : language === 'RU' ? 'Добавить' : language === 'UA' ? 'Додати' : 'Add'}
                        </span>
                        <input
                          id="photo-add-more"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-3">
                💡 {language === 'PL' ? 'Pierwsze zdjęcie będzie głównym zdjęciem produktu. Dodaj różne kąty i detale produktu.' :
                    language === 'RU' ? 'Первое фото будет главным фото продукта. Добавьте разные углы и детали продукта.' :
                    language === 'UA' ? 'Перше фото буде головним фото продукту. Додайте різні кути та деталі продукту.' :
                    'The first photo will be the main product image. Add different angles and product details.'}
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {language === 'PL' ? 'Podstawowe informacje' :
               language === 'RU' ? 'Основная информация' :
               language === 'UA' ? 'Основна інформація' :
               'Basic Information'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('productName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={
                    language === 'PL' ? 'np. Świeża marchewka organiczna' :
                    language === 'RU' ? 'напр. Свежая органическая морковь' :
                    language === 'UA' ? 'напр. Свіжа органічна морква' :
                    'e.g. Fresh Organic Carrots'
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {language === 'PL' ? 'Kategoria' :
                   language === 'RU' ? 'Категория' :
                   language === 'UA' ? 'Категорія' :
                   'Category'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {language === 'PL' ? 'Jednostka miary' :
                     language === 'RU' ? 'Единица измерения' :
                     language === 'UA' ? 'Одиниця виміру' :
                     'Unit of Measure'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t('currentStock')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    min="0"
                    placeholder="100"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              {language === 'PL' ? 'Ceny i limity zamówień' :
               language === 'RU' ? 'Цены и лимиты заказов' :
               language === 'UA' ? 'Ціни та ліміти замовлень' :
               'Pricing & Order Limits'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t('pricePerUnitLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    step="0.10"
                    min="0"
                    placeholder="12.50"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                  <span className="text-muted-foreground font-medium">zł / {formData.unit}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {language === 'PL' ? 'Minimalne zamówienie' :
                     language === 'RU' ? 'Минимальный заказ' :
                     language === 'UA' ? 'Мінімальне замовлення' :
                     'Minimum Order'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.minOrder}
                      onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                      min="1"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                    <span className="text-sm text-muted-foreground">{formData.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {language === 'PL' ? 'Maksymalne zamówienie' :
                     language === 'RU' ? 'Максимальный заказ' :
                     language === 'UA' ? 'Максимальне замовлення' :
                     'Maximum Order'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.maxOrder}
                      onChange={(e) => setFormData({ ...formData, maxOrder: e.target.value })}
                      min="1"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                    <span className="text-sm text-muted-foreground">{formData.unit}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  💡 {language === 'PL' ? 'Ustaw realistyczne limity zamówień, aby uniknąć nadmiernych lub zbyt małych zamówień.' :
                      language === 'RU' ? 'Установите реалистичные лимиты заказов, чтобы избежать слишком больших или маленьких заказов.' :
                      language === 'UA' ? 'Встановіть реалістичні ліміти замовлень, щоб уникнути надмірних або занадто малих замовлень.' :
                      'Set realistic order limits to avoid overly large or small orders.'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Archive className="w-5 h-5 text-primary" />
              {language === 'PL' ? 'Dodatkowe ustawienia' :
               language === 'RU' ? 'Дополнительные настройки' :
               language === 'UA' ? 'Додаткові налаштування' :
               'Additional Settings'}
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-secondary rounded-lg cursor-pointer">
                <div>
                  <p className="font-medium text-foreground">
                    {language === 'PL' ? 'Natychmiast dostępny w katalogu' :
                     language === 'RU' ? 'Сразу доступен в каталоге' :
                     language === 'UA' ? 'Одразу доступний у каталозі' :
                     'Immediately available in catalog'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'PL' ? 'Produkt będzie widoczny dla restauracji od razu' :
                     language === 'RU' ? 'Продукт будет виден для ресторанов сразу' :
                     language === 'UA' ? 'Продукт буде видимий для ресторанів одразу' :
                     'Product will be visible to restaurants immediately'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-4 bg-secondary text-foreground rounded-xl font-bold hover:bg-secondary/80 transition-all"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saved ? (
                language === 'PL' ? 'Zapisano!' :
                language === 'RU' ? 'Сохранено!' :
                language === 'UA' ? 'Збережено!' :
                'Saved!'
              ) : (
                language === 'PL' ? 'Dodaj produkt' :
                language === 'RU' ? 'Добавить продукт' :
                language === 'UA' ? 'Додати продукт' :
                'Add Product'
              )}
            </button>
          </div>

          {saved && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center font-semibold">
                ✓ {language === 'PL' ? 'Produkt dodany pomyślnie!' :
                    language === 'RU' ? 'Продукт успешно добавлен!' :
                    language === 'UA' ? 'Продукт успішно додано!' :
                    'Product added successfully!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FarmerProductAdd.displayName = 'FarmerProductAdd';