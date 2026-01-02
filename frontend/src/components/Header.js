import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Click Aloysius
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/events">Events</Button>
        <Button color="inherit" component={Link} to="/photos">Photos</Button>
        <Button color="inherit" component={Link} to="/my-photos">My Photos</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;