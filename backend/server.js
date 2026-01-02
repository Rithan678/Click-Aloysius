const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();

// Import routes
const faceRecognitionRoutes = require('./routes/faceRecognition');
const photosRoutes = require('./routes/photos');

// Import mock database for testing (optional)
const mockDatabase = require('./db/mockDatabase');

const app = express();
const PORT = process.env.PORT || 5000;
const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true' || true; // Set to true for testing

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Database Connection
let db;

if (USE_MOCK_DB) {
  console.log('🔧 Using Mock Database (for testing)');
  db = mockDatabase;
  db.connect();
} else {
  console.log('🗄️ Connecting to MySQL...');
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'click_aloy'
  });

  db.connect((err) => {
    if (err) {
      console.error('❌ Database connection failed:', err);
      console.log('💡 Tip: Start MySQL or set USE_MOCK_DB=true');
      process.exit(1);
    } else {
      console.log('✓ Connected to MySQL database');
    }
  });
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Click Aloysius Backend API',
    status: 'running',
    database: USE_MOCK_DB ? 'mock' : 'mysql',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: USE_MOCK_DB ? 'mock' : 'mysql'
  });
});

// Face Recognition routes
app.use('/api/face', faceRecognitionRoutes);

// Photos routes
app.use('/api/photos', photosRoutes);

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
  res.json({
    success: true,
    events: USE_MOCK_DB ? db.getAllEvents() : []
  });
});

app.post('/api/events', (req, res) => {
  // TODO: Create event
  res.json({ message: 'Create event endpoint' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Click Aloysius Backend Server       ║
╚════════════════════════════════════════╝

✓ Server running on port ${PORT}
✓ API: http://localhost:${PORT}
✓ Database: ${USE_MOCK_DB ? '🔧 Mock (Testing)' : '🗄️ MySQL'}
✓ Status: http://localhost:${PORT}/api/health

Environment:
  NODE_ENV: ${process.env.NODE_ENV || 'development'}
  USE_MOCK_DB: ${USE_MOCK_DB}
  CORS: enabled
  
Ready to accept requests! 🚀
  `);
});