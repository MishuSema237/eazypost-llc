import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShipmentByTracking, Shipment } from '../services/shipmentService';
import { toast } from 'react-toastify';
import {
  FaSearch,
  FaBox,
  FaTruck,
  FaShippingFast,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaWeightHanging,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPauseCircle,
  FaPlane,
  FaShip,
  FaCreditCard,
  FaDollarSign,
  FaSpinner,
  FaCheck,
  FaCopy,
  FaShieldAlt,
  FaGlobe,
  FaBell,
  FaSatellite,
  FaQrcode,
  FaCloudUploadAlt,
  FaMobileAlt,
} from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';
import ShipmentMap from '../components/ShipmentMap';

const Track: React.FC = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatText = (text: string) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCopyTracking = () => {
    if (shipment) {
      navigator.clipboard.writeText(shipment.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Tracking number copied!');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Manifest number required');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const shipmentData = await getShipmentByTracking(trackingNumber);
      setShipment(shipmentData);
    } catch (err) {
      setError('Shipment manifest not found. Verify number and retry.');
      toast.error('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHistoryIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return FaCheckCircle;
      case 'in_transit': return FaTruck;
      case 'delayed': return FaExclamationTriangle;
      case 'on_hold': return FaPauseCircle;
      default: return FaBox;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Tracking Search */}
      <div className="bg-eazypost-blue pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
            MANIFEST <span className="text-eazypost-red">TRACKING</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto uppercase tracking-widest font-bold text-xs">
            Global Cargo intelligence & Real-time Rerouting Data
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative flex flex-col sm:flex-row gap-0 shadow-2xl">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="ENTER MANIFEST NUMBER (e.g. EP-XXXXXX)"
                className="flex-1 px-8 py-5 text-lg font-bold uppercase tracking-wider text-eazypost-blue placeholder-gray-400 focus:outline-none rounded-l-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-eazypost-red text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-70 rounded-r-sm"
              >
                {isLoading ? <Icon icon={FaSpinner} className="animate-spin text-2xl" /> : <><Icon icon={FaSearch} className="mr-3" /> Execute Search</>}
              </button>
            </div>
            {error && <p className="mt-4 text-eazypost-red font-bold uppercase text-sm tracking-widest">{error}</p>}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={resultsRef}>
        {shipment ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Progress & Status */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Header */}
              <div className="bg-gray-50 p-8 border-l-8 border-eazypost-blue flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="text-gray-400 uppercase tracking-widest text-xs font-black mb-1">Manifest Identification</div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-eazypost-blue">{shipment.trackingNumber}</span>
                    <button onClick={handleCopyTracking} className="text-eazypost-red hover:scale-110 transition-transform">
                      {copied ? <Icon icon={FaCheck} /> : <Icon icon={FaCopy} />}
                    </button>
                  </div>
                </div>
                <div className={`px-6 py-2 border-2 font-black uppercase text-sm tracking-widest flex items-center justify-center text-center ${getStatusStyle(shipment.status)}`}>
                  {formatText(shipment.status)}
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white border border-gray-100 p-8">
                <h3 className="text-xl font-black text-eazypost-blue uppercase tracking-tight mb-8">Shipment Trajectory</h3>
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {shipment.shipmentHistory?.map((history, idx) => {
                    const HistoryStatusIcon = getHistoryIcon(history.status);
                    return (
                      <div key={idx} className="relative pl-12 pb-10 last:pb-0 group">
                        <div className="absolute left-0 top-0 mt-1 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-eazypost-blue text-white z-10 group-first:bg-eazypost-red transition-colors">
                          <Icon icon={HistoryStatusIcon} className="text-sm" />
                        </div>
                        <div className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
                            <span className="font-black text-eazypost-blue uppercase tracking-wide text-sm">{formatText(history.status)}</span>
                            <span className="text-gray-400 font-bold text-xs uppercase">{history.date} | {history.time}</span>
                          </div>
                          <div className="text-eazypost-red font-bold text-sm uppercase mb-2">{history.location}</div>
                          <p className="text-gray-600 text-sm leading-relaxed">{history.remarks}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map View */}
              <div className="border border-gray-100 bg-white p-2 md:p-4 shadow-sm h-[300px] md:h-[400px]">
                {shipment.showMap !== false ? (
                  <ShipmentMap shipment={shipment} isDarkMode={false} />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-center p-8">
                    <Icon icon={FaGlobe} className="text-6xl text-gray-200 mb-4" />
                    <h3 className="text-eazypost-blue font-black uppercase text-sm tracking-widest">Global Transit Network</h3>
                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase">Location data encrypted</p>
                  </div>
                )}
              </div>

              {/* Shipment Details */}
              <div className="bg-white border border-gray-100 p-8 shadow-sm">
                <h3 className="text-lg font-black text-eazypost-blue uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Shipment Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Carrier</span>
                    <span className="font-bold text-eazypost-blue">{shipment.carrier}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Mode</span>
                    <span className="font-bold text-eazypost-blue uppercase tracking-wide">{shipment.shipmentMode}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Type</span>
                    <span className="font-bold text-eazypost-blue uppercase tracking-wide">{shipment.typeOfShipment}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Payment</span>
                    <span className="font-bold text-eazypost-blue uppercase">{shipment.paymentMode}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Product</span>
                    <span className="font-bold text-eazypost-blue uppercase text-xs text-right max-w-[60%]">{shipment.product}{shipment.productQuantity ? ` (${shipment.productQuantity} units)` : ''}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Total Freight</span>
                    <span className="font-bold text-eazypost-blue">${shipment.totalFreight?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Expected Delivery</span>
                    <span className="font-bold text-eazypost-red">{shipment.expectedDeliveryDate || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-white border border-gray-100 p-8 shadow-sm">
                <h3 className="text-lg font-black text-eazypost-blue uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Package Details</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 uppercase font-black">Total Packages</span>
                    <span className="font-bold text-eazypost-blue">{shipment.packages.length}</span>
                  </div>
                  {shipment.packages.map((pkg, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 border-l-4 border-eazypost-blue">
                      <div className="text-[10px] uppercase font-black text-eazypost-red mb-3 tracking-[0.2em]">Package {idx + 1}</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-400 uppercase font-black text-[10px] block">Type</span>
                          <span className="font-bold text-eazypost-blue uppercase">{pkg.pieceType}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 uppercase font-black text-[10px] block">Quantity</span>
                          <span className="font-bold text-eazypost-blue">{pkg.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 uppercase font-black text-[10px] block">Weight</span>
                          <span className="font-bold text-eazypost-blue">{pkg.weight} kg</span>
                        </div>
                        <div>
                          <span className="text-gray-400 uppercase font-black text-[10px] block">Dimensions</span>
                          <span className="font-bold text-eazypost-blue">{pkg.length && pkg.width && pkg.height ? `${pkg.length} x ${pkg.width} x ${pkg.height} cm` : '-'}</span>
                        </div>
                        {pkg.description && (
                          <div className="col-span-2">
                            <span className="text-gray-400 uppercase font-black text-[10px] block">Description</span>
                            <span className="font-bold text-eazypost-blue uppercase text-xs">{pkg.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Information & Details */}
            <div className="space-y-8">
              {/* Route Card */}
              <div className="bg-eazypost-blue p-8 text-white">
                <h3 className="text-lg font-black uppercase tracking-widest border-b border-white/20 pb-4 mb-6">Logistics Route</h3>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:border-l-2 before:border-dashed before:border-white/20">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-eazypost-red border-4 border-eazypost-blue"></div>
                    <div className="text-xs uppercase font-black text-gray-400 mb-1">Point of Origin</div>
                    <div className="font-bold text-lg">{shipment.origin}</div>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-eazypost-blue"></div>
                    <div className="text-xs uppercase font-black text-gray-400 mb-1">Final Destination</div>
                    <div className="font-bold text-lg">{shipment.destination}</div>
                  </div>
                </div>
              </div>

              {/* Shipper & Receiver */}
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-lg font-black text-eazypost-blue uppercase tracking-widest mb-6">Parties Involved</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] uppercase font-black text-eazypost-red mb-2 tracking-[0.2em]">Consignor</h4>
                    <p className="font-bold text-eazypost-blue uppercase text-sm">{shipment.shipperName}</p>
                    <p className="text-xs text-gray-500 mt-1">{shipment.shipperAddress}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-black text-eazypost-red mb-2 tracking-[0.2em]">Consignee</h4>
                    <p className="font-bold text-eazypost-blue uppercase text-sm">{shipment.receiverName}</p>
                    <p className="text-xs text-gray-500 mt-1">{shipment.receiverAddress}</p>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-eazypost-blue p-8 text-white text-center">
                <h3 className="text-lg font-black uppercase tracking-widest mb-3">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-6">Contact our support team for assistance with your shipment.</p>
                <button
                  onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                  className="inline-block px-8 py-4 bg-eazypost-red text-white font-black uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all shadow-xl"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
            {[
              { icon: FaShieldAlt, title: "Secure Protocol", desc: "Enterprise-grade encryption for manifest protection." },
              { icon: FaGlobe, title: "Global Intel", desc: "Linked with over 150 international logistics hubs." },
              { icon: FaShippingFast, title: "Express Flow", desc: "Prioritized routing for critical cargo manifests." },
            ].map((feature, idx) => (
              <AnimatedCard key={idx}>
                <div className="text-center p-8 bg-gray-50 border-b-4 border-eazypost-blue hover:border-eazypost-red transition-all">
                  <Icon icon={feature.icon} className="text-4xl text-eazypost-blue mx-auto mb-6" />
                  <h3 className="text-lg font-black text-eazypost-blue uppercase mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight">Tracking <span className="text-eazypost-red">Intelligence</span></h2>
              <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Multi-Modal Visibility",
                  desc: "Single-pane view across air, ocean, and ground shipments. Track intermodal transfers and handoffs between carriers in real time with unified status updates.",
                  stat: "99.97%",
                  statLabel: "Data Accuracy"
                },
                {
                  title: "Predictive ETAs",
                  desc: "Machine learning algorithms analyze historical route data, weather patterns, and customs clearance times to deliver continuously refined delivery estimates throughout transit.",
                  stat: "±2.5 hrs",
                  statLabel: "Avg. Prediction Variance"
                },
                {
                  title: "Exception Alerts",
                  desc: "Automated notifications for delays, route deviations, temperature breaches, and customs holds. Configurable alert thresholds for proactive exception management.",
                  stat: "< 60 sec",
                  statLabel: "Alert Response Time"
                },
                {
                  title: "Audit Trail Logging",
                  desc: "Immutable timestamped records of every scan, location ping, status change, and user interaction. Full chain-of-custody documentation for compliance and dispute resolution.",
                  stat: "5 Years",
                  statLabel: "Data Retention"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="text-3xl font-black text-eazypost-red">{item.stat}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-1">{item.statLabel}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-eazypost-blue uppercase tracking-tight mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight">Integrated <span className="text-eazypost-red">Technologies</span></h2>
              <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: FaSatellite, title: "Satellite GPS", desc: "Real-time geofencing and location intelligence across global transit routes." },
                { icon: FaQrcode, title: "QR-Barcode Sync", desc: "Scan-based manifest verification at every checkpoint with instant data relay." },
                { icon: FaCloudUploadAlt, title: "Cloud Platform", desc: "Scalable cloud infrastructure handling 50M+ daily tracking data points." },
                { icon: FaMobileAlt, title: "Mobile Gateway", desc: "Native push notifications and mobile-optimized tracking interface." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-8 text-center border-b-4 border-eazypost-blue hover:border-eazypost-red transition-all group">
                  <div className="w-16 h-16 bg-eazypost-blue text-white flex items-center justify-center mx-auto mb-6 group-hover:bg-eazypost-red transition-colors">
                    <Icon icon={item.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-sm font-black text-eazypost-blue uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Track;
