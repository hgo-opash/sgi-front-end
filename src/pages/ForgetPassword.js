import { Container, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { ForgetPasswordForm } from '../sections/auth/forgetPassword';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  //   padding: theme.spacing(12, 0, 0, 0),
}));

const ForgetPassword = () => {
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Typography variant="h4" gutterBottom>
          Forgot Password??
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your Email below.</Typography>
        <ForgetPasswordForm />
      </ContentStyle>
    </Container>
  );
};

export default ForgetPassword;
