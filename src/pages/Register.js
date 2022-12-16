import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { RegisterForm } from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
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
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
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
      <RootStyle>
        <HeaderStyle>
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

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome to Safalvir SGI Application
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {location.pathname === '/register' ? <>Get started absolutely free.</> : <></>}
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              {location.pathname === '/register' ? <> (15 days Free trial)</> : <></>}
            </Typography>

            {/* <AuthSocial /> */}

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Minimal&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {''}and{''}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {smUp && (
              <>
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link variant="subtitle2" to="/login" component={RouterLink}>
                    Login
                  </Link>
                </Typography>
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
              </>
            )}
            {smDown && (
              <>
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link variant="subtitle2" to="/login" component={RouterLink}>
                    Login
                  </Link>
                </Typography>
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
              </>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
