import React from 'react';

// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setLogindata } from '../../slices/loginSlice';

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
const CLIENT_ID = '1490110678165861';

export default function AuthSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCallback = (res) => {
    // res.Jtoken = localStorage.getItem('Jtoken');
    console.log('FB LOGIN => ', res);
    axios
      .post(`${process.env.REACT_APP_API_URL}/fblogin`, res)
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setLogindata({ Email: res.email }));
          localStorage.setItem('Jtoken', res.data.token);
          Swal.fire({
            icon: 'success',
            position: 'bottom-end',
            title: 'Login Successful',
            timer: 1500,
            toast: true,
            backdrop: false,
            showConfirmButton: false,
          });
          navigate('/dashboard');
        } else {
          Swal.fire({
            icon: 'error',
            position: 'bottom-end',
            title: 'Login Failed',
            timer: 1500,
            toast: true,
            backdrop: false,
            showConfirmButton: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  // React.useEffect(() => {
  //   window.FB.getLoginStatus((e) => console.log('status ===== ', e));
  // }, []);

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
        {/* <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} /> */}

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
