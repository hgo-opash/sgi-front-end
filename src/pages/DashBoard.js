import React, { useState } from 'react';
import moment from 'moment';
import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Grid,
  IconButton,
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
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
import { setSubscriptions } from '../slices/subscriptionSlice';
import { GetsubsResponse } from '../services/Service';
import SubscriptionModal from './SubscriptionModal';
import costPerMonthpic from '../images/costPerMonth.png';
import costPerYearpic from '../images/costPerYear.png';
import budgetpic from '../images/budget.png';
import variancepic from '../images/variance.png';

const TABLE_HEAD = [
  {
    id: 'subscription_name',
    label: 'Subscription Name',
    alignRight: false,
    sort: true,
  },
  { id: 'frequency', label: 'Frequency', alignRight: false },
  { id: 'trial_days', label: 'Trial Days', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false, sort: true },
  { id: 'start_date', label: 'Start Date', alignRight: false, sort: true },
  {
    id: 'next_billing_date',
    label: 'Next Billing Date',
    alignRight: false,
    sort: true,
  },
  { id: 'auto_renewal', label: 'Auto Renewal', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const DashBoard = () => {
  const [openSub, setOpenSub] = React.useState(false);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SubscriptionData } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.login);

  const handleClickOpenSub = () => {
    setOpenSub(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        console.log('get subs  ===>  ', res.data);
        if (res.data.success === true) {
          // dispatch(
          //   setLogindata({
          //     Email: res.data.email,
          //     LastLogin: res.data.lastLoggedInAt,
          //     Role: res.data.role,
          //     FirstName: res.data.name,
          //     ProfilePic: res.data.profilePic,
          //   })
          // );
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

  const closePopover = (id) => {
    setOpenAlert(0);
  };

  const activeData = SubscriptionData.filter((row) => row.status === 'Active').sort();
  const inactiveData = SubscriptionData.filter((row) => row.status === 'Inactive').sort();
  const activeDataSort = activeData.sort(sortName);
  const inactiveDataSort = inactiveData.sort(sortName);
  const sortedData = [...activeDataSort, ...inactiveDataSort];

  const budget = 1000;

  const costPerMonthArray = SubscriptionData.map((val) => {
    if (val.status === 'Active') {
      return val.frequency === 'Monthly' ? val.amount : val.amount / 12;
    }
    return 0;
  });

  const costPerYearArray = SubscriptionData.map((val) => {
    if (val.status === 'Active') {
      return val.frequency === 'Annually' ? val.amount : val.amount * 12;
    }
    return 0;
  });

  const costPerMonth = costPerMonthArray.reduce((a, v) => a + v, 0).toFixed(2);
  const costPerYear = costPerYearArray.reduce((a, v) => a + v, 0).toFixed(2);
  const variance = (budget - costPerYear).toFixed(2);

  const imgStyle = {
    height: '70px',
    width: '70px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '-18px',
    left: '20px',
  };

  const lineSyle = {
    fontSize: '16px',
    fontWeight: 700,
    pb: '7px',
    position: 'relative',
    pt: '22px',
    '::after': {
      position: 'absolute',
      content: '""',
      left: '0',
      bottom: '0',
      height: '3px',
      width: '60px',
      backgroundColor: '#C1C8F6',
    },
  };

  return (
    <>
      {/* {Role === 'user' && ( */}
      <Page title="DashBoard - SGI">
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

        {SubscriptionData?.map((data) => {
          const d1 = moment(new Date()).format('YYYY-MM-DD');
          const d2 = moment(data.nextBilling).format('YYYY-MM-DD');
          const diff = moment(d2).diff(d1, 'days');
          const expire = diff < 7 && diff > 0;

          return (
            expire && (
              <Collapse key={data._id} in={open}>
                <Alert
                  variant="filled"
                  severity="warning"
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpen(false)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt: 2, backgroundColor: 'rgb(220, 150, 2)' }}
                >
                  <Typography sx={{ fontWeight: 1000 }}>{data.subscriptionName} </Typography>
                  This SubScription is About to End!
                </Alert>
              </Collapse>
            )
          );
        })}

        <Grid
          container
          rowSpacing={{ xs: 5, sm: 4, md: 4 }}
          columnSpacing={{ xs: 3, sm: 3, md: 3 }}
          sx={{ pt: '35px' }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #0071E3 0%, #6AB2FD 100%)' }}>
                    <img height="45px" width="45px" src={costPerMonthpic} alt="month" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#1F82E6' }}>Total Cost Per Month</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${costPerMonth}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #34DABA 0%, #54E1C2 100%)' }}>
                    <img height="45px" width="45px" src={costPerYearpic} alt="year" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#35DBBB' }}>Total Cost Per Year</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${costPerYear}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #FEB655 0%, #FFC774 100%)' }}>
                    <img height="45px" width="45px" src={budgetpic} alt="budget" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#FDBE69' }}>Total Budget</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${budget}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #FA5C7E 0%, #FF7C95 100%)' }}>
                    <img height="45px" width="45px" src={variancepic} alt="variance" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#FB5D7F' }}>Varince from Budget</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${variance}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} pt={3}>
            <Typography variant="h4" gutterBottom>
              Subscriptions
            </Typography>
            {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New Subscription
          </Button> */}
          </Stack>

          <Card>
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
                        sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                count={sortedData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        </Container>
      </Page>
      {/* )} */}
    </>
  );
};

export default DashBoard;
