import emailjs from '@emailjs/browser';
import { Shipment } from './shipmentService';

const isTest = process.env.NODE_ENV === 'test';
const DOMAIN = 'https://global-track-courier.vercel.app/';

const checkEmailConfig = (templateType: string) => {
  const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
  const requiredVars = [
    `${prefix}_SERVICE_ID`,
    `${prefix}_${templateType.toUpperCase()}_TEMPLATE_ID`,
    `${prefix}_USER_ID`
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

const formatPackagesForEmail = (packages: Shipment['packages']) => {
  return packages.map(pkg => {
    return `${pkg.quantity}x ${pkg.pieceType}
Description: ${pkg.description || 'N/A'}
Dimensions: ${pkg.length}cm x ${pkg.width}cm x ${pkg.height}cm
Weight: ${pkg.weight}kg`;
  }).join('\n\n');
};

export interface EmailData extends Shipment {}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendShipperEmail = async (data: EmailData) => {
  try {
    checkEmailConfig('SHIPPER');
    const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
    
    const templateParams = {
      to_name: data.shipperName,
      tracking: data.trackingNumber,
      status: data.status || 'pending',
      location: data.currentLocation || data.origin,
      origin: data.origin,
      destination: data.destination,
      delivery: data.expectedDeliveryDate || 'Not specified',
      receiver: data.receiverName,
      receiver_email: data.receiverEmail,
      packages: formatPackagesForEmail(data.packages),
      url: `${DOMAIN}/track/${data.trackingNumber}`,
      to_email: data.shipperEmail,
      subject: 'Shipment Created'
    };
    
    const response = await emailjs.send(
      process.env[`${prefix}_SERVICE_ID`] || '',
      process.env[`${prefix}_SHIPPER_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${prefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send shipper email');
    }

    return response;
  } catch (error) {
    console.error('Shipper email error:', error);
    throw new Error('Failed to send shipper email');
  }
};

export const sendReceiverEmail = async (data: EmailData) => {
  try {
    checkEmailConfig('RECEIVER');
    const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
    
    const templateParams = {
      to_name: data.receiverName,
      tracking_number: data.trackingNumber,
      origin: data.origin,
      destination: data.destination,
      expected_delivery_date: data.expectedDeliveryDate || 'Not specified',
      tracking_url: `${DOMAIN}/track/${data.trackingNumber}`,
      to_email: data.receiverEmail,
      subject: 'Package Incoming'
    };
    
    const response = await emailjs.send(
      process.env[`${prefix}_SERVICE_ID`] || '',
      process.env[`${prefix}_RECEIVER_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${prefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send receiver email');
    }

    return response;
  } catch (error) {
    console.error('Receiver email error:', error);
    throw new Error('Failed to send receiver email');
  }
};

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    const prefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS';
    const secondaryPrefix = isTest ? 'TEST_' : 'REACT_APP_EMAILJS_SECONDARY';
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      reply_to: data.email
    };
    
    const response = await emailjs.send(
      process.env[`${secondaryPrefix}_SERVICE_ID`] || '',
      process.env[`${secondaryPrefix}_CONTACT_TEMPLATE_ID`] || '',
      templateParams,
      process.env[`${secondaryPrefix}_USER_ID`] || ''
    );

    if (response.status !== 200) {
      throw new Error('Failed to send contact form email');
    }

    return response;
  } catch (error) {
    throw new Error('Failed to send contact form email');
  }
};

export const sendTestEmails = async () => {
  try {
    const testData: EmailData = {
      id: 'test-id',
      trackingNumber: 'TEST123456',
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
