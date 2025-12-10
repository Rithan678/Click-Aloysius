const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'click_aloy'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Click Aloysius Backend API');
});

// Auth routes placeholder
app.post('/api/auth/login', (req, res) => {
  // TODO: Implement login
  res.json({ message: 'Login endpoint' });
});

app.post('/api/auth/register', (req, res) => {
  // TODO: Implement register
  res.json({ message: 'Register endpoint' });
});

// Events routes placeholder
app.get('/api/events', (req, res) => {
  // TODO: Get events
  res.json({ message: 'Events endpoint' });
});

app.post('/api/events', (req, res) => {
  // TODO: Create event
  res.json({ message: 'Create event endpoint' });
});

// Photos routes placeholder
app.get('/api/photos', (req, res) => {
  // TODO: Get photos
  res.json({ message: 'Photos endpoint' });
});

app.post('/api/photos/upload', (req, res) => {
  // TODO: Upload photo
  res.json({ message: 'Upload photo endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});