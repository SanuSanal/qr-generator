import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import gifImage from '../assets/codegen-qr.gif';

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}
    >
      <Toolbar disableGutters>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <img
            src={gifImage}
            alt="Logo"
            style={{ height: 40 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
