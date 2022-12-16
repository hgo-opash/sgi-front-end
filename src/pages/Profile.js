import MomentUtils from '@date-io/moment';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import SuccessToast from '../toast/Success';
import { setLogindata } from '../slices/loginSlice';
import { ProfilepicResponse } from '../services/Service';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { ProfilePic } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const pictureUploader = (e) => {
    ProfilepicResponse(e)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          SuccessToast('Profile picture updated!');
          dispatch(setLogindata({ ProfilePic: res.data.profilePic }));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Stack spacing={4} sx={{ width: '70%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                alt="Remy Sharp"
                src={`${process.env.REACT_APP_API_URL}/${ProfilePic}`}
              />
            </Box>
            {console.log(`${process.env.REACT_APP_API_URL}/${ProfilePic}`)}
            <input
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                pictureUploader(e);
              }}
            />
            <FormLabel htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </FormLabel>
            <TextField
              name="firstName"
              label="First Name"
              // onChange={SignUpFormik.handleChange}
              // value={SignUpFormik.values.firstName}
              // error={SignUpFormik.touched.firstName && Boolean(SignUpFormik.errors.firstName)}
              // helperText={SignUpFormik.touched.firstName && SignUpFormik.errors.firstName}
            />
            <TextField
              name="lastName"
              label="Last  Name"
              // onChange={SignUpFormik.handleChange}
              // value={SignUpFormik.values.lastName}
              // error={SignUpFormik.touched.lastName && Boolean(SignUpFormik.errors.lastName)}
              // helperText={SignUpFormik.touched.lastName && SignUpFormik.errors.lastName}
            />
            <LocalizationProvider dateAdapter={MomentUtils}>
              <DesktopDatePicker
                label="Date Of Birth"
                inputFormat="MM/DD/YYYY"
                // onChange={(e) => {
                //   SignUpFormik.setFieldValue('dateOfBirth', moment(e._d).format('yyyy-MM-DD'));
                //   SignUpFormik.validateField('dateOfBirth');
                // }}
                // value={SignUpFormik.values.dateOfBirth}
                renderInput={(params) => (
                  <TextField
                    name="dateOfBirth"
                    {...params}
                    // error={SignUpFormik.touched.dateOfBirth && Boolean(SignUpFormik.errors.dateOfBirth)}
                    // helperText={SignUpFormik.touched.dateOfBirth && SignUpFormik.errors.dateOfBirth}
                  />
                )}
              />
            </LocalizationProvider>
            <Stack direction={'row'} spacing={2}>
              <FormControl sx={{ width: '15%' }}>
                <InputLabel>Country Code</InputLabel>
                <Select
                  name="countryCode"
                  // value={SignUpFormik.values.countryCode}
                  // onChange={SignUpFormik.handleChange}
                  autoWidth
                  label="Country Code"
                  // error={SignUpFormik.touched.countryCode && Boolean(SignUpFormik.errors.countryCode)}
                  // helperText={SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={+1}>+ 1</MenuItem>
                  <MenuItem value={+91}>+ 91</MenuItem>
                </Select>
                {/* {SignUpFormik.errors.countryCode && (
                  <FormHelperText sx={{ color: '#FF4842' }}>
                    {SignUpFormik.touched.countryCode && SignUpFormik.errors.countryCode}
                  </FormHelperText>
                )} */}
              </FormControl>
              <TextField
                fullWidth
                name="phoneNo"
                label="Phone Number"
                // onChange={SignUpFormik.handleChange}
                // value={SignUpFormik.values.phoneNo}
                // error={SignUpFormik.touched.phoneNo && Boolean(SignUpFormik.errors.phoneNo)}
                // helperText={SignUpFormik.touched.phoneNo && SignUpFormik.errors.phoneNo}
              />
            </Stack>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              // onChange={SignUpFormik.handleChange}
              // value={SignUpFormik.values.password}
              // error={SignUpFormik.touched.password && Boolean(SignUpFormik.errors.password)}
              // helperText={SignUpFormik.touched.password && SignUpFormik.errors.password}
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
          </Stack>
        </Box>
      </form>
    </div>
  );
};

export default Profile;
