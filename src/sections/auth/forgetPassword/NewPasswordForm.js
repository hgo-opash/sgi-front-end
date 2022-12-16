import * as Yup from 'yup';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { VerifyLoginToken } from '../../../services/Service';

// ----------------------------------------------------------------------

export default function NewPasswordForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const NewPasswordFormik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: NewPasswordSchema,
    onSubmit: (values) => {
      VerifyLoginToken(values,props)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            navigate('/login');
          }
        })
        .catch((err) => console.log(err.message));
    },
  });

  return (
    <>
      <FormikProvider value={NewPasswordFormik}>
        <form onSubmit={NewPasswordFormik.handleSubmit}>
          <Stack spacing={3}>
            <Field
              as={TextField}
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              onChange={NewPasswordFormik.handleChange}
              value={NewPasswordFormik.values.password}
              error={NewPasswordFormik.touched.password && Boolean(NewPasswordFormik.errors.password)}
              helperText={NewPasswordFormik.touched.password && NewPasswordFormik.errors.password}
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
            <Field
              as={TextField}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              onChange={NewPasswordFormik.handleChange}
              value={NewPasswordFormik.values.confirmPassword}
              error={NewPasswordFormik.touched.confirmPassword && Boolean(NewPasswordFormik.errors.confirmPassword)}
              helperText={NewPasswordFormik.touched.confirmPassword && NewPasswordFormik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!(NewPasswordFormik.isValid && NewPasswordFormik.dirty)}
            >
              Send
            </Button>
          </Stack>
        </form>
      </FormikProvider>
    </>
  );
}
