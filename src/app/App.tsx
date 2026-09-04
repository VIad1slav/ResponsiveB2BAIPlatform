// Plon B2B AI Supply Chain Platform - Main Application Entry Point
import React, { useState } from 'react';
import { LanguageProvider } from './context/language-context';
import { ThemeProvider } from './context/theme-context';
import { AuthProvider } from './context/auth-context';
import { RoleProvider } from './context/role-context';
import { VenueProvider } from './context/venue-context';
import { CartProvider } from './context/cart-context';
import { Sidebar } from './components/navigation/sidebar';
import { BottomNav } from './components/navigation/bottom-nav';
import { MobileMenu } from './components/navigation/mobile-menu';
import { AIChatbot } from './components/ai/chatbot';
import { Dashboard } from './components/screens/dashboard';
import { RestaurantDashboard } from './components/screens/restaurant-dashboard';
import { FarmerDashboard } from './components/screens/farmer-dashboard';
import { LogisticsDashboard } from './components/screens/logistics-dashboard';
import { DriverDashboard } from './components/screens/driver-dashboard';
import { DriverAvailableRoutes } from './components/screens/driver-available-routes';
import { DriverWallet } from './components/screens/driver-wallet';
import { DriverDeliveryHistory } from './components/screens/driver-delivery-history';
import { DriverVehicle } from './components/screens/driver-vehicle';
import { Catalog } from './components/screens/catalog';
import { Orders } from './components/screens/orders';
import { Logistics } from './components/screens/logistics';
import { Suppliers } from './components/screens/suppliers';
import { Warehouse } from './components/screens/warehouse';
import { Analytics } from './components/screens/analytics';
import { Settings } from './components/screens/settings';
import { ProductDetail } from './components/screens/product-detail';
import { FarmerProductEdit } from './components/screens/farmer-product-edit';
import { FarmerProductAdd } from './components/screens/farmer-product-add';
import { FarmerOrderDetail } from './components/screens/farmer-order-detail';
import { SuccessOverlay } from './components/success-overlay';
import { Login } from './components/auth/login';
import { Signup } from './components/auth/signup';
import { DriverMap } from './components/screens/driver-map';
import { AIHub } from './components/screens/ai-hub';
import { useAuth } from './context/auth-context';
import { useRole } from './context/role-context';

type Screen = 'dashboard' | 'catalog' | 'orders' | 'logistics' | 'suppliers' | 'warehouse' | 'analytics' | 'settings' | 'product-detail' | 'driver-map' | 'farmer-product-edit' | 'farmer-product-add' | 'farmer-order-detail' | 'available-routes' | 'wallet' | 'delivery-history' | 'vehicle' | 'ai-hub';
type AuthScreen = 'login' | 'signup';

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

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { role } = useRole();
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handlePlaceOrder = () => {
    setShowSuccessOverlay(true);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    // For farmers, show edit screen instead of detail view
    if (role === 'farmer') {
      setActiveScreen('farmer-product-edit');
    } else {
      setActiveScreen('product-detail');
    }
  };

  const handleBackToCatalog = () => {
    setActiveScreen('catalog');
    setSelectedProduct(null);
  };

  const handleBackToDashboard = () => {
    setActiveScreen('dashboard');
    setSelectedProduct(null);
    setSelectedOrderId(null);
  };

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveScreen('farmer-order-detail');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        // Render role-specific dashboard
        if (role === 'restaurant') {
          return <RestaurantDashboard onMakeOrder={() => setActiveScreen('catalog')} />;
        } else if (role === 'farmer') {
          return <FarmerDashboard onAddProduct={() => setActiveScreen('farmer-product-add')} onOrderClick={handleOrderClick} />;
        } else if (role === 'logistics') {
          // For logistics role, dashboard shows the new driver dashboard
          return <DriverDashboard />;
        }
        return <Dashboard />;
      case 'catalog':
        return <Catalog onProductClick={handleProductClick} />;
      case 'orders':
        return <Orders onPlaceOrder={handlePlaceOrder} />;
      case 'logistics':
        // Logistics screen now shows routes/trasy for logistics role
        if (role === 'logistics') {
          return <DriverMap />;
        }
        return <Logistics />;
      case 'suppliers':
        // For farmer role, show warehouse instead of suppliers
        if (role === 'farmer') {
          return <Warehouse onAddProduct={() => setActiveScreen('farmer-product-add')} onProductClick={handleProductClick} />;
        }
        return <Suppliers />;
      case 'warehouse':
        return <Warehouse onAddProduct={() => setActiveScreen('farmer-product-add')} onProductClick={handleProductClick} />;
      case 'analytics':
        return <Analytics />;
      case 'ai-hub':
        return <AIHub />;
      case 'settings':
        return <Settings />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBackToCatalog} />
        ) : (
          <Catalog onProductClick={handleProductClick} />
        );
      case 'driver-map':
        return <DriverMap />;
      case 'farmer-product-edit':
        return selectedProduct ? (
          <FarmerProductEdit product={selectedProduct} onBack={handleBackToCatalog} />
        ) : (
          <Catalog onProductClick={handleProductClick} />
        );
      case 'farmer-product-add':
        return <FarmerProductAdd onBack={handleBackToDashboard} />;
      case 'farmer-order-detail':
        return selectedOrderId ? (
          <FarmerOrderDetail orderId={selectedOrderId} onBack={handleBackToDashboard} />
        ) : (
          <FarmerDashboard onAddProduct={() => setActiveScreen('farmer-product-add')} onOrderClick={handleOrderClick} />
        );
      case 'available-routes':
        return <DriverAvailableRoutes />;
      case 'wallet':
        return <DriverWallet />;
      case 'delivery-history':
        return <DriverDeliveryHistory />;
      case 'vehicle':
        return <DriverVehicle />;
      default:
        return <Dashboard />;
    }
  };

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {authScreen === 'login' ? (
          <Login onSwitchToSignup={() => setAuthScreen('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setAuthScreen('login')} />
        )}
      </div>
    );
  }

  // Check if we're showing driver map (full screen for logistics role) - only for old driver-map screen
  const isDriverMapScreen = activeScreen === 'driver-map';
  const hideNavigation = activeScreen === 'product-detail' || activeScreen === 'farmer-product-edit' || activeScreen === 'farmer-product-add' || activeScreen === 'farmer-order-detail' || isDriverMapScreen;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop Sidebar - Hide on Product Detail and Driver Map */}
      {!hideNavigation && (
        <Sidebar
          activeScreen={activeScreen === 'product-detail' || activeScreen === 'farmer-product-edit' || activeScreen === 'farmer-product-add' || activeScreen === 'farmer-order-detail' ? 'dashboard' : activeScreen}
          onNavigate={setActiveScreen}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className={hideNavigation ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24 lg:pb-8'}>
          {renderScreen()}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Hide on Product Detail and Driver Map */}
      {!hideNavigation && (
        <BottomNav
          activeScreen={activeScreen === 'product-detail' || activeScreen === 'farmer-product-edit' || activeScreen === 'farmer-product-add' || activeScreen === 'farmer-order-detail' ? 'dashboard' : activeScreen}
          onNavigate={setActiveScreen}
          onMenuOpen={() => setMobileMenuOpen(true)}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeScreen={activeScreen === 'product-detail' || activeScreen === 'farmer-product-edit' || activeScreen === 'farmer-product-add' || activeScreen === 'farmer-order-detail' ? 'dashboard' : activeScreen}
        onNavigate={setActiveScreen}
      />

      {/* AI Chatbot - Hide on Product Detail and Driver Map */}
      {!hideNavigation && <AIChatbot />}

      {/* Success Overlay */}
      <SuccessOverlay
        isOpen={showSuccessOverlay}
        onClose={() => setShowSuccessOverlay(false)}
      />
    </div>
  );
}

AppContent.displayName = 'AppContent';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <RoleProvider>
            <VenueProvider>
              <CartProvider>
                <AppContent />
              </CartProvider>
            </VenueProvider>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

App.displayName = 'App';