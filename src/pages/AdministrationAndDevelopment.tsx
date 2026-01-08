import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Shipment,
  getAllShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  updateTrackingInfo
} from '../services/shipmentService';
import { sendShipperEmail, sendReceiverEmail } from '../services/emailService';
import {
  FaPlus,
  FaTrash,
  FaMapMarkerAlt,
  FaSearch,
  FaSync,
  FaSpinner,
  FaEnvelope,
  FaShieldAlt,
  FaFileInvoice,
  FaHistory
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import { toast } from 'react-toastify';
import Icon from '../components/icons/Icon';
import { resolveLocation } from '../services/smartGeocoding';

type ManifestFormData = Omit<Shipment, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt' | 'shipmentHistory'>;

const defaultManifestForm: ManifestFormData = {
  shipperName: '',
  shipperAddress: '',
  shipperPhone: '',
  shipperEmail: '',
  receiverName: '',
  receiverAddress: '',
  receiverPhone: '',
  receiverEmail: '',
  origin: '',
  destination: '',
  carrier: 'EazyPost LLC',
  typeOfShipment: 'Express',
  shipmentMode: 'Air',
  packageCount: 1,
  product: '',
  productQuantity: 1,
  paymentMode: 'Bank Transfer',
  totalFreight: 0,
  weight: 0,
  expectedDeliveryDate: '',
  departureTime: '',
  pickupDate: '',
  pickupTime: '',
  packages: [{
    quantity: 1,
    pieceType: 'Box',
    description: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0
  }],
  status: 'pending',
  comments: '',
  currentLocation: '',
  totalVolumetricWeight: 0,
  totalVolume: 0,
  totalActualWeight: 0,
  showMap: true
};

const AdministrationAndDevelopment: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showManifestForm, setShowManifestForm] = useState(false);
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [manifestFormData, setManifestFormData] = useState<ManifestFormData>(defaultManifestForm);
  const [trackingFormData, setTrackingFormData] = useState({ status: '', currentLocation: '', remarks: '', showMap: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllShipments();
      setShipments(data);
    } catch (error) {
      toast.error('System synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/administration_and_development/login');
  };

  const handleCreateManifest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const totalActualWeight = manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.weight * pkg.quantity), 0);

      // Smart Geocoding Resolution
      const totalVolumetricWeight = manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.length * pkg.width * pkg.height * pkg.quantity) / 5000, 0);
      const totalVolume = manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.length * pkg.width * pkg.height * pkg.quantity) / 1000000, 0);
      let finalOrigin = manifestFormData.origin;
      let finalDestination = manifestFormData.destination;
      let originCoords = undefined;
      let destCoords = undefined;

      try {
        const [originRes, destRes] = await Promise.all([
          resolveLocation(manifestFormData.origin),
          resolveLocation(manifestFormData.destination)
        ]);

        if (originRes) {
          finalOrigin = originRes.name;
          originCoords = { lat: originRes.lat, lng: originRes.lng };
        }
        if (destRes) {
          finalDestination = destRes.name;
          destCoords = { lat: destRes.lat, lng: destRes.lng };
        }
      } catch (err) {
        console.error('Geocoding pre-check failed', err);
      }

      await createShipment({
        ...manifestFormData,
        origin: finalOrigin,
        destination: finalDestination,
        originCoordinates: originCoords,
        destinationCoordinates: destCoords,
        totalVolumetricWeight,
        totalVolume,
        totalActualWeight
      });
      setShowManifestForm(false);
      setManifestFormData(defaultManifestForm);
      loadData();
      toast.success('Manifest generated and logged');
    } catch (error) {
      toast.error('Manifest creation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;
    setIsProcessing(true);
    try {
      const targetId = selectedShipment.id || (selectedShipment as any)._id;
      if (!targetId) throw new Error('ID_UNMAPPED');

      let finalLocation = trackingFormData.currentLocation;
      let currentCoords = undefined;

      try {
        const resolved = await resolveLocation(trackingFormData.currentLocation);
        if (resolved) {
          finalLocation = resolved.name;
          currentCoords = { lat: resolved.lat, lng: resolved.lng };
        }
      } catch (err) { console.error('Geocoding pre-check failed', err); }

      await updateTrackingInfo(
        targetId,
        trackingFormData.status,
        finalLocation,
        trackingFormData.remarks,
        trackingFormData.showMap,
        currentCoords
      );
      setShowTrackingForm(false);
      loadData();
      toast.success('Tracking trajectory updated');
    } catch (error) {
      toast.error('Update synchronization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteManifest = async (id: string) => {
    if (window.confirm('IRREVERSIBLE: Delete this manifest?')) {
      try {
        await deleteShipment(id);
        loadData();
        toast.success('Manifest purged');
      } catch (error) {
        toast.error('Purge failed');
      }
    }
  };

  const handleNotifyParties = async (shipment: Shipment) => {
    try {
      toast.info('Dispatching notifications...');
      await Promise.all([
        sendShipperEmail(shipment),
        sendReceiverEmail(shipment)
      ]);
      toast.success('Emails dispatched');
    } catch (error) {
      toast.error('Notification dispatch failed');
    }
  };

  const filteredManifests = shipments.filter(m =>
    m.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.shipperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-eazypost-blue pt-20 pb-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">OPERATIONS <span className="text-eazypost-red">DASHBOARD</span></h1>
            <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mt-1">EazyPost LLC Global Management Terminal</p>
          </div>
          <div className="flex gap-4">
            <button onClick={loadData} className="p-3 bg-white/10 text-white hover:bg-white/20 transition-all rounded-sm">
              <Icon icon={FaSync} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={handleLogout} className="px-6 py-3 bg-eazypost-red text-white font-black uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all">
              Secure Terminate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 md:p-8">
        {/* Stats / Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 border-b-4 border-eazypost-blue shadow-sm">
            <Icon icon={FaFileInvoice} className="text-3xl text-eazypost-blue mb-4" />
            <h3 className="font-black text-eazypost-blue uppercase text-sm mb-2">Total Manifests</h3>
            <p className="text-4xl font-black text-eazypost-red">{shipments.length}</p>
          </div>
          <div className="bg-white p-8 border-b-4 border-eazypost-red shadow-sm">
            <Icon icon={FaPlus} className="text-3xl text-eazypost-red mb-4" />
            <h3 className="font-black text-eazypost-blue uppercase text-sm mb-2">Operations</h3>
            <button
              onClick={() => setShowManifestForm(true)}
              className="mt-2 w-full py-3 bg-eazypost-blue text-white font-black uppercase text-[10px] tracking-widest hover:bg-eazypost-red transition-all"
            >
              Initialize New Manifest
            </button>
          </div>
          <div className="bg-white p-8 border-b-4 border-gray-100 shadow-sm">
            <Icon icon={FaShieldAlt} className="text-3xl text-gray-300 mb-4" />
            <h3 className="font-black text-eazypost-blue uppercase text-sm mb-2">System Integrity</h3>
            <p className="text-xs font-bold text-green-500 uppercase tracking-widest">Connection Active</p>
          </div>
        </div>

        {/* Manifest Table */}
        <div className="bg-white shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Icon icon={FaSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="FILTER BY MANIFEST / PARTIES"
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-100 focus:border-eazypost-red focus:outline-none font-bold text-xs uppercase tracking-widest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-eazypost-blue text-white uppercase text-[10px] tracking-widest">
                  <th className="px-6 py-4">Manifest ID</th>
                  <th className="px-6 py-4">Consignor/Shipper</th>
                  <th className="px-6 py-4">Consignee/Receiver</th>
                  <th className="px-6 py-4">Origin &gt; Destination</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Execute</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredManifests.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-black text-eazypost-blue text-sm">{m.trackingNumber}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">{m.shipperName}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">{m.receiverName}</td>
                    <td className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">{m.origin} <span className="text-eazypost-red">→</span> {m.destination}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 border text-[10px] font-black uppercase text-gray-600 tracking-tighter">
                        {m.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button onClick={() => { setSelectedShipment(m); setTrackingFormData({ status: m.status, currentLocation: m.currentLocation, remarks: '', showMap: m.showMap !== false }); setShowTrackingForm(true); }} className="p-2 text-eazypost-blue hover:text-eazypost-red"><Icon icon={FaHistory} /></button>
                      <button onClick={() => handleNotifyParties(m)} className="p-2 text-eazypost-blue hover:text-eazypost-red"><Icon icon={FaEnvelope} /></button>
                      <button onClick={() => {
                        const targetId = m.id || (m as any)._id;
                        handleDeleteManifest(targetId);
                      }} className="p-2 text-gray-300 hover:text-eazypost-red"><Icon icon={FaTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manifest Modal */}
      {showManifestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-eazypost-blue/90">
          <div className="bg-white w-full max-w-5xl md:p-12 h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowManifestForm(false)} className="absolute top-6 right-6 font-black text-gray-300 hover:text-eazypost-red">CLOSE [X]</button>
            <form onSubmit={handleCreateManifest} className="p-6 sm:p-12">
              <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight mb-12 border-b-4 border-eazypost-red pb-4">Initialize Manifest</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Shipper */}
                <div className="space-y-6">
                  <h3 className="font-black uppercase text-xs tracking-[0.3em] text-eazypost-red">Consignor Identification</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="SHIPPER NAME" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.shipperName} onChange={e => setManifestFormData({ ...manifestFormData, shipperName: e.target.value })} />
                    <input type="text" placeholder="FULL ADDRESS" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.shipperAddress} onChange={e => setManifestFormData({ ...manifestFormData, shipperAddress: e.target.value })} />
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.shipperEmail} onChange={e => setManifestFormData({ ...manifestFormData, shipperEmail: e.target.value })} />
                    <input type="text" placeholder="PHONE NUMBER" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.shipperPhone} onChange={e => setManifestFormData({ ...manifestFormData, shipperPhone: e.target.value })} />
                  </div>
                </div>
                {/* Receiver */}
                <div className="space-y-6">
                  <h3 className="font-black uppercase text-xs tracking-[0.3em] text-eazypost-red">Consignee Identification</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="RECEIVER NAME" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.receiverName} onChange={e => setManifestFormData({ ...manifestFormData, receiverName: e.target.value })} />
                    <input type="text" placeholder="FULL ADDRESS" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.receiverAddress} onChange={e => setManifestFormData({ ...manifestFormData, receiverAddress: e.target.value })} />
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.receiverEmail} onChange={e => setManifestFormData({ ...manifestFormData, receiverEmail: e.target.value })} />
                    <input type="text" placeholder="PHONE NUMBER" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase focus:border-eazypost-blue outline-none" required value={manifestFormData.receiverPhone} onChange={e => setManifestFormData({ ...manifestFormData, receiverPhone: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Shipment Details Section */}
              <div className="mt-12 pt-12 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <h3 className="font-black uppercase text-xs tracking-[0.3em] text-eazypost-red">Shipment Configuration</h3>
                  <div className="flex  items-center space-x-3 p-3 border border-gray-200 rounded bg-gray-50">
                    <input
                      type="checkbox"
                      checked={manifestFormData.showMap}
                      onChange={(e) => setManifestFormData({ ...manifestFormData, showMap: e.target.checked })}
                      className="h-5 w-5 text-eazypost-blue border-gray-300 rounded focus:ring-eazypost-blue"
                    />
                    <span className="text-xs font-black uppercase text-gray-500 tracking-wider">Show Live Map</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400">Logistics Routing</label>
                    <input type="text" placeholder="ORIGIN" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" required value={manifestFormData.origin} onChange={e => setManifestFormData({ ...manifestFormData, origin: e.target.value })} />
                    <input type="text" placeholder="DESTINATION" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" required value={manifestFormData.destination} onChange={e => setManifestFormData({ ...manifestFormData, destination: e.target.value })} />
                    <input type="text" placeholder="CARRIER" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" value={manifestFormData.carrier} onChange={e => setManifestFormData({ ...manifestFormData, carrier: e.target.value })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400">Mode & Selection</label>
                    <select className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" value={manifestFormData.typeOfShipment} onChange={e => setManifestFormData({ ...manifestFormData, typeOfShipment: e.target.value })}>
                      <option value="Express">Express Delivery</option>
                      <option value="Standard">Standard Freight</option>
                      <option value="International">International Cargo</option>
                      <option value="Ocean">Ocean Freight</option>
                    </select>
                    <select className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" value={manifestFormData.shipmentMode} onChange={e => setManifestFormData({ ...manifestFormData, shipmentMode: e.target.value })}>
                      <option value="Air">Air Freight</option>
                      <option value="Sea">Sea Transport</option>
                      <option value="Road">Road Logistics</option>
                      <option value="Rail">Rail System</option>
                    </select>
                    <input type="text" placeholder="PAYMENT MODE (e.g. Bank Transfer)" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase" value={manifestFormData.paymentMode} onChange={e => setManifestFormData({ ...manifestFormData, paymentMode: e.target.value })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400">Inventory Details</label>
                    <input type="text" placeholder="PRODUCT NAME (e.g. Industrial Gears)" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase focus:border-eazypost-blue outline-none" value={manifestFormData.product} onChange={e => setManifestFormData({ ...manifestFormData, product: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input type="number" placeholder="QTY" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase focus:border-eazypost-blue outline-none" value={manifestFormData.productQuantity || ''} onChange={e => setManifestFormData({ ...manifestFormData, productQuantity: Number(e.target.value) })} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-gray-300">UNITS</span>
                      </div>
                      <div className="relative">
                        <input type="number" placeholder="WEIGHT" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase focus:border-eazypost-blue outline-none" value={manifestFormData.weight || ''} onChange={e => setManifestFormData({ ...manifestFormData, weight: Number(e.target.value) })} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-gray-300">KG</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="number" placeholder="TOTAL FREIGHT CHARGE" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs uppercase focus:border-eazypost-blue outline-none" value={manifestFormData.totalFreight || ''} onChange={e => setManifestFormData({ ...manifestFormData, totalFreight: Number(e.target.value) })} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-gray-300">USD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Temporal Data Section */}
              <div className="mt-12 pt-12 border-t border-gray-100">
                <h3 className="font-black uppercase text-xs tracking-[0.3em] text-eazypost-red mb-8">Temporal Synchronization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Expected Delivery</label>
                    <input type="date" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs" required value={manifestFormData.expectedDeliveryDate} onChange={e => setManifestFormData({ ...manifestFormData, expectedDeliveryDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Departure Time</label>
                    <input type="time" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs" value={manifestFormData.departureTime} onChange={e => setManifestFormData({ ...manifestFormData, departureTime: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Pickup Date</label>
                    <input type="date" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs" value={manifestFormData.pickupDate} onChange={e => setManifestFormData({ ...manifestFormData, pickupDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Pickup Time</label>
                    <input type="time" className="w-full p-3 bg-gray-50 border-b-2 font-bold text-xs" value={manifestFormData.pickupTime} onChange={e => setManifestFormData({ ...manifestFormData, pickupTime: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Packages Section */}
              <div className="mt-12 pt-12 border-t border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black uppercase text-xs tracking-[0.3em] text-eazypost-red">Cargo Multi-Package Grid</h3>
                  <button type="button" onClick={() => setManifestFormData({ ...manifestFormData, packages: [...manifestFormData.packages, { quantity: 1, pieceType: 'Box', description: '', length: 0, width: 0, height: 0, weight: 0 }] })} className="text-[10px] font-black uppercase text-eazypost-blue hover:text-eazypost-red transition-colors flex items-center gap-2">
                    <Icon icon={FaPlus} /> Add Unit
                  </button>
                </div>
                <div className="space-y-4">
                  {manifestFormData.packages.map((pkg, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 border-l-4 border-eazypost-blue grid grid-cols-2 md:grid-cols-7 gap-4 items-end">
                      <div className="col-span-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase">Qty (Units)</label>
                        <input type="number" placeholder="1" className="w-full p-2 bg-white border font-bold text-xs focus:border-eazypost-blue outline-none" value={pkg.quantity || ''} onChange={e => {
                          const newPkgs = [...manifestFormData.packages];
                          newPkgs[idx].quantity = Number(e.target.value);
                          setManifestFormData({ ...manifestFormData, packages: newPkgs });
                        }} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase">Type</label>
                        <input type="text" className="w-full p-2 bg-white border font-bold text-xs uppercase focus:border-eazypost-blue outline-none" placeholder="Box/Pallet" value={pkg.pieceType} onChange={e => {
                          const newPkgs = [...manifestFormData.packages];
                          newPkgs[idx].pieceType = e.target.value;
                          setManifestFormData({ ...manifestFormData, packages: newPkgs });
                        }} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase">Description</label>
                        <input type="text" className="w-full p-2 bg-white border font-bold text-xs uppercase focus:border-eazypost-blue outline-none" placeholder="Item details..." value={pkg.description} onChange={e => {
                          const newPkgs = [...manifestFormData.packages];
                          newPkgs[idx].description = e.target.value;
                          setManifestFormData({ ...manifestFormData, packages: newPkgs });
                        }} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase">Weight (KG)</label>
                        <input type="number" placeholder="0.00" className="w-full p-2 bg-white border font-bold text-xs focus:border-eazypost-blue outline-none" value={pkg.weight || ''} onChange={e => {
                          const newPkgs = [...manifestFormData.packages];
                          newPkgs[idx].weight = Number(e.target.value);
                          setManifestFormData({ ...manifestFormData, packages: newPkgs });
                        }} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase">Dim (L*W*H CM)</label>
                        <div className="flex gap-1">
                          <input type="number" placeholder="L" className="w-full p-1 bg-white border text-[10px] focus:border-eazypost-blue outline-none" value={pkg.length || ''} onChange={e => { const n = [...manifestFormData.packages]; n[idx].length = Number(e.target.value); setManifestFormData({ ...manifestFormData, packages: n }); }} />
                          <input type="number" placeholder="W" className="w-full p-1 bg-white border text-[10px] focus:border-eazypost-blue outline-none" value={pkg.width || ''} onChange={e => { const n = [...manifestFormData.packages]; n[idx].width = Number(e.target.value); setManifestFormData({ ...manifestFormData, packages: n }); }} />
                          <input type="number" placeholder="H" className="w-full p-1 bg-white border text-[10px] focus:border-eazypost-blue outline-none" value={pkg.height || ''} onChange={e => { const n = [...manifestFormData.packages]; n[idx].height = Number(e.target.value); setManifestFormData({ ...manifestFormData, packages: n }); }} />
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button type="button" onClick={() => {
                          const newPkgs = manifestFormData.packages.filter((_, i) => i !== idx);
                          setManifestFormData({ ...manifestFormData, packages: newPkgs.length ? newPkgs : defaultManifestForm.packages });
                        }} className="text-gray-300 hover:text-eazypost-red transition-colors">
                          <Icon icon={FaTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <div className="flex justify-between border-b pb-2">
                  <span>Est. Volumetric Weight:</span>
                  <span className="text-eazypost-blue">{(manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.length * pkg.width * pkg.height * pkg.quantity) / 5000, 0)).toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Total Actual Weight:</span>
                  <span className="text-eazypost-blue">{(manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.weight * pkg.quantity), 0)).toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Volume Calculation:</span>
                  <span className="text-eazypost-blue">{(manifestFormData.packages.reduce((acc, pkg) => acc + (pkg.length * pkg.width * pkg.height * pkg.quantity) / 1000000, 0)).toFixed(3)} m³</span>
                </div>
              </div>

              <button disabled={isProcessing} className="mt-16 w-full py-8 bg-eazypost-red text-white font-black uppercase tracking-[0.3em] hover:bg-eazypost-blue transition-all disabled:opacity-50 text-sm shadow-2xl">
                {isProcessing ? 'SYNCHRONIZING WITH LOGISTICS NETWORK...' : 'LOCK MANIFEST & GENERATE GLOBAL TRACKING'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tracking Update Modal */}
      {showTrackingForm && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-eazypost-blue/90">
          <div className="bg-white w-full max-w-lg p-4 md:p-12 shadow-2xl relative">
            <button onClick={() => setShowTrackingForm(false)} className="absolute top-6 right-6 font-black text-gray-300 hover:text-eazypost-red">X</button>
            <form onSubmit={handleUpdateTracking}>
              <h2 className="text-xl font-black text-eazypost-blue uppercase tracking-tight mb-8">Update Trajectory</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Current Position</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase" value={trackingFormData.currentLocation} onChange={e => setTrackingFormData({ ...trackingFormData, currentLocation: e.target.value })} required />
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded bg-gray-50">
                  <input
                    type="checkbox"
                    checked={trackingFormData.showMap}
                    onChange={(e) => setTrackingFormData({ ...trackingFormData, showMap: e.target.checked })}
                    className="h-5 w-5 text-eazypost-blue border-gray-300 rounded focus:ring-eazypost-blue"
                  />
                  <span className="text-sm font-black uppercase text-gray-500 tracking-wider">Show Live Map</span>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Manifest Status</label>
                  <select className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase" value={trackingFormData.status} onChange={e => setTrackingFormData({ ...trackingFormData, status: e.target.value as any })} required>
                    <option value="pending">PENDING</option>
                    <option value="in_transit">IN TRANSIT</option>
                    <option value="on_hold">ON HOLD</option>
                    <option value="delivered">DELIVERED</option>
                    <option value="delayed">DELAYED</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Temporal Remarks</label>
                  <textarea className="w-full p-4 bg-gray-50 border-b-2 font-bold text-sm uppercase h-32 resize-none" value={trackingFormData.remarks} onChange={e => setTrackingFormData({ ...trackingFormData, remarks: e.target.value })} placeholder="LOCATIONAL DATA LOGS..." />
                </div>
              </div>
              <button disabled={isProcessing} className="mt-10 w-full py-5 bg-eazypost-blue text-white font-black uppercase tracking-widest text-xs hover:bg-eazypost-red transition-all shadow-lg">
                COMMIT SYNCHRONIZATION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrationAndDevelopment;