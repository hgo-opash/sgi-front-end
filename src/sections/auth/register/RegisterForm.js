import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
  Box,
  Typography,
  Grid,
  Link,
  // makeStyles,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Icon } from '@iconify/react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { useSelector } from 'react-redux';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';
import { GetcountiesResponse, RegisterResponse } from '../../../services/Service';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { Countries } = useSelector((state) => state.login);

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
    country: '',
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
      RegisterResponse(values)
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
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                name="firstName"
                label={
                  <Typography sx={{ color: '#B6B6B6' }}>
                    First Name<span style={{ color: 'red' }}>*</span>{' '}
                  </Typography>
                }
                variant="standard"
                size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.firstName}
                error={SignUpFormik.touched.firstName && Boolean(SignUpFormik.errors.firstName)}
                helperText={SignUpFormik.touched.firstName && SignUpFormik.errors.firstName}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                name="middleName"
                label={<Typography sx={{ color: '#B6B6B6' }}>Middle Name</Typography>}
                variant="standard"
                size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.middleName}
                error={SignUpFormik.touched.middleName && Boolean(SignUpFormik.errors.middleName)}
                helperText={SignUpFormik.touched.middleName && SignUpFormik.errors.middleName}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                name="lastName"
                label={
                  <Typography sx={{ color: '#B6B6B6' }}>
                    Last Name<span style={{ color: 'red' }}>*</span>{' '}
                  </Typography>
                }
                variant="standard"
                // size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.lastName}
                error={SignUpFormik.touched.lastName && Boolean(SignUpFormik.errors.lastName)}
                helperText={SignUpFormik.touched.lastName && SignUpFormik.errors.lastName}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#3D71FF' }}>
                  Gender
                </FormLabel>

                <RadioGroup row name="gender" onChange={SignUpFormik.handleChange} value={SignUpFormik.values.gender}>
                  <Stack direction="row" sx={{ color: '#B6B6B6', pl: '20px' }}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="" control={<Radio />} label="Not Specify" defaultChecked />
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <LocalizationProvider dateAdapter={MomentUtils}>
                <Field
                  as={DesktopDatePicker}
                  label={
                    <Typography sx={{ color: '#B6B6B6' }}>
                      Date Of Birth<span style={{ color: 'red' }}>*</span>{' '}
                    </Typography>
                  }
                  inputFormat="MM/DD/YYYY"
                  onChange={(e) => {
                    SignUpFormik.setFieldValue('dateOfBirth', moment(e._d).format('yyyy-MM-DD'));
                    // SignUpFormik.validateField('dateOfBirth');
                    SignUpFormik.setFieldTouched('dateOfBirth', true, false);
                  }}
                  value={SignUpFormik.values.dateOfBirth}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <Field
                      as={TextField}
                      name="dateOfBirth"
                      variant="standard"
                      size="small"
                      {...params}
                      error={SignUpFormik.touched.dateOfBirth && Boolean(SignUpFormik.errors.dateOfBirth)}
                      helperText={SignUpFormik.touched.dateOfBirth && SignUpFormik.errors.dateOfBirth}
                      sx={{ width: '100%', svg: { color: '#0071E3' } }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Stack
                direction={'row'}
                spacing={2}
                sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#3D71FF', pt: '8px' }}>
                  Phone
                </FormLabel>
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel sx={{ color: '#B6B6B6', width: '100%' }}>Country</InputLabel>
                  <Field
                    as={Select}
                    name="countryCode"
                    variant="standard"
                    size="small"
                    value={SignUpFormik.values.countryCode}
                    onChange={SignUpFormik.handleChange}
                    autoWidth
                    label={<Typography sx={{ color: '#B6B6B6' }}>Country Code</Typography>}
                    error={SignUpFormik.touched.countryCode && Boolean(SignUpFormik.errors.countryCode)}
                    // helperText={SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                    sx={{
                      width: '100%',
                      '&:after': {
                        borderBottomColor: '#0000',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#0071E3',
                      },
                    }}
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
                  label={<Typography sx={{ color: '#B6B6B6' }}>Phone Number</Typography>}
                  variant="standard"
                  onChange={SignUpFormik.handleChange}
                  value={SignUpFormik.values.phoneNo}
                  error={SignUpFormik.touched.phoneNo && Boolean(SignUpFormik.errors.phoneNo)}
                  helperText={SignUpFormik.touched.phoneNo && SignUpFormik.errors.phoneNo}
                  sx={{ width: '100%' }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                name="email"
                label={
                  <Typography sx={{ color: '#B6B6B6' }}>
                    Email<span style={{ color: 'red' }}>*</span>{' '}
                  </Typography>
                }
                variant="standard"
                size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.email}
                error={SignUpFormik.touched.email && Boolean(SignUpFormik.errors.email)}
                helperText={SignUpFormik.touched.email && SignUpFormik.errors.email}
                sx={{ width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton> */}
                      {/* <Button color="success" variant="contained" sx={{height:"55px"}} >
                      Verify Email
                    </Button>
                    <Button color="success" variant="contained" sx={{height:"55px"}} >
                      Verified <VerifiedIcon color='green' />
                    </Button> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel sx={{ color: '#B6B6B6' }}>Country</InputLabel>
                <Field
                  as={Select}
                  name="country"
                  value={SignUpFormik.values.country}
                  onChange={SignUpFormik.handleChange}
                  autoWidth
                  label="Country"
                  size="small"
                  variant="standard"
                  error={SignUpFormik.touched.country && Boolean(SignUpFormik.errors.country)}
                  sx={{
                    width: '100%',
                    '& .MuiSelect-select':{
                      display:"flex",
                      alignItems:"center"
                    },
                    '&:after': {
                      borderBottomColor: '#0000',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#0071E3',
                    },
                  }}
                  // helperText={SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                  // sx={{
                  //   '& .MuiSelect-select': {
                  //     display: 'flex',
                  //   },
                  // }}
                >
                  {Countries.map((val) => (
                    <MenuItem key={val.name} value={val.name} sx={{ display: 'flex' }}>
                      <img
                        src={val.image}
                        alt={val.code}
                        height={'20px'}
                        width={'20px'}
                        style={{ display: 'inline' }}
                      />
                      <span style={{ padding: '0 8px' }}>{val.name}</span>
                    </MenuItem>
                  ))}
                </Field>
                {SignUpFormik.errors.countryCode && (
                  <FormHelperText sx={{ color: '#FF4842' }}>
                    {SignUpFormik.touched.country && SignUpFormik.errors.country}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                type={showPassword ? 'text' : 'password'}
                name="password"
                label={
                  <Typography sx={{ color: '#B6B6B6' }}>
                    Password<span style={{ color: 'red' }}>*</span>
                  </Typography>
                }
                variant="standard"
                size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.password}
                error={SignUpFormik.touched.password && Boolean(SignUpFormik.errors.password)}
                helperText={SignUpFormik.touched.password && SignUpFormik.errors.password}
                sx={{ width: '100%' }}
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
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                as={TextField}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label={
                  <Typography sx={{ color: '#B6B6B6' }}>
                    Confirm Password<span style={{ color: 'red' }}>*</span>{' '}
                  </Typography>
                }
                variant="standard"
                size="small"
                onChange={SignUpFormik.handleChange}
                value={SignUpFormik.values.confirmPassword}
                error={SignUpFormik.touched.confirmPassword && Boolean(SignUpFormik.errors.confirmPassword)}
                helperText={SignUpFormik.touched.confirmPassword && SignUpFormik.errors.confirmPassword}
                sx={{ width: '100%' }}
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>
          </Grid>

          {/* <Box className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained">
              {SignUpFormik.touched.agreeTremsAndConditions && SignUpFormik.errors.agreeTremsAndConditions}{' '}
            </Box> */}
          {/* {JSON.stringify(SignUpFormik.errors)} */}
          <Box display={{ sm: 'block', md: 'flex' }} sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Button
              disabled={!(SignUpFormik.isValid && SignUpFormik.dirty)}
              color="primary"
              variant="contained"
              type="submit"
              sx={{ width: '200px', height: '45px', backgroundColor: '#3D71FF', borderRadius: '30px', mt: '20px' }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ color: 'text.primary', mt: 4 }}>
              By registering, I agree to Minimal&nbsp;
              <Link underline="hover" color="#3D71FF" href="#">
                Terms of Service & Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link variant="subtitle2" underline="hover" color="#3D71FF" to="/login" component={RouterLink}>
              Login
            </Link>
          </Typography>
        </form>
      </FormikProvider>
    </>
  );
}
