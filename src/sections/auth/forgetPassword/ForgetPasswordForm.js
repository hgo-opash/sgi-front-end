import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import { Button, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';
import { ForgotpassResponse } from '../../../services/Service';

// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const initialValues = {
    email: '',
  };

  const ForgetPasswordFormik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      console.log(values, 'values');
      ForgotpassResponse(values)
        .then((res) => {
          SuccessToast('Reset Password Link send Successfully');
          console.log(res.data, 'forgot');
        })
        .catch((err) => {
          console.log(err.message, 'forgot err');
          ErrorToast(err?.response.data.message || err.message);
        });
    },
  });

  return (
    <>
      <FormikProvider value={ForgetPasswordFormik}>
        <form onSubmit={ForgetPasswordFormik.handleSubmit}>
          <Stack spacing={3}>
            <Field
              as={TextField}
              variant="standard"
              name="email"
              label="Email Address"
              onChange={ForgetPasswordFormik.handleChange}
              value={ForgetPasswordFormik.values.email}
              error={ForgetPasswordFormik.touched.email && Boolean(ForgetPasswordFormik.errors.email)}
              helperText={ForgetPasswordFormik.touched.email && ForgetPasswordFormik.errors.email}
            />

          </Stack>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!(ForgetPasswordFormik.isValid && ForgetPasswordFormik.dirty)}
              sx={{width:"250px",borderRadius:"30px",textTransform:"none", backgroundColor:"#3D71FF", mt:"25px"}}
            >
              Reset My Password
            </Button>
        </form>
      </FormikProvider>
    </>
  );
}
