import React, { useEffect, useState, useCallback } from 'react';
import { Shipment } from '../services/shipmentService';
import { geocodeMultipleAddresses, GeocodingResult } from '../services/geocodingService';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import Icon from './icons/Icon';
import LiveMap from './LiveMap';

interface ShipmentMapProps {
  shipment: Shipment;
  isDarkMode: boolean;
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipment }) => {
  const [geocodedLocations, setGeocodedLocations] = useState<{
    origin: GeocodingResult | null;
    current: GeocodingResult | null;
    destination: GeocodingResult | null;
  }>({
    origin: null,
    current: null,
    destination: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const geocodeLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const addresses = [shipment.origin, shipment.destination];
      if (shipment.currentLocation && shipment.currentLocation !== shipment.origin) {
        addresses.push(shipment.currentLocation);
      }

      const results = await geocodeMultipleAddresses(addresses);

      const locationMap = {
        origin: results[0] || null,
        destination: results[1] || null,
        current: shipment.currentLocation && shipment.currentLocation !== shipment.origin
          ? (results[2] || null)
          : null
      };

      setGeocodedLocations(locationMap);
    } catch (err) {
      setError('Logistics geodata unavailable. Interface standby.');
    } finally {
      setIsLoading(false);
    }
  }, [shipment.origin, shipment.destination, shipment.currentLocation]);

  useEffect(() => {
    geocodeLocations();
  }, [geocodeLocations]);

  const getMapCenter = useCallback(() => {
    const locations = [
      geocodedLocations.origin,
      geocodedLocations.current,
      geocodedLocations.destination
    ].filter(Boolean);

    if (locations.length === 0) {
      return { lat: 39.8283, lng: -98.5795 };
    }

    const avgLat = locations.reduce((sum, loc) => sum + loc!.coordinates.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc!.coordinates.lng, 0) / locations.length;

    return { lat: avgLat, lng: avgLng };
  }, [geocodedLocations]);

  if (isLoading) {
    return (
      <div className="bg-white p-8 border-b-4 border-eazypost-blue h-full">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <Icon icon={FaSpinner} className="animate-spin text-4xl text-eazypost-blue" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Synchronizing Geodata...</span>
        </div>
      </div>
    );
  }

  if (error || (!geocodedLocations.origin && !geocodedLocations.destination)) {
    return (
      <div className="bg-white p-8 border-b-4 border-eazypost-red h-full">
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
          <Icon icon={FaMapMarkerAlt} className="text-4xl text-eazypost-red" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Map Terminal Offline</span>
          <p className="text-[10px] font-bold text-gray-300 uppercase max-w-[200px]">Unable to lock locational data for this manifest.</p>
        </div>
      </div>
    );
  }

  const mapCenter = getMapCenter();

  return (
    <div className="bg-white group h-full relative border-l-8 border-eazypost-blue shadow-inner overflow-hidden">
      <LiveMap
        center={mapCenter}
        zoom={6}
        height="100%"
        showMarker={false}
        showResetButton={true}
        origin={geocodedLocations.origin ? {
          lat: geocodedLocations.origin.coordinates.lat,
          lng: geocodedLocations.origin.coordinates.lng,
          title: geocodedLocations.origin.formattedAddress
        } : undefined}
        destination={geocodedLocations.destination ? {
          lat: geocodedLocations.destination.coordinates.lat,
          lng: geocodedLocations.destination.coordinates.lng,
          title: geocodedLocations.destination.formattedAddress
        } : undefined}
        currentLocation={geocodedLocations.current ? {
          lat: geocodedLocations.current.coordinates.lat,
          lng: geocodedLocations.current.coordinates.lng,
          title: geocodedLocations.current.formattedAddress
        } : undefined}
        showRoute={true}
        routeColor="#002855"
        completedRouteColor="#D52B1E"
        className="transition-all duration-700"
      />

      {/* Overlay Status */}
      <div className="absolute top-4 left-4 bg-eazypost-blue text-white p-4 shadow-2xl pointer-events-none">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Operational Map</div>
        <div className="text-xs font-bold text-gray-300">Live Manifest Positioning System</div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <a
          href={`https://www.google.com/maps/dir/${encodeURIComponent(shipment.origin)}/${encodeURIComponent(shipment.destination)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-eazypost-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-eazypost-blue transition-all shadow-xl"
        >
          Open External Interface
        </a>
      </div>
    </div>
  );
};

export default ShipmentMap;
