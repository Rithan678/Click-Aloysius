import React from 'react';
import { Container, Typography } from '@mui/material';

function Events() {
  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Events
      </Typography>
      <Typography variant="body1">
        Manage college events and photo uploads.
      </Typography>
    </Container>
  );
}

export default Events;