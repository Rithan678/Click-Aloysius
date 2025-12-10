import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Click Aloysius
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        College Event Photo Management System
      </Typography>
      <Typography variant="body1" paragraph>
        A secure, AI-enhanced platform for managing college event photos with staff-controlled uploads and universal access.
      </Typography>
      <Button variant="contained" component={Link} to="/login" size="large">
        Get Started
      </Button>
    </Container>
  );
}

export default Home;