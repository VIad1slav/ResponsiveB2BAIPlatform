import React, { useState, useEffect } from 'react';
import { Navigation, Phone, MapPin, Menu } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import { OrderRequestPopup } from '@/app/components/logistics/order-request-popup';

export const DriverMap: React.FC = () => {
  const { t } = useLanguage();
  const [showOrderRequest, setShowOrderRequest] = useState(false);
  const [hasActiveRoute, setHasActiveRoute] = useState(false);
  const [routeAccepted, setRouteAccepted] = useState(false);

  // Mock order request data
  const orderRequest = {
    earnings: 45,
    distance: 12.5,
    farmAddress: 'Gospodarstwo "Zielona Dolina", ul. Polna 15, Konstancin-Jeziorna',
    restaurantAddress: 'Restauracja "Pod Orzełem", ul. Nowy Świat 42, Warszawa',
  };

  // Simulate incoming request after 3 seconds
  useEffect(() => {
    if (!hasActiveRoute) {
      const timer = setTimeout(() => {
        setShowOrderRequest(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasActiveRoute]);

  const handleAcceptRequest = () => {
    setShowOrderRequest(false);
    setHasActiveRoute(true);
    setRouteAccepted(true);
    
    // Auto-hide the accepted message after 2 seconds
    setTimeout(() => {
      setRouteAccepted(false);
    }, 2000);
  };

  const handleDeclineRequest = () => {
    setShowOrderRequest(false);
    // Simulate another request after 5 seconds
    setTimeout(() => {
      setShowOrderRequest(true);
    }, 5000);
  };

  const handleNavigate = () => {
    // Open Google Maps / Waze
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(orderRequest.farmAddress)}`, '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-[#0F172A]">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Animated Route Line (shown after acceptance) */}
        {hasActiveRoute && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path
              d="M 100,500 Q 400,200 800,400"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeDasharray="10 5"
              className="animate-dash"
            />
          </svg>
        )}

        {/* Location Markers (shown after acceptance) */}
        {hasActiveRoute && (
          <>
            {/* Pickup Marker */}
            <div className="absolute top-1/2 left-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
                  {t('farmPickup')}
                </div>
              </div>
            </div>

            {/* Delivery Marker */}
            <div className="absolute top-1/3 right-32 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
                  {t('restaurantDelivery')}
                </div>
              </div>
            </div>

            {/* Current Location (Driver) */}
            <div className="absolute bottom-1/3 left-20 z-10">
              <div className="relative">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                {/* Pulsing Circle */}
                <div className="absolute inset-0 w-8 h-8 bg-emerald-500/30 rounded-full animate-ping"></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Success Banner (shown briefly after accepting) */}
      {routeAccepted && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 animate-slide-down">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-3 border-r-2 border-b-2 border-emerald-500 transform rotate-45"></div>
            </div>
            <span className="font-semibold">{t('requestAccepted')}</span>
          </div>
        </div>
      )}

      {/* Minimized Route Card (shown after acceptance) */}
      {hasActiveRoute && !routeAccepted && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 animate-slide-down">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-emerald-400 text-sm font-semibold">{t('activeRoute')}</div>
                <div className="text-slate-400 text-xs mt-1">{t('routeToPickup')}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{orderRequest.earnings} zł</div>
                <div className="text-slate-400 text-xs">{orderRequest.distance} km</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleNavigate}
                className="flex-1 py-3 bg-[#00875A] hover:bg-[#00a669] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                {t('navigate')}
              </button>
              <button className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Request Popup */}
      <OrderRequestPopup
        isVisible={showOrderRequest}
        earnings={orderRequest.earnings}
        distance={orderRequest.distance}
        farmAddress={orderRequest.farmAddress}
        restaurantAddress={orderRequest.restaurantAddress}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
        countdown={30}
      />

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        @keyframes slide-down {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

DriverMap.displayName = 'DriverMap';