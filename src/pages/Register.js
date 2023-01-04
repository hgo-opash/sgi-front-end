import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { RegisterForm } from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';
import backgroundImage from '../images/login-background.png';
import Logo from '../images/Logo.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  background: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100%',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // position: 'absolute',
  // padding: theme.spacing(1),
  padding: '8px 20px',
  justifyContent: 'space-between',
  backgroundColor: '#BCCEFF',
  // [theme.breakpoints.up('md')]: {
  //   alignItems: 'flex-start',
  //   padding: theme.spacing(7, 5, 0, 7),
  // },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '35px',
}));

// ----------------------------------------------------------------------

export default function Register() {
  const location = useLocation();

  const smUp = useResponsive('up', 'sm');
  const smDown = useResponsive('down', 'sm');
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const token = localStorage.getItem('Jtoken');

  React.useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  return (
    <Page title="Register">
      <HeaderStyle>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt="login" style={{ objectFit: 'contain' }} />
        </Box>
        <Button
        onClick={() => navigate("/login")}
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            width: '115px',
            height: '35px',
            borderRadius: '30px',
            textTransform: 'none',
            backgroundColor: '#3D71FF',
          }}
        >
          Log In
        </Button>
        {/* <Logo /> */}
        {/* {!smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          )} */}
      </HeaderStyle>
      <RootStyle>
        <Container>
          <Box display="inline-block" sx={{ width: '100%', height: '100%' }} py={5}>
            <ContentStyle>
              <Typography variant="h4" sx={{ fontSize: '30px', fontWeight: 400 }}>
                {location.pathname === '/register' ? (
                  <>
                    Get started absolutely <span style={{ color: '#3D71FF', fontWeight: 700 }}>free.</span>{' '}
                  </>
                ) : (
                  <></>
                )}
              </Typography>

              <Typography sx={{ color: 'text.primary', mb: 2, mt: 1 }}>
                {location.pathname === '/register' ? <> Enter your details below.</> : <></>}
              </Typography>

              {/* <AuthSocial /> */}

              <RegisterForm />

              {/* {smUp && (
                <>
                  <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account?{' '}
                    <Link variant="subtitle2" to="/login" component={RouterLink}>
                      Login
                    </Link>
                  </Typography> */}
              {/* {location.pathname === '/registerbusiness' ? (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?{' '}
                    <Link variant="subtitle2" component={RouterLink} to="/register">
                      Get started
                    </Link>
                  </Typography>
                ) : (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Register for business?{' '}
                    <Link variant="subtitle2" component={RouterLink} to="/registerbusiness">
                      click here
                    </Link>
                  </Typography>
                )} */}
              {/* </>
              )} */}
              {/* {smDown && (
                <>
                  <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account?{' '}
                    <Link variant="subtitle2" to="/login" component={RouterLink}>
                      Login
                    </Link>
                  </Typography> */}
              {/* {location.pathname === '/registerbusiness' ? (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?{' '}
                    <Link variant="subtitle2" component={RouterLink} to="/register">
                      Get started
                    </Link>
                  </Typography>
                ) : (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Register for business?{' '}
                    <Link variant="subtitle2" component={RouterLink} to="/registerbusiness">
                      click here
                    </Link>
                  </Typography>
                )} */}
              {/* </>
              )} */}
            </ContentStyle>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
