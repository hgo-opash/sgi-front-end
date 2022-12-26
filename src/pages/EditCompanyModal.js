import moment from 'moment';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { Field, Formik, FormikProvider, useFormik } from 'formik';
import MomentUtils from '@date-io/moment';
import React, { useState } from 'react';
import Logo from '../components/Logo';
import SuccsessModal from '../components/SuccsessModal';
import { EditComapnysubsResponse, GetsubsResponse } from '../services/Service';
import SuccessToast from '../toast/Success';
import { setLogindata } from '../slices/loginSlice';
import { setSubscriptions } from '../slices/subscriptionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #FFF',
  borderRadius: '20px',
  boxShadow: 24,
  // p: "4 0 4 4",
  pl: 4,
  pt: 4,
  pb: 4,
};

const EditCompanyModal = ({ openEditModal, setOpenEditModal, data }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenEditModal(false);
  };

  const validationSchema = Yup.object().shape({
    companyType: Yup.string().required('Please Select Company-Type'),
    createdAt: Yup.string().required('Please Select Contract Start Date'),
    price: Yup.number().required('Please Enter Amount'),
    // autoRenewal: Yup.string().required('Please Select Auto Renewal'),
    updatedAt: Yup.date()
      .required('Please Select next billing Date')
      .test('nextBillingDate', 'Must be greater than today', (value) => {
        return moment(value) > moment();
      }),
    // status: Yup.string().required('Please select Status'),
  });

  const initialValues = {
    companyType: data?.companyType,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    price: data?.price,
    popular: data?.popular ? 'true' : 'false',
    // status: `${data?.status}`,
    website: data?.website,
    description: data?.description,
  };

  const EditForm = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', values);

      EditComapnysubsResponse(data._id, values).then((res) => {
        console.log('subscription ADD comapany => ', res.data);
        if (res.data.success === true) {
          GetsubsResponse()
            .then((res) => {
              if (res.data.success === true) {
                dispatch(
                  setLogindata({
                    Email: res.data.email,
                    LastLogin: res.data.lastLoggedInAt,
                    FirstName: res.data.name,
                    ProfilePic: res.data.profilePic,
                  })
                );
                dispatch(setSubscriptions({ subscriptions: res.data.data }));
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                console.log(err);
              }
            });
          SuccessToast('Succesfully edited !!!');
          handleClose();
          resetForm(initialValues);
        }
      });
    },
  });

  return (
    <div>
      <Modal
        open={openEditModal}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, height: '90%', width: 800 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ ml: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {data.subscriptionName} Subscription
            </Typography>
            <Box sx={{ pr: 2 }}>
              <Button onClick={handleClose} color="error">
                <CloseIcon />
              </Button>
            </Box>
          </Stack>

          <Container sx={{ height: '90%', overflowY: 'scroll' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <FormikProvider value={EditForm}>
                  <form onSubmit={EditForm.handleSubmit}>
                    <FormControl
                      fullWidth
                      sx={{ mb: 3, mt: 2 }}
                      // error={EditForm.touched.frequency && Boolean(EditForm.errors.frequency)}
                    >
                      <InputLabel id="select3">Frequency</InputLabel>
                      <Select
                        labelId="select3"
                        id="select3"
                        name="frequency"
                        label="Frequency"
                        value={`${EditForm.values.companyType}`}
                        onChange={EditForm.handleChange}
                      >
                        <MenuItem value={'Monthly'}>Monthly</MenuItem>
                        <MenuItem value={'Annually'}>Annually</MenuItem>
                        <MenuItem value={'Trial'}>Trial</MenuItem>
                      </Select>
                      {/* {EditForm.touched.frequency && EditForm.errors.frequency ? (
                          <FormHelperText>
                            {EditForm.touched.frequency && EditForm.errors.frequency}
                          </FormHelperText>
                        ) : null} */}
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <LocalizationProvider dateAdapter={MomentUtils}>
                        <Field
                          as={DesktopDatePicker}
                          label="Created At"
                          inputFormat="MM/DD/YYYY"
                          onChange={(e) => {
                            EditForm.setFieldValue('createdAt', moment(e._d).format('yyyy-MM-DD'));
                          }}
                          value={EditForm.values.createdAt}
                          renderInput={(params) => (
                            <TextField
                              name="createdAt"
                              {...params}
                              error={EditForm.touched.createdAt && Boolean(EditForm.errors.createdAt)}
                              helperText={EditForm.touched.createdAt && EditForm.errors.createdAt}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <LocalizationProvider dateAdapter={MomentUtils}>
                        <Field
                          as={DesktopDatePicker}
                          label="Updated At"
                          inputFormat="MM/DD/YYYY"
                          onChange={(e) => {
                            EditForm.setFieldValue('updatedAt', moment(e._d).format('yyyy-MM-DD'));
                            EditForm.setFieldTouched('updatedAt', true, false);
                          }}
                          value={EditForm.values.updatedAt}
                          renderInput={(params) => (
                            <Field
                              as={TextField}
                              name="updatedAt"
                              {...params}
                              error={EditForm.touched.updatedAt && Boolean(EditForm.errors.updatedAt)}
                              helperText={EditForm.touched.updatedAt && EditForm.errors.updatedAt}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      // error={EditForm.touched.amount && Boolean(EditForm.errors.amount)}
                    >
                      <InputLabel htmlFor="amount">Amount</InputLabel>
                      <OutlinedInput
                        label="Amount"
                        name="amount"
                        type="number"
                        value={EditForm.values.price}
                        onChange={EditForm.handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                      {/* {EditForm.touched.amount && EditForm.errors.amount ? (
                          <FormHelperText>
                            {EditForm.touched.amount && EditForm.errors.amount}
                          </FormHelperText>
                        ) : null} */}
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      // error={EditForm.touched.autoRenewal && Boolean(EditForm.errors.autoRenewal)}
                    >
                      <InputLabel id="select4">Popular</InputLabel>
                      <Select
                        labelId="select4"
                        id="select4"
                        name="popular"
                        label="Popular"
                        value={EditForm.values.popular}
                        onChange={EditForm.handleChange}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                      {EditForm.touched.popular && EditForm.errors.popular ? (
                        <FormHelperText>{EditForm.touched.popular && EditForm.errors.popular}</FormHelperText>
                      ) : null}
                    </FormControl>

                    {/* <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      // error={EditForm.touched.autoRenewal && Boolean(EditForm.errors.autoRenewal)}
                    >
                      <InputLabel id="select4">Status</InputLabel>
                      <Select
                        labelId="select4"
                        id="select4"
                        name="status"
                        label="Status"
                        value={EditForm.values.status}
                        onChange={EditForm.handleChange}
                      >
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                      </Select>
                      {EditForm.touched.autoRenewal && EditForm.errors.autoRenewal ? (
                          <FormHelperText>
                            {EditForm.touched.autoRenewal && EditForm.errors.autoRenewal}
                          </FormHelperText>
                        ) : null}
                    </FormControl> */}

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        id="input1"
                        name="website"
                        multiline
                        rows={2}
                        label="Website"
                        variant="outlined"
                        value={EditForm.values.website}
                        onChange={EditForm.handleChange}
                      />
                    </FormControl>

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      // onClick={handleClickOpen}
                      disabled={!EditForm.isValid}
                    >
                      Save
                    </Button>
                    <Button color="error" variant="contained" onClick={handleClose} sx={{ ml: 3 }}>
                      Cancel
                    </Button>
                  </form>
                </FormikProvider>
              </Grid>
            </Grid>
            {/* <SuccsessModal open={open} handleClose={handleClose} /> */}
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCompanyModal;
