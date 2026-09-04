import React, { useState } from 'react';
import { Package, Clock, CheckCircle, TruckIcon, FileText, Download, X, Printer } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { InvoiceView } from './invoice-view';
import { cn } from '../ui/utils';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
  items: number;
  total: number;
  supplier: string;
}

interface OrdersProps {
  onPlaceOrder: () => void;
}

export const Orders: React.FC<OrdersProps> = ({ onPlaceOrder }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'PLN-2026-0142',
      date: '2026-01-05',
      status: 'shipped',
      items: 3,
      total: 24500,
      supplier: 'AgroSupply Sp. z o.o.',
    },
    {
      id: '2',
      orderNumber: 'PLN-2026-0138',
      date: '2026-01-03',
      status: 'pending',
      items: 2,
      total: 18900,
      supplier: 'Nasiona Polska',
    },
    {
      id: '3',
      orderNumber: 'PLN-2025-0521',
      date: '2025-12-28',
      status: 'delivered',
      items: 5,
      total: 45200,
      supplier: 'Chemia Agro',
    },
    {
      id: '4',
      orderNumber: 'PLN-2025-0518',
      date: '2025-12-25',
      status: 'delivered',
      items: 4,
      total: 32100,
      supplier: 'AgroSupply Sp. z o.o.',
    },
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400';
      case 'shipped':
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400';
      case 'delivered':
        return 'bg-primary/10 text-primary';
    }
  };

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const historyOrders = orders.filter((o) => o.status === 'delivered');
  const displayOrders = activeTab === 'active' ? activeOrders : historyOrders;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('ordersTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('ordersSubtitle')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={cn(
            'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
            activeTab === 'active'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {t('activeOrders')} ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {t('orderHistory')} ({historyOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {displayOrders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-xl shadow-sm border border-border p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-muted-foreground" />
              </div>

              {/* Order Info */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('orderNumber')}</p>
                  <p className="font-semibold text-foreground mt-1">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground mt-1 truncate">{order.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('deliveryDate')}</p>
                  <p className="font-medium text-foreground mt-1">
                    {new Date(order.date).toLocaleDateString(language === 'PL' ? 'pl-PL' : language === 'RU' ? 'ru-RU' : 'en-US')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{order.items} {t('items')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('total')}</p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {order.total.toLocaleString()} zł
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className={cn('px-4 py-2 rounded-lg font-medium flex items-center gap-2', getStatusColor(order.status))}>
                  {getStatusIcon(order.status)}
                  {t(order.status)}
                </div>
                
                {/* View Invoice Button */}
                <button
                  onClick={() => setSelectedInvoice(order.orderNumber)}
                  className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2 text-foreground font-medium"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('viewInvoice')}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceView orderId={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};