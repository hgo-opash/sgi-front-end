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
  Card,
  Grid,
  Typography,
  Tabs,
  Tab,
  TabPanel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import SuccessToast from '../toast/Success';
import { setLogindata } from '../slices/loginSlice';
import { ProfilepicResponse } from '../services/Service';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { ProfilePic } = useSelector((state) => state.login);
  const [value, setValue] = useState(0);
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <form>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Stack spacing={4} sx={{ width: '70%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box>
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  alt="Remy Sharp"
                  src={`${process.env.REACT_APP_API_URL}/${ProfilePic}`}
                />
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
                  <Button variant="contained" color="primary" component="span" sx={{ ml: 4, mt: 2 }}>
                    Upload
                  </Button>
                </FormLabel>
              </Box>
              <Card sx={{ mt: 4, height: '110px ', width: '300px' }}>
                <Grid
                  container
                  sx={{
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pl: '20px',
                    pr: '30px',
                    backgroundColor: '#FFF7CD',
                    color: '#7A4F01',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: '23px' }}>Total Budget:</Typography>
                    <Typography sx={{ fontSize: '23px' }}>$15</Typography>
                  </Box>
                  <EditIcon sx={{ cursor: 'pointer' }} />
                </Grid>
              </Card>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Personal Info" {...a11yProps(0)} sx={{ width: '100%' }} />
                <Tab label="Security" {...a11yProps(1)} sx={{ width: '100%' }} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack
                spacing={3}
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0px' }}
              >
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
              </Stack>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Stack spacing={3}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="oldPassword"
                  label="Old Password"
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
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  label="New Password"
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
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  label="Confirm Password"
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
            </TabPanel>
          </Stack>
        </Box>
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <Button variant="contained" color="primary" component="span">
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Profile;
