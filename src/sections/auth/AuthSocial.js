import React from 'react';

// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// component
import Iconify from '../../components/Iconify';
import SuccessToast from '../../toast/Success';
import ErrorToast from '../../toast/Error';
import { FbloginResponse } from '../../services/Service';

// ----------------------------------------------------------------------
const CLIENT_ID = '1490110678165861';

export default function AuthSocial() {
  const navigate = useNavigate();
  const handleCallback = (res) => {
    console.log('FB LOGIN => ', res);
    FbloginResponse(res)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem('Jtoken', res.data.token);
          SuccessToast('Login Successful');
          navigate('/dashboard');
        } else {
          ErrorToast('Login Failed');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <FacebookLogin
          appId={CLIENT_ID}
          fields="name,email,picture"
          callback={handleCallback}
          render={(renderProps) => (
            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={renderProps.onClick}>
              <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
            </Button>
          )}
        />
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
