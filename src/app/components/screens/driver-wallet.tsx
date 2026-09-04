import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, CreditCard, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { useTheme } from '@/app/context/theme-context';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Transaction {
  id: string;
  type: 'payment' | 'withdrawal' | 'bonus';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending';
}

export const DriverWallet: React.FC = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Wallet data
  const balance = 1245.50;
  const todayEarnings = 245.00;
  const weeklyEarnings = 1820.00;
  const monthlyEarnings = 6450.00;

  // Transaction history
  const transactions: Transaction[] = [
    {
      id: 'TRX-2024-0156',
      type: 'payment',
      amount: 52.00,
      date: '2024-02-13 14:30',
      description: 'Dostawa #DEL2024-0042',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0155',
      type: 'payment',
      amount: 38.00,
      date: '2024-02-13 12:15',
      description: 'Dostawa #DEL2024-0041',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0154',
      type: 'bonus',
      amount: 25.00,
      date: '2024-02-13 10:00',
      description: 'Bonus za 10 dostaw',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0153',
      type: 'withdrawal',
      amount: -500.00,
      date: '2024-02-12 18:45',
      description: 'Wypłata na kartę **** 4532',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0152',
      type: 'payment',
      amount: 65.00,
      date: '2024-02-12 16:20',
      description: 'Dostawa #DEL2024-0040',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0151',
      type: 'payment',
      amount: 42.00,
      date: '2024-02-12 14:10',
      description: 'Dostawa #DEL2024-0039',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0150',
      type: 'payment',
      amount: 48.00,
      date: '2024-02-12 11:30',
      description: 'Dostawa #DEL2024-0038',
      status: 'completed',
    },
    {
      id: 'TRX-2024-0149',
      type: 'withdrawal',
      amount: -300.00,
      date: '2024-02-11 19:00',
      description: 'Wypłata na kartę **** 4532',
      status: 'pending',
    },
  ];

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
    // In real app, open withdrawal modal
    setTimeout(() => {
      alert('Wypłata zostanie przetworzona w ciągu 1-2 dni roboczych');
      setShowWithdrawModal(false);
    }, 1500);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-orange-500" />;
      case 'bonus':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (amount < 0) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('wallet')}</h1>
        <p className="text-muted-foreground mt-1">{t('currentBalance')}</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-1">{t('currentBalance')}</p>
            <p className="text-5xl font-bold">{balance.toFixed(2)} zł</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Wallet className="w-8 h-8" />
          </div>
        </div>

        <Button 
          onClick={handleWithdraw}
          className="w-full bg-white text-green-600 hover:bg-white/90 font-semibold"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          {t('withdrawToCard')}
        </Button>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('earningsToday')}</p>
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{todayEarnings.toFixed(2)} zł</p>
          <p className="text-xs text-green-500 mt-1">+{todayEarnings.toFixed(2)} zł</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('earningsThisWeek')}</p>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{weeklyEarnings.toFixed(2)} zł</p>
          <p className="text-xs text-blue-500 mt-1">+12.5% {t('growth')}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{t('earningsThisMonth')}</p>
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{monthlyEarnings.toFixed(2)} zł</p>
          <p className="text-xs text-purple-500 mt-1">+18.3% {t('growth')}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{t('transactionHistory')}</h2>
        </div>

        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'payment' ? 'bg-green-500/10' :
                    transaction.type === 'withdrawal' ? 'bg-orange-500/10' :
                    'bg-blue-500/10'
                  }`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      {transaction.status === 'pending' && (
                        <Badge variant="outline" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-bold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} zł
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="p-4 border-t border-border text-center">
          <Button variant="ghost" className="text-primary">
            <Download className="w-4 h-4 mr-2" />
            {t('downloadInvoice')}
          </Button>
        </div>
      </div>
    </div>
  );
};

DriverWallet.displayName = 'DriverWallet';
