import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Alert,
  CircularProgress,
  Box,
  LinearProgress,
  Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { batchFindMatchingPhotos } from '../utils/faceApiUtils';
import { FaceRecognitionContext } from '../App';
import SelfieUpload from '../components/SelfieUpload';

function MyPhotos() {
  const { userFaceDescriptor } = useContext(FaceRecognitionContext);
  const [matchedPhotos, setMatchedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [allPhotos, setAllPhotos] = useState([]);

  // Fetch approved photos from the backend
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos?status=approved');
        const data = await response.json();
        setAllPhotos(data || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Perform face matching when descriptor is available and photos are loaded
  useEffect(() => {
    if (userFaceDescriptor && allPhotos.length > 0 && !loading) {
      performFaceMatching();
    }
  }, [userFaceDescriptor, allPhotos]);

  const performFaceMatching = async () => {
    if (!userFaceDescriptor || allPhotos.length === 0) return;

    setLoading(true);
    setProgress({ current: 0, total: allPhotos.length });

    try {
      const matched = await batchFindMatchingPhotos(
        userFaceDescriptor,
        allPhotos,
        0.6,
        (current, total) => {
          setProgress({ current, total });
        }
      );
      setMatchedPhotos(matched);
    } catch (error) {
      console.error('Error during face matching:', error);
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleDownloadPhoto = (photo) => {
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = photo.url || photo.file_path;
    link.download = photo.original_filename || `photo-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        📷 My Photos
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Your personal photo gallery - photos where you appear across all events.
      </Typography>

      {/* Selfie Upload Section */}
      <SelfieUpload />

      {/* Status and Matching Progress */}
      {!userFaceDescriptor && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Upload a selfie to get started. We'll use AI to find all photos where you appear.
        </Alert>
      )}

      {userFaceDescriptor && (
        <>
          {loading && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Matching photos: {progress.current} of {progress.total}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(progress.current / progress.total) * 100}
              />
            </Box>
          )}

          {!loading && matchedPhotos.length === 0 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              No photos found with your face. Check back after new event photos are uploaded and approved.
            </Alert>
          )}

          {matchedPhotos.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="success">
                Found {matchedPhotos.length} photo{matchedPhotos.length !== 1 ? 's' : ''} with you!
              </Alert>
            </Box>
          )}
        </>
      )}

      {/* Photos Grid */}
      {matchedPhotos.length > 0 && (
        <Grid container spacing={3}>
          {matchedPhotos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={photo.url || photo.file_path}
                  alt={photo.original_filename}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {photo.original_filename}
                  </Typography>
                  <Typography variant="caption" display="block" color="success.main">
                    Match confidence: {(100 - (photo.faceDistance || 0) * 100).toFixed(1)}%
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    size="small"
                    startIcon={<DownloadIcon />}
                    fullWidth
                    onClick={() => handleDownloadPhoto(photo)}
                  >
                    Download
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default MyPhotos;