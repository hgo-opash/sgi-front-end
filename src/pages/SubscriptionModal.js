import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Box,
  Select,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Stack,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  alpha,
  Input,
  Fab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MomentUtils from '@date-io/moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { setCompanies } from '../slices/companiesSlice';
import SuccsessModal from '../components/SuccsessModal';
import { setSubscriptions } from '../slices/subscriptionSlice';
import SuccessToast from '../toast/Success';
import { GetcompaniesResponse, GetsubsResponse, SavesubsResponse } from '../services/Service';
import Scrollbar from '../components/Scrollbar';

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
  p: '30px',
  // overflowY:"Auto"
};

const SubscriptionModal = ({ openModal, setOpenSubModal }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(setOpenSubModal);
  const { allCompaniesData } = useSelector((state) => state.companies);
  const [companyTypes, setCompanyTypes] = React.useState([]);
  const [selectedCompanyType, setSelectedCompanyType] = React.useState([]);

  const [masterComapny, setMasterComapny] = React.useState();

  const handleCompanyClick = (data) => {
    const CompanyType = allCompaniesData.filter((val) => val.companyType === data);
    setSelectedCompanyType(CompanyType);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSubModal(false);
    SuccessToast('Subscription is added successfully');
  };

  const handleCloseSub = () => {
    setOpenSubModal(false);
  };

  React.useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        console.log('dashboard ==> ', res.data);
        if (res.data.success === true) {
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // navigate('/login');
        }
      });
    GetcompaniesResponse().then((res) => {
      console.log('subscription companies => ', res.data);
      dispatch(setCompanies({ allCompaniesData: res.data.data }));
      const companiesType = [...new Set(res.data.data.map((item) => item.companyType))];
      setCompanyTypes(companiesType);
    });
  }, [openModal]);

  const SubscriptionFormSchema = Yup.object().shape({
    subscriptionType: Yup.string().required('Please Select Subscription Type'),
    company: Yup.string().required('Please Select Comapny'),
    description: Yup.string().required('Please Enter Description'),
    frequency: Yup.string().required('Please Select frequency'),
    contractStartDate: Yup.string().required('Please Select Contract Start Date'),
    amount: Yup.number().required('Please Enter Amount'),
    autoRenewal: Yup.string().required('Please Select Auto Renewal'),
    nextBillingDate: Yup.date()
      .required('Please Select next billing Date')
      .test('nextBillingDate', 'Must be greater than today', (value) => {
        return moment(value) > moment();
      }),
    status: Yup.string().required('Please select Status'),
    comments: Yup.string(),
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
    status: '',
    comments: '',
  };

  const SubscriptionForm = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: SubscriptionFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', { ...values, isStandardAlert: true });
      values.companyId = masterComapny._id;
      SavesubsResponse(values).then((res) => {
        console.log('subscription ADD => ', res.data);
        if (res.data.success === true) {
          resetForm(initialValues);
        }
      });
    },
  });

  return (
    <>
      <div>
        <Modal
          disableBackdropClick={false}
          open={openModal}
          onClose={handleCloseSub}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box id="scrollbar" sx={{ ...style, height: '90%', width: { xs: '100%',sm:"400px", md: '600px', lg: '800px' } }}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="h4" gutterBottom sx={{ fontSize: '30px', fontWeight: 700, color: '#3D71FF' }}>
                  Subscription
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ fontSize: '15px', fontWeight: 400 }}>
                  Enter your details below.
                </Typography>
              </Box>
              <Fab onClick={handleCloseSub} size="small" color="primary" aria-label="add">
                <CloseIcon />
              </Fab>
            </Stack>

            <Box sx={{ height: '90%', overflow: 'auto' }}>
              <Scrollbar>
                <FormikProvider value={SubscriptionForm} validateOnMount>
                  <form onSubmit={SubscriptionForm.handleSubmit}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ overflowX: 'hidden' }}>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          sx={{ mt: 2 }}
                          error={
                            SubscriptionForm.touched.subscriptionType &&
                            Boolean(SubscriptionForm.errors.subscriptionType)
                          }
                        >
                          <InputLabel
                            id="subscriptionType"
                            // name="subscriptionType"
                            sx={{ color: '#B6B6B6', ml: '-14px' }}
                          >
                            Subscription Type<span style={{ color: 'red', ml: -2 }}>*</span>
                          </InputLabel>

                          <Field
                            as={Select}
                            labelId="subscriptionType"
                            name="subscriptionType"
                            label="Subscription Type"
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.subscriptionType}
                            onChange={SubscriptionForm.handleChange}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
                          >
                            {companyTypes.map((item) => (
                              <MenuItem key={item} value={item} onClick={() => handleCompanyClick(item)}>
                                {item}
                              </MenuItem>
                            ))}
                          </Field>
                          {SubscriptionForm.touched.subscriptionType && SubscriptionForm.errors.subscriptionType ? (
                            <FormHelperText>
                              {SubscriptionForm.touched.subscriptionType && SubscriptionForm.errors.subscriptionType}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          sx={{ mt: 2 }}
                          error={SubscriptionForm.touched.company && Boolean(SubscriptionForm.errors.company)}
                        >
                          <InputLabel id="company" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                            Company<span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <Field
                            as={Select}
                            id="company"
                            name="company"
                            label={
                              <Typography sx={{ color: '#B6B6B6' }}>
                                Company<span style={{ color: 'red' }}>*</span>
                              </Typography>
                            }
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.company}
                            onChange={SubscriptionForm.handleChange}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
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
                          </Field>
                          {SubscriptionForm.touched.company && SubscriptionForm.errors.company ? (
                            <FormHelperText>
                              {SubscriptionForm.touched.company && SubscriptionForm.errors.company}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl
                          fullWidth
                          error={SubscriptionForm.touched.description && Boolean(SubscriptionForm.errors.description)}
                        >
                          <Field
                            as={TextField}
                            id="input1"
                            name="description"
                            multiline
                            rows={3}
                            label={<Typography sx={{ color: '#B6B6B6' }}>Description</Typography>}
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.description}
                            onChange={SubscriptionForm.handleChange}
                            error={SubscriptionForm.touched.description && Boolean(SubscriptionForm.errors.description)}
                            helperText={SubscriptionForm.touched.description && SubscriptionForm.errors.description}
                            disabled
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          // sx={{ mb: 3 }}
                          error={SubscriptionForm.touched.frequency && Boolean(SubscriptionForm.errors.frequency)}
                        >
                          <InputLabel id="select3" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                            Frequency<span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <Field
                            as={Select}
                            labelId="select3"
                            id="select3"
                            name="frequency"
                            label={
                              <Typography sx={{ color: '#B6B6B6' }}>
                                Frequency<span style={{ color: 'red' }}>*</span>
                              </Typography>
                            }
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.frequency}
                            onChange={SubscriptionForm.handleChange}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
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
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          // sx={{ mb: 3 }}
                          error={SubscriptionForm.touched.amount && Boolean(SubscriptionForm.errors.amount)}
                        >
                          <InputLabel htmlFor="amount" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                            Amount<span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <Field
                            as={Input}
                            label={
                              <Typography sx={{ color: '#B6B6B6' }}>
                                Amount<span style={{ color: 'red' }}>*</span>
                              </Typography>
                            }
                            name="amount"
                            type="number"
                            value={SubscriptionForm.values.amount}
                            onChange={SubscriptionForm.handleChange}
                            startAdornment={<InputAdornment position="end">$</InputAdornment>}
                          />
                          {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount ? (
                            <FormHelperText>
                              {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={MomentUtils}>
                            <Field
                              as={DesktopDatePicker}
                              label={
                                <Typography sx={{ color: '#B6B6B6' }}>
                                  Contract Start Date<span style={{ color: 'red' }}>*</span>
                                </Typography>
                              }
                              inputFormat="MM/DD/YYYY"
                              onChange={(e) => {
                                SubscriptionForm.setFieldValue('contractStartDate', moment(e._d).format('yyyy-MM-DD'));
                              }}
                              value={SubscriptionForm.values.contractStartDate}
                              renderInput={(params) => (
                                <Field
                                  as={TextField}
                                  name="contractStartDate"
                                  variant="standard"
                                  size="small"
                                  {...params}
                                  error={
                                    SubscriptionForm.touched.contractStartDate &&
                                    Boolean(SubscriptionForm.errors.contractStartDate)
                                  }
                                  helperText={
                                    SubscriptionForm.touched.contractStartDate &&
                                    SubscriptionForm.errors.contractStartDate
                                  }
                                  sx={{
                                    svg: { color: '#0071E3', mr: '5px' },
                                    // label: { ml: '15px' },
                                    // input: { ml: '15px' },
                                  }}
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
                              label={
                                <Typography sx={{ color: '#B6B6B6' }}>
                                  Next Billing Date<span style={{ color: 'red' }}>*</span>
                                </Typography>
                              }
                              inputFormat="MM/DD/YYYY"
                              variant="standard"
                              size="small"
                              onChange={(e) => {
                                SubscriptionForm.setFieldValue('nextBillingDate', moment(e._d).format('yyyy-MM-DD'));
                                SubscriptionForm.setFieldTouched('nextBillingDate', true, false);
                              }}
                              value={SubscriptionForm.values.nextBillingDate}
                              renderInput={(params) => (
                                <Field
                                  as={TextField}
                                  name="nextBillingDate"
                                  variant="standard"
                                  size="small"
                                  {...params}
                                  error={
                                    SubscriptionForm.touched.nextBillingDate &&
                                    Boolean(SubscriptionForm.errors.nextBillingDate)
                                  }
                                  helperText={
                                    SubscriptionForm.touched.nextBillingDate && SubscriptionForm.errors.nextBillingDate
                                  }
                                  sx={{ svg: { color: '#0071E3', mr: '5px' } }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          // sx={{ mb: 3 }}
                          error={SubscriptionForm.touched.autoRenewal && Boolean(SubscriptionForm.errors.autoRenewal)}
                        >
                          <InputLabel id="select4" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                            Auto Renewal<span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <Field
                            as={Select}
                            labelId="select4"
                            id="select4"
                            name="autoRenewal"
                            label="Auto Renewal"
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.autoRenewal}
                            onChange={SubscriptionForm.handleChange}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
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
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl
                          fullWidth
                          // sx={{ mb: 3 }}
                          error={SubscriptionForm.touched.status && Boolean(SubscriptionForm.errors.status)}
                        >
                          <InputLabel id="select5" sx={{ color: '#B6B6B6', ml: '-14px' }}>
                            Status<span style={{ color: 'red' }}>*</span>
                          </InputLabel>
                          <Field
                            as={Select}
                            labelId="select5"
                            id="select5"
                            name="status"
                            label="Status"
                            variant="standard"
                            size="small"
                            value={SubscriptionForm.values.status}
                            onChange={SubscriptionForm.handleChange}
                            sx={{
                              '&:after': {
                                borderBottomColor: '#0000',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#0071E3',
                              },
                            }}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                          </Field>
                          {SubscriptionForm.touched.status && SubscriptionForm.errors.status ? (
                            <FormHelperText>
                              {SubscriptionForm.touched.status && SubscriptionForm.errors.status}
                            </FormHelperText>
                          ) : null}
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
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={handleClickOpen}
                      disabled={!(SubscriptionForm.isValid && SubscriptionForm.dirty)}
                      sx={{
                        width: '170px',
                        height: '45px',
                        backgroundColor: '#3D71FF',
                        borderRadius: '30px',
                        mt: '25px',
                      }}
                    >
                      Create
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleCloseSub}
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
                <SuccsessModal open={open} handleClose={handleClose} />
              </Scrollbar>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default SubscriptionModal;
