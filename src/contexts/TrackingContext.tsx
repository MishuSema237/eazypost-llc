import React, { createContext, useContext, useState } from 'react';

interface Package {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  quantity: number;
  pieceType: string;
}

interface ShipmentHistory {
  status: string;
  date: string;
  time: string;
  location: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  currentLocation: string;
  expectedDeliveryDate: string;
  shipperName: string;
  shipperAddress: string;
  shipperEmail: string;
  receiverName: string;
  receiverAddress: string;
  receiverEmail: string;
  origin: string;
  destination: string;
  carrier: string;
  typeOfShipment: string;
  shipmentMode: string;
  paymentMode: string;
  totalFreight: number;
  pickupDate: string;
  pickupTime: string;
  departureTime: string;
  packages: Package[];
  shipmentHistory: ShipmentHistory[];
}

interface TrackingContextType {
  trackingNumber: string;
  setTrackingNumber: (number: string) => void;
  shipment: Shipment | null;
  searchShipment: (number: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchShipment = async (number: string) => {
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      // TODO: Implement actual API call
      // For now, using mock data
      const mockShipment: Shipment = {
        id: '1',
        trackingNumber: number,
        status: 'in_transit',
        currentLocation: 'New York, USA',
        expectedDeliveryDate: '2024-03-30',
        shipperName: 'John Doe',
        shipperAddress: '123 Main St, New York, USA',
        shipperEmail: 'eazypostllc@gmail.com',
        receiverName: 'Jane Smith',
        receiverAddress: '456 Oak Ave, London, UK',
        receiverEmail: 'eazypostllc@gmail.com',
        origin: 'New York, USA',
        destination: 'London, UK',
        carrier: 'Global Express',
        typeOfShipment: 'express',
        shipmentMode: 'air',
        paymentMode: 'prepaid',
        totalFreight: 250.00,
        pickupDate: '2024-03-25',
        pickupTime: '10:00 AM',
        departureTime: '2:00 PM',
        packages: [
          {
            weight: 5,
            dimensions: {
              length: 30,
              width: 20,
              height: 15
            },
            description: 'Electronics',
            quantity: 1,
            pieceType: 'box'
          }
        ],
        shipmentHistory: [
          {
            status: 'in_transit',
            date: '2024-03-25',
            time: '2:00 PM',
            location: 'New York, USA'
          }
        ]
      };

      setShipment(mockShipment);
    } catch (err) {
      setError('Shipment not found. Please check your tracking number and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        trackingNumber,
        setTrackingNumber,
        shipment,
        searchShipment,
        isLoading,
        error
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}; 