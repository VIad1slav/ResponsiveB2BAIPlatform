import React, { useState } from 'react';
import { ArrowLeft, Package, MapPin, Phone, Mail, Clock, CheckCircle, XCircle, Truck, User, FileText, Printer } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { InvoiceView } from './invoice-view';

interface OrderItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
}

interface FarmerOrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export const FarmerOrderDetail: React.FC<FarmerOrderDetailProps> = ({ orderId, onBack }) => {
  const { language } = useLanguage();

  const [orderStatus, setOrderStatus] = useState<'toPack' | 'waitingForDriver' | 'inTransit' | 'delivered'>('toPack');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  // Mock order data based on orderId
  const orderData = {
    id: orderId,
    orderNumber: orderId,
    date: '2025-01-20',
    time: '14:30',
    status: orderStatus,
    restaurant: {
      name: 'Restauracja "Pod Różą"',
      address: 'ul. Floriańska 14, 31-019 Kraków',
      contact: 'Jan Kowalski',
      phone: '+48 123 456 789',
      email: 'kontakt@podroza.pl',
      nip: 'PL1234567890'
    },
    items: [
      {
        id: '1',
        name: 'Świeże pomidory malinowe',
        emoji: '🍅',
        quantity: 25,
        unit: 'kg',
        pricePerUnit: 12.50,
        total: 312.50
      },
      {
        id: '2',
        name: 'Sałata lodowa',
        emoji: '🥬',
        quantity: 15,
        unit: 'kg',
        pricePerUnit: 8.90,
        total: 133.50
      },
      {
        id: '3',
        name: 'Ogórki szklarniowe',
        emoji: '🥒',
        quantity: 20,
        unit: 'kg',
        pricePerUnit: 11.20,
        total: 224.00
      },
      {
        id: '4',
        name: 'Marchewka młoda',
        emoji: '🥕',
        quantity: 30,
        unit: 'kg',
        pricePerUnit: 7.50,
        total: 225.00
      },
      {
        id: '5',
        name: 'Papryka czerwona',
        emoji: '🫑',
        quantity: 12,
        unit: 'kg',
        pricePerUnit: 15.80,
        total: 189.60
      },
      {
        id: '6',
        name: 'Cebula biała',
        emoji: '🧅',
        quantity: 18,
        unit: 'kg',
        pricePerUnit: 5.20,
        total: 93.60
      },
      {
        id: '7',
        name: 'Ziemniaki młode',
        emoji: '🥔',
        quantity: 50,
        unit: 'kg',
        pricePerUnit: 4.80,
        total: 240.00
      },
      {
        id: '8',
        name: 'Czosnek świeży',
        emoji: '🧄',
        quantity: 5,
        unit: 'kg',
        pricePerUnit: 18.50,
        total: 92.50
      }
    ] as OrderItem[],
    notes: language === 'PL' ? 'Proszę o dostawę przed 8:00 rano. Produkty potrzebne na lunch.' :
           language === 'RU' ? 'Пожалуйста, доставьте до 8:00 утра. Продукты нужны для обеда.' :
           language === 'UA' ? 'Будь ласка, доставте до 8:00 ранку. Продукти потрібні для обіду.' :
           'Please deliver before 8:00 AM. Products needed for lunch.',
    deliveryDate: '2025-01-21',
    deliveryTime: '07:00-08:00'
  };

  const totalAmount = orderData.items.reduce((sum, item) => sum + item.total, 0);
  const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'toPack': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'waitingForDriver': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'inTransit': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      default: return 'bg-secondary text-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'toPack': return language === 'PL' ? 'Do spakowania' : language === 'RU' ? 'К упаковке' : language === 'UA' ? 'До пакування' : 'To Pack';
      case 'waitingForDriver': return language === 'PL' ? 'Oczekuje na kierowcę' : language === 'RU' ? 'Ожидает водителя' : language === 'UA' ? 'Очікує водія' : 'Waiting for Driver';
      case 'inTransit': return language === 'PL' ? 'W transporcie' : language === 'RU' ? 'В пути' : language === 'UA' ? 'У дорозі' : 'In Transit';
      case 'delivered': return language === 'PL' ? 'Dostarczono' : language === 'RU' ? 'Доставлено' : language === 'UA' ? 'Доставлено' : 'Delivered';
      default: return status;
    }
  };

  const handleAcceptOrder = () => {
    setOrderStatus('waitingForDriver');
    setShowConfirmDialog(false);
    // Here would be API call to accept order
  };

  const handleRejectOrder = () => {
    setShowRejectDialog(false);
    // Here would be API call to reject order
    setTimeout(() => onBack(), 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'PL' ? 'Drukuj' : language === 'RU' ? 'Печать' : language === 'UA' ? 'Друк' : 'Print'}
              </span>
            </button>
            {/* Temporary test button to simulate delivery */}
            <button
              onClick={() => setOrderStatus('delivered')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg transition-all hover:bg-emerald-600"
            >
              <CheckCircle className="w-4 h-4" />
              Test Delivery
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        {/* Order Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {language === 'PL' ? 'Zamówienie' : language === 'RU' ? 'Заказ' : language === 'UA' ? 'Замовлення' : 'Order'} #{orderData.orderNumber}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {orderData.date} {language === 'PL' ? 'o' : language === 'RU' ? 'в' : language === 'UA' ? 'о' : 'at'} {orderData.time}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg border font-semibold ${getStatusColor(orderData.status)}`}>
              {getStatusLabel(orderData.status)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items List */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {language === 'PL' ? 'Zamówione produkty' : language === 'RU' ? 'Заказанные продукты' : language === 'UA' ? 'Замовлені продукти' : 'Ordered Products'}
                <span className="text-sm text-muted-foreground font-normal ml-auto">
                  {orderData.items.length} {language === 'PL' ? 'pozycji' : language === 'RU' ? 'позиций' : language === 'UA' ? 'позицій' : 'items'}
                </span>
              </h2>
              
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.quantity} {item.unit}</span>
                        <span>×</span>
                        <span>{item.pricePerUnit.toFixed(2)} zł</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground text-lg">{item.total.toFixed(2)} zł</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>{language === 'PL' ? 'Łączna ilość' : language === 'RU' ? 'Общее количество' : language === 'UA' ? 'Загальна кількість' : 'Total Quantity'}:</span>
                  <span className="font-semibold">{totalItems} kg</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{language === 'PL' ? 'Pozycji' : language === 'RU' ? 'Позиций' : language === 'UA' ? 'Позицій' : 'Items'}:</span>
                  <span className="font-semibold">{orderData.items.length}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-border">
                  <span>{language === 'PL' ? 'Razem' : language === 'RU' ? 'Итого' : language === 'UA' ? 'Разом' : 'Total'}:</span>
                  <span className="text-primary">{totalAmount.toFixed(2)} zł</span>
                </div>
              </div>
            </div>

            {/* Delivery Notes */}
            {orderData.notes && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {language === 'PL' ? 'Uwagi do zamówienia' : language === 'RU' ? 'Примечания к заказу' : language === 'UA' ? 'Примітки до замовлення' : 'Order Notes'}
                </h2>
                <p className="text-muted-foreground">{orderData.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Restaurant Info & Actions */}
          <div className="space-y-6">
            {/* Restaurant Information */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {language === 'PL' ? 'Informacje o restauracji' : language === 'RU' ? 'Информация о ресторане' : language === 'UA' ? 'Інформація про ресторан' : 'Restaurant Information'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'PL' ? 'Nazwa' : language === 'RU' ? 'Название' : language === 'UA' ? 'Назва' : 'Name'}
                  </p>
                  <p className="font-semibold text-foreground">{orderData.restaurant.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {language === 'PL' ? 'Adres' : language === 'RU' ? 'Адрес' : language === 'UA' ? 'Адреса' : 'Address'}
                  </p>
                  <p className="text-foreground">{orderData.restaurant.address}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === 'PL' ? 'Kontakt' : language === 'RU' ? 'Контакт' : language === 'UA' ? 'Контакт' : 'Contact'}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{orderData.restaurant.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${orderData.restaurant.phone}`} className="text-primary hover:underline">
                        {orderData.restaurant.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${orderData.restaurant.email}`} className="text-primary hover:underline break-all">
                        {orderData.restaurant.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">NIP</p>
                  <p className="font-mono text-foreground">{orderData.restaurant.nip}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                {language === 'PL' ? 'Dostawa' : language === 'RU' ? 'Доставка' : language === 'UA' ? 'Доставка' : 'Delivery'}
              </h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'PL' ? 'Data dostawy' : language === 'RU' ? 'Дата доставки' : language === 'UA' ? 'Дата доставки' : 'Delivery Date'}
                  </p>
                  <p className="font-semibold text-foreground">{orderData.deliveryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'PL' ? 'Godziny dostawy' : language === 'RU' ? 'Время доставки' : language === 'UA' ? 'Час доставки' : 'Delivery Time'}
                  </p>
                  <p className="font-semibold text-foreground">{orderData.deliveryTime}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {orderData.status === 'toPack' && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {language === 'PL' ? 'Potwierdź i przygotuj' : language === 'RU' ? 'Подтвердить и приготовить' : language === 'UA' ? 'Підтвердити та приготувати' : 'Accept & Prepare'}
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-6 py-4 bg-red-500/10 text-red-600 border border-red-500/20 rounded-xl font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  {language === 'PL' ? 'Odrzuć zamówienie' : language === 'RU' ? 'Отклонить заказ' : language === 'UA' ? 'Відхилити замовлення' : 'Reject Order'}
                </button>
              </div>
            )}

            {orderData.status === 'waitingForDriver' && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                  <Truck className="w-5 h-5 inline mr-2" />
                  {language === 'PL' ? 'Zamówienie przygotowane i czeka na odbiór przez kierowcę' :
                   language === 'RU' ? 'Заказ готов и ожидает водителя' :
                   language === 'UA' ? 'Замовлення готове і чекає на водія' :
                   'Order is ready and waiting for driver pickup'}
                </p>
              </div>
            )}

            {orderData.status === 'delivered' && (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center font-semibold">
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    {language === 'PL' ? 'Zamówienie dostarczone' :
                     language === 'RU' ? 'Заказ доставлен' :
                     language === 'UA' ? 'Замовлення доставлено' :
                     'Order delivered'}
                  </p>
                </div>
                <button
                  onClick={() => setShowInvoice(true)}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  {language === 'PL' ? 'Wyświetl fakturę' : language === 'RU' ? 'Показать счет-фактуру' : language === 'UA' ? 'Показати фактуру' : 'View Invoice'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice View */}
      {showInvoice && (
        <InvoiceView orderId={orderId} onClose={() => setShowInvoice(false)} />
      )}

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {language === 'PL' ? 'Potwierdzić zamówienie?' : language === 'RU' ? 'Подтвердить заказ?' : language === 'UA' ? 'Підтвердити замовлення?' : 'Confirm Order?'}
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              {language === 'PL' ? 'Po potwierdzeniu zamówienie zostanie oznaczone jako gotowe do odbioru przez kierowcę.' :
               language === 'RU' ? 'После подтверждения заказ будет помечен как готовый к отправке водителем.' :
               language === 'UA' ? 'Після підтвердження замовлення буде позначено як готове до відправки водієм.' :
               'After confirmation, the order will be marked as ready for driver pickup.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
              >
                {language === 'PL' ? 'Anuluj' : language === 'RU' ? 'Отмена' : language === 'UA' ? 'Скасувати' : 'Cancel'}
              </button>
              <button
                onClick={handleAcceptOrder}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                {language === 'PL' ? 'Potwierdź' : language === 'RU' ? 'Подтвердить' : language === 'UA' ? 'Підтвердити' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {language === 'PL' ? 'Odrzucić zamówienie?' : language === 'RU' ? 'Отклонить заказ?' : language === 'UA' ? 'Відхилити замовлення?' : 'Reject Order?'}
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              {language === 'PL' ? 'Czy na pewno chcesz odrzucić to zamówienie? Tej akcji nie można cofnąć.' :
               language === 'RU' ? 'Вы уверены, что хотите отклонить этот заказ? Это действие нельзя отменить.' :
               language === 'UA' ? 'Ви впевнені, що хочете відхилити це замовлення? Цю дію не можна скасувати.' :
               'Are you sure you want to reject this order? This action cannot be undone.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="flex-1 px-4 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
              >
                {language === 'PL' ? 'Anuluj' : language === 'RU' ? 'Отмена' : language === 'UA' ? 'Скасувати' : 'Cancel'}
              </button>
              <button
                onClick={handleRejectOrder}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                {language === 'PL' ? 'Odrzuć' : language === 'RU' ? 'Отклонить' : language === 'UA' ? 'Відхилити' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FarmerOrderDetail.displayName = 'FarmerOrderDetail';