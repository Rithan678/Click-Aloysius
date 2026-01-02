import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import * as faceapi from 'face-api.js';
import { loadFaceApiModels, extractFaceDescriptor, compareFaceDescriptors } from '../utils/faceApiUtils';

const TestStatus = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

function FaceRecognitionTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(TestStatus.PENDING);
  const [modelErrors, setModelErrors] = useState([]);
  const [selfieStatus, setSelfieStatus] = useState(TestStatus.PENDING);
  const [testPhotoStatus, setTestPhotoStatus] = useState(TestStatus.PENDING);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [selfieDescriptor, setSelfieDescriptor] = useState(null);
  const [testPhotoDescriptor, setTestPhotoDescriptor] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [testPhotoPreview, setTestPhotoPreview] = useState(null);
  const [threshold, setThreshold] = useState(0.6);
  const [detectionDetails, setDetectionDetails] = useState(null);

  // Step 1: Load Models
  useEffect(() => {
    const initModels = async () => {
      setModelsLoaded(TestStatus.LOADING);
      try {
        const modelsToLoad = [
          { name: 'tinyFaceDetector', net: faceapi.nets.tinyFaceDetector },
          { name: 'faceLandmark68Net', net: faceapi.nets.faceLandmark68Net },
          { name: 'faceRecognitionNet', net: faceapi.nets.faceRecognitionNet },
        ];

        const errors = [];
        for (const model of modelsToLoad) {
          try {
            console.log(`Loading ${model.name}...`);
            await model.net.loadFromUri('/models');
            console.log(`✓ ${model.name} loaded`);
          } catch (error) {
            errors.push(`${model.name}: ${error.message}`);
          }
        }

        if (errors.length === 0) {
          setModelsLoaded(TestStatus.SUCCESS);
        } else {
          setModelErrors(errors);
          setModelsLoaded(TestStatus.ERROR);
        }
      } catch (error) {
        setModelErrors([error.message]);
        setModelsLoaded(TestStatus.ERROR);
      }
    };

    initModels();
  }, []);

  const handleSelfieUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelfieStatus(TestStatus.LOADING);
    try {
      const result = await extractFaceDescriptor(file);
      setSelfieDescriptor(result.descriptor);

      const reader = new FileReader();
      reader.onload = (e) => setSelfiePreview(e.target?.result);
      reader.readAsDataURL(file);

      setSelfieStatus(TestStatus.SUCCESS);
      if (activeStep === 1) setActiveStep(2);
    } catch (error) {
      console.error('Selfie extraction error:', error);
      setSelfieStatus(TestStatus.ERROR);
    }
  };

  const handleTestPhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setTestPhotoStatus(TestStatus.LOADING);
    try {
      const result = await extractFaceDescriptor(file);
      setTestPhotoDescriptor(result.descriptor);

      const reader = new FileReader();
      reader.onload = (e) => setTestPhotoPreview(e.target?.result);
      reader.readAsDataURL(file);

      setTestPhotoStatus(TestStatus.SUCCESS);
      if (activeStep === 2) setActiveStep(3);
    } catch (error) {
      console.error('Test photo extraction error:', error);
      setTestPhotoStatus(TestStatus.ERROR);
    }
  };

  const handleCompareFaces = () => {
    if (!selfieDescriptor || !testPhotoDescriptor) {
      alert('Please upload both photos first');
      return;
    }

    try {
      const result = compareFaceDescriptors(selfieDescriptor, testPhotoDescriptor, threshold);
      setComparisonResult(result);

      // Calculate additional stats
      setDetectionDetails({
        selfieDescriptorLength: selfieDescriptor.length,
        testPhotoDescriptorLength: testPhotoDescriptor.length,
        matchStatus: result.isMatch ? 'MATCH ✓' : 'NO MATCH ✗',
        distance: result.distance.toFixed(4),
        threshold: threshold.toFixed(2),
      });

      setActiveStep(4);
    } catch (error) {
      console.error('Comparison error:', error);
      alert('Error comparing faces: ' + error.message);
    }
  };

  const resetTest = () => {
    setActiveStep(0);
    setSelfieStatus(TestStatus.PENDING);
    setTestPhotoStatus(TestStatus.PENDING);
    setComparisonResult(null);
    setSelfieDescriptor(null);
    setTestPhotoDescriptor(null);
    setSelfiePreview(null);
    setTestPhotoPreview(null);
    setDetectionDetails(null);
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case TestStatus.SUCCESS:
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case TestStatus.ERROR:
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      case TestStatus.LOADING:
        return <HourglassBottomIcon sx={{ color: 'warning.main' }} />;
      default:
        return <HourglassBottomIcon sx={{ color: 'gray' }} />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        🧪 Face Recognition Test Suite
      </Typography>

      {/* Step 1: Load Models */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StatusIcon status={modelsLoaded} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Step 1: Face-API Models
            </Typography>
          </Box>

          {modelsLoaded === TestStatus.LOADING && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
              <Typography>Loading face recognition models...</Typography>
            </Box>
          )}

          {modelsLoaded === TestStatus.SUCCESS && (
            <Alert severity="success">
              ✓ All face-api models loaded successfully
              <List dense sx={{ mt: 1 }}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="tinyFaceDetector" secondary="Face detection" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="faceLandmark68Net" secondary="Face landmarks" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="faceRecognitionNet" secondary="Face descriptors" />
                </ListItem>
              </List>
            </Alert>
          )}

          {modelsLoaded === TestStatus.ERROR && (
            <Alert severity="error">
              ✗ Error loading models:
              <List dense sx={{ mt: 1 }}>
                {modelErrors.map((error, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <ErrorIcon sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={error} />
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Upload Selfie */}
      {modelsLoaded === TestStatus.SUCCESS && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StatusIcon status={selfieStatus} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Step 2: Upload Reference Selfie
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  disabled={modelsLoaded !== TestStatus.SUCCESS}
                >
                  Choose Selfie
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleSelfieUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {selfieStatus === TestStatus.SUCCESS && (
                  <Typography variant="body2" color="success.main">
                    ✓ Face detected in selfie
                  </Typography>
                )}
                {selfieStatus === TestStatus.ERROR && (
                  <Typography variant="body2" color="error.main">
                    ✗ No face detected or error occurred
                  </Typography>
                )}
              </Grid>
            </Grid>

            {selfiePreview && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img src={selfiePreview} alt="Selfie" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Upload Test Photo */}
      {selfieStatus === TestStatus.SUCCESS && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StatusIcon status={testPhotoStatus} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Step 3: Upload Test Photo
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  disabled={selfieStatus !== TestStatus.SUCCESS}
                >
                  Choose Test Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleTestPhotoUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {testPhotoStatus === TestStatus.SUCCESS && (
                  <Typography variant="body2" color="success.main">
                    ✓ Face detected in test photo
                  </Typography>
                )}
                {testPhotoStatus === TestStatus.ERROR && (
                  <Typography variant="body2" color="error.main">
                    ✗ No face detected or error occurred
                  </Typography>
                )}
              </Grid>
            </Grid>

            {testPhotoPreview && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img src={testPhotoPreview} alt="Test Photo" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Configure & Compare */}
      {testPhotoStatus === TestStatus.SUCCESS && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Step 4: Configure & Compare</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Matching Threshold"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  inputProps={{ step: 0.1, min: 0, max: 1 }}
                  fullWidth
                  helperText="Lower = stricter (0.4-0.7 recommended)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleCompareFaces}
                  sx={{ mt: 1 }}
                >
                  Compare Faces
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Results */}
      {comparisonResult && (
        <Card sx={{ mb: 3, backgroundColor: comparisonResult.isMatch ? '#e8f5e9' : '#ffebee' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StatusIcon status={comparisonResult.isMatch ? TestStatus.SUCCESS : TestStatus.ERROR} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Step 5: Comparison Results
              </Typography>
            </Box>

            {comparisonResult.isMatch ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                ✓ MATCH! The faces are the same person
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 2 }}>
                ✗ NO MATCH: The faces are different people
              </Alert>
            )}

            {detectionDetails && (
              <Paper sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Euclidean Distance:</strong> {detectionDetails.distance}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Threshold:</strong> {detectionDetails.threshold}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Match Status:</strong> {detectionDetails.matchStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Descriptor Dimensions:</strong> {detectionDetails.selfieDescriptorLength}D
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" display="block" gutterBottom>
                💡 How it works:
              </Typography>
              <Typography variant="caption" display="block">
                • Euclidean Distance &lt; Threshold = Match ✓
                • Euclidean Distance ≥ Threshold = No Match ✗
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      {comparisonResult && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              📊 Debug Information
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', overflow: 'auto' }}>
              <pre style={{ fontSize: '12px', margin: 0 }}>
{JSON.stringify({
  modelsLoaded,
  selfieDescriptorLength: selfieDescriptor?.length,
  testPhotoDescriptorLength: testPhotoDescriptor?.length,
  distance: comparisonResult?.distance.toFixed(4),
  threshold: threshold.toFixed(2),
  isMatch: comparisonResult?.isMatch,
}, null, 2)}
              </pre>
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="outlined" onClick={resetTest}>
          Reset Test
        </Button>
      </Box>

      {/* Tips */}
      <Card sx={{ mt: 3, backgroundColor: '#e3f2fd' }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            💡 Testing Tips:
          </Typography>
          <Typography variant="body2" component="div">
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Upload clear, well-lit photos with frontal face view</li>
              <li>For positive test: Upload same person twice from different angles</li>
              <li>For negative test: Upload photos of different people</li>
              <li>Lower threshold for stricter matching (fewer false positives)</li>
              <li>Higher threshold for lenient matching (more matches but more false positives)</li>
              <li>Recommended threshold: 0.5 - 0.7</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FaceRecognitionTest;
