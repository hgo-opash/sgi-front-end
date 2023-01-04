import { Box } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';
import React from 'react';

const Footer = () => {
  const theme = useTheme();

    return(
  <Box
    sx={{
      height: { xs: '30px', sm: '40px', md: '50px', lg: '60px' },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: { xs: '0 20px', sm: '0 40px', md: '0 50px', lg: '0 64px' },
    }}
  >
    <Box sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, fontWeight: 400, color: '#000000' }}>
      © Safalvir LLC 2023. All rights reserved
    </Box>
    <Box sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, fontWeight: 400, color: '#000000' }}>
      Terms of Service | Privacy Policy
    </Box>
  </Box>
)
}

export default Footer;
