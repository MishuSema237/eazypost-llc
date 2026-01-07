import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LocationMarker {
  lat: number;
  lng: number;
  title: string;
  color?: string;
}

interface LiveMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  height?: string;
  showMarker?: boolean;
  markerTitle?: string;
  showResetButton?: boolean;
  origin?: LocationMarker;
  destination?: LocationMarker;
  currentLocation?: LocationMarker;
  showRoute?: boolean;
  routeColor?: string;
  completedRouteColor?: string;
}

const LiveMap: React.FC<LiveMapProps> = ({
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC for EazyPost LLC
  zoom = 13,
  className = '',
  height = '400px',
  showMarker = true,
  markerTitle = 'EazyPost LLC Operations Center',
  showResetButton = true,
  origin,
  destination,
  currentLocation,
  showRoute = false,
  routeColor = '#002855', // EazyPost Blue
  completedRouteColor = '#D52B1E' // EazyPost Red
}) => {
  const { isDarkMode } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const mapId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);
  const [mapError, setMapError] = useState<string | null>(null);

  const resetMapView = () => {
    if (mapInstanceRef.current && mapInstanceRef.current.setView) {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom);
    }
  };

  const zoomToLocation = (lat: number, lng: number, zoomLevel: number = 12) => {
    if (mapInstanceRef.current && mapInstanceRef.current.setView) {
      mapInstanceRef.current.setView([lat, lng], zoomLevel);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      console.log('🗺️ LiveMap: Initializing...', { center, zoom, origin, destination });

      if (!mapRef.current) {
        console.error('❌ LiveMap: mapRef.current is null');
        return;
      }

      console.log('✅ LiveMap: Container found', mapRef.current.offsetWidth, 'x', mapRef.current.offsetHeight);

      if (!(window as any).L) {
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Leaflet'));
          document.head.appendChild(script);
        });
      }

      if (!isMounted || !mapRef.current) return;

      const L = (window as any).L;
      if (!L) return;

      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          console.warn('Error removing existing map:', error);
        }
        mapInstanceRef.current = null;
      }

      if (mapRef.current) {
        try {
          const existingElements = mapRef.current.querySelectorAll('.leaflet-container, .leaflet-control-container, .leaflet-pane');
          existingElements.forEach(el => el.remove());
          mapRef.current.innerHTML = '';
        } catch (error) {
          console.warn('Error cleaning container:', error);
        }
      }

      if (!isMounted || !mapRef.current) return;

      try {
        if (!mapRef.current) {
          console.warn('Map container reference lost');
          return;
        }

        mapInstanceRef.current = L.map(mapRef.current, {
          center: [center.lat, center.lng],
          zoom: zoom,
          zoomControl: true,
          attributionControl: true
        });

        // Use a high-performance tile provider (CartoDB Voyager) which looks cleaner and loads fast
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 20,
          crossOrigin: true
        }).addTo(mapInstanceRef.current);

        if (origin && destination) {
          const originIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #002855; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          L.marker([origin.lat, origin.lng], { icon: originIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Origin:</b> ${origin.title}`)
            .openPopup();

          const destIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #D52B1E; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          L.marker([destination.lat, destination.lng], { icon: destIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Destination:</b> ${destination.title}`);

          if (currentLocation) {
            const currentIcon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: #D52B1E; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });

            L.marker([currentLocation.lat, currentLocation.lng], { icon: currentIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup(`<b>Current Location:</b> ${currentLocation.title}`);
          }

          if (showRoute) {
            if (currentLocation) {
              const completedRoute = L.polyline([
                [origin.lat, origin.lng],
                [currentLocation.lat, currentLocation.lng]
              ], {
                color: completedRouteColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '5, 5'
              }).addTo(mapInstanceRef.current);

              const remainingRoute = L.polyline([
                [currentLocation.lat, currentLocation.lng],
                [destination.lat, destination.lng]
              ], {
                color: routeColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }).addTo(mapInstanceRef.current);
            } else {
              const routeLine = L.polyline([
                [origin.lat, origin.lng],
                [destination.lat, destination.lng]
              ], {
                color: routeColor,
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }).addTo(mapInstanceRef.current);
            }

            const bounds = L.latLngBounds([
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
              ...(currentLocation ? [[currentLocation.lat, currentLocation.lng]] : [])
            ]);
            mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
          }
        } else if (showMarker) {
          L.marker([center.lat, center.lng])
            .addTo(mapInstanceRef.current)
            .bindPopup(markerTitle)
            .openPopup();
        }

        setTimeout(() => {
          if (mapInstanceRef.current && mapInstanceRef.current.invalidateSize) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 500);

      } catch (error) {
        console.error('Error creating map:', error);
        setMapError('Failed to load map');
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          console.warn('Error during map cleanup:', error);
        }
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center.lat, center.lng, zoom, showMarker, markerTitle, origin, destination, currentLocation, showRoute, routeColor, completedRouteColor]);

  if (mapError) {
    return (
      <div className="relative">
        <div
          className={`w-full rounded-lg shadow-lg ${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
          style={{ height, zIndex: 1 }}
        >
          <div className="text-center p-4">
            <div className="text-4xl text-gray-400 mb-2">🗺️</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {mapError}
            </p>
            <button
              onClick={() => {
                setMapError(null);
                if (mapRef.current) {
                  mapRef.current.innerHTML = '';
                }
              }}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapRef}
        id={mapId.current}
        className={`w-full rounded-lg shadow-lg ${className}`}
        style={{ height, zIndex: 1, border: '2px solid red' }}
      />
      {showResetButton && (origin && destination) && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[30]">
          <button
            onClick={resetMapView}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg p-2 transition-colors duration-200"
            title="Reset map view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}

      {(origin && destination) && (
        <div className="hidden md:block absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-sm z-10">
          <div
            className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded transition-colors"
            onClick={() => origin && zoomToLocation(origin.lat, origin.lng)}
            title="Click to zoom to origin"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Origin</span>
            <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {currentLocation && (
            <div
              className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded transition-colors"
              onClick={() => currentLocation && zoomToLocation(currentLocation.lat, currentLocation.lng)}
              title="Click to zoom to current location"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">Current Location</span>
              <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
          <div
            className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded transition-colors"
            onClick={() => destination && zoomToLocation(destination.lat, destination.lng)}
            title="Click to zoom to destination"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Destination</span>
          </div>
          {currentLocation && (
            <>
              <div className="flex items-center mb-1">
                <div className="w-3 h-1 bg-blue-900 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300 text-xs">Primary Route</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-1 bg-red-600 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300 text-xs">Active Segment</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveMap;
