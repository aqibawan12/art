const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const axios = require('axios');

const app = express();
const PORT = 5000;
const STORE_PATH = path.join(__dirname, 'store.json');
const CART_PATH = path.join(__dirname, 'cart.json');
const upload = multer({ dest: 'uploads/' });
const IMGBB_API_KEY = 'ee2a9f20d24e87ad1d51d81edd79f1de';

app.use(cors());
app.use(bodyParser.json());

// Get all visible products (for frontend)
app.get('/api/products', (req, res) => {
  fs.readFile(STORE_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading store');
    const products = JSON.parse(data);
    // Only return visible products
    res.json(products.filter(p => p.visible !== false));
  });
});

// Get all products (for admin)
app.get('/api/products/all', (req, res) => {
  fs.readFile(STORE_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading store');
    res.json(JSON.parse(data));
  });
});

// Add a product
app.post('/api/products', (req, res) => {
  fs.readFile(STORE_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading store');
    const products = JSON.parse(data);
    const newProduct = { ...req.body, id: Date.now() };
    products.push(newProduct);
    fs.writeFile(STORE_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).send('Error writing store');
      res.json(newProduct);
    });
  });
});

// Edit a product
app.put('/api/products/:id', (req, res) => {
  fs.readFile(STORE_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading store');
    let products = JSON.parse(data);
    products = products.map(p => p.id == req.params.id ? { ...p, ...req.body } : p);
    fs.writeFile(STORE_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).send('Error writing store');
      res.json({ success: true });
    });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  fs.readFile(STORE_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading store');
    let products = JSON.parse(data);
    products = products.filter(p => p.id != req.params.id);
    fs.writeFile(STORE_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).send('Error writing store');
      res.json({ success: true });
    });
  });
});

// Get cart (for demo, one global cart)
app.get('/api/cart', (req, res) => {
  fs.readFile(CART_PATH, (err, data) => {
    if (err) return res.status(500).send('Error reading cart');
    res.json(JSON.parse(data));
  });
});

// Add/update cart
app.post('/api/cart', (req, res) => {
  // req.body should be the whole cart array
  fs.writeFile(CART_PATH, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error writing cart');
    res.json({ success: true });
  });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  fs.writeFile(CART_PATH, JSON.stringify([], null, 2), err => {
    if (err) return res.status(500).send('Error clearing cart');
    res.json({ success: true });
  });
});

// Upload endpoint (Imgur integration)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const imageData = fs.readFileSync(req.file.path, { encoding: 'base64' });
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      new URLSearchParams({ image: imageData }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    fs.unlinkSync(req.file.path);
    res.json({ url: response.data.data.url });
  } catch (err) {
    res.status(500).json({ error: 'imgbb upload failed', details: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));