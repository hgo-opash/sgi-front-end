import React from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// @mui
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Grid, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import backgroundImage from '../images/login-background.png';
import loginImage from '../images/login-image.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  background: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    // padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Container)(({ theme }) => ({
  width: '100%',
  // maxWidth: '901px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <Page title="Login">
      <RootStyle>
        <Container>
          <Box display="inline-block" sx={{ width: '100%', height: '100vh' }} py={4}>
            <Grid container height={'100%'}>
              <Grid item display={{xs: "none", md:"block"}} xs={0} md={7} height={'100%'}>
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
                    <Typography variant="h2" align='center' sx={{ fontSize: '38px', fontWeight: 300 }} mb={2}>
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
                    <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 300, alignItems: 'center' }} mb={1}>
                      <span style={{ color: '#3D71FF', fontWeight: 700 }}>Sign in</span> to SafalSubscriptions
                    </Typography>

                    <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 300, color: '#1D1D1F' }} mb={2}>
                      Enter your details below.
                    </Typography>
                  </Box>
                  <LoginForm />
                  <Typography variant="body2" sx={{ mt: 3 }}>
                    Don’t have an account?{' '}
                    <Link variant="subtitle2" underline="hover" component={RouterLink} to="/register">
                      Get started
                    </Link>
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
