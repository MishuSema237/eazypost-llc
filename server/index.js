const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Fallback to .env

const app = express();
const asyncHandler = require('express-async-handler');
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eazypost';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Logistics Database Synchronized'))
  .catch(err => console.error('Database Connection Error:', err));

// --- Schemas ---

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  showMap: { type: Boolean, default: true },
  shipperName: String,
  shipperAddress: String,
  shipperPhone: String,
  shipperEmail: String,
  receiverName: String,
  receiverAddress: String,
  receiverPhone: String,
  receiverEmail: String,
  status: { type: String, default: 'pending' },
  currentLocation: String,
  origin: String,
  destination: String,
  carrier: { type: String, default: 'EazyPost LLC' },
  typeOfShipment: String,
  shipmentMode: String,
  packageCount: Number,
  product: String,
  productQuantity: Number,
  paymentMode: String,
  totalFreight: Number,
  weight: Number,
  expectedDeliveryDate: String,
  departureTime: String,
  pickupDate: String,
  pickupTime: String,
  packages: [{
    quantity: Number,
    pieceType: String,
    description: String,
    length: Number,
    width: Number,
    height: Number,
    weight: Number
  }],
  totalVolumetricWeight: Number,
  totalVolume: Number,
  totalActualWeight: Number,
  shipmentHistory: [{
    date: String,
    time: String,
    location: String,
    status: String,
    updatedBy: String,
    remarks: String
  }],
  comments: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  permissions: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
const User = mongoose.model('User', userSchema);

// --- Nodemailer Setup ---

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper for sending professional emails
const sendProfessionalEmail = async (to, subject, data, type) => {
  let htmlContent = '';

  if (type === 'contact') {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #002855; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #D52B1E; border-bottom: 2px solid #D52B1E; padding-bottom: 10px;">INCOMING LOGISTICS INQUIRY</h2>
        <p><strong>Sender:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #002855; margin-top: 20px;">
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 30px; font-size: 10px; color: #aaa; text-align: center;">EazyPost LLC Operations Control</p>
      </div>
    `;
  } else {
    // Template for shipment notifications
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #002855; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h1 style="color: #D52B1E;">EAZYPOST LLC <span style="color: #002855;">MANIFEST UPDATE</span></h1>
        <p>A status update has been logged for manifest: <strong>${data.trackingNumber}</strong></p>
        <div style="background: #f4f4f4; padding: 15px; margin: 20px 0;">
          <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
          <p><strong>Current Location:</strong> ${data.currentLocation}</p>
          <p><strong>Destination:</strong> ${data.destination}</p>
        </div>
        <p>Log in to our portal to track real-time trajectory data.</p>
        <div style="text-align: center; margin-top: 30px;">
            <a href="https://eazypost.com/track/${data.trackingNumber}" style="background: #D52B1E; color: #fff; padding: 12px 25px; text-decoration: none; font-weight: bold; display: inline-block;">TRACK MANIFEST</a>
        </div>
        <p style="margin-top: 30px; font-size: 10px; color: #aaa; text-align: center;">&copy; 2024 EazyPost LLC. Global Logistics Intelligence.</p>
      </div>
    `;
  }

  await transporter.sendMail({
    from: `"EazyPost LLC Operations" <${process.env.SMTP_USER}>`,
    to,
    subject: `[LOGISTICS] ${subject}`,
    html: htmlContent,
  });
};

// --- Middleware Helpers ---
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id) || req.params.id === 'undefined') {
    return res.status(400).json({ message: 'Invalid Resource ID Format' });
  }
  next();
};

// --- Endpoints ---

// Root Health Check
app.get('/', (req, res) => {
  res.json({
    service: 'EazyPost Logistics API',
    status: 'Operational',
    timestamp: new Date().toISOString()
  });
});

// Shipment Endpoints
app.get('/api/shipments', asyncHandler(async (req, res) => {
  const shipments = await Shipment.find().sort({ createdAt: -1 });
  res.json(shipments);
}));

app.post('/api/shipments', asyncHandler(async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}));

app.get('/api/shipments/track/:number', asyncHandler(async (req, res) => {
  const shipment = await Shipment.findOne({ trackingNumber: req.params.number });
  if (!shipment) return res.status(404).json({ message: 'Manifest not found' });
  res.json(shipment);
}));

app.patch('/api/shipments/:id', validateId, asyncHandler(async (req, res) => {
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!shipment) return res.status(404).json({ message: 'Manifest not found' });
  res.json(shipment);
}));

app.delete('/api/shipments/:id', validateId, asyncHandler(async (req, res) => {
  await Shipment.findByIdAndDelete(req.params.id);
  res.status(204).send();
}));

app.patch('/api/shipments/:id/tracking', validateId, asyncHandler(async (req, res) => {
  const { status, currentLocation, historyEntry, showMap } = req.body;
  const shipment = await Shipment.findById(req.params.id);
  if (!shipment) return res.status(404).json({ message: 'Manifest not found' });

  shipment.status = status;
  shipment.currentLocation = currentLocation;
  if (showMap !== undefined) shipment.showMap = showMap;
  shipment.shipmentHistory.push(historyEntry);
  await shipment.save();

  // Background email notification
  sendProfessionalEmail(shipment.receiverEmail, 'Status Update Logged', shipment, 'update').catch(console.error);
  sendProfessionalEmail(shipment.shipperEmail, 'Status Update Logged', shipment, 'update').catch(console.error);

  res.json(shipment);
}));

// User Endpoints
app.post('/api/users/validate', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const { password: _, ...userWithoutPassword } = user.toObject();
  res.json(userWithoutPassword);
}));

// Email Service Proxy
app.post('/api/send-email', asyncHandler(async (req, res) => {
  const { type, data } = req.body;
  if (type === 'contact') {
    await sendProfessionalEmail(process.env.SMTP_USER, `Contact Form: ${data.subject}`, data, 'contact');
  } else if (type === 'shipper') {
    await sendProfessionalEmail(data.shipperEmail, 'Manifest Initialized', data, 'shipment');
  } else if (type === 'receiver') {
    await sendProfessionalEmail(data.receiverEmail, 'Incoming Cargo Alert', data, 'shipment');
  }
  res.json({ success: true });
}));

// Geocoding Proxy
app.get('/api/geocode', asyncHandler(async (req, res) => {
  const { address } = req.query;
  if (!address) return res.status(400).json({ message: 'Address required' });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'EazyPost-LLC-Tracking/1.0 (internal-usage)'
        }
      }
    );

    if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Geocoding Proxy Error:', error);
    res.status(500).json({ message: 'Geocoding service unavailable' });
  }
}));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid Resource ID Format' });
  }
  res.status(500).json({ message: 'Internal Server Synchronization Error' });
});

app.listen(port, () => {
  console.log(`EazyPost Logistics Server operational on port ${port}`);
});

module.exports = app;