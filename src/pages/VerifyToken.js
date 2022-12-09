import { Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NewPasswordForm } from '../sections/auth/forgetPassword';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  //   padding: theme.spacing(12, 0, 0, 0),
}));

const VerifyToken = () => {
  const { token } = useParams();

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Typography variant="h4" gutterBottom>
          Enter Your New Password
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
        <NewPasswordForm token={token} />
      </ContentStyle>
    </Container>
  );
};

export default VerifyToken;
