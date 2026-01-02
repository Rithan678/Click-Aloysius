import React from 'react';
import { Box, Card, CardMedia, Typography, Chip, IconButton } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const PhotoGrid = ({ photos }) => {
  // Sample photos if none provided
  const samplePhotos = photos || [
    { id: 1, url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace', title: 'In the Home #1450', user: 'Moon Land', category: 'House', height: 200 },
    { id: 2, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136', title: 'In the Home #1822', user: 'Moon Land', category: 'House', height: 280 },
    { id: 3, url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f', title: 'In the Home #1026', user: 'Moon Land', category: 'Furniture', height: 320 },
    { id: 4, url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6', title: 'In the Home #4430', user: 'Moon Land', category: 'House', height: 240 },
    { id: 5, url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', title: 'In the Home #1195', user: 'City Resident', category: 'Furniture', height: 200 },
    { id: 6, url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457', title: 'In the Home #9920', user: 'Image Research', category: 'House', height: 260 },
    { id: 7, url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37', title: 'In the Home #649', user: 'Image William', category: 'House', height: 200 },
    { id: 8, url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a', title: 'In the Home #4006', user: 'Moon Land', category: 'Decorative', height: 300 },
    { id: 9, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', title: 'In the Home #0635', user: 'Moon Land', category: 'Decorative', height: 240 },
  ];

  const displayPhotos = photos || samplePhotos;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
        padding: 3,
      }}
    >
      {displayPhotos.map((photo) => (
        <Card
          key={photo.id}
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#2a2a2a',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              '& .photo-overlay': {
                opacity: 1,
              },
            },
          }}
        >
          <CardMedia
            component="img"
            image={photo.url}
            alt={photo.title}
            sx={{
              height: photo.height || 250,
              objectFit: 'cover',
            }}
          />
          
          {/* Overlay */}
          <Box
            className="photo-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              opacity: 0,
              transition: 'opacity 0.3s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            {/* Top right category chip */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip
                label={photo.category}
                size="small"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>

            {/* Bottom info */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      mb: 0.5,
                    }}
                  >
                    {photo.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#aaa',
                      fontSize: '0.75rem',
                    }}
                  >
                    📷 {photo.user}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Always visible category badge (bottom left corner) */}
          <Chip
            label={photo.category}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: '#fff',
              fontSize: '0.7rem',
              height: 24,
              backdropFilter: 'blur(10px)',
            }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default PhotoGrid;
