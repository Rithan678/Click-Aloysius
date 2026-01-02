import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoGrid from '../components/PhotoGrid';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" py={8}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
            Welcome to Click Aloysius
          </Typography>
          <Typography variant="h6" sx={{ color: '#aaa' }} paragraph>
            Your college event photo management system with AI-powered face recognition
          </Typography>
          <Box mt={4} mb={6}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/photos')}
              sx={{ 
                mr: 2,
                backgroundColor: '#00a86b',
                '&:hover': { backgroundColor: '#008f5b' }
              }}
            >
              Browse Photos
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ 
                borderColor: '#00a86b',
                color: '#00a86b',
                '&:hover': { borderColor: '#008f5b', backgroundColor: 'rgba(0,168,107,0.1)' }
              }}
            >
              Staff Login
            </Button>
          </Box>
        </Box>
        <PhotoGrid />
      </Container>
    </Box>
  );
}

export default Home;