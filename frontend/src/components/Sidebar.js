import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Badge,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Photo as PhotoIcon,
  Event as EventIcon,
  Search as SearchIcon,
  Explore as ExploreIcon,
  Bookmark as BookmarkIcon,
  Download as DownloadIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Science as TestIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(true);

  const menuItems = [
    {
      section: 'Main',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', badge: null },
        { text: 'Feed', icon: <PhotoIcon />, path: '/photos', badge: null },
        { text: 'Edit', icon: <EditIcon />, path: '/events', badge: null },
        { text: 'Search', icon: <SearchIcon />, path: '/search', badge: null },
      ],
    },
    {
      section: 'Library',
      items: [
        { text: 'Explore', icon: <ExploreIcon />, path: '/explore', badge: null },
        { text: 'Bookmark', icon: <BookmarkIcon />, path: '/bookmarks', badge: null },
        { text: 'Downloads', icon: <DownloadIcon />, path: '/downloads', badge: null },
        { text: 'Notification', icon: <NotificationsIcon />, path: '/notifications', badge: hasNotifications ? '2' : null },
      ],
    },
    {
      section: 'Settings',
      items: [
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings', badge: null },
        { text: 'Help', icon: <HelpIcon />, path: '/help', badge: null },
        { text: 'Test', icon: <TestIcon />, path: '/test/face-recognition', badge: null },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          borderRight: '1px solid #2a2a2a',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo */}
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff' }}>
            STGallery
          </Typography>
          <IconButton size="small" sx={{ color: '#888' }}>
            <AddIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: '#2a2a2a' }} />

        {/* Menu Items */}
        {menuItems.map((section, idx) => (
          <Box key={idx}>
            <List sx={{ py: 1 }}>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      sx={{
                        mx: 1,
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: '#2a2a2a',
                        },
                        backgroundColor: isActive ? '#2a2a2a' : 'transparent',
                      }}
                    >
                      <ListItemIcon sx={{ color: isActive ? '#ffffff' : '#888', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '0.9rem',
                            color: isActive ? '#ffffff' : '#aaa',
                          },
                        }}
                      />
                      {item.badge && (
                        <Badge
                          badgeContent={item.badge}
                          color="success"
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', height: 18, minWidth: 18 } }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {idx < menuItems.length - 1 && <Divider sx={{ borderColor: '#2a2a2a', my: 1 }} />}
          </Box>
        ))}

        {/* Upload Section */}
        <Box sx={{ mt: 'auto', p: 2, mb: 2 }}>
          <Box
            sx={{
              backgroundColor: '#2a2a2a',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: '#00a86b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
              }}
            >
              <PhotoIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#fff', mb: 0.5, fontSize: '0.85rem' }}>
              Upload your photos
            </Typography>
            <Typography variant="caption" sx={{ color: '#888', fontSize: '0.75rem' }}>
              according to the{' '}
              <Link to="/events" style={{ color: '#00a86b', textDecoration: 'none' }}>
                Calendar
              </Link>
            </Typography>
            <Badge
              badgeContent="2"
              color="success"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                '& .MuiBadge-badge': { fontSize: '0.7rem', height: 18, minWidth: 18 },
              }}
            />
          </Box>
        </Box>

        {/* User Profile */}
        <Box sx={{ p: 2, borderTop: '1px solid #2a2a2a' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: '#00a86b' }}>B</Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>
                Brooklyn
              </Typography>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '0.75rem' }}>
                Account Pro
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
