import React, { useState } from 'react';
import moment from 'moment';
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
import { GetsubsResponse } from '../services/Service';

const DashBoard = () => {
  const [openSub, setOpenSub] = React.useState(false);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SubscriptionData } = useSelector((state) => state.subscription);
  const { Role } = useSelector((state) => state.login);

  const handleClickOpenSub = () => {
    setOpenSub(true);
  };

  React.useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        console.log('get subs  ===>  ', res.data);
        if (res.data.success === true) {
          dispatch(
            setLogindata({
              Email: res.data.email,
              LastLogin: res.data.lastLoggedInAt,
              Role: res.data.role,
              FirstName: res.data.name,
              ProfilePic: res.data.profilePic,
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

  const sortName = (a, b) => {
    if (a.subscriptionName < b.subscriptionName) {
      return -1;
    }
    if (a.subscriptionName > b.subscriptionName) {
      return 1;
    }
    return 0;
  };

  const activeData = SubscriptionData.filter((row) => row.status === 'Active').sort();
  const inactiveData = SubscriptionData.filter((row) => row.status === 'Inactive').sort();
  const activeDataSort = activeData.sort(sortName);
  const inactiveDataSort = inactiveData.sort(sortName);
  const sortedData = [...activeDataSort, ...inactiveDataSort];

  // const budget = 1000;

  // const costPerMonth = SubscriptionData.reduce((a, v) => (a += v.amount), 0);

  // console.log(costPerMonth, 'costPerMonth');

  return (
    <>
      {Role === 'user' && (
        <Page title="Subscription">
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleClickOpenSub}
              variant="contained"
              sx={{ mr: 6 }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              ADD Subscription
            </Button>
          </Box>
          <SubscriptionModal openModal={openSub} setOpenSubModal={setOpenSub} />

          <Card sx={{ m: 6, height: '110px' }}>
            <Grid
              container
              sx={{
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: '50px',
                pr: '80px',
                fontSize: '25px',
                backgroundColor: '#D1E9FC',
                color: '#061B64',
              }}
            >
              <Box>Total Cost Per Month</Box>
              <Box>$15</Box>
            </Grid>
          </Card>
          <Card sx={{ m: 6, height: '110px ' }}>
            <Grid
              container
              sx={{
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: '50px',
                pr: '80px',
                fontSize: '25px',
                backgroundColor: '#D0F2FF',
                color: '#04297A',
              }}
            >
              <Box>Total Cost Per Year</Box>
              <Box>$15</Box>
            </Grid>
          </Card>
          <Card sx={{ m: 6, height: '110px ' }}>
            <Grid
              container
              sx={{
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: '50px',
                pr: '80px',
                fontSize: '25px',
                backgroundColor: '#FFF7CD',
                color: '#7A4F01',
              }}
            >
              <Box>Total Budget</Box>
              <Box>$15</Box>
            </Grid>
          </Card>
          <Card sx={{ m: 6, height: '110px ' }}>
            <Grid
              container
              sx={{
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: '50px',
                pr: '80px',
                fontSize: '25px',
                backgroundColor: '#FFE7D9',
                color: '#7A0C2E',
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
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#d8e3f4' }}>
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
                        {sortedData &&
                          sortedData.map((row) => (
                            <TableRow
                              hover
                              key={row._id}
                              tabIndex={-1}
                              // role="checkbox"
                              // selected={isItemSelected}
                              // aria-checked={isItemSelected}
                            >
                              <TableCell align="left">
                                <Typography
                                  variant="subtitle2"
                                  color={row.status === 'Active' ? '#229A16' : '#ff4c00'}
                                  noWrap
                                >
                                  {row.subscriptionName}
                                </Typography>
                              </TableCell>
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
                          ))}
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
      )}
    </>
  );
};

export default DashBoard;
