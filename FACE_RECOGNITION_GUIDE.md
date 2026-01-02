# Face Recognition Integration Guide

## Setup Instructions

### 1. Download Face-API Models

The face-api.js library requires pre-trained models. Download them from the official repository:

```bash
# Navigate to the frontend directory
cd frontend/public

# Download models (you need to download these files manually or use a script)
# Models needed:
# - tiny_face_detector_model-weights_manifest.json
# - tiny_face_detector_model-weights.bin
# - face_landmark_68_model-weights_manifest.json
# - face_landmark_68_model-weights.bin
# - face_recognition_model-weights_manifest.json
# - face_recognition_model-weights.bin
```

**Alternative: Use npm to get the models**
```bash
npm install @vladmandic/face-api
```

Then copy models from `node_modules/@vladmandic/face-api/model/` to `public/models/`

### 2. Dependencies

Ensure face-api.js is installed:
```bash
npm install face-api.js
```

### 3. Feature Overview

#### User Flow:
1. **Selfie Upload** (SelfieUpload.js)
   - User uploads a reference photo of their face
   - face-api.js extracts face descriptor (128-dimensional vector)
   - Descriptor is stored in localStorage and context

2. **Photo Matching** (MyPhotos.js)
   - Fetches all approved event photos from backend
   - For each photo, detects all faces using face-api.js
   - Compares each detected face to user's reference descriptor
   - Uses Euclidean distance with threshold of 0.6 for matching
   - Displays matched photos with confidence scores

3. **Analytics** (Optional)
   - Records photo views/downloads
   - Backend stores data for analytics dashboard

### 4. File Structure

```
frontend/
├── public/
│   └── models/                    # face-api.js models (download required)
│       ├── tiny_face_detector_model-weights_manifest.json
│       ├── tiny_face_detector_model-weights.bin
│       ├── face_landmark_68_model-weights_manifest.json
│       ├── face_landmark_68_model-weights.bin
│       ├── face_recognition_model-weights_manifest.json
│       └── face_recognition_model-weights.bin
├── src/
│   ├── App.js                     # Loads models on startup
│   ├── components/
│   │   └── SelfieUpload.js        # Selfie upload component
│   ├── pages/
│   │   └── MyPhotos.js            # Main photo matching page
│   └── utils/
│       └── faceApiUtils.js        # Face recognition utilities
```

### 5. Key Functions

**faceApiUtils.js:**
- `loadFaceApiModels()` - Loads all face-api models
- `extractFaceDescriptor(imageFile)` - Extracts descriptor from uploaded file
- `extractFaceDescriptorsFromUrl(imageUrl)` - Extracts descriptors from URL
- `compareFaceDescriptors(desc1, desc2, threshold)` - Compares two descriptors
- `findMatchingPhotos(descriptor, photos, threshold)` - Finds all matching photos
- `batchFindMatchingPhotos(descriptor, photos, threshold, onProgress)` - Batch processing with progress

### 6. Configuration

**Matching Threshold (0.6 default):**
- Lower value = stricter matching (fewer false positives)
- Higher value = lenient matching (more matches but more false positives)
- Recommended range: 0.4 - 0.7

### 7. Privacy Considerations

- All face recognition happens **client-side** in the browser
- Descriptors can be stored in localStorage (session) or backend (persistent)
- User consent is required before processing any face data
- No face images are stored, only mathematical descriptors

### 8. Backend Setup

The following endpoints are created (implement database logic):

**Face Recognition Endpoints:**
- `GET /api/face/descriptor` - Get user's stored descriptor
- `POST /api/face/descriptor` - Save user's descriptor

**Photo Endpoints:**
- `GET /api/photos` - Get approved photos
- `GET /api/photos/event/:eventId` - Get photos for specific event
- `POST /api/photos/upload` - Upload photo
- `POST /api/photos/:photoId/approve` - Approve photo (staff only)
- `POST /api/photos/:photoId/reject` - Reject photo (staff only)

### 9. Testing

1. Start the backend: `npm run dev` (in backend directory)
2. Start the frontend: `npm start` (in frontend directory)
3. Navigate to "My Photos" page
4. Upload a selfie with your face clearly visible
5. Wait for face recognition models to load
6. System will automatically match photos

### 10. Troubleshooting

**Models not loading:**
- Ensure models are in `public/models/`
- Check browser console for CORS errors
- Verify file paths in faceApiUtils.js

**No faces detected:**
- Ensure image has a clear frontal face
- Check image quality and lighting
- Try with a different image

**Performance issues:**
- Reduce batch size in `batchFindMatchingPhotos`
- Process photos server-side for better performance
- Use GPU acceleration if available

## Next Steps

1. Download and place face-api models in `public/models/`
2. Implement database queries in backend routes
3. Add authentication/JWT to protect endpoints
4. Test with sample photos
5. Optimize performance for large photo sets
