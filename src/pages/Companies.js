import React, { useState } from 'react';
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
  Input,
} from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { SaveCompanyResponse } from '../services/Service';
import Page from '../components/Page';
import Logo from '../components/Logo';
import SuccsessModal from '../components/SuccsessModal';

const Companies = () => {
  const [image, setImage] = useState();

  const CompaniesFormSchema = Yup.object().shape({
    name: Yup.string().required('Please enter name'),
    website: Yup.string().required('Please enter website'),
    price: Yup.number().required('Please enter price'),
    description: Yup.string().required('Please enter description'),
    companyType: Yup.string().required('Please Select company type'),
    // popular: Yup.boolean().required('Please select any one. '),
  });

  const initialValues = {
    name: '',
    website: '',
    price: '',
    description: '',
    logo: 'logo',
    companyType: '',
    popular: false,
  };

  const CompaniesForm = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: CompaniesFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', values, image);
      SaveCompanyResponse(values, image).then((res) => {
        console.log('Company ADD => ', res);
        resetForm(initialValues);
      });
    },
  });

  return (
    <>
      <Page title="Companies - SGI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Companies
            </Typography>
          </Stack>

          <Card sx={{ p: 3 }}>
            <Grid container spacing={1}>
              <FormikProvider value={CompaniesForm}>
                <form onSubmit={CompaniesForm.handleSubmit}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {/* <Logo width={160} height={160} /> */}
                      <Input
                        type="file"
                        name="image"
                        inputProps={{ accept: 'image/*' }}
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                          // CompaniesForm.setFieldValue('image', event.target.files[0]);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.name && Boolean(CompaniesForm.errors.name)}
                    >
                      <Field
                        as={TextField}
                        id="input1"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={CompaniesForm.values.name}
                        // value={masterComapny?.description}
                        onChange={CompaniesForm.handleChange}
                        error={CompaniesForm.touched.name && Boolean(CompaniesForm.errors.name)}
                        helperText={CompaniesForm.touched.name && CompaniesForm.errors.name}
                        // disabled
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.companyType && Boolean(CompaniesForm.errors.companyType)}
                    >
                      <Field
                        as={TextField}
                        id="input1"
                        name="companyType"
                        label="Company Type"
                        variant="outlined"
                        value={CompaniesForm.values.companyType}
                        // value={masterComapny?.description}
                        onChange={CompaniesForm.handleChange}
                        error={CompaniesForm.touched.companyType && Boolean(CompaniesForm.errors.companyType)}
                        helperText={CompaniesForm.touched.companyType && CompaniesForm.errors.companyType}
                        // disabled
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.website && Boolean(CompaniesForm.errors.website)}
                    >
                      <Field
                        as={TextField}
                        id="input1"
                        name="website"
                        label="Website"
                        variant="outlined"
                        value={CompaniesForm.values.website}
                        // value={masterComapny?.description}
                        onChange={CompaniesForm.handleChange}
                        error={CompaniesForm.touched.website && Boolean(CompaniesForm.errors.website)}
                        helperText={CompaniesForm.touched.website && CompaniesForm.errors.website}
                        // disabled
                      />
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.description && Boolean(CompaniesForm.errors.description)}
                    >
                      <Field
                        as={TextField}
                        id="input1"
                        name="description"
                        multiline
                        rows={3}
                        label="Description"
                        variant="outlined"
                        value={CompaniesForm.values.description}
                        // value={masterComapny?.description}
                        onChange={CompaniesForm.handleChange}
                        error={CompaniesForm.touched.description && Boolean(CompaniesForm.errors.description)}
                        helperText={CompaniesForm.touched.description && CompaniesForm.errors.description}
                        // disabled
                      />
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.price && Boolean(CompaniesForm.errors.price)}
                    >
                      <InputLabel htmlFor="price">price</InputLabel>
                      <Field
                        as={OutlinedInput}
                        label="price"
                        name="price"
                        type="number"
                        value={CompaniesForm.values.price}
                        onChange={CompaniesForm.handleChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                      {CompaniesForm.touched.price && CompaniesForm.errors.price ? (
                        <FormHelperText>{CompaniesForm.touched.price && CompaniesForm.errors.price}</FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl
                      fullWidth
                      sx={{ mb: 3 }}
                      error={CompaniesForm.touched.popular && Boolean(CompaniesForm.errors.popular)}
                    >
                      <InputLabel id="select4">Popular </InputLabel>
                      <Field
                        as={Select}
                        labelId="select4"
                        id="select4"
                        name="popular"
                        label="Popular"
                        value={CompaniesForm.values.popular}
                        onChange={CompaniesForm.handleChange}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Field>
                      {CompaniesForm.touched.popular && CompaniesForm.errors.popular ? (
                        <FormHelperText>{CompaniesForm.touched.popular && CompaniesForm.errors.popular}</FormHelperText>
                      ) : null}
                    </FormControl>

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      // onClick={handleClickOpen}
                      disabled={!(CompaniesForm.isValid && CompaniesForm.dirty)}
                    >
                      Create
                    </Button>
                  </Grid>
                </form>
              </FormikProvider>
            </Grid>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default Companies;
