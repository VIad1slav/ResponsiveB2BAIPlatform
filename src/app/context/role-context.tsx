import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'restaurant' | 'farmer' | 'logistics';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

RoleContext.displayName = 'RoleContext';

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('restaurant');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

RoleProvider.displayName = 'RoleProvider';

// Hook with HMR safety - provides fallback values if context is unavailable
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    // Return default values during HMR to prevent crashes
    // This is expected behavior during development hot reloading
    return {
      role: 'restaurant' as UserRole,
      setRole: () => {},
    };
  }
  return context;
};