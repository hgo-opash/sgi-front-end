import * as Yup from 'yup';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MomentUtils from '@date-io/moment';

import { Field, FormikProvider, useFormik } from 'formik';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  // makeStyles,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().min(6).max(16).required('Password is required'),
    phoneNo: Yup.string()
      .typeError('Must be in Numbers')
      .matches(/^[0-9\- ]{10,10}$/, 'Must be in Numbers & 10 digits'),
    countryCode: Yup.string().when(['phoneNo'], (phoneNo, schema) => {
      if (phoneNo !== undefined) {
        return Yup.string().required('Please select country code');
      }
    }),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    agreeTremsAndConditions: Yup.boolean().isTrue('You must accept the terms and conditions').required(),
    dateOfBirth: Yup.date().test('dateOfBirth', 'Must be greater than 13 years', (value) => {
      return moment().diff(moment(value), 'years') >= 13;
    }),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    middleName: '',
    confirmPassword: '',
    dateOfBirth: '',
    agreeTremsAndConditions: false,
    phoneNo: '',
    gender: '',
    countryCode: '',
  };

  const SignUpFormik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      if (location.pathname === '/registerbusiness') {
        values.role = 'business';
      } else {
        values.role = 'user';
      }
      axios
        .post(`${process.env.REACT_APP_API_URL}/register`, values)
        .then((res) => {
          if (res.data.success === true) {
            SuccessToast('Register Successful Please Login to countinue');
            navigate('/login', { replace: true });
          }
        })
        .catch((e) => {
          // console.log(e.response.data.message);
          ErrorToast(e?.response.data.message || e.message);
        });
    },
  });

  return (
    <>
      <FormikProvider value={SignUpFormik}>
        <form onSubmit={SignUpFormik.handleSubmit}>
          <Stack spacing={3}>
            <Field
              as={TextField}
              name="firstName"
              label="First Name"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.firstName}
              error={SignUpFormik.touched.firstName && Boolean(SignUpFormik.errors.firstName)}
              helperText={SignUpFormik.touched.firstName && SignUpFormik.errors.firstName}
            />
            <Field
              as={TextField}
              name="middleName"
              label="Middle Name (optional)"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.middleName}
              error={SignUpFormik.touched.middleName && Boolean(SignUpFormik.errors.middleName)}
              helperText={SignUpFormik.touched.middleName && SignUpFormik.errors.middleName}
            />
            <Field
              as={TextField}
              name="lastName"
              label="Last  Name"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.lastName}
              error={SignUpFormik.touched.lastName && Boolean(SignUpFormik.errors.lastName)}
              helperText={SignUpFormik.touched.lastName && SignUpFormik.errors.lastName}
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender (optional)</FormLabel>

              <RadioGroup row name="gender" onChange={SignUpFormik.handleChange} value={SignUpFormik.values.gender}>
                <Stack direction="row" spacing={8}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="" control={<Radio />} label="Not Specify" defaultChecked />
                </Stack>
              </RadioGroup>
            </FormControl>

            <LocalizationProvider dateAdapter={MomentUtils}>
              <Field
                as={DesktopDatePicker}
                label="Date Of Birth"
                inputFormat="MM/DD/YYYY"
                onChange={(e) => {
                  SignUpFormik.setFieldValue('dateOfBirth', moment(e._d).format('yyyy-MM-DD'));
                  SignUpFormik.validateField('dateOfBirth');
                }}
                value={SignUpFormik.values.dateOfBirth}
                renderInput={(params) => (
                  <Field
                    as={TextField}
                    name="dateOfBirth"
                    {...params}
                    error={SignUpFormik.touched.dateOfBirth && Boolean(SignUpFormik.errors.dateOfBirth)}
                    helperText={SignUpFormik.touched.dateOfBirth && SignUpFormik.errors.dateOfBirth}
                  />
                )}
              />
            </LocalizationProvider>

            <Stack direction={'row'} spacing={2}>
              <FormControl sx={{ width: '120px' }}>
                <InputLabel>Country Code</InputLabel>
                <Field
                  as={Select}
                  name="countryCode"
                  value={SignUpFormik.values.countryCode}
                  onChange={SignUpFormik.handleChange}
                  autoWidth
                  label="Country Code"
                  error={SignUpFormik.touched.countryCode && Boolean(SignUpFormik.errors.countryCode)}
                  // helperText={SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={+1}>+ 1</MenuItem>
                  <MenuItem value={+91}>+ 91</MenuItem>
                </Field>
                {SignUpFormik.errors.countryCode && (
                  <FormHelperText sx={{ color: '#FF4842' }}>
                    {SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                  </FormHelperText>
                )}
              </FormControl>
              <Field
                as={TextField}
                style={{ width: '400px' }}
                name="phoneNo"
                label="Phone   Number (optional)"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.phoneNo}
                error={SignUpFormik.touched.phoneNo && Boolean(SignUpFormik.errors.phoneNo)}
                helperText={SignUpFormik.touched.phoneNo && SignUpFormik.errors.phoneNo}
              />
            </Stack>

            <Field
              as={TextField}
              name="email"
              label="Email"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.email}
              error={SignUpFormik.touched.email && Boolean(SignUpFormik.errors.email)}
              helperText={SignUpFormik.touched.email && SignUpFormik.errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                     {/* <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton> */}
                    {/* <Button color="success" variant="contained" sx={{height:"55px"}} >
                      Verify Email
                    </Button> */}
                    <Button color="success" variant="contained" sx={{height:"55px"}} >
                      Verified <VerifiedIcon color='green' />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <Field
              as={TextField}
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.password}
              error={SignUpFormik.touched.password && Boolean(SignUpFormik.errors.password)}
              helperText={SignUpFormik.touched.password && SignUpFormik.errors.password}
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
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.confirmPassword}
              error={SignUpFormik.touched.confirmPassword && Boolean(SignUpFormik.errors.confirmPassword)}
              helperText={SignUpFormik.touched.confirmPassword && SignUpFormik.errors.confirmPassword}
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

            <Field
              as={FormControlLabel}
              control={
                <Checkbox
                  name="agreeTremsAndConditions"
                  label="Agree Terms & Conditions"
                  onChange={SignUpFormik.handleChange}
                  value={SignUpFormik.values.agreeTremsAndConditions}
                  onBlur={SignUpFormik.handleBlur}
                />
              }
              error={
                SignUpFormik.touched.agreeTremsAndConditions && Boolean(SignUpFormik.errors.agreeTremsAndConditions)
              }
              label="I accept the Terms & Conditions"
            />
            <FormHelperText sx={{ color: 'red', mt: '-5px !important', ml: '40px !important' }}>
              {SignUpFormik.touched.agreeTremsAndConditions && SignUpFormik.errors.agreeTremsAndConditions}
            </FormHelperText>

            {/* <Box className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained">
              {SignUpFormik.touched.agreeTremsAndConditions && SignUpFormik.errors.agreeTremsAndConditions}{' '}
            </Box> */}
            {/* {JSON.stringify(SignUpFormik.errors)} */}
            <Button
              disabled={!(SignUpFormik.isValid && SignUpFormik.dirty)}
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </FormikProvider>
    </>
  );
}
