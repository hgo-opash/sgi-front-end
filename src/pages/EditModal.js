import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Link,
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
import { Field, FormikProvider, useFormik } from 'formik';
import MomentUtils from '@date-io/moment';
import { EditsubsResponse, GetsubsResponse } from '../services/Service';
import SuccessToast from '../toast/Success';
import { setSubscriptions } from '../slices/subscriptionSlice';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #FFF',
  borderRadius: '10px',
  boxShadow: 24,
  // p: "4 0 4 4",
  p: '30px',
};

const EditModal = ({ openEditModal, setOpenEditModal, data }) => {
  const dispatch = useDispatch();
  const [selectedEditFileName, setSelectedEditFileName] = useState('');
  const handleClose = () => {
    setOpenEditModal(false);
  };

  const validationSchema = Yup.object().shape({
    website: Yup.string().required('Please Enter Website'),
    frequency: Yup.string().required('Please Select frequency'),
    contractStartDate: Yup.string().required('Please Select Contract Start Date'),
    amount: Yup.number().required('Please Enter Amount'),
    autoRenewal: Yup.string().required('Please Select Auto Renewal'),
    nextBillingDate: Yup.date().required('Please Select next billing Date'),
    // .test('nextBillingDate', 'Must be greater than today', (value) => {
    //   return moment(value) > moment();
    // })
    status: Yup.string().required('Please select Status'),
  });

  const initialValues = React.memo(
    () => ({
      website: data?.company?.website,
      frequency: data?.frequency,
      contractStartDate: data?.startDate,
      nextBillingDate: data?.nextBilling,
      amount: data?.amount,
      autoRenewal: data?.autoRenewal ? 'true' : 'false',
      status: `${data?.status}`,
      comments: data?.comments,
      description: data?.description,
      attachment: data?.attachment,
      review:data?.review
    }),
    []
  );

  const EditForm = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', values);

      EditsubsResponse(data._id, values).then((res) => {
        if (res.data.success === true) {
          GetsubsResponse()
            .then((res) => {
              if (res.data.success === true) {
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

  useEffect(() => {
    // console.log(selectedEditFileName, 'abc');
    const formdata = {
      website: data?.company?.website,
      frequency: data?.frequency,
      contractStartDate: data?.startDate,
      nextBillingDate: data?.nextBilling,
      amount: data?.amount,
      autoRenewal: data?.autoRenewal ? 'true' : 'false',
      status: `${data?.status}`,
      comments: data?.comments,
      description: data?.description,
      attachment: `${data?.attachment}`.split('-').pop(),
      review: data?.review
    };
    EditForm.setValues(formdata);
  }, [data]);

  return (
    // <div>
    <>
      <Modal open={openEditModal} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, height: '90%', width: { xs: '100%', sm: '400px', md: '600px', lg: '800px' } }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', fontSize: '30px', fontWeight: 700, color: '#3D71FF' }}
              >
                {data.subscriptionName} Subscription
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '15px', fontWeight: 400 }}>
                Edit your details below.
              </Typography>
            </Box>
            <Fab onClick={handleClose} size="small" color="primary" aria-label="add">
              <CloseIcon />
            </Fab>
          </Stack>

          <Box sx={{ maxHeight: '90%', overflowY: 'auto' }}>
            <Scrollbar>
              <FormikProvider value={EditForm}>
                <form onSubmit={EditForm.handleSubmit}>
                  <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ overflowX: 'hidden' }}>
                    <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <img height={60} width={75} src={data?.company?.logo} alt="Logo" />
                      </Box>
                      <FormControl
                        fullWidth
                        sx={{ mt: 2, ml: 3 }}
                        error={EditForm.touched.website && EditForm.errors.website}
                      >
                        {/* <InputLabel htmlFor="amount" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                        Website
                      </InputLabel> */}
                        <Field
                          as={TextField}
                          onWheel={(event) => {
                            event.preventDefault();
                          }}
                          disabled
                          label="Website"
                          name="website"
                          variant="standard"
                          size="small"
                          value={EditForm.values.website}
                          onChange={EditForm.handleChange}
                        />
                        {/* {EditForm.touched.website && EditForm.errors.website ? (
                        <FormHelperText>{EditForm.touched.website && EditForm.errors.website}</FormHelperText>
                      ) : null} */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth sx={{ mt: 2 }} error={EditForm.touched.amount && EditForm.errors.amount}>
                        <InputLabel htmlFor="amount" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                          Amount
                        </InputLabel>
                        <Field
                          as={Input}
                          onWheel={(event) => {
                            event.preventDefault();
                          }}
                          label="Amount"
                          name="amount"
                          // type="number"
                          value={EditForm.values.amount}
                          onChange={EditForm.handleChange}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                        {EditForm.touched.amount && EditForm.errors.amount ? (
                          <FormHelperText>{EditForm.touched.amount && EditForm.errors.amount}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={MomentUtils}>
                          <Field
                            as={DesktopDatePicker}
                            label={<Typography sx={{ color: '#B6B6B6' }}>Contract Start Date</Typography>}
                            inputFormat="MM/DD/YYYY"
                            onChange={(e) => {
                              EditForm.setFieldValue('contractStartDate', moment(e._d).format('yyyy-MM-DD'));
                            }}
                            value={EditForm.values.contractStartDate}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
                            renderInput={(params) => (
                              <TextField
                                name="contractStartDate"
                                variant="standard"
                                size="small"
                                {...params}
                                error={EditForm.touched.contractStartDate && Boolean(EditForm.errors.contractStartDate)}
                                helperText={EditForm.touched.contractStartDate && EditForm.errors.contractStartDate}
                                sx={{ svg: { color: '#0071E3', mr: '5px' } }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={MomentUtils}>
                          <Field
                            as={DesktopDatePicker}
                            label={<Typography sx={{ color: '#B6B6B6' }}>Next Billing Date</Typography>}
                            inputFormat="MM/DD/YYYY"
                            onChange={(e) => {
                              EditForm.setFieldValue('nextBillingDate', moment(e._d).format('yyyy-MM-DD'));
                              EditForm.setFieldTouched('nextBillingDate', true, false);
                            }}
                            value={EditForm.values.nextBillingDate}
                            renderInput={(params) => (
                              <Field
                                as={TextField}
                                name="nextBillingDate"
                                variant="standard"
                                size="small"
                                {...params}
                                error={EditForm.touched.nextBillingDate && Boolean(EditForm.errors.nextBillingDate)}
                                helperText={EditForm.touched.nextBillingDate && EditForm.errors.nextBillingDate}
                                sx={{ svg: { color: '#0071E3', mr: '5px' } }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="select3" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                          Frequency
                        </InputLabel>
                        <Select
                          labelId="select3"
                          id="select3"
                          name="frequency"
                          label="Frequency"
                          variant="standard"
                          size="small"
                          value={`${EditForm.values.frequency}`}
                          onChange={EditForm.handleChange}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              color: '#0071E3',
                            },
                          }}
                        >
                          <MenuItem value={'Monthly'}>Monthly</MenuItem>
                          <MenuItem value={'Annually'}>Annually</MenuItem>
                          <MenuItem value={'Trial'}>Trial</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="select4" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                          Auto Renewal
                        </InputLabel>
                        <Select
                          labelId="select4"
                          id="select4"
                          name="autoRenewal"
                          label="Auto Renewal"
                          variant="standard"
                          size="small"
                          value={EditForm.values.autoRenewal}
                          onChange={EditForm.handleChange}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              color: '#0071E3',
                            },
                          }}
                        >
                          <MenuItem value="true">Yes</MenuItem>
                          <MenuItem value="false">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="select4" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                          Status
                        </InputLabel>
                        <Select
                          labelId="select4"
                          id="select4"
                          name="status"
                          label="Status"
                          variant="standard"
                          size="small"
                          value={EditForm.values.status}
                          onChange={EditForm.handleChange}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              color: '#0071E3',
                            },
                          }}
                        >
                          <MenuItem value={'Active'}>Active</MenuItem>
                          <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl fullWidth>
                        <Field
                          as={TextField}
                          id="input1"
                          name="comments"
                          multiline
                          rows={3}
                          label={<Typography sx={{ color: '#B6B6B6' }}>Comments</Typography>}
                          variant="standard"
                          size="small"
                          value={EditForm.values.comments}
                          onChange={EditForm.handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl fullWidth>
                        <Field
                          as={TextField}
                          id="input1"
                          name="review"
                          multiline
                          rows={3}
                          label={<Typography sx={{ color: '#B6B6B6' }}>Review</Typography>}
                          variant="standard"
                          size="small"
                          value={EditForm.values.review}
                          onChange={EditForm.handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>


                  <Grid>
                    <input
                      id="contained-button-file"
                      style={{ display: 'none' }}
                      type="file"
                      name="attachment"
                      onChange={(e) => {
                        console.log('this is e ==> ', e.target.files[0].name);
                        const fileName = e.target.files[0].name;
                        EditForm.setFieldValue('attachment', e?.target?.files[0]);
                        setSelectedEditFileName(fileName);
                      }}
                    />
                    <FormLabel
                      htmlFor="contained-button-file"
                      sx={{ display: 'flex', alignItems: 'center', mt: '16px' }}
                    >
                      <Button
                        variant="contained"
                        component="span"
                        sx={{
                          fontWeight: 700,
                          textTransform: 'none',
                          bgcolor: '#fff',
                          color: '#1D1D1F',
                          borderRadius: '30px',
                          boxShadow: '0px 4px 25px rgba(150, 150, 150, 0.15)',
                          ':hover': { bgcolor: 'transparent' },
                        }}
                      >
                        <Iconify icon="entypo:attachment" color="#3D71FF" width={20} height={20} mr={1} />
                        Attachment
                      </Button>
                      <Box sx={{ ml: 2 }}>
                        <span>{ EditForm.values.attachment === 'undefined'? "" : selectedEditFileName }</span>
                      </Box>
                    </FormLabel>
                  </Grid>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    // disabled={!EditForm.isValid}
                    disabled={!EditForm.isValid || !EditForm.dirty}
                    sx={{
                      width: '170px',
                      height: '45px',
                      backgroundColor: '#3D71FF',
                      borderRadius: '30px',
                      mt: '25px',
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClose}
                    sx={{
                      width: '170px',
                      height: '45px',
                      backgroundColor: '#3D71FF',
                      borderRadius: '30px',
                      mt: '25px',
                      ml: '20px',
                    }}
                  >
                    Cancel
                  </Button>
                </form>
              </FormikProvider>
            </Scrollbar>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
