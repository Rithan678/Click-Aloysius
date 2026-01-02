import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PhotoGrid from '../components/PhotoGrid';

function Photos() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Box sx={{ borderBottom: '1px solid #2a2a2a', px: 4, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
            All Photos
          </Typography>
          <TextField
            placeholder="Search photos..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1a1a1a',
                borderRadius: 2,
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a2a' },
                '&:hover fieldset': { borderColor: '#3a3a3a' },
                '&.Mui-focused fieldset': { borderColor: '#00a86b' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#888' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#aaa', mt: 1 }}>
          Browse and download approved event photos
        </Typography>
      </Box>
      <PhotoGrid />
    </Box>
  );
}

export default Photos;