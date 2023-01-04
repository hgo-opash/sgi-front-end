import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Link, Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import { ForgetPasswordForm } from '../sections/auth/forgetPassword';
import backgroundImage from '../images/login-background.png';
import loginImage from '../images/login-image.png';
import Page from '../components/Page';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  //   padding: theme.spacing(12, 0, 0, 0),
}));
const RootStyle = styled('div')(({ theme }) => ({
  background: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  // [theme.breakpoints.up('md')]: {
  //   display: 'flex',
  // },
}));

const ForgetPassword = () => {
  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title="ForgetPassword">
      <RootStyle>
        <Container>
          <Box display="inline-block" sx={{ width: '100%', height: '100vh' }} py={4}>
            <Grid container height={'100%'}>
              <Grid item display={{ xs: 'none', md: 'block' }} xs={0} md={7} height={'100%'}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    padding: '20px',
                    width: '100%',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 50px 0px #C1C8F6',
                    border: '2px solid #3D71FF',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexFlow: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h2" align="center" sx={{ fontSize: '38px', fontWeight: 300 }} mb={2}>
                      Welcome to <span style={{ color: '#3D71FF', fontWeight: 700 }}>SafalSubscriptions</span>
                    </Typography>

                    <Typography variant="h2" sx={{ fontSize: '16px ', fontWeight: 300, color: '#1D1D1F' }} mb={2}>
                      The Inkling client project admin Board
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={loginImage} alt="login" width="85%" height="400px" style={{ objectFit: 'contain' }} />
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={5} sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Card
                  sx={{
                    height: 'calc(100% - 22%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '50px',
                    width: '100%',
                    borderRadius: '0px',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    boxShadow: 'none',
                    pl: '80px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexFlow: 'column',
                      // alignItems: 'center',
                      justifyContent: 'center',
                      // height: '100%',
                      // height: "calc(100% - 50%)",
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{ fontSize: '24px', fontWeight: 700, alignItems: 'center', color: '#3D71FF' }}
                      mb={1}
                    >
                      Forgot Password
                    </Typography>

                    <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 300, color: '#1D1D1F' }} mb={3}>
                      Enter your email address
                    </Typography>
                  </Box>
                  <ForgetPasswordForm />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default ForgetPassword;
