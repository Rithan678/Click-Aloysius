import React from 'react';
import { Container, Typography } from '@mui/material';

function MyPhotos() {
  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        My Photos
      </Typography>
      <Typography variant="body1">
        Your personal photo gallery powered by AI face recognition.
      </Typography>
    </Container>
  );
}

export default MyPhotos;