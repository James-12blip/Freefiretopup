const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve your HTML files

// MongoDB Connection - DIRECT LINK HERE (replace with your actual URI)
const MONGODB_URI = 'mongodb+srv://Worldclassshipingg:GDC9TkUd3tW5VYIZ@cluster0.wqutkjs.mongodb.net/worldclassshipingg?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Order Schema (defined directly here, no separate file needed)
const orderSchema = new mongoose.Schema({
  package: { type: String, required: true },
  uid: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API ROUTES (all in one file)

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { package, uid, code } = req.body;
    const newOrder = new Order({ package, uid, code });
    await newOrder.save();
    res.json({ message: 'Order saved!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Updated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
