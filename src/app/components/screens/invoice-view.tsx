import React from 'react';
import { X, Download, Printer, FileText, CheckCircle, MapPin, Package } from 'lucide-react';
import { useLanguage } from '../../context/language-context';

interface InvoiceItem {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  vat: number;
  total: number;
}

interface DeliveryData {
  driverName: string;
  driverId: string;
  pickupName: string;
  pickupAddress: string;
  deliveryName: string;
  deliveryAddress: string;
  cargo: string;
  distance: number;
  baseFare: number;
  distanceRate: number;
  totalEarnings: number;
  completedDate: string;
}

interface InvoiceViewProps {
  orderId: string;
  onClose: () => void;
  deliveryMode?: boolean;
  deliveryData?: DeliveryData;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ orderId, onClose, deliveryMode = false, deliveryData }) => {
  const { language } = useLanguage();

  // Mock invoice data for restaurant/farmer
  const invoiceData = {
    invoiceNumber: `FV/${new Date().getFullYear()}/01/${orderId}`,
    issueDate: '2025-01-21',
    saleDate: '2025-01-21',
    paymentDate: '2025-02-04',
    paymentMethod: language === 'PL' ? 'Przelew bankowy' : language === 'RU' ? 'Банковский перевод' : language === 'UA' ? 'Банківський переказ' : 'Bank transfer',
    
    // Seller (Farmer)
    seller: {
      name: 'Gospodarstwo Rolne "Zielona Dolina"',
      address: 'ul. Polna 23',
      city: '32-020 Wieliczka',
      nip: 'PL6762518562',
      regon: '382156789',
      phone: '+48 500 123 456',
      email: 'kontakt@zielonadolina.pl',
      bankAccount: 'PL 12 1234 5678 9012 3456 7890 1234'
    },
    
    // Buyer (Restaurant)
    buyer: {
      name: 'Restauracja "Pod Różą"',
      address: 'ul. Floriańska 14',
      city: '31-019 Kraków',
      nip: 'PL1234567890',
      regon: '123456789',
      phone: '+48 123 456 789',
      email: 'kontakt@podroza.pl'
    },
    
    items: [
      {
        name: 'Świeże pomidory malinowe',
        quantity: 25,
        unit: 'kg',
        pricePerUnit: 12.50,
        vat: 5,
        total: 312.50
      },
      {
        name: 'Sałata lodowa',
        quantity: 15,
        unit: 'kg',
        pricePerUnit: 8.90,
        vat: 5,
        total: 133.50
      },
      {
        name: 'Ogórki szklarniowe',
        quantity: 20,
        unit: 'kg',
        pricePerUnit: 11.20,
        vat: 5,
        total: 224.00
      },
      {
        name: 'Marchewka młoda',
        quantity: 30,
        unit: 'kg',
        pricePerUnit: 7.50,
        vat: 5,
        total: 225.00
      },
      {
        name: 'Papryka czerwona',
        quantity: 12,
        unit: 'kg',
        pricePerUnit: 15.80,
        vat: 5,
        total: 189.60
      },
      {
        name: 'Cebula biała',
        quantity: 18,
        unit: 'kg',
        pricePerUnit: 5.20,
        vat: 5,
        total: 93.60
      },
      {
        name: 'Ziemniaki młode',
        quantity: 50,
        unit: 'kg',
        pricePerUnit: 4.80,
        vat: 5,
        total: 240.00
      },
      {
        name: 'Czosnek świeży',
        quantity: 5,
        unit: 'kg',
        pricePerUnit: 18.50,
        vat: 5,
        total: 92.50
      }
    ] as InvoiceItem[],
    
    ksefNumber: 'KSeF-1234567890-20250121-ABCDEF123456',
    ksefStatus: 'accepted'
  };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * 0.05; // 5% VAT for food products in Poland
  const totalAmount = subtotal + vatAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementation for PDF download
    console.log('Downloading invoice as PDF');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          body * {
            visibility: hidden;
          }
          
          .invoice-print-content, .invoice-print-content * {
            visibility: visible;
          }
          
          .invoice-print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%!
            background: white;
          }
          
          .print-hide {
            display: none !important;
          }
          
          .invoice-no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          table tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .invoice-print-scale {
            font-size: 11px;
            transform: scale(0.92);
            transform-origin: top left;
          }
          
          .invoice-compact {
            margin-bottom: 8px;
          }
        }
      `}} />
      
      <div className="bg-background rounded-2xl border border-border max-w-4xl w-full my-8 shadow-2xl print:shadow-none print:border-0 print:rounded-none print:max-w-none print:my-0 invoice-print-content">
        {/* Header Actions */}
        <div className="flex items-center justify-between p-4 border-b border-border print-hide">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {deliveryMode 
              ? (language === 'PL' ? 'Faktura dostawy' : language === 'RU' ? 'Счет доставки' : language === 'UA' ? 'Рахунок доставки' : 'Delivery Invoice')
              : (language === 'PL' ? 'Faktura VAT' : language === 'RU' ? 'Счет-фактура' : language === 'UA' ? 'Фактура' : 'Invoice')
            }
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all"
              title={language === 'PL' ? 'Pobierz PDF' : language === 'RU' ? 'Скачать PDF' : language === 'UA' ? 'Завантажити PDF' : 'Download PDF'}
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all"
              title={language === 'PL' ? 'Drukuj' : language === 'RU' ? 'Печать' : language === 'UA' ? 'Друк' : 'Print'}
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 print:p-0 invoice-print-scale">
          {deliveryMode && deliveryData ? (
            // Delivery Invoice Layout
            <>
              {/* Header */}
              <div className="mb-8 invoice-section invoice-no-break">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-primary">Plon</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'PL' ? 'Platforma logistyki HoReCa' :
                       language === 'RU' ? 'Платформа логистики HoReCa' :
                       language === 'UA' ? 'Платформа логістики HoReCa' :
                       'HoReCa Logistics Platform'}
                    </p>
                    <p className="text-sm text-muted-foreground">ul. Marszałkowska 115, Warszawa</p>
                    <p className="text-sm text-muted-foreground">NIP: 123-456-78-90</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 mb-2">
                      <p className="text-xs text-green-600 font-semibold">
                        {language === 'PL' ? 'Status' : language === 'RU' ? 'Статус' : language === 'UA' ? 'Статус' : 'Status'}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        {language === 'PL' ? 'Dostarczone' : language === 'RU' ? 'Доставлено' : language === 'UA' ? 'Доставлено' : 'Delivered'}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'PL' ? 'Opłacono' : language === 'RU' ? 'Оплачено' : language === 'UA' ? 'Оплачено' : 'Paid'}: {deliveryData.completedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2 print:text-2xl">
                      {language === 'PL' ? 'FAKTURA DOSTAWY' : language === 'RU' ? 'СЧЕТ ДОСТАВКИ' : language === 'UA' ? 'РАХУНОК ДОСТАВКИ' : 'DELIVERY INVOICE'}
                    </h1>
                    <p className="text-lg font-mono text-muted-foreground print:text-base">{orderId}</p>
                  </div>
                </div>

                {/* KSeF Status Badge */}
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-6 mt-6 print:p-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 print:w-4 print:h-4" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-600 print:text-xs">
                      {language === 'PL' ? 'Faktura zarejestrowana w systemie KSeF' : 
                       language === 'RU' ? 'Счет зарегистрирован в системе KSeF' : 
                       language === 'UA' ? 'Фактура зареєстрована в системі KSeF' : 
                       'Invoice registered in KSeF system'}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">KSeF-{orderId.replace('#', '')}-20250121-ABCDEF</p>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="mb-8 invoice-section invoice-no-break">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {language === 'PL' ? 'FAKTURA DLA' : language === 'RU' ? 'СЧЕТ ДЛЯ' : language === 'UA' ? 'РАХУНОК ДЛЯ' : 'INVOICE FOR'}
                </h3>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-lg font-bold text-foreground">
                    {language === 'PL' ? 'Kierowca' : language === 'RU' ? 'Водитель' : language === 'UA' ? 'Водій' : 'Driver'}: {deliveryData.driverName}
                  </p>
                  <p className="text-sm text-muted-foreground">ID: {deliveryData.driverId}</p>
                </div>
              </div>

              {/* Route Details */}
              <div className="mb-8 invoice-section">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {language === 'PL' ? 'SZCZEGÓŁY TRASY' : language === 'RU' ? 'ДЕТАЛИ МАРШРУТА' : language === 'UA' ? 'ДЕТАЛІ МАРШРУТУ' : 'ROUTE DETAILS'}
                </h3>
                <div className="space-y-3">
                  {/* Pickup */}
                  <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg invoice-no-break">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-500 mb-1">
                        {language === 'PL' ? 'ODBIÓR' : language === 'RU' ? 'ПОЛУЧЕНИЕ' : language === 'UA' ? 'ОТРИМАННЯ' : 'PICKUP'}
                      </p>
                      <p className="text-sm font-medium text-foreground">{deliveryData.pickupName}</p>
                      <p className="text-xs text-muted-foreground">{deliveryData.pickupAddress}</p>
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-border"></div>
                  </div>

                  {/* Delivery */}
                  <div className="flex items-start gap-3 p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg invoice-no-break">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-purple-500 mb-1">
                        {language === 'PL' ? 'DOSTAWA' : language === 'RU' ? 'ДОСТАВКА' : language === 'UA' ? 'ДОСТАВКА' : 'DELIVERY'}
                      </p>
                      <p className="text-sm font-medium text-foreground">{deliveryData.deliveryName}</p>
                      <p className="text-xs text-muted-foreground">{deliveryData.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cargo Details */}
              <div className="mb-8 invoice-section invoice-no-break">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {language === 'PL' ? 'SZCZEGÓŁY ŁADUNKU' : language === 'RU' ? 'ДЕТАЛИ ГРУЗА' : language === 'UA' ? 'ДЕТАЛІ ВАНТАЖУ' : 'CARGO DETAILS'}
                </h3>
                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-foreground font-medium">{deliveryData.cargo}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {language === 'PL' ? 'Dystans' : language === 'RU' ? 'Расстояние' : language === 'UA' ? 'Відстань' : 'Distance'}: {deliveryData.distance} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="mb-8 invoice-section invoice-no-break">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {language === 'PL' ? 'ROZLICZENIE' : language === 'RU' ? 'РАСЧЕТ' : language === 'UA' ? 'РОЗРАХУНОК' : 'PAYMENT BREAKDOWN'}
                </h3>
                <div className="bg-accent/30 rounded-lg p-4 border border-border space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      {language === 'PL' ? 'Stawka bazowa' : language === 'RU' ? 'Базовая ставка' : language === 'UA' ? 'Базова ставка' : 'Base fare'}
                    </span>
                    <span className="text-sm font-medium text-foreground">{deliveryData.baseFare.toFixed(2)} zł</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      {language === 'PL' ? 'Opłata za dystans' : language === 'RU' ? 'Плата за расстояние' : language === 'UA' ? 'Плата за відстань' : 'Distance fee'} ({deliveryData.distance} km × {deliveryData.distanceRate.toFixed(2)} zł)
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {(deliveryData.distance * deliveryData.distanceRate).toFixed(2)} zł
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-bold text-foreground">
                      {language === 'PL' ? 'CAŁKOWITA KWOTA' : language === 'RU' ? 'ОБЩАЯ СУММА' : language === 'UA' ? 'ЗАГАЛЬНА СУМА' : 'TOTAL AMOUNT'}
                    </span>
                    <span className="text-2xl font-bold text-green-500">
                      {deliveryData.totalEarnings.toFixed(2)} zł
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center print:mt-4 print:pt-3">
                <p>
                  {language === 'PL' ? 'Faktura została wygenerowana automatycznie przez system Plon i jest ważna bez podpisu.' :
                   language === 'RU' ? 'Счет был сгенерирован автоматически системой Plon и действителен без подписи.' :
                   language === 'UA' ? 'Фактура була згенерована автоматично системою Plon і дійсна без підпису.' :
                   'Invoice was generated automatically by Plon system and is valid without signature.'}
                </p>
              </div>
            </>
          ) : (
            // Restaurant/Farmer Invoice Layout (existing code)
            <>
          {/* Invoice Header */}
          <div className="mb-8 invoice-section invoice-no-break">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 print:text-2xl">
                  {language === 'PL' ? 'FAKTURA VAT' : language === 'RU' ? 'СЧЕТ-ФАКТУРА' : language === 'UA' ? 'ФАКТУРА' : 'VAT INVOICE'}
                </h1>
                <p className="text-lg font-mono text-muted-foreground print:text-base">{invoiceData.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">
                    {language === 'PL' ? 'Data wystawienia' : language === 'RU' ? 'Дата выставления' : language === 'UA' ? 'Дата виставлення' : 'Issue date'}:
                  </span>
                  <p className="font-semibold text-foreground">{invoiceData.issueDate}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    {language === 'PL' ? 'Data sprzedaży' : language === 'RU' ? 'Дата продажи' : language === 'UA' ? 'Дата продажу' : 'Sale date'}:
                  </span>
                  <p className="font-semibold text-foreground">{invoiceData.saleDate}</p>
                </div>
              </div>
            </div>

            {/* KSeF Status Badge */}
            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-6 print:p-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 print:w-4 print:h-4" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-600 print:text-xs">
                  {language === 'PL' ? 'Faktura zarejestrowana w systemie KSeF' : 
                   language === 'RU' ? 'Счет зарегистрирован в системе KSeF' : 
                   language === 'UA' ? 'Фактура зареєстрована в системі KSeF' : 
                   'Invoice registered in KSeF system'}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{invoiceData.ksefNumber}</p>
              </div>
            </div>
          </div>

          {/* Seller and Buyer Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 invoice-section">
            {/* Seller */}
            <div className="invoice-no-break">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {language === 'PL' ? 'SPRZEDAWCA' : language === 'RU' ? 'ПРОДАВЕЦ' : language === 'UA' ? 'ПРОДАВЕЦЬ' : 'SELLER'}
              </h3>
              <div className="p-4 bg-secondary rounded-lg border border-border print:p-2">
                <p className="font-bold text-foreground mb-2">{invoiceData.seller.name}</p>
                <p className="text-sm text-muted-foreground">{invoiceData.seller.address}</p>
                <p className="text-sm text-muted-foreground mb-3">{invoiceData.seller.city}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold">NIP:</span> {invoiceData.seller.nip}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">REGON:</span> {invoiceData.seller.regon}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Tel:</span> {invoiceData.seller.phone}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Email:</span> {invoiceData.seller.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Buyer */}
            <div className="invoice-no-break">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {language === 'PL' ? 'NABYWCA' : language === 'RU' ? 'ПОКУПАТЕЛЬ' : language === 'UA' ? 'ПОКУПЕЦЬ' : 'BUYER'}
              </h3>
              <div className="p-4 bg-secondary rounded-lg border border-border print:p-2">
                <p className="font-bold text-foreground mb-2">{invoiceData.buyer.name}</p>
                <p className="text-sm text-muted-foreground">{invoiceData.buyer.address}</p>
                <p className="text-sm text-muted-foreground mb-3">{invoiceData.buyer.city}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold">NIP:</span> {invoiceData.buyer.nip}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">REGON:</span> {invoiceData.buyer.regon}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Tel:</span> {invoiceData.buyer.phone}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Email:</span> {invoiceData.buyer.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 overflow-x-auto invoice-section invoice-no-break">
            <table className="w-full text-sm invoice-table">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground print:py-1">Lp.</th>
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground print:py-1">
                    {language === 'PL' ? 'Nazwa produktu' : language === 'RU' ? 'Название продукта' : language === 'UA' ? 'Назва продукту' : 'Product name'}
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground print:py-1">
                    {language === 'PL' ? 'Ilość' : language === 'RU' ? 'Количество' : language === 'UA' ? 'Кількість' : 'Qty'}
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground print:py-1">
                    {language === 'PL' ? 'J.m.' : language === 'RU' ? 'Ед.' : language === 'UA' ? 'Од.' : 'Unit'}
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground print:py-1">
                    {language === 'PL' ? 'Cena netto' : language === 'RU' ? 'Цена нетто' : language === 'UA' ? 'Ціна нетто' : 'Net price'}
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground print:py-1">VAT %</th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground print:py-1">
                    {language === 'PL' ? 'Wartość netto' : language === 'RU' ? 'Сумма нетто' : language === 'UA' ? 'Сума нетто' : 'Net value'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-2 text-muted-foreground print:py-1">{index + 1}</td>
                    <td className="py-3 px-2 text-foreground print:py-1">{item.name}</td>
                    <td className="py-3 px-2 text-right text-foreground print:py-1">{item.quantity}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground print:py-1">{item.unit}</td>
                    <td className="py-3 px-2 text-right text-foreground print:py-1">{item.pricePerUnit.toFixed(2)} zł</td>
                    <td className="py-3 px-2 text-right text-muted-foreground print:py-1">{item.vat}%</td>
                    <td className="py-3 px-2 text-right text-foreground font-semibold print:py-1">{item.total.toFixed(2)} zł</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end mb-8 invoice-section invoice-no-break">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between py-2 border-b border-border print:py-1">
                <span className="text-muted-foreground">
                  {language === 'PL' ? 'Wartość netto' : language === 'RU' ? 'Сумма нетто' : language === 'UA' ? 'Сума нетто' : 'Net value'}:
                </span>
                <span className="font-semibold text-foreground">{subtotal.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border print:py-1">
                <span className="text-muted-foreground">
                  {language === 'PL' ? 'VAT 5%' : language === 'RU' ? 'НДС 5%' : language === 'UA' ? 'ПДВ 5%' : 'VAT 5%'}:
                </span>
                <span className="font-semibold text-foreground">{vatAmount.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between py-3 bg-primary/10 px-4 rounded-lg border border-primary/20 print:py-2 print:px-2">
                <span className="font-bold text-foreground">
                  {language === 'PL' ? 'RAZEM DO ZAPŁATY' : language === 'RU' ? 'ИТОГО К ОПЛАТЕ' : language === 'UA' ? 'РАЗОМ ДО СПЛАТИ' : 'TOTAL TO PAY'}:
                </span>
                <span className="font-bold text-primary text-lg print:text-base">{totalAmount.toFixed(2)} zł</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border-t border-border pt-6 space-y-3 invoice-section invoice-no-break print:pt-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  {language === 'PL' ? 'Forma płatności' : language === 'RU' ? 'Форма оплаты' : language === 'UA' ? 'Форма оплати' : 'Payment method'}:
                </span>
                <p className="font-semibold text-foreground">{invoiceData.paymentMethod}</p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {language === 'PL' ? 'Termin płatności' : language === 'RU' ? 'Срок оплаты' : language === 'UA' ? 'Термін оплати' : 'Payment deadline'}:
                </span>
                <p className="font-semibold text-foreground">{invoiceData.paymentDate}</p>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">
                {language === 'PL' ? 'Numer konta bankowego' : language === 'RU' ? 'Номер банковского счета' : language === 'UA' ? 'Номер банківського рахунку' : 'Bank account number'}:
              </span>
              <p className="font-mono font-semibold text-foreground">{invoiceData.seller.bankAccount}</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center print:mt-4 print:pt-3">
            <p>
              {language === 'PL' ? 'Faktura została wygenerowana automatycznie przez system Plon i jest ważna bez podpisu.' :
               language === 'RU' ? 'Счет был сгенерирован автоматически системой Plon и действителен без подписи.' :
               language === 'UA' ? 'Фактура була згенерована автоматично системою Plon і дійсна без підпису.' :
               'Invoice was generated automatically by Plon system and is valid without signature.'}
            </p>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

InvoiceView.displayName = 'InvoiceView';