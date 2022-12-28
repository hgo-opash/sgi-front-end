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
import { useDispatch, useSelector } from 'react-redux';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';
import MomentUtils from '@date-io/moment';
import React, { useEffect } from 'react';
import { EditComapnysubsResponse, GetcompaniesResponse, GetsubsResponse } from '../services/Service';
import SuccessToast from '../toast/Success';
import { setSubscriptions } from '../slices/subscriptionSlice';
import { setCompanies } from '../slices/companiesSlice';

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
  const [selectedCompanyType, setSelectedCompanyType] = React.useState([]);
  const [companyTypes, setCompanyTypes] = React.useState([]);
  const { allCompaniesData } = useSelector((state) => state.companies);
  const { Email } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log(Email,"Email");

  const handleCompanyClick = (data) => {
    const CompanyType = allCompaniesData.filter((val) => val.companyType === data);
    setSelectedCompanyType(CompanyType);
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    GetcompaniesResponse().then((res) => {
      console.log('subscription companies => ', res.data);
      dispatch(setCompanies({ allCompaniesData: res.data.data }));
      const companiesType = [...new Set(res.data.data.map((item) => item.companyType))];
      setCompanyTypes(companiesType);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    companyType: Yup.string().required('Please Select Company-Type'),
    createdAt: Yup.string().required('Please Select Contract Start Date'),
    price: Yup.number().required('Please Enter Amount'),
    // autoRenewal: Yup.string().required('Please Select Auto Renewal'),
    updatedBy: Yup.string()
      // .required('Please Select next billing Date')
      // .test('nextBillingDate', 'Must be greater than today', (value) => {
      //   return moment(value) > moment();
      // }),
    // status: Yup.string().required('Please select Status'),
  });

  const initialValues = {
    companyType: data?.companyType,
    createdAt: data?.createdAt,
    updatedBy: data?.updatedBy,
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
      console.log('values company', values);
      values.updatedBy= Email

      EditComapnysubsResponse(data._id, values).then((res) => {
        console.log('subscription ADD comapany => ', res.data);
        if (res.data.success === true) {
          GetcompaniesResponse()
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
              {data.companyType} Subscription
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
                    >
                      <InputLabel id="select3">Company Type</InputLabel>
                      <Select
                        labelId="select3"
                        id="select3"
                        name="companyType"
                        label="Company Type"
                        value={`${EditForm.values.companyType}`}
                        onChange={EditForm.handleChange}
                      >
                        {companyTypes.map((item) => (
                            <MenuItem key={item} value={item} onClick={() => handleCompanyClick(item)}>
                              {item}
                            </MenuItem>
                          ))}
                      </Select>
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

                    {/* <FormControl fullWidth sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        id="input1"
                        name="updatedBy"
                        label="Updated By"
                        variant="outlined"
                        value={EditForm.values.updatedBy}
                        onChange={EditForm.handleChange}
                      />
                    </FormControl> */}

                    {/* <FormControl fullWidth sx={{ mb: 3 }}>
                      <LocalizationProvider dateAdapter={MomentUtils}>
                        <Field
                          as={DesktopDatePicker}
                          label="Updated At"
                          inputFormat="MM/DD/YYYY"
                          onChange={(e) => {
                            EditForm.setFieldValue('updatedAt', moment(e._d).format('yyyy-MM-DD'));
                            // EditForm.setFieldTouched('updatedAt', true, false);
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
                    </FormControl> */}

                    
                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                    >
                      <InputLabel htmlFor="amount">Amount</InputLabel>
                      <OutlinedInput
                        label="Amount"
                        name="price"
                        type="number"
                        value={EditForm.values.price}
                        onChange={EditForm.handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
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
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCompanyModal;
