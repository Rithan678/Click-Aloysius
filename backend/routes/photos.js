const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photos/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Middleware for authentication (to be implemented)
const authenticateToken = (req, res, next) => {
  // TODO: Implement JWT verification
  req.user = req.user || { id: 1 }; // Mock user for now
  next();
};

// Get all approved photos
router.get('/', (req, res) => {
  const { status = 'approved', eventId } = req.query;

  try {
    // TODO: Query database for photos
    // Example query:
    // SELECT id, event_id, filename, file_path, original_filename, status 
    // FROM photos 
    // WHERE status = ? AND (event_id = ? OR ? IS NULL)
    // ORDER BY created_at DESC;

    res.json([
      // {
      //   id: 1,
      //   event_id: 1,
      //   filename: '1234567890-photo.jpg',
      //   file_path: '/uploads/photos/1234567890-photo.jpg',
      //   original_filename: 'photo.jpg',
      //   status: 'approved',
      // },
    ]);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get photos for a specific event
router.get('/event/:eventId', (req, res) => {
  const { eventId } = req.params;
  const { status = 'approved' } = req.query;

  try {
    // TODO: Query database for event photos
    // Example query:
    // SELECT id, event_id, filename, file_path, original_filename, status 
    // FROM photos 
    // WHERE event_id = ? AND status = ?
    // ORDER BY created_at DESC;

    res.json([]);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload a photo
router.post('/upload', authenticateToken, upload.single('photo'), (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  if (!eventId || !req.file) {
    return res.status(400).json({
      success: false,
      error: 'Missing eventId or photo file',
    });
  }

  try {
    // TODO: Save to database
    // Example query:
    // INSERT INTO photos (event_id, uploaded_by, filename, original_filename, file_path, status) 
    // VALUES (eventId, userId, filename, original_filename, file_path, 'pending');

    res.json({
      success: true,
      message: 'Photo uploaded successfully',
      photoId: null, // Replace with actual ID from DB
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Approve a photo (staff only)
router.post('/:photoId/approve', authenticateToken, (req, res) => {
  const { photoId } = req.params;
  const userId = req.user.id;

  try {
    // TODO: Check if user is staff, then update photo status
    // Example query:
    // UPDATE photos SET status = 'approved', approved_by = ?, approved_at = NOW() 
    // WHERE id = ?;

    res.json({
      success: true,
      message: 'Photo approved',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reject a photo (staff only)
router.post('/:photoId/reject', authenticateToken, (req, res) => {
  const { photoId } = req.params;

  try {
    // TODO: Check if user is staff, then update photo status
    // Example query:
    // UPDATE photos SET status = 'rejected' WHERE id = ?;

    res.json({
      success: true,
      message: 'Photo rejected',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a photo
router.delete('/:photoId', authenticateToken, (req, res) => {
  const { photoId } = req.params;

  try {
    // TODO: Delete from database and file system
    // Example query:
    // DELETE FROM photos WHERE id = ?;

    res.json({
      success: true,
      message: 'Photo deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
