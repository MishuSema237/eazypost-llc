/** Shipment Manifest Types */
export interface ShipmentPackage {
    quantity: number;
    pieceType: string;
    description: string;
    length: number;
    width: number;
    height: number;
    weight: number;
}

export interface ShipmentHistory {
    date: string;
    time: string;
    location: string;
    status: string;
    updatedBy: string;
    remarks: string;
    currentCoordinates?: { lat: number; lng: number; };
}

export interface Shipment {
    id: string;
    trackingNumber: string;
    showMap: boolean;
    originCoordinates?: { lat: number; lng: number; };
    destinationCoordinates?: { lat: number; lng: number; };
    currentCoordinates?: { lat: number; lng: number; };

    // Shipper Information
    shipperName: string;
    shipperAddress: string;
    shipperPhone: string;
    shipperEmail: string;

    // Receiver Information
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    receiverEmail: string;

    // Shipment Status
    status: 'pending' | 'in_transit' | 'on_hold' | 'delivered' | 'delayed';
    currentLocation: string;

    // Shipment Information
    origin: string;
    destination: string;
    carrier: string;
    typeOfShipment: string;
    shipmentMode: string;
    packageCount: number;
    product: string;
    productQuantity: number;
    paymentMode: string;
    totalFreight: number;
    weight: number;

    // Dates and Times
    expectedDeliveryDate: string;
    departureTime: string;
    pickupDate: string;
    pickupTime: string;

    // Package Details
    packages: ShipmentPackage[];
    totalVolumetricWeight: number;
    totalVolume: number;
    totalActualWeight: number;

    // History
    shipmentHistory: ShipmentHistory[];

    // Comments
    comments: string;

    // System fields
    createdAt: string;
    updatedAt: string;
}
