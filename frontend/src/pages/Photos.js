import React from 'react';
import { Container, Typography } from '@mui/material';

function Photos() {
  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Photos
      </Typography>
      <Typography variant="body1">
        Browse approved event photos.
      </Typography>
    </Container>
  );
}

export default Photos;