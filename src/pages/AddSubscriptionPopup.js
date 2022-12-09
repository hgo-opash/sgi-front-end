import React from 'react';
import axios from 'axios';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MomentUtils from '@date-io/moment';

import {
  Card,
  Container,
  Stack,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  // TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Page from '../components/Page';
import Logo from '../components/Logo';
import SuccsessModal from '../components/SuccsessModal';
import { setCompanies } from '../slices/companiesSlice';

const AddSubscriptionPopup = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { allCompaniesData } = useSelector((state) => state.companies);
  const [companyTypes, setCompanyTypes] = React.useState([]);
  const [selectedCompanyType, setSelectedCompanyType] = React.useState([]);

  const [masterComapny, setMasterComapny] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcompanies`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        },
      })
      .then((res) => {
        console.log('subscription companies => ', res.data);
        dispatch(setCompanies({ allCompaniesData: res.data.data }));
        const companiesType = [...new Set(res.data.data.map((item) => item.companyType))];
        setCompanyTypes(companiesType);
      });
  }, []);

  const handleCompanyClick = (data) => {
    const CompanyType = allCompaniesData.filter((val) => val.companyType === data);
    setSelectedCompanyType(CompanyType);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SubscriptionFormSchema = Yup.object().shape({
    subscriptionType: Yup.string().required('Please Select Subscription Type'),
    company: Yup.string().required('Please Select Comapny'),
    description: Yup.string().required('Please Enter Description'),
    frequency: Yup.string().required('Please Select frequency'),
    contractStartDate: Yup.string().required('Please Select Contract Start Date'),
    amount: Yup.number().required('Please Enter Amount'),
    autoRenewal: Yup.string().required('Please Select Auto Renewal'),
  });

  const initialValues = {
    subscriptionType: '',
    company: '',
    description: '',
    frequency: '',
    contractStartDate: '',
    nextBillingDate: '',
    amount: null,
    autoRenewal: '',
  };

  const SubscriptionForm = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: SubscriptionFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', { ...values, isStandardAlert: true });
      values.companyId = masterComapny._id;
      axios
        .post(`${process.env.REACT_APP_API_URL}/savesubs`, values, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
          },
        })
        .then((res) => {
          console.log('subscription ADD => ', res.data);
          if (res.data.success === true) {
            resetForm(initialValues);
            SubscriptionForm.values.amount = 0;
            SubscriptionForm.values.contractStartDate = '';
            SubscriptionForm.values.nextBillingDate = '';
          }
        });
    },
  });

  return (
    <>
      <Page title="Subscription">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Subscription
            </Typography>
          </Stack>

          <Card sx={{ p: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Logo width={160} height={160} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormikProvider value={SubscriptionForm}>
                  <form onSubmit={SubscriptionForm.handleSubmit}>
                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={
                        SubscriptionForm.touched.subscriptionType && Boolean(SubscriptionForm.errors.subscriptionType)
                      }
                    >
                      <InputLabel
                        id="subscriptionType"
                        // name="subscriptionType"
                      >
                        Subscription Type
                      </InputLabel>

                      <Field
                        as={Select}
                        labelId="subscriptionType"
                        name="subscriptionType"
                        label="Subscription Type"
                        value={SubscriptionForm.values.subscriptionType}
                        onChange={SubscriptionForm.handleChange}
                        // helperText={
                        //   SubscriptionForm.touched.subscriptionType && SubscriptionForm.errors.subscriptionType
                        // }
                      >
                        {companyTypes.map((item) => (
                          <MenuItem key={item} value={item} onClick={() => handleCompanyClick(item)}>
                            {item}
                          </MenuItem>
                        ))}
                        {/* <MenuItem value={'Streaming'}>Streaming</MenuItem>
                        <MenuItem value={'Banking'}>Banking</MenuItem>
                        <MenuItem value={'I.T.'}>I.T.</MenuItem>
                        <MenuItem value={'Beauty & Fashion'}>Beauty & Fashion</MenuItem> */}
                      </Field>
                      {SubscriptionForm.touched.subscriptionType && SubscriptionForm.errors.subscriptionType ? (
                        <FormHelperText>
                          {SubscriptionForm.touched.subscriptionType && SubscriptionForm.errors.subscriptionType}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={SubscriptionForm.touched.company && Boolean(SubscriptionForm.errors.company)}
                    >
                      <InputLabel id="company">Company</InputLabel>
                      <Field
                        as={Select}
                        id="company"
                        name="company"
                        label="Company"
                        value={SubscriptionForm.values.company}
                        onChange={SubscriptionForm.handleChange}
                      >
                        {selectedCompanyType.map((item) => (
                          <MenuItem
                            key={item.name}
                            value={item.name}
                            onClick={() => {
                              setMasterComapny(item);
                              SubscriptionForm.values.description = item.description;
                              SubscriptionForm.values.frequency = 'Monthly';
                              SubscriptionForm.values.amount = item.price;
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                        {/* <MenuItem value={'Netflix'}>Netflix</MenuItem>
                        <MenuItem value={'Prime video'}>Prime video</MenuItem>
                        <MenuItem value={'Hulu'}>Hulu</MenuItem> */}
                      </Field>
                      {SubscriptionForm.touched.company && SubscriptionForm.errors.company ? (
                        <FormHelperText>
                          {SubscriptionForm.touched.company && SubscriptionForm.errors.company}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={SubscriptionForm.touched.description && Boolean(SubscriptionForm.errors.description)}
                    >
                      <Field
                        as={TextField}
                        id="input1"
                        name="description"
                        multiline
                        rows={3}
                        label="Description"
                        variant="outlined"
                        value={SubscriptionForm.values.description}
                        // value={masterComapny?.description}
                        onChange={SubscriptionForm.handleChange}
                        error={SubscriptionForm.touched.description && Boolean(SubscriptionForm.errors.description)}
                        helperText={SubscriptionForm.touched.description && SubscriptionForm.errors.description}
                        // disabled
                      />
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={SubscriptionForm.touched.frequency && Boolean(SubscriptionForm.errors.frequency)}
                    >
                      <InputLabel id="select3">Frequency</InputLabel>
                      <Field
                        as={Select}
                        labelId="select3"
                        id="select3"
                        name="frequency"
                        label="Frequency"
                        value={SubscriptionForm.values.frequency}
                        onChange={SubscriptionForm.handleChange}
                      >
                        <MenuItem value={'Monthly'}>Monthly</MenuItem>
                        <MenuItem value={'Annually'}>Annually</MenuItem>
                        <MenuItem value={'Trial'}>Trial</MenuItem>
                      </Field>
                      {SubscriptionForm.touched.frequency && SubscriptionForm.errors.frequency ? (
                        <FormHelperText>
                          {SubscriptionForm.touched.frequency && SubscriptionForm.errors.frequency}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <LocalizationProvider dateAdapter={MomentUtils}>
                        <Field
                          as={DesktopDatePicker}
                          label="Contract Start Date"
                          inputFormat="MM/DD/YYYY"
                          onChange={(e) => {
                            SubscriptionForm.setFieldValue('contractStartDate', moment(e._d).format('yyyy-MM-DD'));
                          }}
                          value={SubscriptionForm.values.contractStartDate}
                          renderInput={(params) => (
                            <Field
                              as={TextField}
                              name="contractStartDate"
                              {...params}
                              error={
                                SubscriptionForm.touched.contractStartDate &&
                                Boolean(SubscriptionForm.errors.contractStartDate)
                              }
                              helperText={
                                SubscriptionForm.touched.contractStartDate && SubscriptionForm.errors.contractStartDate
                              }
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <LocalizationProvider dateAdapter={MomentUtils}>
                        <Field
                          as={DesktopDatePicker}
                          label="Next Billing Date"
                          inputFormat="MM/DD/YYYY"
                          onChange={(e) => {
                            SubscriptionForm.setFieldValue('nextBillingDate', moment(e._d).format('yyyy-MM-DD'));
                          }}
                          value={SubscriptionForm.values.nextBillingDate}
                          renderInput={(params) => (
                            <Field
                              as={TextField}
                              name="nextBillingDate"
                              {...params}
                              error={
                                SubscriptionForm.touched.nextBillingDate &&
                                Boolean(SubscriptionForm.errors.nextBillingDate)
                              }
                              helperText={
                                SubscriptionForm.touched.nextBillingDate && SubscriptionForm.errors.nextBillingDate
                              }
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={SubscriptionForm.touched.amount && Boolean(SubscriptionForm.errors.amount)}
                    >
                      <InputLabel htmlFor="amount">Amount</InputLabel>
                      <Field
                        as={OutlinedInput}
                        label="Amount"
                        name="amount"
                        type="number"
                        value={SubscriptionForm.values.amount}
                        onChange={SubscriptionForm.handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                      {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount ? (
                        <FormHelperText>
                          {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={SubscriptionForm.touched.autoRenewal && Boolean(SubscriptionForm.errors.autoRenewal)}
                    >
                      <InputLabel id="select4">Auto Renewal</InputLabel>
                      <Field
                        as={Select}
                        labelId="select4"
                        id="select4"
                        name="autoRenewal"
                        label="Auto Renewal"
                        value={SubscriptionForm.values.autoRenewal}
                        onChange={SubscriptionForm.handleChange}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Field>
                      {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal ? (
                        <FormHelperText>
                          {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={handleClickOpen}
                      disabled={!(SubscriptionForm.isValid && SubscriptionForm.dirty)}
                    >
                      Create
                    </Button>
                  </form>
                </FormikProvider>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Page>

      <SuccsessModal open={open} handleClose={handleClose} />
    </>
  );
};

export default AddSubscriptionPopup;
