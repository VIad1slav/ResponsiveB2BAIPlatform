import React, { useEffect, useState } from 'react';
import { DollarSign, MapPin, Navigation, X } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';

interface OrderRequestPopupProps {
  isVisible: boolean;
  earnings: number;
  distance: number;
  farmAddress: string;
  restaurantAddress: string;
  onAccept: () => void;
  onDecline: () => void;
  countdown?: number;
}

export const OrderRequestPopup: React.FC<OrderRequestPopupProps> = ({
  isVisible,
  earnings,
  distance,
  farmAddress,
  restaurantAddress,
  onAccept,
  onDecline,
  countdown = 30,
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    if (!isVisible) {
      setTimeLeft(countdown);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, countdown, onDecline]);

  if (!isVisible) return null;

  const progress = (timeLeft / countdown) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

      {/* Popup Card */}
      <div className="fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center z-50 p-4">
        <div className="bg-[#0F172A] rounded-t-3xl lg:rounded-3xl border border-slate-700 shadow-2xl w-full lg:max-w-md overflow-hidden animate-slide-up">
          {/* Header with Countdown */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 pb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('incomingRequest')}</h2>
                <p className="text-emerald-100 text-sm mt-1">{t('acceptRequest')}</p>
              </div>
              
              {/* Circular Countdown Timer */}
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-emerald-900/30"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="text-white transition-all duration-1000 ease-linear"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{timeLeft}</div>
                    <div className="text-xs text-emerald-100">{t('secondsRemaining')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings & Distance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-200" />
                  <span className="text-xs text-emerald-100">{t('estimatedEarnings')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{earnings} zł</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-emerald-200" />
                  <span className="text-xs text-emerald-100">{t('totalDistance')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{distance} km</div>
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="p-6 space-y-4">
            {/* Pickup Location */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 my-2"></div>
              </div>
              <div className="flex-1">
                <div className="text-blue-400 text-sm font-semibold mb-1">{t('farmPickup')}</div>
                <div className="text-slate-300 text-sm">{farmAddress}</div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-purple-400 text-sm font-semibold mb-1">{t('restaurantDelivery')}</div>
                <div className="text-slate-300 text-sm">{restaurantAddress}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0 space-y-3">
            {/* Accept Button */}
            <button
              onClick={onAccept}
              className="w-full py-4 bg-[#00875A] hover:bg-[#00a669] text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              {t('acceptRequest')}
            </button>

            {/* Decline Button */}
            <button
              onClick={onDecline}
              className="w-full py-3 text-slate-400 hover:text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              {t('declineRequest')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

OrderRequestPopup.displayName = 'OrderRequestPopup';
