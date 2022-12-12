import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, FormikProvider, useFormik } from 'formik';
import { Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';

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
      axios
        .post(`${process.env.REACT_APP_API_URL}/forgotpass`, values)
        .then((res) => {
          SuccessToast("Reset Password Link send Successfully");
          console.log(res.data, 'forgot');
        })
        .catch((err) => {
          console.log(err.message, 'forgot err');
          ErrorToast(err?.response.data.message || err.message)
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
              name="email"
              label="Email"
              onChange={ForgetPasswordFormik.handleChange}
              value={ForgetPasswordFormik.values.email}
              error={ForgetPasswordFormik.touched.email && Boolean(ForgetPasswordFormik.errors.email)}
              helperText={ForgetPasswordFormik.touched.email && ForgetPasswordFormik.errors.email}
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!(ForgetPasswordFormik.isValid && ForgetPasswordFormik.dirty)}
            >
              Send
            </Button>
          </Stack>
        </form>
      </FormikProvider>
    </>
  );
}
