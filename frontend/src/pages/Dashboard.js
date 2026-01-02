import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PhotoGrid from '../components/PhotoGrid';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Nature', icon: '🌿', color: '#4caf50' },
    { name: 'Technology', icon: '💻', color: '#2196f3' },
    { name: 'Animals', icon: '🦄', color: '#9c27b0' },
    { name: 'Food', icon: '🍔', color: '#ff9800' },
    { name: 'Building', icon: '🏢', color: '#607d8b' },
    { name: 'Sport', icon: '⚽', color: '#f44336' },
    { name: 'Car', icon: '🚗', color: '#3f51b5' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Header */}
      <Box
        sx={{
          borderBottom: '1px solid #2a2a2a',
          px: 4,
          pt: 3,
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
            Dashboard
          </Typography>
          <TextField
            placeholder="Search"
            size="small"
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1a1a1a',
                borderRadius: 2,
                color: '#fff',
                '& fieldset': {
                  borderColor: '#2a2a2a',
                },
                '&:hover fieldset': {
                  borderColor: '#3a3a3a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00a86b',
                },
              },
              '& input': {
                color: '#fff',
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

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#00a86b',
              height: 3,
            },
            '& .MuiTab-root': {
              color: '#888',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              minWidth: 80,
              '&.Mui-selected': {
                color: '#00a86b',
              },
            },
          }}
        >
          <Tab label="Feed" />
          <Tab label="Edit" />
        </Tabs>
      </Box>

      {/* Category Filters */}
      <Box
        sx={{
          px: 4,
          py: 2,
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category.name}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Box>
            }
            onClick={() => setSelectedCategory(category.name)}
            sx={{
              backgroundColor: selectedCategory === category.name ? category.color : '#2a2a2a',
              color: '#fff',
              fontSize: '0.85rem',
              px: 1,
              transition: 'all 0.2s',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: selectedCategory === category.name ? category.color : '#3a3a3a',
                transform: 'translateY(-2px)',
              },
            }}
          />
        ))}
        <Chip
          label="More ▾"
          sx={{
            backgroundColor: '#2a2a2a',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#3a3a3a',
            },
          }}
        />
      </Box>

      {/* Photo Grid */}
      <PhotoGrid />
    </Box>
  );
}

export default Dashboard;