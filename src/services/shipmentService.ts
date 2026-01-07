import { Shipment, ShipmentHistory, ShipmentPackage } from '../types/shipment';

const API_BASE = process.env.REACT_APP_API_URL || '';
const API_URL = `${API_BASE}/api/shipments`;

export type { Shipment, ShipmentHistory, ShipmentPackage };

// Generate manifest number
const generateTrackingNumber = () => {
  const prefix = 'EP';
  const randomNum = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${randomNum}`;
};

// Create a new shipment manifest
export const createShipment = async (data: Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt' | 'shipmentHistory'>): Promise<Shipment> => {
  try {
    const trackingNumber = generateTrackingNumber();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        trackingNumber,
        shipmentHistory: [{
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString(),
          location: data.origin,
          status: data.status,
          updatedBy: 'admin',
          remarks: 'Manifest initialized and logged in global system.'
        }]
      }),
    });

    if (!response.ok) throw new Error('Failed to create manifest');
    return await response.json();
  } catch (error) {
    throw new Error('Logistics server connection failed. Manifest not logged.');
  }
};

// Get all shipment manifests
export const getAllShipments = async (): Promise<Shipment[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    return [];
  }
};

// Get manifest by tracking number
export const getShipmentByTracking = async (trackingNumber: string): Promise<Shipment | null> => {
  try {
    const response = await fetch(`${API_URL}/track/${trackingNumber}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Manifest retrieval failed. Check network link.');
  }
};

// Get manifest by ID
export const getShipmentById = async (id: string): Promise<Shipment | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    throw new Error('Manifest retrieval failed.');
  }
};

// Update manifest
export const updateShipment = async (id: string, data: Partial<Shipment>): Promise<Shipment> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Update failed');
    return await response.json();
  } catch (error) {
    throw new Error('Logistics update failed. Server unreachable.');
  }
};

// Delete manifest
export const deleteShipment = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Deletion failed');
  } catch (error) {
    throw new Error('Manifest deletion failed.');
  }
};

// Update tracking trajectory
export const updateTrackingInfo = async (
  id: string,
  status: string,
  currentLocation: string,
  remarks?: string,
  showMap?: boolean
): Promise<Shipment> => {
  try {
    const now = new Date();
    const historyEntry = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      location: currentLocation,
      status: status,
      updatedBy: 'admin',
      remarks: remarks || 'Location update logged.'
    };

    const response = await fetch(`${API_URL}/${id}/tracking`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        currentLocation,
        historyEntry,
        showMap
      }),
    });

    if (!response.ok) throw new Error('Tracking update failed');
    return await response.json();
  } catch (error) {
    throw new Error('Tracking synchronization failed.');
  }
};