import * as faceapi from 'face-api.js';

// Load all face-api models
export const loadFaceApiModels = async () => {
  try {
    console.log('Loading face-api models...');
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    ]);
    console.log('✓ All face-api models loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading face-api models:', error);
    return false;
  }
};

// Extract face descriptor from an image file
export const extractFaceDescriptor = async (imageFile) => {
  try {
    const img = await faceapi.bufferToImage(imageFile);
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      throw new Error('No face detected in the image.');
    }

    return {
      descriptor: Array.from(detection.descriptor),
      landmarks: detection.landmarks,
    };
  } catch (error) {
    console.error('Error extracting face descriptor:', error);
    throw error;
  }
};

// Extract face descriptors from an image URL
export const extractFaceDescriptorsFromUrl = async (imageUrl) => {
  try {
    const img = await faceapi.fetchImage(imageUrl);
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length === 0) {
      return [];
    }

    return detections.map((detection) => ({
      descriptor: Array.from(detection.descriptor),
      box: detection.detection.box,
    }));
  } catch (error) {
    console.error('Error extracting face descriptors from URL:', error);
    throw error;
  }
};

// Compare two face descriptors using Euclidean distance
export const compareFaceDescriptors = (descriptor1, descriptor2, threshold = 0.6) => {
  if (!descriptor1 || !descriptor2) {
    return false;
  }

  // Convert to Float32Array if needed
  const desc1 = descriptor1 instanceof Float32Array ? descriptor1 : new Float32Array(descriptor1);
  const desc2 = descriptor2 instanceof Float32Array ? descriptor2 : new Float32Array(descriptor2);

  const distance = faceapi.euclideanDistance(desc1, desc2);
  return {
    isMatch: distance < threshold,
    distance,
    threshold,
  };
};

// Find matching photos from a list
export const findMatchingPhotos = async (userDescriptor, photos, threshold = 0.6) => {
  if (!userDescriptor || !photos || photos.length === 0) {
    return [];
  }

  const matchedPhotos = [];

  for (const photo of photos) {
    try {
      const detections = await extractFaceDescriptorsFromUrl(photo.url || photo.file_path);

      for (const detection of detections) {
        const comparison = compareFaceDescriptors(userDescriptor, detection.descriptor, threshold);
        if (comparison.isMatch) {
          matchedPhotos.push({
            ...photo,
            faceDistance: comparison.distance,
          });
          break; // Stop after first match in this photo
        }
      }
    } catch (error) {
      console.warn(`Error processing photo ${photo.id}:`, error);
      // Continue with next photo
    }
  }

  return matchedPhotos.sort((a, b) => a.faceDistance - b.faceDistance);
};

// Batch process photos with progress callback
export const batchFindMatchingPhotos = async (
  userDescriptor,
  photos,
  threshold = 0.6,
  onProgress = null
) => {
  if (!userDescriptor || !photos || photos.length === 0) {
    return [];
  }

  const matchedPhotos = [];
  const batchSize = 5;

  for (let i = 0; i < photos.length; i += batchSize) {
    const batch = photos.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (photo) => {
        try {
          const detections = await extractFaceDescriptorsFromUrl(photo.url || photo.file_path);

          for (const detection of detections) {
            const comparison = compareFaceDescriptors(userDescriptor, detection.descriptor, threshold);
            if (comparison.isMatch) {
              matchedPhotos.push({
                ...photo,
                faceDistance: comparison.distance,
              });
              break;
            }
          }
        } catch (error) {
          console.warn(`Error processing photo ${photo.id}:`, error);
        }
      })
    );

    if (onProgress) {
      onProgress(Math.min(i + batchSize, photos.length), photos.length);
    }
  }

  return matchedPhotos.sort((a, b) => a.faceDistance - b.faceDistance);
};
