import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { sentenceCase } from 'change-case';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import SubscriptionModal from './SubscriptionModal';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
import { setLogindata } from '../slices/loginSlice';
import { setSubscriptions, deleteSubscription } from '../slices/subscriptionSlice';
import { UserListToolbar } from '../sections/@dashboard/user';

const DashBoard = () => {
  const [openSub, setOpenSub] = React.useState(false);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SubscriptionData } = useSelector((state) => state.subscription);

  const handleClickOpenSub = () => {
    setOpenSub(true);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getsubs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        },
      })
      .then((res) => {
        console.log('get subs  ===>  ', res.data);
        if (res.data.success === true) {
          dispatch(
            setLogindata({
              Email: res.data.email,
              LastLogin: res.data.lastLoggedInAt,
              Role: res.data.role,
              FirstName: res.data.name,
            })
          );
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <>
      <Page title="Subscription">
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClickOpenSub} variant="contained" sx={{ mr: 5 }} startIcon={<Iconify icon="eva:plus-fill" />}>
            ADD Subscription
          </Button>
        </Box>
        <SubscriptionModal openModal={openSub} setOpenSubModal={setOpenSub} />

        <Card sx={{ m: 6, height: '100px ' }}>
          <Grid
            container
            sx={{
              justifyContent: 'space-between',
              mt: '30px',
              pl: '50px',
              pr: '80px',
              display: 'flex',
              fontSize: '25px',
            }}
          >
            <Box>Total Cost Per Month</Box>
            <Box>$52</Box>
          </Grid>
        </Card>
        <Card sx={{ m: 6, height: '100px ' }}>
          <Grid
            container
            sx={{
              justifyContent: 'space-between',
              mt: '30px',
              pl: '50px',
              pr: '80px',
              display: 'flex',
              fontSize: '25px',
            }}
          >
            <Box>Total Cost Per Year</Box>
            <Box>$52</Box>
          </Grid>
        </Card>
        <Card sx={{ m: 6, height: '100px ' }}>
          <Grid
            container
            sx={{
              justifyContent: 'space-between',
              mt: '30px',
              pl: '50px',
              pr: '80px',
              display: 'flex',
              fontSize: '25px',
            }}
          >
            <Box>Total Budget</Box>
            <Box>$52</Box>
          </Grid>
        </Card>
        <Card sx={{ m: 6, height: '100px ' }}>
          <Grid
            container
            sx={{
              justifyContent: 'space-between',
              mt: '30px',
              pl: '50px',
              pr: '80px',
              display: 'flex',
              fontSize: '25px',
            }}
          >
            <Box>Variance from Budget</Box>
            <Box>$52</Box>
          </Grid>
        </Card>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} pt={3}>
            <Typography variant="h4" gutterBottom>
              {/* User */}
              Subscriptions
            </Typography>
            {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New Subscription
          </Button> */}
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SubScription Name</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Trial Days</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>Next Billing Date</TableCell>
                      <TableCell>Auto Renewal</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>

                  {!SubscriptionData || SubscriptionData?.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                          Sorry, You Don't have any Active subscription. Please Add New Subscription.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {SubscriptionData &&
                        SubscriptionData.map((row) => 
                           (
                            <TableRow
                              hover
                              key={row._id}
                              tabIndex={-1}
                              // role="checkbox"
                              // selected={isItemSelected}
                              // aria-checked={isItemSelected}
                            >
                              <TableCell align="left">{row.subscriptionName}</TableCell>
                              <TableCell align="left">{row.frequency}</TableCell>
                              <TableCell align="left">{row.trialDays}</TableCell>
                              <TableCell align="left">{row.amount}</TableCell>
                              <TableCell align="left">{moment(row.startDate).format('MM/DD/yyyy')}</TableCell>
                              <TableCell align="left">{moment(row.nextBilling).format('MM/DD/yyyy')}</TableCell>
                              <TableCell align="left">{JSON.stringify(row.autoRenewal)}</TableCell>
                              <TableCell align="left">
                                {row.status === 'Active' && (
                                  <Label variant="ghost" color="success">
                                    {row.status}
                                  </Label>
                                )}
                                {row.status === 'Inactive' && (
                                  <Label variant="ghost" color="error">
                                    {row.status}
                                  </Label>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            {SubscriptionData && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={SubscriptionData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default DashBoard;
