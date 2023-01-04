import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../slices/loginSlice';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';

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
      dispatch(loginUser(values))
        .unwrap()
        .then((data) => {
          if (data.role === 'admin') {
            navigate('/admin/dashboard');
            SuccessToast('Login Successful');
          }
          if (data.role === 'user') {
            navigate('/dashboard');
            SuccessToast('Login Successful');
          }
          if (data.role === 'business') {
            navigate('/business/companieslist');
            SuccessToast('Login Successful');
          }
        })
        .catch((err) => {
          console.log(err);
          ErrorToast(err.data.message)
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
              variant="standard"
              name="email"
              label={<Typography sx={{color:"#B6B6B6"}}>Email Address</Typography>}
              onChange={LoginFormik.handleChange}
              value={LoginFormik.values.email}
              error={LoginFormik.touched.email && Boolean(LoginFormik.errors.email)}
              helperText={LoginFormik.touched.email && LoginFormik.errors.email}
            />

            <Field
              as={TextField}
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              name="password"
              label={<Typography sx={{color:"#B6B6B6"}}>Password</Typography>}
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

            <Box sx={{display:"flex",justifyContent:"space-between"}}>
              <FormControlLabel
                value="start"
                control={<Checkbox name="remember" label="Remember me" />}
                label={<Typography sx={{fontSize:"15px"}}>Remember me</Typography>}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Link variant="subtitle2" underline="hover" onClick={() => navigate('/forgetpassword')}>
                  Forgot password?
                </Link>
              </Stack>
            </Box>

          </Stack>
            <Button color="primary" variant="contained" type="submit" sx={{width:"170px",borderRadius:"30px",textTransform:"none", backgroundColor:"#3D71FF"}}>
              Log In
            </Button>
        </form>
      </FormikProvider>
    </>
  );
}
