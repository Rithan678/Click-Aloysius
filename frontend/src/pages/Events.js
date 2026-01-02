import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

function Events() {
  const events = [
    { id: 1, title: 'Tech Fest 2026', date: 'Jan 15, 2026', photos: 245, category: 'Technology' },
    { id: 2, title: 'Sports Day', date: 'Dec 20, 2025', photos: 189, category: 'Sports' },
    { id: 3, title: 'Cultural Night', date: 'Nov 5, 2025', photos: 312, category: 'Culture' },
  ];

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff', p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        Events
      </Typography>
      <Typography variant="body2" sx={{ color: '#aaa', mb: 4 }}>
        Browse college events and their photo galleries
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ backgroundColor: '#1a1a1a', color: '#fff', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
              <CardMedia
                component="div"
                sx={{ height: 140, backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <EventIcon sx={{ fontSize: 60, color: '#00a86b' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
                  {event.date} • {event.photos} photos
                </Typography>
                <Chip label={event.category} size="small" sx={{ backgroundColor: '#00a86b', color: '#fff' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Events;