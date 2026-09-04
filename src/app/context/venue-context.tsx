import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Venue {
  id: string;
  name: string;
  address: string;
  cuisineType: string;
  deliveryWindowFrom: string;
  deliveryWindowTo: string;
  lat: number;
  lng: number;
  isMain: boolean;
}

interface VenueContextType {
  venues: Venue[];
  activeVenue: Venue | null;
  setActiveVenue: (venue: Venue | null) => void;
  addVenue: (venue: Omit<Venue, 'id'>) => void;
  updateVenue: (id: string, venue: Partial<Venue>) => void;
  deleteVenue: (id: string) => void;
  showAllVenues: boolean;
  setShowAllVenues: (show: boolean) => void;
}

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export const VenueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: '1',
      name: 'Trattoria Bella Vista',
      address: 'ul. Marszałkowska 45, 00-001 Warszawa',
      cuisineType: 'italian',
      deliveryWindowFrom: '06:00',
      deliveryWindowTo: '10:00',
      lat: 52.2297,
      lng: 21.0122,
      isMain: true,
    },
  ]);
  
  const [activeVenue, setActiveVenue] = useState<Venue | null>(venues[0]);
  const [showAllVenues, setShowAllVenues] = useState<boolean>(true);

  const addVenue = (venue: Omit<Venue, 'id'>) => {
    const newVenue: Venue = {
      ...venue,
      id: Date.now().toString(),
    };
    setVenues([...venues, newVenue]);
    
    // Set as active if it's the first venue
    if (venues.length === 0) {
      setActiveVenue(newVenue);
    }
  };

  const updateVenue = (id: string, updatedVenue: Partial<Venue>) => {
    setVenues(venues.map(v => v.id === id ? { ...v, ...updatedVenue } : v));
    
    // Update active venue if it's the one being updated
    if (activeVenue?.id === id) {
      setActiveVenue({ ...activeVenue, ...updatedVenue });
    }
  };

  const deleteVenue = (id: string) => {
    const filtered = venues.filter(v => v.id !== id);
    setVenues(filtered);
    
    // If deleted venue was active, switch to first available
    if (activeVenue?.id === id) {
      setActiveVenue(filtered.length > 0 ? filtered[0] : null);
    }
  };

  return (
    <VenueContext.Provider
      value={{
        venues,
        activeVenue,
        setActiveVenue,
        addVenue,
        updateVenue,
        deleteVenue,
        showAllVenues,
        setShowAllVenues,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (context === undefined) {
    throw new Error('useVenue must be used within a VenueProvider');
  }
  return context;
};
