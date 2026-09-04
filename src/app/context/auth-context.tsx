import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  companyName: string;
  role: 'restaurant' | 'farmer' | 'logistics';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

export interface SignupData {
  companyName: string;
  nip: string;
  email: string;
  phone: string;
  password: string;
  role: 'restaurant' | 'farmer' | 'logistics';
  agreeToTerms?: boolean;
  // Farmer-specific fields
  farmType?: string[]; // Changed to array for multiple selection
  // Restaurant-specific fields - First venue
  firstVenueName?: string;
  firstVenueAddress?: string;
  cuisineType?: string;
  deliveryWindowFrom?: string;
  deliveryWindowTo?: string;
  // Driver-specific fields
  driverLicenseCategory?: 'B' | 'C' | 'CE';
  vehicleTypeSelected?: 'car' | 'van' | 'truck35' | 'refrigerator';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call - removed delay here since it's handled in the component
    
    // Mock user data
    setUser({
      id: '12345',
      email,
      companyName: 'Gospodarstwo Rolne "Zielone Pola"',
      role: 'restaurant',
    });
    setIsAuthenticated(true);
  };

  const signup = async (data: SignupData) => {
    // Simulate API call - removed delay here since it's handled in the component
    
    setUser({
      id: '12345',
      email: data.email,
      companyName: data.companyName,
      role: data.role,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = 'AuthProvider';

// Hook with HMR safety - provides fallback values if context is unavailable
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return default values during HMR to prevent crashes
    // This is expected behavior during development hot reloading
    return {
      isAuthenticated: false,
      user: null,
      login: async () => {},
      signup: async () => {},
      logout: () => {},
    };
  }
  return context;
};