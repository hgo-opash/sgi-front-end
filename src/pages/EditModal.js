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
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Field, FormikProvider } from 'formik';
import MomentUtils from '@date-io/moment';
import React from 'react';
import Logo from '../components/Logo';
import SuccsessModal from '../components/SuccsessModal';

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
  p: 4,
};

const EditModal = ({ openEditModal, setOpenEditModal }) => {
  const [open, setOpen] = React.useState(setOpenEditModal);
  //   const handleOpen = () => setOpenEditModal(true);
  const handleClose = () => setOpenEditModal(false);
  return (
    <div>
      <Modal
        disableBackdropClick={false}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, height: '85%', width: 800 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ ml: 5 }}>
            <Typography variant="h4" gutterBottom>
              Subscription
            </Typography>
          </Stack>

          <Container sx={{ height: '85%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                {/* <FormikProvider
                //    value={SubscriptionForm}
                   > */}
                <form
                //  onSubmit={SubscriptionForm.handleSubmit}
                >
                  <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                    // error={SubscriptionForm.touched.frequency && Boolean(SubscriptionForm.errors.frequency)}
                  >
                    <InputLabel id="select3">Frequency</InputLabel>
                    <Select
                      labelId="select3"
                      id="select3"
                      name="frequency"
                      label="Frequency"
                      //   value={SubscriptionForm.values.frequency}
                      //   onChange={SubscriptionForm.handleChange}
                    >
                      <MenuItem value={'Monthly'}>Monthly</MenuItem>
                      <MenuItem value={'Annually'}>Annually</MenuItem>
                      <MenuItem value={'Trial'}>Trial</MenuItem>
                    </Select>
                    {/* {SubscriptionForm.touched.frequency && SubscriptionForm.errors.frequency ? (
                          <FormHelperText>
                            {SubscriptionForm.touched.frequency && SubscriptionForm.errors.frequency}
                          </FormHelperText>
                        ) : null} */}
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={MomentUtils}>
                      <DesktopDatePicker
                        label="Contract Start Date"
                        inputFormat="MM/DD/YYYY"
                        // onChange={(e) => {
                        //   SubscriptionForm.setFieldValue('contractStartDate', moment(e._d).format('yyyy-MM-DD'));
                        // }}
                        // value={SubscriptionForm.values.contractStartDate}
                        renderInput={(params) => (
                          <TextField
                            name="contractStartDate"
                            {...params}
                            // error={
                            //   SubscriptionForm.touched.contractStartDate &&
                            //   Boolean(SubscriptionForm.errors.contractStartDate)
                            // }
                            // helperText={
                            //   SubscriptionForm.touched.contractStartDate &&
                            //   SubscriptionForm.errors.contractStartDate
                            // }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={MomentUtils}>
                      <DesktopDatePicker
                        label="Next Billing Date"
                        inputFormat="MM/DD/YYYY"
                        // onChange={(e) => {
                        //   SubscriptionForm.setFieldValue('nextBillingDate', moment(e._d).format('yyyy-MM-DD'));
                        // }}
                        // value={SubscriptionForm.values.nextBillingDate}
                        renderInput={(params) => (
                          <TextField
                            name="nextBillingDate"
                            {...params}
                            // error={
                            //   SubscriptionForm.touched.nextBillingDate &&
                            //   Boolean(SubscriptionForm.errors.nextBillingDate)
                            // }
                            // helperText={
                            //   SubscriptionForm.touched.nextBillingDate && SubscriptionForm.errors.nextBillingDate
                            // }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                    // error={SubscriptionForm.touched.amount && Boolean(SubscriptionForm.errors.amount)}
                  >
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <OutlinedInput
                      label="Amount"
                      name="amount"
                      type="number"
                      //   value={SubscriptionForm.values.amount}
                      //   onChange={SubscriptionForm.handleChange}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    {/* {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount ? (
                          <FormHelperText>
                            {SubscriptionForm.touched.amount && SubscriptionForm.errors.amount}
                          </FormHelperText>
                        ) : null} */}
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                    // error={SubscriptionForm.touched.autoRenewal && Boolean(SubscriptionForm.errors.autoRenewal)}
                  >
                    <InputLabel id="select4">Auto Renewal</InputLabel>
                    <Select
                      labelId="select4"
                      id="select4"
                      name="autoRenewal"
                      label="Auto Renewal"
                      //   value={SubscriptionForm.values.autoRenewal}
                      //   onChange={SubscriptionForm.handleChange}
                    >
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                    {/* {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal ? (
                          <FormHelperText>
                            {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal}
                          </FormHelperText>
                        ) : null} */}
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                    // error={SubscriptionForm.touched.autoRenewal && Boolean(SubscriptionForm.errors.autoRenewal)}
                  >
                    <InputLabel id="select4">Status</InputLabel>
                    <Select
                      labelId="select4"
                      id="select4"
                      name="Status"
                      label="Status"
                      //   value={SubscriptionForm.values.autoRenewal}
                      //   onChange={SubscriptionForm.handleChange}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    {/* {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal ? (
                          <FormHelperText>
                            {SubscriptionForm.touched.autoRenewal && SubscriptionForm.errors.autoRenewal}
                          </FormHelperText>
                        ) : null} */}
                  </FormControl>

                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    // onClick={handleClickOpen}
                    // disabled={!(SubscriptionForm.isValid && SubscriptionForm.dirty)}
                  >
                    Edit
                  </Button>
                  <Button color="error" variant="contained" onClick={() => handleClose()} sx={{ ml: 3 }}>
                    Cancel
                  </Button>
                </form>
                {/* </FormikProvider> */}
              </Grid>
            </Grid>
            {/* <SuccsessModal open={open} handleClose={handleClose} /> */}
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
