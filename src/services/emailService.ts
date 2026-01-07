import { Shipment } from '../types/shipment';

const API_BASE = process.env.REACT_APP_API_URL || '';
const API_URL = `${API_BASE}/api/send-email`;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendShipperEmail = async (data: Shipment) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'shipper',
        data
      }),
    });

    if (!response.ok) throw new Error('Failed to send shipper email');
    return await response.json();
  } catch (error) {
    console.error('Shipper email error:', error);
    throw error;
  }
};

export const sendReceiverEmail = async (data: Shipment) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'receiver',
        data
      }),
    });

    if (!response.ok) throw new Error('Failed to send receiver email');
    return await response.json();
  } catch (error) {
    console.error('Receiver email error:', error);
    throw error;
  }
};

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        data
      }),
    });

    if (!response.ok) throw new Error('Failed to send contact form email');
    return await response.json();
  } catch (error) {
    console.error('Contact form email error:', error);
    throw error;
  }
};

export const sendTestEmails = async () => {
  try {
    const testData: Shipment = {
      id: 'test-id',
      trackingNumber: 'TEST123456',
      showMap: true,
      shipperName: 'Test Shipper',
      shipperEmail: 'test@example.com',
      shipperAddress: 'Test Shipper Address',
      shipperPhone: '1234567890',
      receiverName: 'Test Receiver',
      receiverEmail: 'test@example.com',
      receiverAddress: 'Test Receiver Address',
      receiverPhone: '0987654321',
      origin: 'Test Origin',
      destination: 'Test Destination',
      carrier: 'Test Carrier',
      typeOfShipment: 'Test Type',
      shipmentMode: 'Test Mode',
      packageCount: 1,
      product: 'Test Product',
      productQuantity: 1,
      paymentMode: 'Test Payment',
      totalFreight: 100,
      weight: 10,
      expectedDeliveryDate: new Date().toISOString().split('T')[0],
      departureTime: '12:00',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTime: '10:00',
      packages: [{
        quantity: 1,
        pieceType: 'Box',
        description: 'Test Package',
        length: 10,
        width: 10,
        height: 10,
        weight: 10
      }],
      totalVolumetricWeight: 10,
      totalVolume: 1,
      totalActualWeight: 10,
      shipmentHistory: [{
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        location: 'Test Location',
        status: 'pending',
        updatedBy: 'test',
        remarks: 'Test shipment created'
      }],
      status: 'pending',
      currentLocation: 'Test Location',
      comments: 'Test Comments',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await Promise.all([
      sendShipperEmail(testData),
      sendReceiverEmail(testData)
    ]);

    return true;
  } catch (error) {
    console.error('Test emails error:', error);
    throw new Error('Failed to send test emails');
  }
};

export const testEmailService = sendTestEmails;
