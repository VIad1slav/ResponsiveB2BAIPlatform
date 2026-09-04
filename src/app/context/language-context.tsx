import React, { createContext, useContext, useState } from 'react';

export type Language = 'PL' | 'UA' | 'RU' | 'EN';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  dashboard: { PL: 'Panel główny', UA: 'Панель управління', RU: 'Панель управления', EN: 'Dashboard' },
  catalog: { PL: 'Katalog', UA: 'Каталог', RU: 'Каталог', EN: 'Catalog' },
  orders: { PL: 'Zamówienia', UA: 'Замовлення', RU: 'Заказы', EN: 'Orders' },
  logistics: { PL: 'Logistyka', UA: 'Логістика', RU: 'Логистика', EN: 'Logistics' },
  suppliers: { PL: 'Dostawcy', UA: 'Постачальники', RU: 'Поставщики', EN: 'Suppliers' },
  analytics: { PL: 'Analityka', UA: 'Аналітика', RU: 'Аналитика', EN: 'Analytics' },
  aiHub: { PL: 'AI Hub', UA: 'AI Hub', RU: 'AI Hub', EN: 'AI Hub' },
  settings: { PL: 'Ustawienia', UA: 'Налаштування', RU: 'Настройки', EN: 'Settings' },
  
  // Farmer-Specific Navigation
  myProducts: { PL: 'Moje produkty', UA: 'Мої продукти', RU: 'Мои продукты', EN: 'My Inventory' },
  sales: { PL: 'Sprzedaż', UA: 'Продажі', RU: 'Продажи', EN: 'Sales' },
  pickups: { PL: 'Odbiory', UA: 'Вивезення', RU: 'Вывоз', EN: 'Pickups' },
  clients: { PL: 'Klienci', UA: 'Клієнти', RU: 'Клиенты', EN: 'Clients' },
  warehouse: { PL: 'Magazyn', UA: 'Склад', RU: 'Склад', EN: 'Warehouse' },
  warehouseSubtitle: { PL: 'Zarządzaj swoim asortymentem produktów', UA: 'Керуйте своїм асортиментом продуктів', RU: 'Управляйте своим ассортиментом продуктов', EN: 'Manage your product inventory' },
  totalProducts: { PL: 'Wszystkie produkty', UA: 'Всі продукти', RU: 'Все продукты', EN: 'Total Products' },
  availableProducts: { PL: 'Dostępne produkty', UA: 'Доступні продукти', RU: 'Доступные продукты', EN: 'Available Products' },
  category: { PL: 'Kategoria', UA: 'Категорія', RU: 'Категория', EN: 'Category' },
  price: { PL: 'Cena', UA: 'Ціна', RU: 'Цена', EN: 'Price' },
  currency: { PL: 'zł', UA: 'zł', RU: 'zł', EN: 'PLN' },
  stock: { PL: 'Stan magazynowy', UA: 'Запас', RU: 'Запас', EN: 'Stock' },
  availability: { PL: 'Dostępność', UA: 'Доступність', RU: 'Доступность', EN: 'Availability' },
  actions: { PL: 'Akcje', UA: 'Дії', RU: 'Действия', EN: 'Actions' },
  product: { PL: 'Produkt', UA: 'Продукт', RU: 'Продукт', EN: 'Product' },
  finance: { PL: 'Finanse', UA: 'Фінанси', RU: 'Финансы', EN: 'Finance' },
  
  // Logistics Driver Navigation
  routes: { PL: 'Trasy', UA: 'Маршрути', RU: 'Маршруты', EN: 'Routes' },
  deliveries: { PL: 'Dostawy', UA: 'Доставки', RU: 'Доставки', EN: 'Deliveries' },
  map: { PL: 'Mapa', UA: 'Карта', RU: 'Карта', EN: 'Map' },
  wallet: { PL: 'Portfel', UA: 'Гаманець', RU: 'Кошелек', EN: 'Wallet' },
  availableRoutes: { PL: 'Dostępne trasy', UA: 'Доступні маршрути', RU: 'Доступные маршруты', EN: 'Available Routes' },
  myVehicle: { PL: 'Mój pojazd', UA: 'Мій транспорт', RU: 'Мой транспорт', EN: 'My Vehicle' },
  deliveryHistory: { PL: 'Historia', UA: 'Історія', RU: 'История', EN: 'History' },
  currentBalance: { PL: 'Aktualny balans', UA: 'Поточний баланс', RU: 'Текущий баланс', EN: 'Current Balance' },
  withdrawFunds: { PL: 'Wypłać środki', UA: 'Вивести кошти', RU: 'Вывести средства', EN: 'Withdraw Funds' },
  earningsToday: { PL: 'Zarobek dzisiaj', UA: 'Заробіток сьогодні', RU: 'Заработок сегодня', EN: 'Earnings Today' },
  earningsThisWeek: { PL: 'Zarobek w tym tygodniu', UA: 'Заробіток цього тижня', RU: 'Заработок на этой неделе', EN: 'Earnings This Week' },
  earningsThisMonth: { PL: 'Zarobek w tym miesiącu', UA: 'Заробіток цього місяця', RU: 'Заработок в этом месяце', EN: 'Earnings This Month' },
  earningsChart: { PL: 'Wykres zarobków', UA: 'Графік заробітків', RU: 'График заработка', EN: 'Earnings Chart' },
  last7Days: { PL: 'Ostatnie 7 dni', UA: 'Останні 7 днів', RU: 'Последние 7 дней', EN: 'Last 7 Days' },
  acceptOrder: { PL: 'Przyjmij', UA: 'Прийняти', RU: 'Принять', EN: 'Accept' },
  vehicleType: { PL: 'Typ pojazdu', UA: 'Тип транспорту', RU: 'Тип транспорта', EN: 'Vehicle Type' },
  licensePlate: { PL: 'Numer rejestracyjny', UA: 'Реєстраційний номер', RU: 'Регистрационный номер', EN: 'License Plate' },
  cargoCapacity: { PL: 'Ładowność', UA: 'Вантажопідйомність', RU: 'Грузоподъемность', EN: 'Cargo Capacity' },
  refrigerated: { PL: 'Chłodnia', UA: 'Холодильник', RU: 'Холодильник', EN: 'Refrigerated' },
  covered: { PL: 'Plandeka', UA: 'Тент', RU: 'Тент', EN: 'Covered' },
  standard: { PL: 'Standardowy', UA: 'Стандартний', RU: 'Стандартный', EN: 'Standard' },
  completedDeliveriesCount: { PL: 'Ukończone dostawy', UA: 'Завершені доставки', RU: 'Завершенные доставки', EN: 'Completed Deliveries' },
  searchNewOrders: { PL: 'Szukaj nowych zleceń', UA: 'Шукати нові замовлення', RU: 'Искать новые заказы', EN: 'Search New Orders' },
  distance: { PL: 'Dystans', UA: 'Відстань', RU: 'Расстояние', EN: 'Distance' },
  earnings: { PL: 'Zarobek', UA: 'Заробіток', RU: 'Заработок', EN: 'Earnings' },
  from: { PL: 'Odbiór z', UA: 'Забір з', RU: 'Забор с', EN: 'From' },
  to: { PL: 'Dostawa do', UA: 'Доставка до', RU: 'Доставка в', EN: 'To' },
  orderDetails: { PL: 'Szczegóły zamówienia', UA: 'Деталі замовлення', RU: 'Детали заказа', EN: 'Order Details' },
  deliveryCompleted: { PL: 'Dostawa ukończona', UA: 'Доставка завершена', RU: 'Доставка завершена', EN: 'Delivery Completed' },
  driverDashboard: { PL: 'Panel Kierowcy', UA: 'Панель водія', RU: 'Панель водителя', EN: 'Driver Dashboard' },
  activeRouteDetails: { PL: 'Aktywna trasa', UA: 'Активний маршрут', RU: 'Активный маршрут', EN: 'Active Route' },
  noActiveRoutes: { PL: 'Brak aktywnych tras', UA: 'Немає активних маршрутів', RU: 'Нет активных маршрутов', EN: 'No Active Routes' },
  startSearching: { PL: 'Zacznij szukać tras', UA: 'Почати шукати маршрути', RU: 'Начать искать маршруты', EN: 'Start Searching' },
  withdrawToCard: { PL: 'Wypłać na kartę', UA: 'Вивести на картку', RU: 'Вывести на карту', EN: 'Withdraw to Card' },
  transactionHistory: { PL: 'Historia transakcji', UA: 'Історія транзакцій', RU: 'История транзакций', EN: 'Transaction History' },
  withdrawal: { PL: 'Wypłata', UA: 'Виплата', RU: 'Выплата', EN: 'Withdrawal' },
  payment: { PL: 'Płatność', UA: 'Платіж', RU: 'Платеж', EN: 'Payment' },
  bonus: { PL: 'Bonus', UA: 'Бонус', RU: 'Бонус', EN: 'Bonus' },
  vehicleSettings: { PL: 'Ustawienia pojazdu', UA: 'Налаштування транспорту', RU: 'Настройки транспорта', EN: 'Vehicle Settings' },
  updateVehicleInfo: { PL: 'Zaktualizuj informacje', UA: 'Оновити інформацію', RU: 'Обновить информацию', EN: 'Update Information' },
  
  // Driver Registration & Verification
  driverLicense: { PL: 'Kategoria prawa jazdy', UA: 'Категорія водійських прав', RU: 'Категория прав', EN: 'Driver License Category' },
  driverLicenseB: { PL: 'Kategoria B (do 3.5t)', UA: 'Категорія B (до 3.5т)', RU: 'Категория B (до 3.5т)', EN: 'Category B (up to 3.5t)' },
  driverLicenseC: { PL: 'Kategoria C (powyżej 3.5t)', UA: 'Категорія C (понад 3.5т)', RU: 'Категория C (свыше 3.5т)', EN: 'Category C (over 3.5t)' },
  driverLicenseCE: { PL: 'Kategoria CE (z przyczepą)', UA: 'Категорія CE (з причепом)', RU: 'Категория CE (с прицепом)', EN: 'Category CE (with trailer)' },
  vehicleTypeSelection: { PL: 'Typ transportu', UA: 'Тип транспорту', RU: 'Тип транспорта', EN: 'Vehicle Type' },
  carType: { PL: 'Samochód osobowy', UA: 'Легковий автомобіль', RU: 'Легковой автомобиль', EN: 'Car' },
  vanType: { PL: 'Furgon', UA: 'Фургон', RU: 'Фургон', EN: 'Van' },
  truck35Type: { PL: 'Ciężarówka 3.5t', UA: 'Вантажівка 3.5т', RU: 'Грузовик 3.5т', EN: '3.5t Truck' },
  refrigeratorType: { PL: 'Chłodnia', UA: 'Рефрижератор', RU: 'Рефрижератор', EN: 'Refrigerator' },
  verificationStatus: { PL: 'Status weryfikacji', UA: 'Статус верифікації', RU: 'Статус верификации', EN: 'Verification Status' },
  awaitingVerification: { PL: 'Oczekuje na weryfikację', UA: 'Очікує на верифікацію', RU: 'Ожидает верификации', EN: 'Awaiting Verification' },
  verified: { PL: 'Zweryfikowano', UA: 'Верифіковано', RU: 'Верифицировано', EN: 'Verified' },
  rejected: { PL: 'Odrzucono', UA: 'Відхилено', RU: 'Отклонено', EN: 'Rejected' },
  sanitaryBooklet: { PL: 'Książeczka sanitarna', UA: 'Санітарна книжка', RU: 'Санитарная книжка', EN: 'Sanitary Booklet' },
  sanitaryBookletRequired: { PL: 'Wymagana do przewozu żywności', UA: 'Необхідна для перевезення продуктів', RU: 'Необходима для перевозки продуктов', EN: 'Required for food transport' },
  uploadDocuments: { PL: 'Dodaj dokumenty', UA: 'Завантажити документи', RU: 'Загрузить документы', EN: 'Upload Documents' },
  vehiclePhotos: { PL: 'Zdjęcia pojazdu', UA: 'Фото транспорту', RU: 'Фото транспорта', EN: 'Vehicle Photos' },
  cargoDimensions: { PL: 'Wymiary przestrzeni ładunkowej', UA: 'Габарити вантажного відсіку', RU: 'Габариты кузова', EN: 'Cargo Dimensions' },
  length: { PL: 'Długość', UA: 'Довжина', RU: 'Длина', EN: 'Length' },
  width: { PL: 'Szerokość', UA: 'Ширина', RU: 'Ширина', EN: 'Width' },
  height: { PL: 'Wysokość', UA: 'Висота', RU: 'Высота', EN: 'Height' },
  verificationRequired: { PL: 'Dokończ weryfikację, aby przyjmować zlecenia', UA: 'Завершіть верифікацію для прийому замовлень', RU: 'Завершите верификацию для принятия заказов', EN: 'Complete verification to accept orders' },
  acceptOrdersBlocked: { PL: 'Przyjmowanie zleceń zablokowane do czasu weryfikacji', UA: 'Прийом замовлень заблоковано до верифікації', RU: 'Принятие заказов заблоковано до верификации', EN: 'Order acceptance blocked until verification' },
  
  // Dashboard
  welcomeBack: { PL: 'Witaj ponownie', UA: 'З поверненням', RU: 'С возвращением', EN: 'Welcome Back' },
  dashboardSubtitle: { PL: 'Zarządzaj swoją dostawą produktów rolnych', UA: 'Керуйте поставками сільськогосподарських продуктів', RU: 'Управляйте поставками сельскохозяйственных продуктов', EN: 'Manage your agricultural product supply' },
  activeOrdersLabel: { PL: 'Aktywne zamówienia', UA: 'Активні замовлення', RU: 'Активные заказы', EN: 'Active Orders' },
  monthlySpendingLabel: { PL: 'Miesięczne wydatki', UA: 'Щомісячні витрати', RU: 'Ежемесячные расходы', EN: 'Monthly Spending' },
  suppliersLabel: { PL: 'Dostawcy', UA: 'Постачальники', RU: 'Поставщики', EN: 'Suppliers' },
  inStockLabel: { PL: 'W magazynie', UA: 'На складі', RU: 'На складе', EN: 'In Stock' },
  aiConcierge: { PL: 'Asystent AI', UA: 'AI-консьєрж', RU: 'AI-консьерж', EN: 'AI Concierge' },
  smartInventory: { PL: 'Inteligentny magazyn', UA: 'Розумний склад', RU: 'Умный склад', EN: 'Smart Inventory' },
  predictions: { PL: 'Prognozy AI', UA: 'Прогнози AI', RU: 'Прогнозы AI', EN: 'AI Predictions' },
  lowStock: { PL: 'Niski stan', UA: 'Низький запас', RU: 'Низкий запас', EN: 'Low Stock' },
  highDemand: { PL: 'Wysoki popyt', UA: 'Високий попит', RU: 'Высокий спрос', EN: 'High Demand' },
  orderSoon: { PL: 'Zamów wkrótce', UA: 'Замовте скоро', RU: 'Закажите скоро', EN: 'Order Soon' },
  stockLabel: { PL: 'Zapas', UA: 'Запас', RU: 'Запас', EN: 'Stock' },
  
  // Catalog
  catalogTitle: { PL: 'Katalog Produktów', UA: 'Каталог Продуктів', RU: 'Каталог Продуктов', EN: 'Product Catalog' },
  catalogSubtitle: { PL: 'Przeglądaj i zamawiaj produkty dla restauracji', UA: 'Переглядайте та замовляйте продукти для ресторану', RU: 'Просматривайте и заказывайте продукты для ресторана', EN: 'Browse and order restaurant essentials' },
  searchProducts: { PL: 'Szukaj produktów...', UA: 'Пошук продуктів...', RU: 'Поиск продуктов...', EN: 'Search products...' },
  filters: { PL: 'Filtry', UA: 'Фільтри', RU: 'Фильтры', EN: 'Filters' },
  allCategories: { PL: 'Wszystkie kategorie', UA: 'Всі категорії', RU: 'Все категории', EN: 'All Categories' },
  addToCart: { PL: 'Dodaj do koszyka', UA: 'Додати до кошика', RU: 'Добавить в корзину', EN: 'Add to Cart' },
  cart: { PL: 'Koszyk', UA: 'Кошик', RU: 'Корзина', EN: 'Cart' },
  emptyCart: { PL: 'Pusty koszyk', UA: 'Порожній кошик', RU: 'Пустая корзина', EN: 'Empty Cart' },
  cartIsEmpty: { PL: 'Twój koszyk jest pusty', UA: 'Ваш кошик порожній', RU: 'Ваша корзина пуста', EN: 'Your cart is empty' },
  addProductsToCart: { PL: 'Dodaj produkty aby kontynuować', UA: 'Додайте продукти щоб продовжити', RU: 'Добавьте продукты чтобы продолжить', EN: 'Add products to continue' },
  checkout: { PL: 'Złóż zamówienie', UA: 'Оформити замовлення', RU: 'Оформить заказ', EN: 'Checkout' },
  subtotal: { PL: 'Suma częściowa', UA: 'Проміжна сума', RU: 'Промежуточная сумма', EN: 'Subtotal' },
  inStock: { PL: 'W magazynie', UA: 'В наявності', RU: 'В наличии', EN: 'In Stock' },
  outOfStock: { PL: 'Brak w magazynie', UA: 'Немає в наявності', RU: 'Нет в наличии', EN: 'Out of Stock' },
  pricePerUnit: { PL: 'Cena za', UA: 'Ціна за', RU: 'Цена за', EN: 'Price per' },
  pricePerUnitLabel: { PL: 'Cena jednostkowa', UA: 'Ціна за одиницю', RU: 'Цена за единицу', EN: 'Unit Price' },
  productsFound: { PL: 'Znaleziono', UA: 'Знайдено', RU: 'Найдено', EN: 'Found' },
  products: { PL: 'produktów', UA: 'продуктів', RU: 'продуктов', EN: 'products' },
  noProductsFound: { PL: 'Nie znaleziono produktów', UA: 'Продукти не знайдено', RU: 'Продукты не найдены', EN: 'No products found' },
  tryChangingFilters: { PL: 'Spróbuj zmienić filtry lub wyszukiwanie', UA: 'Спробуйте змінити фільтри або пошук', RU: 'Попробуйте изменить фильтры или поиск', EN: 'Try changing your filters or search' },
  
  // Orders
  ordersTitle: { PL: 'Zarządzanie Zamówieniami', UA: 'Управління замовленнями', RU: 'Управление Заказами', EN: 'Order Management' },
  ordersSubtitle: { PL: 'Śledź i zarządzaj wszystkimi zamówieniami', UA: 'Відстежуйте та керуйте всіма замовленнями', RU: 'Отслеживайте и управляйте всеми заказами', EN: 'Track and manage all your orders' },
  activeOrders: { PL: 'Aktywne zamówienia', UA: 'Активні замовлення', RU: 'Активные заказы', EN: 'Active Orders' },
  orderHistory: { PL: 'Historia zamówień', UA: 'Історія замовлень', RU: 'История заказов', EN: 'Order History' },
  placeOrder: { PL: 'Złóż zamówienie', UA: 'Замовити', RU: 'Разместить заказ', EN: 'Place Order' },
  createNewOrder: { PL: 'Utwórz nowe zamówienie', UA: 'Створити нове замовлення', RU: 'Создать новый заказ', EN: 'Create New Order' },
  orderNumber: { PL: 'Numer zamówienia', UA: 'Номер замовлення', RU: 'Номер заказа', EN: 'Order Number' },
  status: { PL: 'Status', UA: 'Статус', RU: 'Статус', EN: 'Status' },
  total: { PL: 'Suma', UA: 'Загальна сума', RU: 'Итого', EN: 'Total' },
  pending: { PL: 'Oczekujące', UA: 'Очікується', RU: 'Ожидание', EN: 'Pending' },
  processing: { PL: 'Przetwarzanie', UA: 'Обробка', RU: 'Обработка', EN: 'Processing' },
  toPack: { PL: 'Do spakowania', UA: 'До пакування', RU: 'К упаковке', EN: 'To Pack' },
  waitingForDriver: { PL: 'Oczekiwanie na kierowcę', UA: 'Очікування водія', RU: 'Ожидание водителя', EN: 'Waiting for Driver' },
  shipped: { PL: 'Wysłane', UA: 'Відправлено', RU: 'Отправлено', EN: 'Shipped' },
  delivered: { PL: 'Dostarczone', UA: 'Доставлено', RU: 'Доставлено', EN: 'Delivered' },
  cancelled: { PL: 'Anulowane', UA: 'Скасовано', RU: 'Отменено', EN: 'Cancelled' },
  viewDetails: { PL: 'Zobacz szczegóły', UA: 'Переглянути деталі', RU: 'Посмотреть детали', EN: 'View Details' },
  items: { PL: 'pozycji', UA: 'товарів', RU: 'товаров', EN: 'items' },
  supplier: { PL: 'Dostawca', UA: 'Постачальник', RU: 'Поставщик', EN: 'Supplier' },
  deliveryDate: { PL: 'Data dostawy', UA: 'Дата доставки', RU: 'Дата доставки', EN: 'Delivery Date' },
  viewInvoice: { PL: 'Zobacz fakturę', UA: 'Переглянути рахунок', RU: 'Посмотреть счет', EN: 'View Invoice' },
  add: { PL: 'Dodaj', UA: 'Додати', RU: 'Добавить', EN: 'Add' },
  vatInvoice: { PL: 'Faktura VAT', UA: 'Рахунок VAT', RU: 'Счет VAT', EN: 'VAT Invoice' },
  downloadInvoice: { PL: 'Pobierz fakturę', UA: 'Завантажити рахунок', RU: 'Скачать счет', EN: 'Download Invoice' },
  printInvoice: { PL: 'Drukuj fakturę', UA: 'Друкувати рахунок', RU: 'Печатать счет', EN: 'Print Invoice' },
  seller: { PL: 'Sprzedawca', UA: 'Продавець', RU: 'Продавец', EN: 'Seller' },
  buyer: { PL: 'Nabywca', UA: 'Покупець', RU: 'Покупатель', EN: 'Buyer' },
  invoiceNumber: { PL: 'Numer faktury', UA: 'Номер рахунку', RU: 'Номер счета', EN: 'Invoice Number' },
  issueDate: { PL: 'Data wystawienia', UA: 'Дата виставлення', RU: 'Дата выставления', EN: 'Issue Date' },
  saleDate: { PL: 'Data sprzedaży', UA: 'Дата продажу', RU: 'Дата продажи', EN: 'Sale Date' },
  paymentMethod: { PL: 'Sposób płatności', UA: 'Спосіб оплати', RU: 'Способ оплаты', EN: 'Payment Method' },
  bankTransfer: { PL: 'Przelew bankowy', UA: 'Банківський переказ', RU: 'Банковский перевод', EN: 'Bank Transfer' },
  invoiceItems: { PL: 'Pozycje faktury', UA: 'Позиції рахунку', RU: 'Позиции счета', EN: 'Invoice Items' },
  netAmount: { PL: 'Wartość netto', UA: 'Сума нетто', RU: 'Сумма нетто', EN: 'Net Amount' },
  grossAmount: { PL: 'Wartość brutto', UA: 'Сума брутто', RU: 'Сумма брутто', EN: 'Gross Amount' },
  netTotal: { PL: 'Suma netto', UA: 'Всього нетто', RU: 'Итого нетто', EN: 'Net Total' },
  grossTotal: { PL: 'Suma brutto', UA: 'Всього брутто', RU: 'Итого брутто', EN: 'Gross Total' },
  invoiceFooter: { PL: 'Faktura wygenerowana automatycznie przez system Plon. Integracja KSeF aktywna.', UA: 'Рахунок згенероано автоматично системою Plon. Інтеграція KSeF активна.', RU: 'Счет сгенерирован автоматически системой Plon. Интеграция KSeF активна.', EN: 'Invoice generated automatically by Plon system. KSeF integration active.' },
  
  // Logistics
  logisticsTitle: { PL: 'Logistyka i Dostawy', UA: 'Логістика та доставки', RU: 'Логистика и Доставки', EN: 'Logistics & Deliveries' },
  logisticsSubtitle: { PL: 'Śledź przesyłki w czasie rzeczywistym', UA: 'Відстежуйте доставки в реальному часі', RU: 'Отслеживайте доставки в реальном времени', EN: 'Track shipments in real-time' },
  trackShipment: { PL: 'Śledź przesyłkę', UA: 'Відстежити доставку', RU: 'Отследить отправку', EN: 'Track Shipment' },
  callDriver: { PL: 'Zadzwoń do kierowcy', UA: 'Зателефонувати водію', RU: 'Позвонить водителю', EN: 'Call Driver' },
  eta: { PL: 'Szacowany czas dostawy', UA: 'Очікуваний час доставки', RU: 'Расчетное время доставки', EN: 'Estimated Arrival' },
  today: { PL: 'Dziś', UA: 'Сьогодні', RU: 'Сегодня', EN: 'Today' },
  inTransit: { PL: 'W drodze', UA: 'У дорозі', RU: 'В пути', EN: 'In Transit' },
  atWarehouse: { PL: 'W magazynie', UA: 'На складі', RU: 'На складе', EN: 'At Warehouse' },
  outForDelivery: { PL: 'W dostawie', UA: 'На доставці', RU: 'На доставке', EN: 'Out for Delivery' },
  liveTracking: { PL: 'Śledzenie na żywo', UA: 'Живе відстеження', RU: 'Живое отслеживание', EN: 'Live Tracking' },
  driverInfo: { PL: 'Informacje o kierowcy', UA: 'Інформація про водія', RU: 'Информация о водителе', EN: 'Driver Info' },
  contactDriver: { PL: 'Kontakt z kierowcą', UA: 'Зв\'язатися з водієм', RU: 'Связаться с водителем', EN: 'Contact Driver' },
  
  // Suppliers
  suppliersTitle: { PL: 'Zarządzanie Dostawcami', UA: 'Управління постачальниками', RU: 'Управление Поставщиками', EN: 'Supplier Management' },
  suppliersSubtitle: { PL: 'Przeglądaj i zarządzaj zaufanymi dostawcami', UA: 'Переглядайте та керуйте довіреними постачальниками', RU: 'Просматривайте и управляйте доверенными поставщиками', EN: 'Browse and manage trusted suppliers' },
  verifiedSupplier: { PL: 'Zweryfikowany dostawca', UA: 'Перевірений постачальник', RU: 'Проверенный поставщик', EN: 'Verified Supplier' },
  contactSupplier: { PL: 'Kontakt z dostawcą', UA: 'Зв\'язатися з постачальником', RU: 'Связаться с поставщиком', EN: 'Contact Supplier' },
  backToSuppliers: { PL: 'Powrót do dostawców', UA: 'Назад до постачальників', RU: 'Назад к поставщикам', EN: 'Back to Suppliers' },
  rating: { PL: 'Ocena', UA: 'Рейтинг', RU: 'Рейтинг', EN: 'Rating' },
  reviews: { PL: 'recenzji', UA: 'відгуків', RU: 'отзывов', EN: 'reviews' },
  viewProfile: { PL: 'Zobacz profil', UA: 'Переглянути профіль', RU: 'Посмотреть профиль', EN: 'View Profile' },
  localSupplier: { PL: 'Lokalny dostawca', UA: 'Місцевий постачальник', RU: 'Местный поставщик', EN: 'Local Supplier' },
  topRated: { PL: 'Najwyżej oceniany', UA: 'Найвищий рейтинг', RU: 'Высший рейтинг', EN: 'Top Rated' },
  fastDelivery: { PL: 'Szybka dostawa', UA: 'Швидка доставка', RU: 'Быстрая доставка', EN: 'Fast Delivery' },
  
  // Analytics
  analyticsTitle: { PL: 'Analityka i Raporty', UA: 'Аналітика та звіти', RU: 'Аналитика и Отчеты', EN: 'Analytics & Reports' },
  analyticsSubtitle: { PL: 'Wgląd w wydajność Twojego biznesu', UA: 'Перегляд ефективності вашого бізнесу', RU: 'Понимание эффективности вашего бизнеса', EN: 'Insights into your business performance' },
  salesOverview: { PL: 'Przegląd sprzedaży', UA: 'Огляд продаж', RU: 'Обзор продаж', EN: 'Sales Overview' },
  topProducts: { PL: 'Najlepsze produkty', UA: 'Найкращі товари', RU: 'Топ товары', EN: 'Top Products' },
  revenue: { PL: 'Przychód', UA: 'Дохід', RU: 'Доход', EN: 'Revenue' },
  thisMonth: { PL: 'Ten miesiąc', UA: 'Цей місяць', RU: 'Этот месяц', EN: 'This Month' },
  lastMonth: { PL: 'Poprzedni miesiąc', UA: 'Попередній місяць', RU: 'Прошлый месяц', EN: 'Last Month' },
  thisYear: { PL: 'Ten rok', UA: 'Цей рік', RU: 'Этот год', EN: 'This Year' },
  growth: { PL: 'Wzrost', UA: 'Зріст', RU: 'Рост', EN: 'Growth' },
  decline: { PL: 'Spadek', UA: 'Спад', RU: 'Снижение', EN: 'Decline' },
  totalOrders: { PL: 'Całkowite zamówienia', UA: 'Загальна кількість замовлень', RU: 'Всего заказов', EN: 'Total Orders' },
  averageOrderValue: { PL: 'Średnia wartość zamówienia', UA: 'Середня сума замовлення', RU: 'Средняя стоимость заказа', EN: 'Average Order Value' },
  editMode: { PL: 'Edytuj', UA: 'Редагувати', RU: 'Редактировать', EN: 'Edit' },
  edit: { PL: 'Edytuj', UA: 'Редагувати', RU: 'Редактировать', EN: 'Edit' },
  editPrice: { PL: 'Edytuj cenę', UA: 'Редагувати ціну', RU: 'Редактировать цену', EN: 'Edit Price' },
  editLayout: { PL: 'Edytuj układ', UA: 'Редагувати макет', RU: 'Редактировать макет', EN: 'Edit Layout' },
  saveLayout: { PL: 'Zapisz układ', UA: 'Зберегти макет', RU: 'Сохранить макет', EN: 'Save Layout' },
  resetLayout: { PL: 'Resetuj układ', UA: 'Скинути макет', RU: 'Сбросить макет', EN: 'Reset Layout' },
  deleteWidget: { PL: 'Usuń', UA: 'Видалити', RU: 'Удалить', EN: 'Delete' },
  dragHandle: { PL: 'Przeciągnij', UA: 'Перетягніть', RU: 'Перетащите', EN: 'Drag' },
  dragToReorder: { PL: 'Przeciągnij aby zmienić kolejność', UA: 'Перетягніть для зміни порядку', RU: 'Перетащите для изменения порядка', EN: 'Drag to reorder' },
  monthlyData: { PL: 'Szczegółowe dane miesięczne', UA: 'Детальні дані за місяць', RU: 'Детальные данные за месяц', EN: 'Monthly Data Details' },
  month: { PL: 'Miesiąc', UA: 'Місяць', RU: 'Месяц', EN: 'Month' },
  change: { PL: 'Zmiana', UA: 'Зміна', RU: 'Изменение', EN: 'Change' },
  revenueInCurrency: { PL: 'Przychód (zł)', UA: 'Дохід (zł)', RU: 'Доход (zł)', EN: 'Revenue (PLN)' },
  salesInCurrency: { PL: 'Sprzedaż (zł)', UA: 'Продажі (zł)', RU: 'Продажи (zł)', EN: 'Sales (PLN)' },

  // Product Detail Page
  backToCatalog: { PL: 'Powrót do katalogu', UA: 'Назад до каталогу', RU: 'Назад к каталогу', EN: 'Back to Catalog' },
  mediumDemand: { PL: 'Średni popyt', UA: 'Середній попит', RU: 'Средний спрос', EN: 'Medium Demand' },
  lowDemand: { PL: 'Niski popyt', UA: 'Низький попит', RU: 'Низкий спрос', EN: 'Low Demand' },
  priceTrend: { PL: 'Trend cenowy (30 dni)', UA: 'Ціновий тренд (30 днів)', RU: 'Тренд цен (30 дней)', EN: 'Price Trend (30 days)' },
  supplierInfo: { PL: 'Informacje o dostawcy', UA: 'Інформація про постачальника', RU: 'Информация о поставщике', EN: 'Supplier Information' },
  supplierName: { PL: 'Dostawca', UA: 'Постачальник', RU: 'Поставщик', EN: 'Supplier' },
  location: { PL: 'Lokalizacja', UA: 'Розташування', RU: 'Местоположение', EN: 'Location' },
  stockLevel: { PL: 'Poziom zapasów', UA: 'Рівень запасів', RU: 'Уровень запасов', EN: 'Stock Level' },
  productSpecs: { PL: 'Specyfikacja produktu', UA: 'Специфікація продукту', RU: 'Спецификация продукта', EN: 'Product Specifications' },
  weight: { PL: 'Waga', UA: 'Вага', RU: 'Вес', EN: 'Weight' },
  shelfLife: { PL: 'Data ważności', UA: 'Термін придатності', RU: 'Срок годности', EN: 'Shelf Life' },
  storageTemp: { PL: 'Temperatura przechowywania', UA: 'Температура зберігання', RU: 'Температура хранения', EN: 'Storage Temperature' },
  origin: { PL: 'Kraj pochodzenia', UA: 'Країна походження', RU: 'Страна происхождения', EN: 'Country of Origin' },
  aiInsights: { PL: 'Rekomendacje AI', UA: 'Рекомендації AI', RU: 'Рекомендации AI', EN: 'AI Insights' },
  aiSuggestion: { PL: 'AI sugeruje zamówienie teraz. Ceny mają wzrosnąć o 5% w przyszłym tygodniu z powodu warunków pogodowych.', UA: 'AI пропонує замовити зараз. Очікується зростання цін на 5% наступного тижня через погодні умови.', RU: 'AI рекомендует заказать сейчас. Ожидается рост цен на 5% на следующей неделе из-за погодных условий.', EN: 'AI suggests ordering now. Prices are expected to rise by 5% next week due to weather conditions.' },
  quantity: { PL: 'Ilość', UA: 'Кількість', RU: 'Количество', EN: 'Quantity' },
  addToOrder: { PL: 'Dodaj do zamówienia', UA: 'Додати до замовлення', RU: 'Добавить в заказ', EN: 'Add to Order' },
  units: { PL: 'Jednostki', UA: 'Одиниці', RU: 'Единицы', EN: 'Units' },
  perKg: { PL: 'za kg', UA: 'за кг', RU: 'за кг', EN: 'per kg' },
  perBox: { PL: 'za pudełko', UA: 'за коробку', RU: 'за коробку', EN: 'per box' },
  perUnit: { PL: 'za sztukę', UA: 'за одиницю', RU: 'за единицу', EN: 'per unit' },
  days: { PL: 'dni', UA: 'днів', RU: 'дней', EN: 'days' },
  
  // Role-Based Dashboards
  // Restaurant Dashboard
  restaurantDashboard: { PL: 'Panel Restauracji', UA: 'Панель ресторану', RU: 'Панель ресторана', EN: 'Restaurant Dashboard' },
  orderStatusTracker: { PL: 'Śledzenie zamówień', UA: 'Відстеження замовлень', RU: 'Отслеживание заказов', EN: 'Order Status Tracker' },
  monthlySpending: { PL: 'Wydatki miesięczne', UA: 'Місячні витрати', RU: 'Ежемесячные расходы', EN: 'Monthly Spending' },
  aiShoppingList: { PL: 'Lista zakupów AI', UA: 'AI список покупок', RU: 'AI список покупок', EN: 'AI Shopping List' },
  liveDeliveryMap: { PL: 'Mapa dostaw na żywo', UA: 'Карта доставок наживо', RU: 'Карта доставок в реальном времени', EN: 'Live Delivery Map' },
  makeNewOrder: { PL: 'Złóż zamówienie', UA: 'Зробити замовлення', RU: 'Сделать заказ', EN: 'Make New Order' },
  basedOnInventory: { PL: 'Na podstawie zapasów', UA: 'На основі запасів', RU: 'На основе запасов', EN: 'Based on inventory' },
  spendingThisMonth: { PL: 'Wydatki w tym miesiącu', UA: 'Витрати цього місяця', RU: 'Расходы в этом месяце', EN: 'Spending this month' },
  activeDeliveries: { PL: 'Aktywne dostawy', UA: 'Активні доставки', RU: 'Активные доставки', EN: 'Active Deliveries' },
  orderPreparing: { PL: 'Przygotowywane', UA: 'Підготовка', RU: 'Подготовка', EN: 'Preparing' },
  orderInTransit: { PL: 'W dostawie', UA: 'У доставці', RU: 'В доставке', EN: 'In Transit' },
  orderDelivered: { PL: 'Dostarczone', UA: 'Доставлено', RU: 'Доставлено', EN: 'Delivered' },
  suggestedItems: { PL: 'Sugerowane produkty', UA: 'Рекомендовані товари', RU: 'Рекомендуемые товары', EN: 'Suggested Items' },
  
  // Supplier Dashboard
  farmerDashboard: { PL: 'Panel Rolnika', UA: 'Панель фермера', RU: 'Панель фермера', EN: 'Farmer Dashboard' },
  activeOrdersToPack: { PL: 'Zamówienia do spakowania', UA: 'Замовлення до пакування', RU: 'Заказы к упаковке', EN: 'Active Orders to Pack' },
  harvestCalendar: { PL: 'Kalendarz zbiorów', UA: 'Календар збору врожаю', RU: 'Календарь урожая', EN: 'Harvest Calendar' },
  salesRevenue: { PL: 'Przychody ze sprzedaży', UA: 'Дохід від продажів', RU: 'Доход от продаж', EN: 'Sales Revenue' },
  inventoryManagement: { PL: 'Zarządzanie zapasami', UA: 'Управління запасами', RU: 'Управление запасами', EN: 'Inventory Management' },
  addNewProduct: { PL: 'Dodaj produkt', UA: 'Додати продукт', RU: 'Добавить продукт', EN: 'Add New Product' },
  productListings: { PL: 'Lista produktów', UA: 'Список продуктів', RU: 'Список продуктов', EN: 'Product Listings' },
  salesHistory: { PL: 'Historia sprzedaży', UA: 'Історія продажів', RU: 'История продаж', EN: 'Sales History' },
  financeSupplier: { PL: 'Finanse', UA: 'Фінанси', RU: 'Финансы', EN: 'Finance' },
  invoices: { PL: 'Faktury', UA: 'Рахунки', RU: 'Счета', EN: 'Invoices' },
  ordersToPack: { PL: 'Zamówienia do spakowania', UA: 'Замовлення до пакування', RU: 'Заказы к упаковке', EN: 'Orders to Pack' },
  readyToShip: { PL: 'Gotowe do wysyłki', UA: 'Готові до відправки', RU: 'Готовы к отправке', EN: 'Ready to Ship' },
  stockLevels: { PL: 'Poziomy zapasów', UA: 'Рівні запасів', RU: 'Уровни запасов', EN: 'Stock Levels' },
  
  // Driver Invoice
  deliveryInvoice: { PL: 'Faktura dostawy', UA: 'Рахунок доставки', RU: 'Счет доставки', EN: 'Delivery Invoice' },
  invoiceFor: { PL: 'Faktura dla', UA: 'Рахунок для', RU: 'Счет для', EN: 'Invoice For' },
  driverName: { PL: 'Kierowca', UA: 'Водій', RU: 'Водитель', EN: 'Driver' },
  routeDetails: { PL: 'Szczegóły trasy', UA: 'Деталі маршруту', RU: 'Детали маршрута', EN: 'Route Details' },
  deliveryLocation: { PL: 'Miejsce dostawy', UA: 'Місце доставки', RU: 'Место доставки', EN: 'Delivery Location' },
  cargoDetails: { PL: 'Szczegóły ładunku', UA: 'Деталі вантажу', RU: 'Детали груза', EN: 'Cargo Details' },
  paymentBreakdown: { PL: 'Rozliczenie płatności', UA: 'Розрахунок оплати', RU: 'Расчет оплаты', EN: 'Payment Breakdown' },
  baseFare: { PL: 'Stawka podstawowa', UA: 'Базова ставка', RU: 'Базовая ставка', EN: 'Base Fare' },
  distanceFee: { PL: 'Opłata za dystans', UA: 'Оплата за відстань', RU: 'Оплата за расстояние', EN: 'Distance Fee' },
  totalAmount: { PL: 'Suma całkowita', UA: 'Загальна сума', RU: 'Общая сумма', EN: 'Total Amount' },
  paidOn: { PL: 'Opłacone dnia', UA: 'Оплачено', RU: 'Оплачено', EN: 'Paid On' },
  closeInvoice: { PL: 'Zamknij', UA: 'Закрити', RU: 'Закрыть', EN: 'Close' },
  
  inSeason: { PL: 'W sezonie', UA: 'У сезоні', RU: 'В сезоне', EN: 'In Season' },
  comingSoon: { PL: 'Wkrótce', UA: 'Незабаром', RU: 'Скоро', EN: 'Coming Soon' },
  revenueThisMonth: { PL: 'Przychód w tym miesiącu', UA: 'Дохід цього місяця', RU: 'Доход в этом месяце', EN: 'Revenue this month' },
  
  // Farmer Dashboard (Extended Supplier Dashboard)
  myCrops: { PL: 'Moje uprawy', UA: 'Мої врожаї', RU: 'Мои урожаи', EN: 'My Crops' },
  aiSuggestedPrice: { PL: 'AI sugeruje', UA: 'AI пропонує', RU: 'AI предлагает', EN: 'AI suggests' },
  averageMarketPrice: { PL: 'Średnia cena rynkowa', UA: 'Середня ринкова ціна', RU: 'Средняя рыночная цена', EN: 'Average market price' },
  productName: { PL: 'Nazwa produktu', UA: 'Назва продукту', RU: 'Название продукта', EN: 'Product Name' },
  
  // Logistics Dashboard
  logisticsDashboard: { PL: 'Panel Logistyki', UA: 'Панель логістики', RU: 'Панель логистики', EN: 'Logistics Dashboard' },
  optimizedRoute: { PL: 'Zoptymalizowana trasa', UA: 'Оптимізований маршрут', RU: 'Оптимизированный маршрут', EN: 'Optimized Route' },
  pickupSchedule: { PL: 'Harmonogram odbioru', UA: 'Розклад забору', RU: 'Расписание забора', EN: 'Pickup Schedule' },
  deliverySchedule: { PL: 'Harmonogram dostaw', UA: 'Розклад доставок', RU: 'Расписание доставок', EN: 'Delivery Schedule' },
  earningsSummary: { PL: 'Podsumowanie zarobków', UA: 'Підсумок заробітків', RU: 'Сводка заработков', EN: 'Earnings Summary' },
  goOnline: { PL: 'Rozpocznij zmianę', UA: 'Почати зміну', RU: 'Начать смену', EN: 'Go Online' },
  startShift: { PL: 'Rozpocznij zmianę', UA: 'Почати зміну', RU: 'Начать смену', EN: 'Start Shift' },
  activeRoute: { PL: 'Aktywna trasa', UA: 'Активний маршрут', RU: 'Активный маршрут', EN: 'Active Route' },
  taskHistory: { PL: 'Historia zadań', UA: 'Історія завдань', RU: 'История задач', EN: 'Task History' },
  vehicleInfo: { PL: 'Informacje o pojeździe', UA: 'Інформація про транспорт', RU: 'Информация о транспорте', EN: 'Vehicle Info' },
  payouts: { PL: 'Wypłaty', UA: 'Виплати', RU: 'Выплаты', EN: 'Payouts' },
  todayEarnings: { PL: 'Dzisiaj', UA: 'Сьогодні', RU: 'Сегодня', EN: 'Today' },
  weeklyEarnings: { PL: 'Ten tydzień', UA: 'Цей тиждень', RU: 'Эта неделя', EN: 'This Week' },
  completedDeliveries: { PL: 'Ukończone dostawy', UA: 'Завершені доставки', RU: 'Завершенные доставки', EN: 'Completed Deliveries' },
  nextStop: { PL: 'Następny przystanek', UA: 'Наступна зупинка', RU: 'Следующая остановка', EN: 'Next Stop' },
  pickup: { PL: 'Odbiór', UA: 'Забір', RU: 'Забор', EN: 'Pickup' },
  delivery: { PL: 'Dostawa', UA: 'Доставка', RU: 'Доставка', EN: 'Delivery' },
  stopNumber: { PL: 'Przystanek', UA: 'Зупинка', RU: 'Остановка', EN: 'Stop' },
  
  // Role Selection
  selectRole: { PL: 'Wybierz rolę', UA: 'Виберіть роль', RU: 'Выберите роль', EN: 'Select Role' },
  roleRestaurant: { PL: 'Restauracja', UA: 'Ресторан', RU: 'Ресторан', EN: 'Restaurant' },
  roleSupplier: { PL: 'Dostawca', UA: 'Постачальник', RU: 'Поставщик', EN: 'Supplier' },
  roleLogistics: { PL: 'Logistyka', UA: 'Логістика', RU: 'Логистика', EN: 'Logistics' },
  switchRole: { PL: 'Zmień rolę', UA: 'Змінити роль', RU: 'Сменить роль', EN: 'Switch Role' },
  userRole: { PL: 'Rola użytkownika', UA: 'Роль користувача', RU: 'Роль пользователя', EN: 'User Role' },
  
  // Settings
  settingsTitle: { PL: 'Ustawienia', UA: 'Налаштування', RU: 'Настройки', EN: 'Settings' },
  settingsSubtitle: { PL: 'Zarządzaj swoim kontem i preferencjami', UA: 'Керуйте своїм обліковим записом та налаштуваннями', RU: 'Управляйте своей учетной записью и настройками', EN: 'Manage your account and preferences' },
  accountSettings: { PL: 'Ustawienia konta', UA: 'Налаштування облікового запису', RU: 'Настройки аккаунта', EN: 'Account Settings' },
  companyInfo: { PL: 'Informacje o firmie', UA: 'Інформація про компанію', RU: 'Информация о компании', EN: 'Company Info' },
  companyName: { PL: 'Nazwa firmy', UA: 'Назва компанії', RU: 'Название компании', EN: 'Company Name' },
  nip: { PL: 'NIP', UA: 'ІНН', RU: 'ИНН', EN: 'Tax ID' },
  ksefIntegration: { PL: 'Integracja KSeF', UA: 'Інтеграція KSeF', RU: 'Интеграция KSeF', EN: 'KSeF Integration' },
  ksefEnabled: { PL: 'KSeF włączony', UA: 'KSeF увімкнений', RU: 'KSeF включен', EN: 'KSeF Enabled' },
  ksefDescription: { PL: 'Krajowy System e-Faktur', UA: 'Національна система електронних рахунків', RU: 'Национальная система электронных счетов', EN: 'National e-Invoice System' },
  language: { PL: 'Język', UA: 'Мова', RU: 'Язык', EN: 'Language' },
  theme: { PL: 'Motyw', UA: 'Тема', RU: 'Тема', EN: 'Theme' },
  lightMode: { PL: 'Tryb jasny', UA: 'Світлий режим', RU: 'Светлый режим', EN: 'Light Mode' },
  darkMode: { PL: 'Tryb ciemny', UA: 'Темний режим', RU: 'Темный режим', EN: 'Dark Mode' },
  notifications: { PL: 'Powiadomienia', UA: 'Сповіщення', RU: 'Уведомления', EN: 'Notifications' },
  emailNotifications: { PL: 'Powiadomienia e-mail', UA: 'Електронні сповіщення', RU: 'Email-уведомления', EN: 'Email Notifications' },
  pushNotifications: { PL: 'Powiadomienia push', UA: 'Push-сповіщення', RU: 'Push-уведомления', EN: 'Push Notifications' },
  saveChanges: { PL: 'Zapisz zmiany', UA: 'Зберегти зміни', RU: 'Сохранить изменения', EN: 'Save Changes' },
  changesSaved: { PL: 'Zmiany zapisane', UA: 'Зміни збережено', RU: 'Изменения сохранены', EN: 'Changes Saved' },
  
  // AI Chat
  typeMessage: { PL: 'Wpisz wiadomość...', UA: 'Введіть повідомлення...', RU: 'Введите сообщение...', EN: 'Type a message...' },
  voiceOrder: { PL: 'Zamówienie głosowe', UA: 'Голосове замовлення', RU: 'Голосовой заказ', EN: 'Voice Order' },
  aiAssistant: { PL: 'Asystent AI', UA: 'AI-асистент', RU: 'AI-ассистент', EN: 'AI Assistant' },
  howCanIHelp: { PL: 'Jak mogę pomóc?', UA: 'Як я можу допомогти?', RU: 'Чем могу помочь?', EN: 'How can I help?' },
  
  // New AI Features
  // AI Quality Vision
  aiQualityVision: { PL: 'Kontrola jakości AI', UA: 'AI контроль якості', RU: 'AI контроль качества', EN: 'AI Quality Vision' },
  qualityControl: { PL: 'Kontrola jakości', UA: 'Контроль якості', RU: 'Контроль качества', EN: 'Quality Control' },
  uploadPhoto: { PL: 'Wgraj zdjęcie', UA: 'Завантажити фото', RU: 'Загрузить фото', EN: 'Upload Photo' },
  takePhoto: { PL: 'Zrób zdjęcie', UA: 'Зробити фото', RU: 'Сделать фото', EN: 'Take Photo' },
  aiAnalyzing: { PL: 'AI analizuje...', UA: 'AI аналізує...', RU: 'AI анализирует...', EN: 'AI analyzing...' },
  qualityScore: { PL: 'Ocena jakości', UA: 'Оцінка якості', RU: 'Оценка качества', EN: 'Quality Score' },
  freshnessLevel: { PL: 'Poziom świeżości', UA: 'Рівень свіжості', RU: 'Уровень свежести', EN: 'Freshness Level' },
  defectsDetected: { PL: 'Wykryte wady', UA: 'Виявлені дефекти', RU: 'Обнаруженные дефекты', EN: 'Defects Detected' },
  sizeUniformity: { PL: 'Jednolitość rozmiaru', UA: 'Однорідність розміру', RU: 'Однородность размера', EN: 'Size Uniformity' },
  aiCertified: { PL: 'Certyfikat AI', UA: 'Сертифікат AI', RU: 'Сертификат AI', EN: 'AI Certified' },
  certifiedFresh: { PL: 'Świeżość potwierdzona', UA: 'Свіжість підтверджена', RU: 'Свежесть подтверждена', EN: 'Certified Fresh' },
  qualityVisionDesc: { PL: 'AI automatycznie ocenia świeżość, rozmiar i wykrywa defekty', UA: 'AI автоматично оцінює свіжість, розмір і виявляє дефекти', RU: 'AI автоматически оценивает свежесть, размер и выявляет дефекты', EN: 'AI automatically assesses freshness, size and detects defects' },
  
  // AI Route & Load Optimizer
  aiRouteOptimizer: { PL: 'Optymalizator tras AI', UA: 'AI оптимізатор маршрутів', RU: 'AI оптимизатор маршрутов', EN: 'AI Route Optimizer' },
  smartLogistics: { PL: 'Inteligentna logistyka', UA: 'Інтелектуальна логістика', RU: 'Умная логистика', EN: 'Smart Logistics' },
  optimizeRoute: { PL: 'Optymalizuj trasę', UA: 'Оптимізувати маршрут', RU: 'Оптимизировать маршрут', EN: 'Optimize Route' },
  fuelSavings: { PL: 'Oszczędność paliwa', UA: 'Економія палива', RU: 'Экономия топлива', EN: 'Fuel Savings' },
  routeEfficiency: { PL: 'Efektywność trasy', UA: 'Ефективність маршруту', RU: 'Эффективность маршрута', EN: 'Route Efficiency' },
  cargoCompatibility: { PL: 'Kompatybilność ładunku', UA: 'Сумісність вантажу', RU: 'Совместимость груза', EN: 'Cargo Compatibility' },
  temperatureZones: { PL: 'Strefy temperaturowe', UA: 'Температурні зони', RU: 'Температурные зоны', EN: 'Temperature Zones' },
  estimatedTime: { PL: 'Szacowany czas', UA: 'Очікуваний час', RU: 'Расчётное время', EN: 'Estimated Time' },
  routeOptimizerDesc: { PL: 'AI analizuje typ pojazdu i kompatybilność produktów dla optymalnej trasy', UA: 'AI аналізує тип транспорту і сумісність продуктів для оптимального маршруту', RU: 'AI анализирует тип транспорта и совместимость продуктов для оптимального маршрута', EN: 'AI analyzes vehicle type and product compatibility for optimal routes' },
  ethyleneWarning: { PL: 'Ostrzeżenie o etylenie', UA: 'Попередження про етилен', RU: 'Предупреждение об этилене', EN: 'Ethylene Warning' },
  compatibilityCheck: { PL: 'Sprawdzanie kompatybilności', UA: 'Перевірка сумісності', RU: 'Проверка совместимости', EN: 'Compatibility Check' },
  
  // AI Dynamic Pricing
  aiDynamicPricing: { PL: 'Dynamiczne ceny AI', UA: 'Динамічні ціни AI', RU: 'Динамические цены AI', EN: 'AI Dynamic Pricing' },
  smartPricing: { PL: 'Inteligentne ceny', UA: 'Інтелектуальні ціни', RU: 'Умные цены', EN: 'Smart Pricing' },
  priceOptimization: { PL: 'Optymalizacja cen', UA: 'Оптимізація цін', RU: 'Оптимизация цен', EN: 'Price Optimization' },
  marketDemand: { PL: 'Popyt rynkowy', UA: 'Ринковий попит', RU: 'Рыночный спрос', EN: 'Market Demand' },
  weatherImpact: { PL: 'Wpływ pogody', UA: 'Вплив погоди', RU: 'Влияние погоды', EN: 'Weather Impact' },
  expiryDate: { PL: 'Data ważności', UA: 'Термін придатності', RU: 'Срок годности', EN: 'Expiry Date' },
  priceDropAlert: { PL: 'Alert obniżki ceny', UA: 'Сповіщення зниження ціни', RU: 'Уведомление о снижении цены', EN: 'Price Drop Alert' },
  dynamicPricingDesc: { PL: 'Ceny dostosowują się do pogody, popytu i terminu ważności', UA: 'Ціни адаптуються до погоди, попиту та терміну придатності', RU: 'Цены адаптируются к погоде, спросу и сроку годности', EN: 'Prices adapt to weather, demand and expiry dates' },
  urgentSale: { PL: 'Pilna wyprzedaż', UA: 'Термінова розпродаж', RU: 'Срочная распродажа', EN: 'Urgent Sale' },
  optimalPrice: { PL: 'Optymalna cena', UA: 'Оптимальна ціна', RU: 'Оптимальная цена', EN: 'Optimal Price' },
  
  // AI Recipe Assistant
  aiRecipeAssistant: { PL: 'Asystent przepisów AI', UA: 'AI асистент рецептів', RU: 'AI ассистент рецептов', EN: 'AI Recipe Assistant' },
  chefAssistant: { PL: 'Asystent szefa kuchni', UA: 'Асистент шеф-кухаря', RU: 'Ассистент шеф-повара', EN: 'Chef Assistant' },
  seasonalSuggestions: { PL: 'Sezonowe sugestie', UA: 'Сезонні пропозиції', RU: 'Сезонные предложения', EN: 'Seasonal Suggestions' },
  menuOptimization: { PL: 'Optymalizacja menu', UA: 'Оптимізація меню', RU: 'Оптимизация меню', EN: 'Menu Optimization' },
  surplusIngredients: { PL: 'Nadwyżki składników', UA: 'Надлишки інгредієнтів', RU: 'Излишки ингредиентов', EN: 'Surplus Ingredients' },
  recipeIdeas: { PL: 'Pomysły na przepisy', UA: 'Ідеї рецептів', RU: 'Идеи рецептов', EN: 'Recipe Ideas' },
  costSavings: { PL: 'Oszczędności kosztów', UA: 'Економія витрат', RU: 'Экономия затрат', EN: 'Cost Savings' },
  recipeAssistantDesc: { PL: 'AI łączy nadwyżki farmerów z menu restauracji', UA: 'AI поєднує надлишки фермерів з меню ресторанів', RU: 'AI объединяет излишки фермеров с меню ресторанов', EN: 'AI connects farmer surplus with restaurant menus' },
  addToMenu: { PL: 'Dodaj do menu', UA: 'Додати до меню', RU: 'Добавить в меню', EN: 'Add to Menu' },
  createDish: { PL: 'Utwórz danie', UA: 'Створити страву', RU: 'Создать блюдо', EN: 'Create Dish' },
  surplusFound: { PL: 'AI znalazł {count} nadwyżki lokalnych farmerów idealnych dla Twojego menu', UA: 'AI знайшов {count} надлишків місцевих фермерів ідеальних для вашого меню', RU: 'AI нашел {count} излишков местных фермеров идеальных для вашего меню', EN: 'AI found {count} surplus items from local farmers perfect for your menu' },
  savingsAmount: { PL: 'Oszczędność', UA: 'Економія', RU: 'Экономия', EN: 'Savings' },
  onSeasonalIngredients: { PL: 'Na składnikach sezonowych', UA: 'На сезонних інгредієнтах', RU: 'На сезонных ингредиентах', EN: 'On seasonal ingredients' },
  averageDiscount: { PL: 'Średnia zniżka', UA: 'Середня знижка', RU: 'Средняя скидка', EN: 'Average Discount' },
  onSurplusDishes: { PL: 'Na daniach z nadwyżek', UA: 'На стравах з надлишків', RU: 'На блюдах из излишков', EN: 'On surplus dishes' },
  options: { PL: 'opcje', UA: 'опції', RU: 'опции', EN: 'options' },
  vsInternationalImport: { PL: 'vs {km} km import międzynarodowy', UA: 'проти {km} км міжнародний імпорт', RU: 'против {km} км международный импорт', EN: 'vs {km} km international import' },
  treesPlanted: { PL: 'Równowartość nasadzenia {count} drzew', UA: 'Еквівалент посадки {count} дерев', RU: 'Эквивалент посадки {count} деревьев', EN: 'Equivalent to planting {count} trees' },
  averageDistance: { PL: 'Średni dystans', UA: 'Середня відстань', RU: 'Средняя дистанция', EN: 'Average Distance' },
  vsImport: { PL: 'vs {km} km import', UA: 'проти {km} км імпорт', RU: 'против {km} км импорт', EN: 'vs {km} km import' },
  recentEcoPurchases: { PL: 'Ostatnie zakupy ekologiczne', UA: 'Останні екологічні покупки', RU: 'Последние экологические покупки', EN: 'Recent Eco Purchases' },
  plannedStops: { PL: 'Zaplanowane przystanki', UA: 'Заплановані зупинки', RU: 'Запланированные остановки', EN: 'Planned Stops' },
  optimized: { PL: 'Zoptymalizowano', UA: 'Оптимізовано', RU: 'Оптимизировано', EN: 'Optimized' },
  timeSavings: { PL: 'Oszczędność czasu', UA: 'Економія часу', RU: 'Экономия времени', EN: 'Time Savings' },
  fasterDelivery: { PL: 'Szybsza dostawa', UA: 'Швидша доставка', RU: 'Быстрая доставка', EN: 'Faster Delivery' },
  optimizationComplete: { PL: 'Optymalizacja zakończona!', UA: 'Оптимізацію завершено!', RU: 'Оптимизация завершена!', EN: 'Optimization Complete!' },
  bestRouteFound: { PL: 'AI znalazł najlepszą trasę z uwzględnieniem kompatybilności produktów', UA: 'AI знайшов найкращий маршрут з урахуванням сумісності продуктів', RU: 'AI нашел лучший маршрут с учетом совместимости продуктов', EN: 'AI found the best route considering product compatibility' },
  fuelSavingsAmount: { PL: 'Oszczędność paliwa', UA: 'Економія палива', RU: 'Экономия топлива', EN: 'Fuel Savings' },
  costSavingsAmount: { PL: 'Oszczędność kosztów', UA: 'Економія витрат', RU: 'Экономия затрат', EN: 'Cost Savings' },
  co2Saved: { PL: 'CO₂ zaoszczędzony', UA: 'CO₂ заощаджений', RU: 'CO₂ сэкономлен', EN: 'CO₂ Saved' },
  
  // AI Carbon Footprint
  aiCarbonFootprint: { PL: 'Ślad węglowy AI', UA: 'Вуглецевий слід AI', RU: 'Углеродный след AI', EN: 'AI Carbon Footprint' },
  ecoTracking: { PL: 'Eko-monitoring', UA: 'Еко-моніторинг', RU: 'Эко-мониторинг', EN: 'Eco Tracking' },
  carbonSaved: { PL: 'Zaoszczędzone CO₂', UA: 'Зекономлене CO₂', RU: 'Сэкономленный CO₂', EN: 'CO₂ Saved' },
  localSourcing: { PL: 'Lokalne źródła', UA: 'Локальні джерела', RU: 'Локальные источники', EN: 'Local Sourcing' },
  ecoFriendly: { PL: 'Ekologiczne', UA: 'Екологічне', RU: 'Экологичное', EN: 'Eco-Friendly' },
  greenCertificate: { PL: 'Zielony certyfikat', UA: 'Зелений сертифікат', RU: 'Зелёный сертификат', EN: 'Green Certificate' },
  emissionsSaved: { PL: 'Emisje zaoszczędzone', UA: 'Викиди заощаджені', RU: 'Выбросы сэкономлены', EN: 'Emissions Saved' },
  carbonFootprintDesc: { PL: 'AI liczy oszczędności CO₂ z zakupów lokalnych', UA: 'AI підраховує економію CO₂ від локальних покупок', RU: 'AI считает экономию CO₂ от локальных покупок', EN: 'AI calculates CO₂ savings from local purchases' },
  sustainabilityScore: { PL: 'Ocena zrównoważoności', UA: 'Оцінка сталості', RU: 'Оценка устойчивости', EN: 'Sustainability Score' },
  ecoImpact: { PL: 'Wpływ ekologiczny', UA: 'Екологічний вплив', RU: 'Экологическое влияние', EN: 'Eco Impact' },
  treesEquivalent: { PL: 'Równowartość drzew', UA: 'Еквівалент дерев', RU: 'Эквивалент деревьев', EN: 'Trees Equivalent' },
  euGrantEligible: { PL: 'Kwalifikuje się do dotacji UE', UA: 'Підходить для грантів ЄС', RU: 'Подходит для грантов ЕС', EN: 'EU Grant Eligible' },
  
  // AI Hub
  aiHubTitle: { PL: 'AI Hub', UA: 'AI Hub', RU: 'AI Hub', EN: 'AI Hub' },
  aiHubSubtitle: { PL: 'Zaawansowane narzędzia AI dla twojego biznesu', UA: 'Передові AI інструменти для вашого бізнесу', RU: 'Передовые AI инструменты для вашего бизнеса', EN: 'Advanced AI tools for your business' },
  availableAIFeatures: { PL: 'Dostępne funkcje AI', UA: 'Доступні функції AI', RU: 'Доступные функции AI', EN: 'Available AI Features' },
  aiConciergeOnline: { PL: 'AI Concierge online', UA: 'AI Консьєрж онлайн', RU: 'AI Консьерж онлайн', EN: 'AI Concierge online' },
  predictionAccuracy: { PL: 'Dokładność predykcji', UA: 'Точність прогнозів', RU: 'Точность прогнозов', EN: 'Prediction Accuracy' },
  aiFeaturesTitle: { PL: 'Funkcje AI', UA: 'Функції AI', RU: 'Функции AI', EN: 'AI Features' },
  openFeature: { PL: 'Otwórz', UA: 'Відкрити', RU: 'Открыть', EN: 'Open' },
  aiBenefitsTitle: { PL: 'Korzyści z AI w Plon', UA: 'Переваги AI в Plon', RU: 'Преимущества AI в Plon', EN: 'AI Benefits in Plon' },
  costSavingsTitle: { PL: 'Oszczędność kosztów', UA: 'Економія витрат', RU: 'Экономия затрат', EN: 'Cost Savings' },
  costSavingsDesc: { PL: 'Do 30% na zakupach', UA: 'До 30% на покупках', RU: 'До 30% на покупках', EN: 'Up to 30% on purchases' },
  efficiencyTitle: { PL: 'Efektywność', UA: 'Ефективність', RU: 'Эффективность', EN: 'Efficiency' },
  efficiencyDesc: { PL: 'Automatyzacja procesów', UA: 'Автоматизація процесів', RU: 'Автоматизация процессов', EN: 'Process Automation' },
  ecologyTitle: { PL: 'Ekologia', UA: 'Екологія', RU: 'Экология', EN: 'Ecology' },
  ecologyDesc: { PL: 'Mniejszy ślad węglowy', UA: 'Менший вуглецевий слід', RU: 'Меньший углеродный след', EN: 'Lower Carbon Footprint' },
  backToAiHub: { PL: 'AI Hub', UA: 'AI Hub', RU: 'AI Hub', EN: 'AI Hub' },
  
  // Success
  orderSuccess: { PL: 'Zamówienie złożone!', UA: 'Замовлення оформлено!', RU: 'Заказ размещен!', EN: 'Order Placed!' },
  orderConfirmation: { PL: 'Twoje zamówienie zostało pomyślnie złożone', UA: 'Ваше замовлення успішно оформлено', RU: 'Ваш заказ успешно размещен', EN: 'Your order has been successfully placed' },
  
  // Authentication
  login: { PL: 'Logowanie', UA: 'Увійти', RU: 'Вход', EN: 'Login' },
  signup: { PL: 'Rejestracja', UA: 'Реєстрація', RU: 'Регистрация', EN: 'Sign Up' },
  logout: { PL: 'Wyloguj się', UA: 'Вийти', RU: 'Выйти', EN: 'Logout' },
  workEmail: { PL: 'Adres email służbowy', UA: 'Робочий email', RU: 'Рабочий email', EN: 'Work Email' },
  password: { PL: 'Hasło', UA: 'Пароль', RU: 'Пароль', EN: 'Password' },
  forgotPassword: { PL: 'Zapomniałeś hasła?', UA: 'Забули пароль?', RU: 'Забыли пароль?', EN: 'Forgot Password?' },
  continueWithGoogle: { PL: 'Kontynuuj z Google', UA: 'Продовжити з Google', RU: 'Продолжить с Google', EN: 'Continue with Google' },
  noAccount: { PL: 'Nie masz konta?', UA: 'Немаєте облікового запису?', RU: 'Нет аккаунта?', EN: "Don't have an account?" },
  haveAccount: { PL: 'Masz już konto?', UA: 'У вас вже є обліковий запис?', RU: 'Уже есть аккаунт?', EN: 'Already have an account?' },
  createAccount: { PL: 'Utwórz konto', UA: 'Створити обліковий запис', RU: 'Создать аккаунт', EN: 'Create Account' },
  
  // Registration Fields
  businessDetails: { PL: 'Dane biznesowe', UA: 'Бізнес-дані', RU: 'Бизнес-данные', EN: 'Business Details' },
  accountInfo: { PL: 'Informacje o koncie', UA: 'Інформація про обліковий запис', RU: 'Информация об аккаунте', EN: 'Account Information' },
  phoneNumber: { PL: 'Numer telefonu', UA: 'Номер телефону', RU: 'Номер телефона', EN: 'Phone Number' },
  roleSelection: { PL: 'Wybór roli', UA: 'Вибір ролі', RU: 'Выбор роли', EN: 'Role Selection' },
  restaurantChef: { PL: 'Restauracja', UA: 'Ресторан', RU: 'Ресторан', EN: 'Restaurant' },
  supplierFarmer: { PL: 'Rolnik', UA: 'Фермер', RU: 'Фермер', EN: 'Farmer' },
  logisticsDelivery: { PL: 'Dostawca (Logistyka)', UA: 'Доставник', RU: 'Доставщик', EN: 'Delivery' },
  restaurantDesc: { PL: 'Zamawiaj produkty dla swojej restauracji', UA: 'Замовляйте продукти для ресторану', RU: 'Заказывайте продукты для ресторана', EN: 'Order products for your restaurant' },
  farmerDesc: { PL: 'Sprzedawaj produkty restauracjom', UA: 'Продавайте продукти ресторанам', RU: 'Продавайте продукты ресторанам', EN: 'Sell products to restaurants' },
  logisticsDesc: { PL: 'Dostarczaj zamówienia do restauracji', UA: 'Доставляйте замовлення до ресторанів', RU: 'Доставляйте заказы в рестораны', EN: 'Deliver orders to restaurants' },
  agreeToTerms: { PL: 'Akceptuję Warunki korzystania z usługi', UA: 'Я приймаю Умови використання', RU: 'Я принимаю Условия использования', EN: 'I agree to the Terms of Service' },
  andPrivacyPolicy: { PL: 'i Politykę prywatności', UA: 'та Політику конфіденційності', RU: 'и Политику конфиденциальности', EN: 'and Privacy Policy' },
  termsRequired: { PL: 'Musisz zaakceptować warunki', UA: 'Ви повинні прийняти умови', RU: 'Вы должны принять условия', EN: 'You must accept the terms' },
  
  // Quick Login (Developer)
  quickLogin: { PL: 'Szybki login (deweloperski)', UA: 'Швидкий вхід (розробник)', RU: 'Быстрый вход (разработчик)', EN: 'Quick Login (Developer)' },
  quickLoginDesc: { PL: 'Kliknij aby zalogować się natychmiast bez wypełniania formularza', UA: 'Клацніть, щоб увійти негайно без заповнення форми', RU: 'Нажмите, чтобы войти немедленно без заполнения формы', EN: 'Click to login instantly without filling the form' },
  roleDriver: { PL: 'Kierowca', UA: 'Водій', RU: 'Водитель', EN: 'Driver' },
  
  // Auth Messages
  welcomeToPlon: { PL: 'Witaj w Plon', UA: 'Ласкаво просимо до Plon', RU: 'Добро пожаловать в Plon', EN: 'Welcome to Plon' },
  loginSubtitle: { PL: 'Zaloguj się do swojego konta', UA: 'Увійдіть до свого облікового запису', RU: 'Войдите в свой аккаунт', EN: 'Sign in to your account' },
  signupSubtitle: { PL: 'Utwórz konto biznesowe dla HoReCa', UA: 'Створіть бізнес-обліковий запис для HoReCa', RU: 'Создайте бизнес-аккаунт для HoReCa', EN: 'Create your HoReCa business account' },
  loginSuccess: { PL: 'Zalogowano pomyślnie!', UA: 'Успішний вхід!', RU: 'Вход выполнен успешно!', EN: 'Logged in successfully!' },
  signupSuccess: { PL: 'Konto utworzone pomyślnie!', UA: 'Обліковий запис успішно створений!', RU: 'Аккаунт создан успешно!', EN: 'Account created successfully!' },
  logoutConfirm: { PL: 'Czy na pewno chcesz się wylogować?', UA: 'Ви впевнені, що хочете вийти?', RU: 'Вы уверены, что хотите выйти?', EN: 'Are you sure you want to logout?' },
  
  // Common
  search: { PL: 'Szukaj', UA: 'Пошук', RU: 'Поиск', EN: 'Search' },
  filter: { PL: 'Filtruj', UA: 'Фільтрувати', RU: 'Фильтр', EN: 'Filter' },
  sort: { PL: 'Sortuj', UA: 'Сортувати', RU: 'Сортировать', EN: 'Sort' },
  view: { PL: 'Wyświetl', UA: 'Перегляд', RU: 'Просмотр', EN: 'View' },
  delete: { PL: 'Usuń', UA: 'Видалити', RU: 'Удалить', EN: 'Delete' },
  cancel: { PL: 'Anuluj', UA: 'Скасувати', RU: 'Отменить', EN: 'Cancel' },
  confirm: { PL: 'Potwierdź', UA: 'Підтвердити', RU: 'Подтвердить', EN: 'Confirm' },
  save: { PL: 'Zapisz', UA: 'Зберегти', RU: 'Сохранить', EN: 'Save' },
  close: { PL: 'Zamknij', UA: 'Закрити', RU: 'Закрыть', EN: 'Close' },
  back: { PL: 'Wstecz', UA: 'Назад', RU: 'Назад', EN: 'Back' },
  next: { PL: 'Dalej', UA: 'Далі', RU: 'Далее', EN: 'Next' },
  loading: { PL: 'Ładowanie...', UA: 'Завантаження...', RU: 'Загрузка...', EN: 'Loading...' },
  error: { PL: 'Błąd', UA: 'Помилка', RU: 'Ошибка', EN: 'Error' },
  success: { PL: 'Sukces', UA: 'Успіх', RU: 'Успех', EN: 'Success' },
  
  // Delivery Address
  legalAddress: { PL: 'Adres rejestrowy', UA: 'Юридична адреса', RU: 'Юридический адрес', EN: 'Legal Address' },
  deliveryAddress: { PL: 'Adres dostawy', UA: 'Адреса доставки', RU: 'Адрес доставки', EN: 'Delivery Address' },
  sameAsLegal: { PL: 'Taki sam jak adres rejestrowy', UA: 'Така ж як юридична адреса', RU: 'Такой же как юридический адрес', EN: 'Same as legal address' },
  streetAndNumber: { PL: 'Ulica i numer', UA: 'Вулиця та номер', RU: 'Улица и номер', EN: 'Street and house number' },
  postcodeAndCity: { PL: 'Kod pocztowy i miasto', UA: 'Поштовий індекс та місто', RU: 'Индекс и город', EN: 'Postcode and City' },
  deliveryInstructions: { PL: 'Instrukcje dostawy', UA: 'Інструкції по доставці', RU: 'Инструкции по доставке', EN: 'Delivery Instructions' },
  deliveryInstructionsPlaceholder: { PL: 'Kod do bramy, rampa lub piętro', UA: 'Код до воріт, інформація про рампу або поверх', RU: 'Код от ворот, инфо о рампе или этаж', EN: 'Gate code, ramp info, or floor' },
  addNewAddress: { PL: 'Dodaj nowy adres', UA: 'Додати нову адресу', RU: 'Добавить новый адрес', EN: 'Add New Address' },
  selectLocationOnMap: { PL: 'Wybierz lokalizację na mapie', UA: 'Виберіть місцезнаходження на карті', RU: 'Выберите местоположение на карте', EN: 'Select location on map' },
  
  // Additional common UI elements
  menu: { PL: 'Menu', UA: 'Меню', RU: 'Меню', EN: 'Menu' },
  or: { PL: 'lub', UA: 'або', RU: 'или', EN: 'or' },
  allRightsReserved: { PL: 'Wszelkie prawa zastrzeżone', UA: 'Всі права захищені', RU: 'Все права защищены', EN: 'All rights reserved' },
  emailPlaceholder: { PL: 'nazwa@firma.pl', UA: 'назва@компанія.ua', RU: 'имя@компания.ru', EN: 'name@company.com' },
  orderNumberPrefix: { PL: 'Numer zamówienia', UA: 'Номер замовлення', RU: 'Номер заказа', EN: 'Order Number' },
  
  // Settings additional fields
  companyAddress: { PL: 'Adres', UA: 'Адреса', RU: 'Адрес', EN: 'Address' },
  phone: { PL: 'Telefon', UA: 'Телефон', RU: 'Телефон', EN: 'Phone' },
  emailNotificationsOrders: { PL: 'Email o zamówieniach', UA: 'Email про замовлення', RU: 'Email о заказах', EN: 'Order emails' },
  emailNotificationsDeliveries: { PL: 'Email o dostawach', UA: 'Email про доставки', RU: 'Email о доставках', EN: 'Delivery emails' },
  smsNotifications: { PL: 'SMS o dostawach', UA: 'SMS про доставки', RU: 'SMS о доставках', EN: 'Delivery SMS' },
  systemTheme: { PL: 'System', UA: 'Система', RU: 'Система', EN: 'System' },
  lightTheme: { PL: 'Jasny', UA: 'Світла', RU: 'Светлая', EN: 'Light' },
  darkTheme: { PL: 'Ciemny', UA: 'Темна', RU: 'Темная', EN: 'Dark' },
  themeSettings: { PL: 'Motyw', UA: 'Тема', RU: 'Тема', EN: 'Theme' },
  languageSettings: { PL: 'Język', UA: 'Мова', RU: 'Язык', EN: 'Language' },
  ksefStatus: { PL: 'Status integracji KSeF', UA: 'Статус інтеграції KSeF', RU: 'Статус интеграции KSeF', EN: 'KSeF Integration Status' },
  ksefActive: { PL: 'Integracja KSeF aktywna. Wszystkie faktury są automatycznie wysyłane do systemu.', UA: 'Інтеграція KSeF активна. Усі рахунки автоматично надсилаються до системи.', RU: 'Интеграция KSeF активна. Все счета автоматически отправляются в систему.', EN: 'KSeF integration active. All invoices are automatically sent to the system.' },
  settingsSaved: { PL: 'Ustawienia zapisane pomyślnie!', UA: 'Налаштування успішно збережено!', RU: 'Настройки успешно сохранены!', EN: 'Settings saved successfully!' },
  
  // Product categories
  vegetablesFruits: { PL: 'Warzywa i owoce', UA: 'Овочі та фрукти', RU: 'Овощи и фрукты', EN: 'Vegetables & Fruits' },
  meatPoultry: { PL: 'Mięso i drób', UA: 'М\'ясо та птиця', RU: 'Мясо и птица', EN: 'Meat & Poultry' },
  dairy: { PL: 'Nabiał', UA: 'Молочні продукти', RU: 'Молочные продукты', EN: 'Dairy' },
  bakery: { PL: 'Pieczywo', UA: 'Хлібобулочні вироби', RU: 'Хлебобулочные изделия', EN: 'Bakery' },
  beverages: { PL: 'Napoje', UA: 'Напої', RU: 'Напитки', EN: 'Beverages' },
  
  // Filter options
  aiRecommended: { PL: 'Rekomendowane przez AI', UA: 'Рекомендовано AI', RU: 'Рекомендовано AI', EN: 'AI Recommended' },
  localFarmers: { PL: 'Lokalni dostawcy', UA: 'Місцеві постачальники', RU: 'Местные поставщики', EN: 'Local Farmers' },
  fastDeliveryFilter: { PL: 'Szybka dostawa 24h', UA: 'Швидка доставка 24г', RU: 'Быстрая доставка 24ч', EN: 'Fast Delivery 24h' },
  clearAll: { PL: 'Wyczyść wszystko', UA: 'Очистити все', RU: 'Очистить все', EN: 'Clear All' },
  apply: { PL: 'Zastosuj', UA: 'Застосувати', RU: 'Применить', EN: 'Apply' },
  
  // Order Request (Logistics Driver)
  incomingRequest: { PL: 'Nowe zlecenie', UA: 'Нове замовлення', RU: 'Новый заказ', EN: 'Incoming Request' },
  acceptRequest: { PL: 'Przyjmij zlecenie', UA: 'Прийняти', RU: 'Принять', EN: 'Accept' },
  declineRequest: { PL: 'Odrzuć', UA: 'Відхилити', RU: 'Отклонить', EN: 'Decline' },
  estimatedEarnings: { PL: 'Szacowany zarobek', UA: 'Очікуваний заробіток', RU: 'Расчетный заработок', EN: 'Estimated Earnings' },
  totalDistance: { PL: 'Całkowity dystans', UA: 'Загальна відстань', RU: 'Общее расстояние', EN: 'Total Distance' },
  farmPickup: { PL: 'Odbiór - Farma', UA: 'Забір - Ферма', RU: 'Забор - Ферма', EN: 'Farm Pickup' },
  restaurantDelivery: { PL: 'Dostawa - Restauracja', UA: 'Доставка - Ресторан', RU: 'Доставка - Ресторан', EN: 'Restaurant Delivery' },
  navigate: { PL: 'Nawiguj', UA: 'Навігація', RU: 'Навигация', EN: 'Navigate' },
  requestAccepted: { PL: 'Zlecenie przyjęte!', UA: 'Замовлення прийнято!', RU: 'Заказ принят!', EN: 'Request Accepted!' },
  requestDeclined: { PL: 'Zlecenie odrzucone', UA: 'Замовлення відхилено', RU: 'Заказ отклонен', EN: 'Request Declined' },
  secondsRemaining: { PL: 'sek', UA: 'сек', RU: 'сек', EN: 'sec' },
  routeToPickup: { PL: 'Trasa do odbioru', UA: 'Маршрут до забору', RU: 'Маршрут к забору', EN: 'Route to Pickup' },
  
  // Months (short)
  monthJan: { PL: 'Sty', UA: 'Січ', RU: 'Янв', EN: 'Jan' },
  monthFeb: { PL: 'Lut', UA: 'Лют', RU: 'Фев', EN: 'Feb' },
  monthMar: { PL: 'Mar', UA: 'Бер', RU: 'Мар', EN: 'Mar' },
  monthApr: { PL: 'Kwi', UA: 'Кві', RU: 'Апр', EN: 'Apr' },
  monthMay: { PL: 'Maj', UA: 'Тра', RU: 'Май', EN: 'May' },
  monthJun: { PL: 'Cze', UA: 'Чер', RU: 'Июн', EN: 'Jun' },
  monthJul: { PL: 'Lip', UA: 'Лип', RU: 'Июл', EN: 'Jul' },
  monthAug: { PL: 'Sie', UA: 'Сер', RU: 'Авг', EN: 'Aug' },
  monthSep: { PL: 'Wrz', UA: 'Вер', RU: 'Сен', EN: 'Sep' },
  monthOct: { PL: 'Paź', UA: 'Жов', RU: 'Окт', EN: 'Oct' },
  monthNov: { PL: 'Lis', UA: 'Лис', RU: 'Ноя', EN: 'Nov' },
  monthDec: { PL: 'Gru', UA: 'Гру', RU: 'Дек', EN: 'Dec' },
  
  // Product names
  tomatoesRaspberry: { PL: 'Pomidory malinowe', UA: 'Помідори малинові', RU: 'Помидоры малиновые', EN: 'Raspberry Tomatoes' },
  lettuceButter: { PL: 'Sałata masłowa', UA: 'Салат маслянистий', RU: 'Салат масляный', EN: 'Butter Lettuce' },
  carrotsYoung: { PL: 'Marchew młoda', UA: 'Морква молода', RU: 'Морковь молодая', EN: 'Young Carrots' },
  cucumbersGreenhouse: { PL: 'Ogórki szklarniowe', UA: 'Огірки тепличні', RU: 'Огурцы тепличные', EN: 'Greenhouse Cucumbers' },
  lettuceIceberg: { PL: 'Sałata lodowa', UA: 'Салат айсберг', RU: 'Салат айсберг', EN: 'Iceberg Lettuce' },
  carrots: { PL: 'Marchew', UA: 'Морква', RU: 'Морковь', EN: 'Carrots' },
  applesGala: { PL: 'Jabłka Gala', UA: 'Яблука Гала', RU: 'Яблоки Гала', EN: 'Gala Apples' },
  strawberries: { PL: 'Truskawki', UA: 'Полуниці', RU: 'Клубника', EN: 'Strawberries' },
  potatoes: { PL: 'Ziemniaki', UA: 'Картопля', RU: 'Картофель', EN: 'Potatoes' },
  onion: { PL: 'Cebula', UA: 'Цибуля', RU: 'Лук', EN: 'Onion' },
  cabbage: { PL: 'Kapusta', UA: 'Капуста', RU: 'Капуста', EN: 'Cabbage' },
  eggplant: { PL: 'Bakłażan', UA: 'Баклажан', RU: 'Баклажан', EN: 'Eggplant' },
  bellPepper: { PL: 'Papryka słodka', UA: 'Перець солодкий', RU: 'Перец сладкий', EN: 'Bell Pepper' },
  zucchini: { PL: 'Cukinia', UA: 'Кабачок', RU: 'Кабачок', EN: 'Zucchini' },
  pumpkin: { PL: 'Dynia', UA: 'Гарбуз', RU: 'Тыква', EN: 'Pumpkin' },
  beets: { PL: 'Buraki', UA: 'Буряк', RU: 'Свекла', EN: 'Beets' },
  radish: { PL: 'Rzodkiewka', UA: 'Редиска', RU: 'Редис', EN: 'Radish' },
  broccoli: { PL: 'Brokuł', UA: 'Броколі', RU: 'Брокколи', EN: 'Broccoli' },
  cauliflower: { PL: 'Kalafior', UA: 'Цвітна капуста', RU: 'Цветная капуста', EN: 'Cauliflower' },
  pears: { PL: 'Gruszki', UA: 'Груші', RU: 'Груши', EN: 'Pears' },
  plums: { PL: 'Śliwki', UA: 'Сливи', RU: 'Сливы', EN: 'Plums' },
  blueberries: { PL: 'Jagody', UA: 'Чорниця', RU: 'Черника', EN: 'Blueberries' },
  raspberries: { PL: 'Maliny', UA: 'Малина', RU: 'Малина', EN: 'Raspberries' },
  cherries: { PL: 'Czereśnie', UA: 'Черешня', RU: 'Черешня', EN: 'Cherries' },
  parsley: { PL: 'Pietruszka', UA: 'Петрушка', RU: 'Петрушка', EN: 'Parsley' },
  dill: { PL: 'Koperek', UA: 'Кріп', RU: 'Укроп', EN: 'Dill' },
  basil: { PL: 'Bazylia', UA: 'Базилік', RU: 'Базилик', EN: 'Basil' },
  arugula: { PL: 'Rukola', UA: 'Рукола', RU: 'Руккола', EN: 'Arugula' },
  spinach: { PL: 'Szpinak', UA: 'Шпинат', RU: 'Шпинат', EN: 'Spinach' },
  mushrooms: { PL: 'Pieczarki', UA: 'Печериці', RU: 'Шампиньоны', EN: 'Button Mushrooms' },
  oysterMushrooms: { PL: 'Boczniaki', UA: 'Гливи', RU: 'Вешенки', EN: 'Oyster Mushrooms' },
  garlic: { PL: 'Czosnek', UA: 'Часник', RU: 'Чеснок', EN: 'Garlic' },
  
  // Category names
  vegetables: { PL: 'Warzywa', UA: 'Овочі', RU: 'Овощи', EN: 'Vegetables' },
  fruits: { PL: 'Owoce', UA: 'Фрукти', RU: 'Фрукты', EN: 'Fruits' },
  herbs: { PL: 'Zioła', UA: 'Зелень', RU: 'Зелень', EN: 'Herbs' },
  mushroomsCategory: { PL: 'Grzyby', UA: 'Гриби', RU: 'Грибы', EN: 'Mushrooms' },
  all: { PL: 'Wszystkie', UA: 'Всі', RU: 'Все', EN: 'All' },
  
  // Units
  kg: { PL: 'kg', UA: 'кг', RU: 'кг', EN: 'kg' },
  pcs: { PL: 'szt', UA: 'шт', RU: 'шт', EN: 'pcs' },
  bunch: { PL: 'pęczek', UA: 'пучок', RU: 'пучок', EN: 'bunch' },
  
  // Additional farmer dashboard
  totalRevenue: { PL: 'Całkowity przychód', UA: 'Загальний дохід', RU: 'Общий доход', EN: 'Total Revenue' },
  incomingOrders: { PL: 'Przychodzące zamówienia', UA: 'Вхідні замовлення', RU: 'Входящие заказы', EN: 'Incoming Orders' },
  logisticsTracking: { PL: 'Śledzenie logistyki', UA: 'Відстеження логістики', RU: 'Отслеживание логистики', EN: 'Logistics Tracking' },
  proximity: { PL: 'Odległość', UA: 'Відстань', RU: 'Расстояние', EN: 'Proximity' },
  kmAway: { PL: 'km', UA: 'км', RU: 'км', EN: 'km away' },
  viewOnMap: { PL: 'Zobacz na mapie', UA: 'Подивитися на карті', RU: 'Посмотреть на карте', EN: 'View on Map' },
  currentStock: { PL: 'Aktualny stan magazynowy', UA: 'Поточний запас', RU: 'Текущий запас', EN: 'Current Stock' },
  
  // Farmer Profile Fields
  farmType: { PL: 'Typ gospodarstwa', UA: 'Тип господарства', RU: 'Тип хозяйства', EN: 'Farm Type' },
  farmTypeVegetables: { PL: 'Warzywa', UA: 'Овочі', RU: 'Овощеводство', EN: 'Vegetables' },
  farmTypeFruits: { PL: 'Owoce', UA: 'Фрукти', RU: 'Фруктовый сад', EN: 'Fruits' },
  farmTypeDairy: { PL: 'Nabiał', UA: 'Молочна ферма', RU: 'Молочная ферма', EN: 'Dairy Farm' },
  farmTypeMeat: { PL: 'Hodowla', UA: 'Тваринництво', RU: 'Животноводство', EN: 'Livestock' },
  farmTypeMixed: { PL: 'Mieszane', UA: 'Змішане', RU: 'Смешанное', EN: 'Mixed Farm' },
  farmTypeOrganic: { PL: 'Ekologiczne', UA: 'Органічне', RU: 'Органическое', EN: 'Organic' },
  regon: { PL: 'REGON', UA: 'REGON', RU: 'REGON', EN: 'REGON' },
  warehouseLocation: { PL: 'Lokalizacja magazynu', UA: 'Розташування складу', RU: 'Локация склада', EN: 'Warehouse Location' },
  setOnMap: { PL: 'Ustaw na mapie', UA: 'Встановити на карті', RU: 'Установить на карте', EN: 'Set on Map' },
  certifications: { PL: 'Certyfikaty', UA: 'Сертифікати', RU: 'Сертификаты', EN: 'Certifications' },
  ekoBioCertificate: { PL: 'Certyfikat Eko/Bio', UA: 'Сертифікат Еко/Біо', RU: 'Сертификат Эко/Био', EN: 'Eco/Bio Certificate' },
  uploadCertificate: { PL: 'Prześlij certyfikat', UA: 'Завантажити сертифікат', RU: 'Загрузить сертификат', EN: 'Upload Certificate' },
  certificateUploaded: { PL: 'Certyfikat przesłany', UA: 'Сертифікат завантажено', RU: 'Сертификат загружен', EN: 'Certificate Uploaded' },
  certificateVerified: { PL: 'Zweryfikowany', UA: 'Верифіковано', RU: 'Верифицирован', EN: 'Verified' },
  certificatePending: { PL: 'Oczekuje', UA: 'Очікування', RU: 'Ожидание', EN: 'Pending' },
  certificateRejected: { PL: 'Odrzucony', UA: 'Відхилено', RU: 'Отклонен', EN: 'Rejected' },
  
  // Restaurant Profile Fields
  cuisineType: { PL: 'Typ kuchni', UA: 'Тип кухні', RU: 'Тип кухни', EN: 'Cuisine Type' },
  cuisineItalian: { PL: 'Włoska', UA: 'Італійська', RU: 'Итальянская', EN: 'Italian' },
  cuisinePolish: { PL: 'Polska', UA: 'Польська', RU: 'Польская', EN: 'Polish' },
  cuisineAsian: { PL: 'Azjatycka', UA: 'Азіатська', RU: 'Азиатская', EN: 'Asian' },
  cuisineVegan: { PL: 'Wegańska', UA: 'Веганська', RU: 'Веганская', EN: 'Vegan' },
  cuisineBurger: { PL: 'Burger', UA: 'Бургери', RU: 'Бургерная', EN: 'Burger' },
  cuisineFusion: { PL: 'Fusion', UA: 'Ф\'южн', RU: 'Фьюжн', EN: 'Fusion' },
  cuisineMediterranean: { PL: 'Śródziemnomorska', UA: 'Середземноморська', RU: 'Средиземноморская', EN: 'Mediterranean' },
  deliveryWindow: { PL: 'Okno przyjęcia towaru', UA: 'Вікно прийому товару', RU: 'Окно приемки товара', EN: 'Delivery Window' },
  deliveryWindowFrom: { PL: 'Od godziny', UA: 'З години', RU: 'С часа', EN: 'From' },
  deliveryWindowTo: { PL: 'Do godziny', UA: 'До години', RU: 'До часа', EN: 'To' },
  deliveryWindowExample: { PL: 'np. 6:00 - 10:00', UA: 'наприклад 6:00 - 10:00', RU: 'напр. 6:00 - 10:00', EN: 'e.g. 6:00 - 10:00' },
  invoiceDetails: { PL: 'Dane do faktur', UA: 'Дані для рахунків', RU: 'Данные для счетов', EN: 'Invoice Details' },
  fullCompanyName: { PL: 'Pełna nazwa firmy', UA: 'Повна назва компанії', RU: 'Полное название компании', EN: 'Full Company Name' },
  invoiceAddress: { PL: 'Adres do faktury', UA: 'Адреса для рахунку', RU: 'Адрес для счета', EN: 'Invoice Address' },
  averagePurchaseVolume: { PL: 'Średni wolumen zakupów', UA: 'Середній обсяг закупівель', RU: 'Средний объем закупок', EN: 'Average Purchase Volume' },
  volumeSmall: { PL: 'Mały (do 5000 zł/mies)', UA: 'Малий (до 5000 zł/міс)', RU: 'Малый (до 5000 zł/мес)', EN: 'Small (up to 5000 PLN/mo)' },
  volumeMedium: { PL: 'Średni (5000-15000 zł/mies)', UA: 'Середній (5000-15000 zł/міс)', RU: 'Средний (5000-15000 zł/мес)', EN: 'Medium (5000-15000 PLN/mo)' },
  volumeLarge: { PL: 'Duży (powyżej 15000 zł/mies)', UA: 'Великий (понад 15000 zł/міс)', RU: 'Большой (свыше 15000 zł/мес)', EN: 'Large (over 15000 PLN/mo)' },
  selectCuisineType: { PL: 'Wybierz typ kuchni', UA: 'Оберіть тип кухні', RU: 'Выберите тип кухни', EN: 'Select Cuisine Type' },
  selectFarmType: { PL: 'Wybierz typ gospodarstwa', UA: 'Оберіть тип господарства', RU: 'Выберите тип хозяйства', EN: 'Select Farm Type' },
  selectVolume: { PL: 'Wybierz wolumen', UA: 'Оберіть обсяг', RU: 'Выберите объем', EN: 'Select Volume' },
  businessProfile: { PL: 'Profil biznesowy', UA: 'Бізнес-профіль', RU: 'Бизнес-профиль', EN: 'Business Profile' },
  completeProfile: { PL: 'Uzupełnij profil', UA: 'Заповніть профіль', RU: 'Заполните профиль', EN: 'Complete Profile' },
  
  // Registration specific
  businessProfileRegistration: { PL: 'dane będą widoczne w profilu biznesowym', UA: 'дані будуть видимі в бізнес-профілі', RU: 'данные будут видны в бизнес-профиле', EN: 'data will be visible in business profile' },
  whyAsk: { PL: 'Dlaczego pytamy?', UA: 'Чому запитуємо?', RU: 'Почему спрашиваем?', EN: 'Why do we ask?' },
  aiWillMatchProducts: { PL: 'AI będzie lepiej dobierać produkty', UA: 'ШІ буде краще підбирати продукти', RU: 'ИИ будет лучше подбирать продукты', EN: 'AI will better match products' },
  restaurantsWillFindYou: { PL: 'Restauracje łatwiej Cię znajdą', UA: 'Ресторани легше Вас знайдуть', RU: 'Рестораны легче Вас найдут', EN: 'Restaurants will find you easier' },
  betterInvoicing: { PL: 'Lepsze fakturowanie z NIP', UA: 'Краще виставлення рахунків з NIP', RU: 'Лучше выставление счетов с NIP', EN: 'Better invoicing with NIP' },
  aiWillBetterMatch: { PL: 'AI będzie lepiej dobierać dostawców', UA: 'ШІ буде краще підбирати постачальників', RU: 'ИИ будет лучше подбирать поставщиков', EN: 'AI will better match suppliers' },
  farmersWillReserve: { PL: 'Farmerzy zarezerwują dla Ciebie towary', UA: 'Фермери зарезервують для Вас товари', RU: 'Фермеры зарезервируют для Вас товары', EN: 'Farmers will reserve goods for you' },
  discountsForVolume: { PL: 'Możliwe rabaty przy większych wolumenach', UA: 'Можливі знижки при більших обсягах', RU: 'Возможны скидки при больших объемах', EN: 'Possible discounts for larger volumes' },
  driversWillSeeTimeWindow: { PL: 'Kierowcy zobaczą ten przedział czasowy przy wyborze trasy', UA: 'Водії побачать цей часовий проміжок при виборі маршруту', RU: 'Водители увидят этот временной промежуток при выборе маршрута', EN: 'Drivers will see this time window when choosing route' },
  selectMultipleFarmTypes: { PL: 'Wybierz jeden lub więcej typów (możesz kliknąć kilka)', UA: 'Оберіть один або кілька типів (можна вибрати кілька)', RU: 'Выберите один или несколько типов (можно выбрать несколько)', EN: 'Select one or more types (you can select multiple)' },
  selectedCategories: { PL: 'Wybrane kategorie', UA: 'Обрані категорії', RU: 'Выбранные категории', EN: 'Selected Categories' },
  filterByCategory: { PL: 'Filtruj dane po kategorii w Analityce', UA: 'Фільтруйте дані за категорією в Аналітиці', RU: 'Фильтруйте данные по категории в Аналитике', EN: 'Filter data by category in Analytics' },
  addFirstVenue: { PL: 'Dodaj pierwszy lokal', UA: 'Додати перший заклад', RU: 'Добавить первое заведение', EN: 'Add First Venue' },
  addFirstVenueSubtitle: { PL: 'Podaj szczegóły pierwszej lokalizacji - możesz dodać więcej później w ustawieniach', UA: 'Вкажіть деталі першої локації - можна додати більше пізніше в налаштуваннях', RU: 'Укажите детали первой локации - можно добавить больше позже в настройках', EN: 'Enter details for your first location - you can add more later in settings' },
  venueName: { PL: 'Nazwa lokalu', UA: 'Назва закладу', RU: 'Название заведения', EN: 'Venue Name' },
  venueNamePlaceholder: { PL: 'np. Trattoria Bella Vista', UA: 'напр. Тратторія Белла Віста', RU: 'напр. Тратория Белла Виста', EN: 'e.g. Trattoria Bella Vista' },
  venueAddress: { PL: 'Adres lokalu', UA: 'Адреса закладу', RU: 'Адрес заведения', EN: 'Venue Address' },
  venueAddressPlaceholder: { PL: 'ul. Marszałkowska 45, 00-001 Warszawa', UA: 'вул. Маршалковська 45, 00-001 Варшава', RU: 'ул. Маршалковская 45, 00-001 Варшава', EN: 'ul. Marszałkowska 45, 00-001 Warsaw' },
  canAddMoreVenues: { PL: 'Możesz dodać więcej lokalizacji później', UA: 'Можна додати більше локацій пізніше', RU: 'Можно добавить больше локаций позже', EN: 'You can add more venues later' },
  switchBetweenVenues: { PL: 'Przełączaj się między lokalami w menu', UA: 'Перемикайтеся між закладами в меню', RU: 'Переключайтесь между заведениями в меню', EN: 'Switch between venues in the menu' },
  allVenues: { PL: 'Wszystkie lokale', UA: 'Всі заклади', RU: 'Все заведения', EN: 'All Venues' },
  switchVenue: { PL: 'Przełącz lokal', UA: 'Переключити заклад', RU: 'Переключить заведение', EN: 'Switch Venue' },
  manageVenues: { PL: 'Zarządzaj lokalami', UA: 'Керувати закладами', RU: 'Управление заведениями', EN: 'Manage Venues' },
  selectVenue: { PL: 'Wybierz lokal', UA: 'Виберіть заклад', RU: 'Выберите заведение', EN: 'Select Venue' },
  viewAllData: { PL: 'Zobacz dane ze wszystkich lokalizacji', UA: 'Переглянути дані з усіх локацій', RU: 'Просмотр данных из всех локаций', EN: 'View data from all locations' },
  viewingDataFor: { PL: 'Przeglądasz dane dla', UA: 'Переглядаєте дані для', RU: 'Просматриваете данные для', EN: 'Viewing data for' },
  viewingAllVenues: { PL: 'Wszystkie lokale - widok zbiorczy', UA: 'Всі заклади - зведений вигляд', RU: 'Все заведения - сводный вид', EN: 'All Venues - Combined View' },
  combinedDataFrom: { PL: 'Połączone dane z', UA: 'Об\'єднані дані з', RU: 'Объединенные данные из', EN: 'Combined data from' },
  locations: { PL: 'lokalizacji', UA: 'локацій', RU: 'локаций', EN: 'locations' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
LanguageContext.displayName = 'LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load language from localStorage or default to 'PL'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('plon-language');
      console.log(`[Plon LanguageContext] Loading language from localStorage: ${savedLanguage}`);
      if (savedLanguage && ['PL', 'UA', 'RU', 'EN'].includes(savedLanguage)) {
        console.log(`[Plon LanguageContext] Using saved language: ${savedLanguage}`);
        return savedLanguage as Language;
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
    console.log(`[Plon LanguageContext] Using default language: PL`);
    return 'PL';
  });

  // Wrapper to save language to localStorage whenever it changes
  const setLanguage = (lang: Language) => {
    console.log(`[Plon LanguageContext] Setting language to: ${lang}`);
    try {
      localStorage.setItem('plon-language', lang);
      console.log(`[Plon LanguageContext] Saved to localStorage: ${lang}`);
      setLanguageState(lang);
      console.log(`[Plon LanguageContext] State updated to: ${lang}`);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
      // Still update state even if localStorage fails
      setLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.displayName = 'LanguageProvider';

// Hook with HMR safety - provides fallback values if context is unavailable
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values during HMR to prevent crashes
    // This is expected behavior during development hot reloading
    // Try to get language from localStorage for fallback
    let fallbackLang: Language = 'PL';
    try {
      const savedLanguage = localStorage.getItem('plon-language');
      if (savedLanguage && ['PL', 'UA', 'RU', 'EN'].includes(savedLanguage)) {
        fallbackLang = savedLanguage as Language;
      }
    } catch (error) {
      // Ignore localStorage errors during HMR
    }
    
    return {
      language: fallbackLang,
      setLanguage: (lang: Language) => {
        // Even during HMR, try to save to localStorage
        try {
          localStorage.setItem('plon-language', lang);
        } catch (error) {
          console.warn('Failed to save language during HMR:', error);
        }
      },
      t: (key: string) => translations[key]?.[fallbackLang] || key,
    };
  }
  return context;
};