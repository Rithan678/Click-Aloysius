import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Photos from './pages/Photos';
import MyPhotos from './pages/MyPhotos';
import { loadFaceApiModels } from './utils/faceApiUtils';

// Face Recognition Context
export const FaceRecognitionContext = createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [faceApiReady, setFaceApiReady] = useState(false);
  const [userFaceDescriptor, setUserFaceDescriptor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load face-api models on app startup
    const initFaceApi = async () => {
      try {
        const success = await loadFaceApiModels();
        setFaceApiReady(success);
      } catch (error) {
        console.error('Failed to initialize face-api:', error);
        setFaceApiReady(false);
      } finally {
        setLoading(false);
      }
    };

    initFaceApi();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Loading face recognition models...</p>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <FaceRecognitionContext.Provider value={{ faceApiReady, userFaceDescriptor, setUserFaceDescriptor }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/my-photos" element={<MyPhotos />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </FaceRecognitionContext.Provider>
  );
}

export default App;