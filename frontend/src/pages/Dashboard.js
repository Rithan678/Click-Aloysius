import React from 'react';
import { Container, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Analytics and management dashboard for staff.
      </Typography>
    </Container>
  );
}

export default Dashboard;