import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Load Leaflet CSS dynamically to avoid bundler issues
if (typeof window !== 'undefined' && !document.querySelector('link[href*="leaflet.css"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  link.crossOrigin = '';
  document.head.appendChild(link);
}

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface DeliveryMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({ 
  onLocationSelect, 
  initialPosition = [52.2297, 21.0122] // Warsaw, Poland default
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(initialPosition, 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add click event
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Remove existing marker
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      
      // Add new marker
      markerRef.current = L.marker([lat, lng]).addTo(map);
      
      // Call callback
      onLocationSelect(lat, lng);
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, initialPosition, onLocationSelect]);

  if (!isClient) {
    return (
      <div className="h-64 bg-secondary rounded-lg flex items-center justify-center border border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-5 h-5" />
          <span>Ładowanie mapy...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="h-64 rounded-lg overflow-hidden border border-border z-0"
      style={{ minHeight: '256px' }}
    />
  );
};