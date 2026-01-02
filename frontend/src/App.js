import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Photos from './pages/Photos';
import MyPhotos from './pages/MyPhotos';
import FaceRecognitionTest from './pages/FaceRecognitionTest';
import { loadFaceApiModels } from './utils/faceApiUtils';

// Face Recognition Context
export const FaceRecognitionContext = createContext();

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00a86b',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#121212',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          scrollbarColor: '#2a2a2a #121212',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#2a2a2a',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#121212',
          },
        },
      },
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
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/my-photos" element={<MyPhotos />} />
                <Route path="/test/face-recognition" element={<FaceRecognitionTest />} />
                <Route path="/explore" element={<Dashboard />} />
                <Route path="/bookmarks" element={<Dashboard />} />
                <Route path="/downloads" element={<Dashboard />} />
                <Route path="/notifications" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                <Route path="/help" element={<Dashboard />} />
                <Route path="/search" element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </FaceRecognitionContext.Provider>
  );
}

export default App;