import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setLogindata } from '../../../slices/loginSlice';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';
import { LoginResponse } from '../../../services/Service';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
    remember: true,
  };

  const LoginFormik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      LoginResponse(values)
        .then((res) => {
          if (res.data.success === true) {
            console.log('login user ====> ', res.data);
            dispatch(
              setLogindata({
                Email: values.email,
                LastLogin: res.data.lastLoggedInAt,
                Role: res.data.role,
                FirstName: res.data.name,
                ProfilePic: res.data.profilePic,
              })
            );
            console.log('login.data ===>  ', res.data);
            localStorage.setItem('Jtoken', res.data.token);
            SuccessToast('Login Successful');
            navigate('/dashboard', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          ErrorToast(err.response.data.message);
        });
    },
  });

  return (
    <>
      <FormikProvider value={LoginFormik}>
        <form onSubmit={LoginFormik.handleSubmit}>
          <Stack spacing={3}>
            <Field
              as={TextField}
              name="email"
              label="Email"
              onChange={LoginFormik.handleChange}
              value={LoginFormik.values.email}
              error={LoginFormik.touched.email && Boolean(LoginFormik.errors.email)}
              helperText={LoginFormik.touched.email && LoginFormik.errors.email}
            />

            <Field
              as={TextField}
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              onChange={LoginFormik.handleChange}
              value={LoginFormik.values.password}
              error={LoginFormik.touched.password && Boolean(LoginFormik.errors.password)}
              helperText={LoginFormik.touched.password && LoginFormik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              value="start"
              control={<Checkbox name="remember" label="Remember me" />}
              label="Remember me"
            />

            <Button color="primary" variant="contained" type="submit">
              Log In
            </Button>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Link variant="subtitle2" underline="hover" onClick={() => navigate('/forgetpassword')}>
              Forgot password?
            </Link>
          </Stack>
        </form>
      </FormikProvider>
    </>
  );
}
