import React, { useState, useRef, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { extractFaceDescriptor } from '../utils/faceApiUtils';
import { FaceRecognitionContext } from '../App';

function SelfieUpload() {
  const fileInputRef = useRef(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setUserFaceDescriptor } = useContext(FaceRecognitionContext);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Extract face descriptor from the selfie
      const result = await extractFaceDescriptor(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelfieImage(e.target?.result);
      };
      reader.readAsDataURL(file);

      // Store the face descriptor
      setUserFaceDescriptor(result.descriptor);

      // Save to localStorage for persistence
      localStorage.setItem('userFaceDescriptor', JSON.stringify(result.descriptor));

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to process selfie. Please try again.');
      setSelfieImage(null);
      setUserFaceDescriptor(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSelfie = () => {
    setSelfieImage(null);
    setUserFaceDescriptor(null);
    localStorage.removeItem('userFaceDescriptor');
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📸 Reference Selfie
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Upload a clear photo of your face. This will be used to identify you in event photos.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Selfie uploaded successfully! Your photos will now be matched.</Alert>}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {!selfieImage ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            {loading ? (
              <>
                <CircularProgress sx={{ mb: 1 }} />
                <Typography variant="body2">Processing your selfie...</Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Button
                  variant="contained"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mt: 1 }}
                >
                  Upload Selfie
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              alt="Reference selfie"
              src={selfieImage}
              sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
            />
            <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
              ✓ Selfie set
            </Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleClearSelfie}
            >
              Change Selfie
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default SelfieUpload;
